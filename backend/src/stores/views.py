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
            lat = request.data["lat"]
            lng = request.data["lng"]
        else:
            # default center near omonia athens
            lat = "38.075331037"
            lng = "23.794199477"
        
        # get list of pinpoints within radius in km
        radius = 1.0
        pinpoint_list = []
        all_stores = mds.Store.objects.all()
        for store in all_stores:
            print('{0} is {1} away from the center'.format(store.address, str(utility.euclidean_distance_in_km(lat, lng, store.lat, store.lng))))
            if utility.euclidean_distance_in_km(lat, lng, store.lat, store.lng) < radius:
                pinpoint_list.append({  "lat": store.lat,
                                        "lng": store.lng,
                                        "store_name": store.name,
                                        "store_id": store.id})

        response_dir = {"center": {"lng":lng,"lat":lat}, "pins": pinpoint_list}
        return Response(response_dir)


# get -> a user is searching for a query
class Search(APIView):
    permission_classes = (AllowAny,)
    
    def get(self, request):
        response_dict = {"success":False}
        if "searchTerm" not in request.GET.keys():
            return Response(response_dict, status=status.HTTP_400_BAD_REQUEST)
        
        search_term = request.data["search_term"]
        valid_stores = mds.Store.objects.filter(item_name_contains=search_term)
        #sort object by distance here
        serializer = srs.StoreSerializer(valid_stores, many=True)
        response_dict["data"] = serializer.data
        response_dict["success"] = True
        return Response(response_dict, status=status.HTTP_200_OK)
