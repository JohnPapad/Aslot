from django.urls import path

from . import views as vs

urlpatterns = [
    path('pins', vs.MapPinpoints.as_view(),name='map-pinpoints'),
    path('search', vs.Search.as_view(), name='search')
]
