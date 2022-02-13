from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    path('auth/google/', views.GoogleLogin.as_view(), name='google_login'),
    path('auth/naver/', views.NaverLogin.as_view(), name='naver_login'),

    path('userlist/', views.user_list),
    path('profile/<str:username>/', views.profile),
    path('profile/<username>/edit', views.profile_edit),
]