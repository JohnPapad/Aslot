from django.contrib import admin

from .models import *

# Register your models here.
admin.site.register(Store)
admin.site.register(OpeningHours)
admin.site.register(Item)
admin.site.register(Timeslot)
