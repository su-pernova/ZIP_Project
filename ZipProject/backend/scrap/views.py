import json
import datetime

from django.db.models.query import QuerySet
from django.shortcuts import render
from django.utils import timezone

from rest_framework import serializers, viewsets
from rest_framework.response import Response

from .models import ScrapProduct,ScrapCuration
from .serializers import ScrapProductSerializer,ScrapCurationSerializer,BestProductSerializer

from product.models import Product
from curation.models import Curation

from product.serializers import ProductSerializer
from curation.serializers import CurationSerializer


class ScrapProductViewSet(viewsets.ModelViewSet):
    queryset = ScrapProduct.objects.all()
    serializer_class = ScrapProductSerializer

    def best_product(self, request):
        # 일주일 간의 스크랩 
        enddate = timezone.now()
        startdate = enddate - datetime.timedelta(days=7)
        week_scrap = ScrapProduct.objects.filter(created_at__range=[startdate, enddate])

        product_list = Product.objects.all()
        scrap_list = [] # 프로덕트와 스크랩수 배열
        
        for p in product_list.iterator(): # 프로덕트 전부 돌기
            cnt = 0
            for i in week_scrap:
                if p.id==i.product_id: # 프로덕트 아이디와 스크랩의 프로덕트 아이디가 같으면 카운트
                    cnt=cnt+1
            pp = [p, cnt]
            scrap_list.append(pp)
        
        sorted_list = sorted(scrap_list, key=lambda scrap_list: scrap_list[1], reverse=True) # 스크랩수에 따라 정렬
        print(sorted_list)

        sorted_product=[] # sorted_list에서 product만
        for p in sorted_list:
            sorted_product.append(p[0])

        serializer = ProductSerializer(sorted_product,many=True)
        return Response(serializer.data)

class ScrapCurationViewSet(viewsets.ModelViewSet):
    queryset = ScrapCuration.objects.all()
    serializer_class = ScrapCurationSerializer

    def best_curation(self, request):
        enddate = timezone.now()
        startdate = enddate - datetime.timedelta(days=7)
        week_scrap = ScrapCuration.objects.filter(created_at__range=[startdate, enddate])

        curation_list = Curation.objects.all()
        scrap_list = []
        
        for c in curation_list.iterator():
            cnt = 0
            for i in week_scrap:
                if c.id == i.curation_id:
                    cnt = cnt+1
            cc = [c, cnt]
            scrap_list.append(cc)
        
        sorted_list = sorted(scrap_list, key=lambda scrap_list: scrap_list[1], reverse=True) # 스크랩수에 따라 정렬
        print(sorted_list)

        sorted_curation = []
        for c in sorted_list:
            sorted_curation.append(c[0])

        serializer = CurationSerializer(sorted_curation,many=True)
        return Response(serializer.data)



scrap_product_list = ScrapProductViewSet.as_view({'get': 'list'})
best_product = ScrapProductViewSet.as_view({'get': 'best_product'})
scrap_curation_list = ScrapCurationViewSet.as_view({'get': 'list'})
best_curation = ScrapCurationViewSet.as_view({'get': 'best_curation'})