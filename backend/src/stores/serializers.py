
from rest_framework import serializers

from .models import *

from django.utils import timezone
from datetime import datetime
        

class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
        
    class Meta:
        model = Item
        fields = '__all__'


class TimeslotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timeslot
        fields = '__all__'
    
    def create(self, validated_data):
        timeslot = Timeslot.objects.create(
            store = validated_data["store"],
            start_time = validated_data["start_time"],
            end_time = validated_data["end_time"]
        )
        timeslot.save()
        return timeslot

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
    
    def create(self, validated_data):
        print("-----in booking serializer-----------")
        print(validated_data)

        booking = Booking.objects.create(
            item = validated_data["item"],
            timeslot = validated_data["timeslot"],
            reserved_quantity = validated_data["reserved_quantity"],
            email = validated_data["email"],
            confirmed = False
        )
        # TODO: update item total_reserved
        booking.save()
        return booking