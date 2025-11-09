from rest_framework import viewsets, generics, permissions, status, serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import Product
from .serializers import  (ProductSerializer, UserSerializers, )
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
import logging

logger = logging.getLogger(__name__)
class ProductViewSet(viewsets.ModelViewSet):
    queryset= Product.objects.order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes= [IsAuthenticatedOrReadOnly]

#register
class RegisterView(APIView):
    """ Allow new user to register"""
    def post (self,request):
        serializer = UserSerializers(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"msg": "user registered successfully"}, status=201)
        except Exception as e:
            logger.error(f"Register failed: {e}")
            return Response(
                {"error": serializer.errors if hasattr(serializer, "errors") else str(e)},
                status=400
            )
    
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        serializer= UserSerializers(request.user)
        return Response(serializer.data)

#login using email instead of username
class EmailTokenObtainPairSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("No user found with this email.")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password.")

        if not user.is_active:
            raise serializers.ValidationError("This account is inactive.")

        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        }


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

#dashboard protected
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_view(request):
    
    return Response({"message": f"Welcome {request.user.username} to the dashboard!"})