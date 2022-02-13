from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.serializers import Serializer
from .permissions import IsOwnerOrReadOnly

import django_filters.rest_framework
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from django.shortcuts import render, get_list_or_404

from .models import Curation,CurationComment,CurationTag
from .serializers import CurationSerializer,CurationCommentSerializer,CurationTagSerializer,CurationProductsSerializer

class CurationViewSet(viewsets.ModelViewSet):
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    # permission_classes = [IsOwnerOrReadOnly]
    queryset = Curation.objects.all()
    serializer_class = CurationSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering_fields = ['pub_date']

class CurationCommentViewSet(viewsets.ModelViewSet):
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    # permission_classes = [IsOwnerOrReadOnly]
    queryset = CurationComment.objects.all()
    serializer_class = CurationCommentSerializer

class CurationTagViewSet(viewsets.ModelViewSet):
    queryset = CurationTag.objects.all()
    serializer_class = CurationTagSerializer

#curation products update
@api_view(['POST'])
def curationProductUpdate(request, pk):
    curation=Curation.objects.get(id=pk)
    serializer=CurationProductsSerializer(instance=curation, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


curation_list = CurationViewSet.as_view({'get': 'list'})
comment_list = CurationCommentViewSet.as_view({'get': 'list'})
tag_list = CurationTagViewSet.as_view({'get': 'list'})