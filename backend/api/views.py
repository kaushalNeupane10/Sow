from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .models import LocalText, PriceItem
from .serializers import  (LocalTextSerializers, PriceItemSerializers, UserSerializers, )

class LocalTextViewSet(viewsets.ModelViewSet):
    queryset = LocalText.objects.all()
    serializer_class = LocalTextSerializers
    permission_classes = [permissions.IsAuthenticated]

class PriceItemViewSet(viewsets.ModelViewSet):
    queryset = PriceItem.objects.all()
    serializer_class = PriceItemSerializers
    permission_classes = [permissions.IsAuthenticated]

#register
class RegisterView(APIView):
    """ Allow new user to register"""
    def post (self,request):
        serializer = UserSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg": "user registered successfully"},
                            status=status.HTTP_201_CREATED,)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProfileView(APIView):
    """return the log-in user data"""
    def get(self,request):
        serializer= UserSerializers(request.user)
        return Response(serializer.data)

