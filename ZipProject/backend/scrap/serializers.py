from rest_framework import serializers
from .models import ScrapCuration, ScrapProduct

class ScrapProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapProduct
        fields ='__all__'


class ScrapCurationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapCuration
        fields ='__all__'

class BestProductSerializer(serializers.Serializer):
    product = ScrapProduct
    scrap = serializers.IntegerField

class BestCurationSerializer(serializers.Serializer):
    product = ScrapCuration
    scrap = serializers.IntegerField