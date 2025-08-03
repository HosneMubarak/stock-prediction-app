from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import StockPredictionSerializer
import numpy as np
import pandas as pd
import yfinance as yf
from datetime import datetime
import matplotlib
matplotlib.use("Agg")  # Use non-GUI backend suitable for server
import matplotlib.pyplot as plt
import os
from django.conf import settings
from .utils import get_medial_file_path
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model

# Load model path
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(CURRENT_DIR, 'stock_prediction_model.keras')


class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            stock = serializer.validated_data['stock']
            now = datetime.now()
            start = datetime(now.year-10, now.month, now.day)
            end = now
            df = yf.download(stock, start, end)

            if df.empty:
                return Response({
                    'status': status.HTTP_404_NOT_FOUND,
                    'error': f"No data found for {stock}"
                }, status=status.HTTP_404_NOT_FOUND)

            # ====== BASIC PLOT ======
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label="Closing Price")
            plt.title(f"Closing Price of {stock}")
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()

            basic_filename = f"{stock}_plot.png"
            basic_plot_image_path = get_medial_file_path(basic_filename)
            plt.savefig(basic_plot_image_path)
            plt.close()

            # ====== 100-DAY MA PLOT ======
            df['MA_100'] = df.Close.rolling(100).mean()
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label="Closing Price")
            plt.plot(df['MA_100'], 'r', label="100-Day MA")
            plt.title(f"100 Days Moving Average of {stock}")
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()

            hundred_filename = f"100_ma_{stock}_plot.png"
            hundred_ma_plot_image_path = get_medial_file_path(hundred_filename)
            plt.savefig(hundred_ma_plot_image_path)
            plt.close()

            # ====== 200-DAY MA PLOT ======
            df['MA_200'] = df.Close.rolling(200).mean()
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label="Closing Price")
            plt.plot(df['MA_200'], 'r', label="200-Day MA")
            plt.title(f"200 Days Moving Average of {stock}")
            plt.xlabel("Days")
            plt.ylabel("Close Price")
            plt.legend()

            two_hundred_filename = f"200_ma_{stock}_plot.png"
            two_hundred_ma_plot_image_path = get_medial_file_path(two_hundred_filename)
            plt.savefig(two_hundred_ma_plot_image_path)
            plt.close()

            # Prepare Data
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7):len(df)])

            # Scale the data
            scaler = MinMaxScaler(feature_range=(0, 1))

            # Load ML model
            model = load_model(MODEL_PATH)

            # Prepare test set
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days, data_testing], ignore_index=True)
            input_data = scaler.fit_transform(final_df)

            x_test = []
            y_test = []
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i, 0])

            x_test, y_test = np.array(x_test), np.array(y_test)
            y_predict = model.predict(x_test)
            y_predict = scaler.inverse_transform(y_predict.reshape(-1, 1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

            # Build URLs
            basic_plot_image_url = request.build_absolute_uri(
                os.path.join(settings.MEDIA_URL, 'plots', basic_filename)
            )
            hundred_ma_plot_image_url = request.build_absolute_uri(
                os.path.join(settings.MEDIA_URL, 'plots', hundred_filename)
            )
            two_hundred_ma_plot_image_url = request.build_absolute_uri(
                os.path.join(settings.MEDIA_URL, 'plots', two_hundred_filename)
            )

            return Response({
                'status': 'success',
                'stock': stock,
                'basic_plot_image': basic_plot_image_url,
                'hundred_ma_plot_image': hundred_ma_plot_image_url,
                'two_hundred_ma_plot_image': two_hundred_ma_plot_image_url
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
