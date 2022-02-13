import re
from django.shortcuts import render

#for Social Login
from allauth.socialaccount.providers.naver.views import NaverOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.serializers import SocialLoginSerializer

# for Profile
from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializer

# from config import permissions

def index(request):
    return render(request, 'index.html')

# Social Login
class NaverLogin(SocialLoginView):
    adapter_class = NaverOAuth2Adapter
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    client_class = OAuth2Client
    serializer_class = SocialLoginSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

# Profile 
class UserViewSet(viewsets.ModelViewSet):
    # permission_classes = [permissions.IsOwnerOrReadOnly]
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'username'

user_list = UserViewSet.as_view({
    'get': 'list'
    })

profile = UserViewSet.as_view({
    'get' : 'retrieve'
})

profile_edit = UserViewSet.as_view({
    'get' : 'retrieve',
    'put' : 'update'
})