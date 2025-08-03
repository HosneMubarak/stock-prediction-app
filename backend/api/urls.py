from django.urls import path
from .views import StockPredictionAPIView

from .views import *

urlpatterns = [
    path("prediction/", StockPredictionAPIView.as_view(), name="prediction")
]
