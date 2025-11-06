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

    class Meta:
        model = User
        fields= ['id', 'username','email','password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])  
        user.save()
        return user