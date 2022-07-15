from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product
from .products import products
from .serializers import ProductSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = ["login/", "register/", "profile/", "profile/update/"]
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product= Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    # for i in products:
    #     if i['_id'] == pk:
    #         product = i
    #         break

    return Response(serializer.data)