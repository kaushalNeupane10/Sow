from rest_framework import serializers
from django.contrib.auth.models import User
from .models import LocalText, PriceItem

class LocalTextSerializers(serializers.ModelSerializer):
    class Meta:
        model = LocalText
        fields = '__all__'

class PriceItemSerializers(serializers.ModelSerializer):
    class Meta:
        model = PriceItem
        fields = '__all__'

class UserSerializers(serializers.ModelSerializer):
    password= serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields= ['id', 'username','email','password']

    def create(self, validated_data):
        user= User.objects.create_user(**validated_data)
        return user