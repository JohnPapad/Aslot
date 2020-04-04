from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

#from . import serializers as srs
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
            # print('{0} is {1}m away from the center'.format(store.address, str(utility.euclidean_distance_in_km(lat, lng, store.lat, store.lng))))
            if utility.euclidean_distance_in_km(lat, lng, store.lat, store.lng) < radius:
                pinpoint_list.append({  "lat": store.lat,
                                        "lng": store.lng,
                                        "store_name": store.name,
                                        "store_id": store.id})

        response_dir = {"center": {"lng":lng,"lat":lat}, "pins": pinpoint_list}
        return Response(response_dir)

class Inventory(APIView):

    permission_classes = (AllowAny,)
    
    def get(self, request):
        
        