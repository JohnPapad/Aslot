from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from . import serializers as srs
from . import models as mds
from . import utility

class MapPinpoints(APIView):

    permission_classes = (AllowAny,)
    
    def get(self, request):
        if "lat" in request.GET.keys() and "lng" in request.GET.keys():
            lat = request.GET["lat"]
            lng = request.GET["lng"]
        else:
            # default center near omonia athens
            lat = "37.9834132"
            lng = "23.727644"
        
        # get list of pinpoints within radius in km
        radius = 1.0
        all_stores = mds.Store.objects.all()
        pinpoint_list = utility.get_stores_within_radius(all_stores, radius, lat, lng)
        response_dir = {"center": {"lng":lng,"lat":lat}, "pins": pinpoint_list}
        return Response(response_dir)


# get -> a user is searching
class Search(APIView):
    permission_classes = (AllowAny,)
    
    def get(self, request):
        response_dict = {"success":False}
        if "searchTerm" not in request.GET.keys():
            return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
        
        search_term = request.GET["searchTerm"]
        cust_lat = request.GET["lat"]
        cust_lng = request.GET["lng"]
        valid_stores = mds.Store.objects.filter(items__name__contains=search_term)
        radius=3.0 #search within 3km
        pinpoint_list = utility.get_stores_within_radius(valid_stores, radius, cust_lat, cust_lng)
        response_dict["data"] = pinpoint_list
        response_dict["success"] = True
        return Response(response_dict, status=status.HTTP_200_OK)
