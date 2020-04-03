from django.db import models
from django.contrib.auth.models import AbstractBaseUser


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
    
    USERNAME_FIELD = 'email'


WEEKDAYS = [
  (1, _("Monday")),
  (2, _("Tuesday")),
  (3, _("Wednesday")),
  (4, _("Thursday")),
  (5, _("Friday")),
  (6, _("Saturday")),
  (7, _("Sunday")),
]

class OpeningHours(models.Model):

    # store = models.ForeignKey(Store, on_delete=models.CASCADE)
    weekday = models.IntegerField(choices=WEEKDAYS)
    from_hour = models.TimeField()
    to_hour = models.TimeField()

    class Meta:
        ordering = ('weekday', 'from_hour')
        unique_together = ('weekday', 'from_hour', 'to_hour')

    def __unicode__(self):
        return u'%s: %s - %s' % (self.get_weekday_display(),
                                 self.from_hour, self.to_hour)

class Item(models.Model):
    name = models.CharField(max_length=40)
    quantity = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True, auto_now_add=True)


