from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, min_length=8, style={"input_type": "password"}
    )

    password1 = serializers.CharField(
        write_only=True, min_length=8, style={"input_type": "password"}
    )
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "first_name",
            "last_name",
            "password",
            "password1",
        ]

    def validate(self, data):
        if data["password"] != data["password1"]:
            raise serializers.ValidationError({"password1": ["Password do not match!"]})
        email = data["email"]
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                {"email": ["This mail is already registered!"]}
            )
        return data

    def create(self, validated_data):
        validated_data.pop("password1")
        user = User.objects.create_user(**validated_data)
        return user
