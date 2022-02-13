from rest_framework import serializers
from .models import Recommender

class RecommenderSerializer(serializers.ModelSerializer):
    class Meta :
        model = Recommender
        fields =('target_user','products','product_tags','curations','curation_tags')
        