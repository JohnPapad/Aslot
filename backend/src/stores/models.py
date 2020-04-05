from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone


# Create your models here.

class Store(AbstractBaseUser):
    address = models.CharField(max_length=60)
    store_type = models.CharField(max_length=30)
    name = models.CharField(max_length=40)
    email = models.EmailField(max_length=100, unique=True)
    opening_from_hour = models.TimeField()
    opening_to_hour = models.TimeField()
    persons_per_slot = models.SmallIntegerField()
    time_slot_duration = models.SmallIntegerField()
    lat = models.CharField(max_length=20)
    lng = models.CharField(max_length=20)
    telephone = models.CharField(max_length=10)
    
    
    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.name


class Item(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='items', default=1)
    name = models.CharField(max_length=40)
    quantity = models.IntegerField()
    max_to_buy = models.SmallIntegerField(default=1)
    last_updated = models.DateTimeField(auto_now=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    total_reserved = models.IntegerField(default=0) # total num of reserved for this item

    def __str__(self):
        return self.name

class Timeslot(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE, related_name='timeslots')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

class Booking(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE, related_name='bookings') # TODO make this many to many
    timeslot = models.ForeignKey(Timeslot, on_delete=models.CASCADE, related_name='bookings')
    reserved_quantity = models.IntegerField()
    email = models.CharField(max_length=60)
    confirmed = models.BooleanField(default=False)
