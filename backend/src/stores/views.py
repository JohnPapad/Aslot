from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_list_or_404, get_object_or_404

from . import serializers as srs
from . import models as mds
from . import utility

class MapPinpoints(APIView):
   
    permission_classes = (AllowAny,)
    
    def get(self, request):
        """Get map pins within a radius around ceneter
        http://localhost:8000/stores/pins
        http://localhost:8000/stores/pins?lat=37.9834132&lng=23.727644
        Arguments:
            lat {optional} -- [latitude]
            lng {optional} -- [longtitude]
        """
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
        return Response(response_dir, status=status.HTTP_200_OK)


# get -> a user is searching
class Search(APIView):

    permission_classes = (AllowAny,)
    
    def get(self, request):
        """Related to customer search requests
        localhost:8000/stores/search?searchTerm=hi&lat=2.0&lng=1.0
        Arguments:
            request {[type]} -- [description]
        
        Returns:
            [type] -- [description]
        """
        response_dict = {}
        if "searchTerm" not in request.GET.keys() or
                "lat" not in request.GET.keys() or
                    "lng" not in request.GET.keys():
            return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
        
        search_term = request.GET["searchTerm"]
        cust_lat = request.GET["lat"]
        cust_lng = request.GET["lng"]
        # TODO find valid_stores first then search for name__contains
        valid_stores = mds.Store.objects.filter(items__name__contains=search_term)
        radius=3.0 #search within 3km
        pinpoint_list = utility.get_stores_within_radius(valid_stores, radius, cust_lat, cust_lng)
        response_dict["data"] = pinpoint_list
        return Response(response_dict, status=status.HTTP_200_OK)

class Inventory(APIView):

    permission_classes = (AllowAny,)
    
    def get(self, request):
        """Get inventory for specific store
        http://localhost:8000/stores/inventory?storeID=2
        Arguments:
            request {[type]} -- [description]
        """
        response_dict = {}
        if "storeID" not in request.GET.keys():
            return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
        # find all items that belong to this store
        store = get_object_or_404(mds.Store, id=request.GET["storeID"])
        response_dict["inventory"] = srs.ItemSerializer(store.items, many=True).data
        return Response(response_dict, status=status.HTTP_200_OK)

class StoreView(APIView):

    permission_classes = (AllowAny,)

    def get(self, request, storeID):
        """[summary]
        
        Arguments:
            request {[type]} -- [description]
        """
        response_dict = {}
        store = get_object_or_404(mds.Store, id=storeID)
        response_dict["inventory"] = srs.ItemSerializer(store.items, many=True).data
        response_dict["store_info"] = srs.StoreSerializer(store).data
        response_dict["timeslots"] = srs.TimeslotSerializer(store.timeslots, many=True).data
        return Response(response_dict, status=status.HTTP_200_OK)

class Timeslots(APIView):
    
    def get(self, request):
        """Timeslot data requests
        
        Arguments:
            request {[type]} -- [description]
        """
        response_dict = {}
        if "storeID" not in request.GET.keys():
            return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
        # find all timeslots of this store
        store = get_object_or_404(mds.Store, id=request.GET["storeID"])
        response_dict["timeslots"] = srs.TimeslotSerializer(store.timeslots, many=True).data
        return Response(response_dict, status=status.HTTP_200_OK)
