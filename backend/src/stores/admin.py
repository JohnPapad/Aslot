from django.contrib import admin

from .models import *

class ItemAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

# Register your models here.
admin.site.register(Store)
admin.site.register(Item)
admin.site.register(Timeslot)
admin.site.register(Booking)
