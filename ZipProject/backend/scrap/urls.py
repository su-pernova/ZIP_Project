from django.urls import path
from . import views

urlpatterns = [
    path('product/list/', views.scrap_product_list),
    path('curation/list/', views.scrap_curation_list),
    path('product/best/', views.best_product),
    path('curation/best/', views.best_curation),
]