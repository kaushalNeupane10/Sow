from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            'id',
            'article_no',
            'name',
            'in_price',
            'price',
            'unit',
            'in_stock',
            'description',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

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