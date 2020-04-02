from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings

class User(AbstractUser): #User model (used to handle users)
    CITIZEN="citizen"
    AUTHORITY="authority"
    TYPE_CHOICES = [
        (CITIZEN, "citizen"),
        (AUTHORITY, "authority"),
    ]

    userType = models.CharField(max_length=20, choices=TYPE_CHOICES,blank=True,null=True)

    municipality = models.CharField(max_length=100, blank=True,null=True)
    address = models.CharField(max_length=50, blank=True,null=True)
    lng = models.DecimalField(max_digits=20, decimal_places=10,blank=True,null=True)
    lat = models.DecimalField(max_digits=20, decimal_places=10,blank=True,null=True)

    birthDate = models.DateField(blank=True,null=True)

    credibility = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(10.0)],default=5
    )

    img = models.ImageField(blank=True,null=True,upload_to='profile/')



#def user_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
#    return 'user_{0}/{1}'.format(instance.user.id, filename)

class Report(models.Model): #report model(used to identify problems)

    RESOLVED="resolved"
    UNRESOLVED="unresolved"
    INPROGRESS = "inprogress"
    PENDING = "pending"
    STATE_CHOICES = [
        (RESOLVED, "resolved"),
        (UNRESOLVED, "unresolved"),
        (INPROGRESS, "inprogress"),
        (PENDING, "pending"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True)
    username = models.CharField(max_length=100, blank=True,null=True)
    
    img = models.ImageField(blank=False, null=False,upload_to='report/')

    municipality = models.CharField(max_length=100, blank=True,null=True)
    address = models.CharField(max_length=50, blank=True,null=True)
    lng = models.DecimalField(max_digits=20, decimal_places=10,blank=True,null=True)
    lat = models.DecimalField(max_digits=20, decimal_places=10,blank=True,null=True)

    

    significance = models.FloatField(
        validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],default=1.0
    )

    state = models.CharField(max_length=20, choices=STATE_CHOICES,blank=True,null=True,default=PENDING)

    description = models.TextField(max_length=500,blank=True,null=True)

    date = models.DateTimeField(auto_now_add=True, blank=False)

    voters = models.IntegerField(default=0)


class History(models.Model): #history model

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    report = models.ForeignKey(Report,related_name='history', on_delete=models.CASCADE)

    text = models.TextField(max_length=500,blank=False,null=False)
    
    date = models.DateTimeField(auto_now_add=True, blank=False)


class Comment(models.Model): #comment model

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE,null=True)
    report = models.ForeignKey(Report,related_name='comment', on_delete=models.CASCADE,null=True)

    text = models.TextField(max_length=500,blank=False,null=True)
    
    date = models.DateTimeField(auto_now_add=True, blank=False)