def euclidean_distance_in_km(lat1, lon1, lat2, lon2):
        """
        lat1 = radians(52.2296756)
        lon1 = radians(21.0122287)
        lat2 = radians(52.406374)
        lon2 = radians(16.9251681)
        test: Should be: 278.546 km
        """
        from math import sin, cos, sqrt, atan2, radians
        lon1 = float(lon1)
        lon2 = float(lon2)
        lat1 = float(lat1)
        lat2 = float(lat2)
        R = 6373.0  # approximate radius of earth in km
        dlon = lon2 - lon1
        dlat = lat2 - lat1

        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = R * c
        return distance/1000

def get_stores_within_radius(stores, radius, ref_lat, ref_lng):
        pinpoint_list = []
        for store in stores:
            print('{0} is {1} away from the center'.format(store.address, str(euclidean_distance_in_km(ref_lat, ref_lng, store.lat, store.lng))))
            if euclidean_distance_in_km(ref_lat, ref_lng, store.lat, store.lng) < radius:
                pinpoint_list.append({  "lat": store.lat,
                                        "lng": store.lng,
                                        "store_name": store.name,
                                        "store_id": store.id})
        
        return pinpoint_list