from rest_framework import serializers

class StockPredictionSerializer(serializers.Serializer):
    stock = serializers.CharField(required = True)
