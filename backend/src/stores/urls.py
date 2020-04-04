from django.urls import path

from . import views as vs

urlpatterns = [
    path('pins', vs.MapPinpoints.as_view(),name='map-pinpoints'),
    path('search', vs.Search.as_view(), name='search'),
    path('inventory', vs.Inventory.as_view(), name='store-inventory'),
    path('timeslots', vs.Timeslots.as_view(), name='store-timeslots'),
    path('<int:pk>/', vs.StoreView.as_view(), name='store-view'),
]
