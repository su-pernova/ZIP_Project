from django.urls import path
from . import views

urlpatterns = [
    path('target_user_list/', views.target_user_list),
    path('recommender_list/<str:target_user>', views.recommender_list),
    path('chosen_tag_list/<str:username>', views.chosen_tag_list),
    path('top_tag_list/<str:username>', views.top_tag_list),
    path('recommended_products/<str:username>', views.recommended_products),
    path('recommended_curations/<str:username>', views.recommended_curations),
]