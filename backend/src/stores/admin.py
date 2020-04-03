from django.contrib import admin

from .models import *

print("GAMW TI MANA SOU")

class StoreAdmin(admin.ModelAdmin):
    list_display = (
        'address',
        'store_type',
        'name',
        'email',
        'opening_from_hour',
        'opening_to_hour',
        'persons_per_slot',
        'time_slot_duration',
        'lat',
        'lng'
    )

class OpeningHoursAdmin(admin.ModelAdmin):
    pass

# Register your models here.
admin.site.register(Store, StoreAdmin)
admin.site.register(OpeningHours)
