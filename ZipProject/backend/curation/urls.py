from django.urls import path, include
from . import views

urlpatterns = [
    path('curationlist/', views.curation_list),
    path('commentlist/', views.comment_list),
    path('taglist/', views.tag_list),
    path('curation-products-update/<str:pk>/', views.curationProductUpdate, name="curation-products-update"),
]