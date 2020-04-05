from rest_framework import generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_list_or_404, get_object_or_404

import json

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
        if "searchTerm" not in request.GET.keys() or \
                "lat" not in request.GET.keys() or \
                    "lng" not in request.GET.keys():
            return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
        
        search_term = request.GET["searchTerm"]
        cust_lat = request.GET["lat"]
        cust_lng = request.GET["lng"]
        # TODO find valid_stores first then search for name__contains
        radius = 3.0
        valid_stores = []
        for store in mds.Store.objects.filter(items__name__icontains=search_term): # case insensitive
            if utility.euclidean_distance_in_km(cust_lat, cust_lng, store.lat, store.lng) < radius:
                for item in  mds.Item.objects.filter(store=store.id, name__icontains=search_term):
                    srs_dict = srs.StoreSerializer(store).data
                    srs_dict["item"] = srs.ItemSerializer(item).data
                    valid_stores.append(srs_dict)
        response_dict["stores"] = valid_stores
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

    permission_classes = (AllowAny,)
    
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

class Booking(APIView):

    permission_classes = (AllowAny,)

    def get(self, request):
        return Response({"here":"here"})

    def post(self, request, format='json'):
        """Create an item booking (based on item id)
        
        Arguments:
            request {
                "item": 3,
                "reserved_quantity": 2,
                "email": "customer@mail.ch",
                "store": 1,
                "start_time": "19:45:00",
                "end_time": "19:50:00"
            }
        """
        item = get_object_or_404(mds.Item, id=request.data["item"])
        
        timeslot_srs = srs.TimeslotSerializer(data=request.data)
        if not timeslot_srs.is_valid():
            return Response({"msg":"timeslot serializer failed"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        timeslot_srs.save()
        print(timeslot_srs.data)
        request.data["timeslot"] = timeslot_srs.data["id"]

        booking_srs = srs.BookingSerializer(data=request.data)
        if not booking_srs.is_valid():
            return Response({"msg":"booking serializer failed"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        booking_srs.save()
        return Response({}, status=status.HTTP_200_OK)


class StoreCreateView(generics.CreateAPIView):
    serializer_class = srs.StoreSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ItemCreateView(generics.CreateAPIView):
        serializer_class = srs.ItemSerializer

        def post(self, request, *args, **kwargs):
            return self.create(request, *args, **kwargs)


class ItemUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = srs.ItemSerializer
    # lookup_field = pk
    
    #update item
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
