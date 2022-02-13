from django.urls import path, include
from . import views

urlpatterns = [
    path('productlist/', views.product_list),
    path('reviewlist/', views.review_list),
    path('taglist/', views.tag_list),
]