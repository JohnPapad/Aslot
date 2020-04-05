from django.urls import path

from . import views as vs

urlpatterns = [
    path('pins', vs.MapPinpoints.as_view(),name='map-pinpoints'),
    path('search', vs.Search.as_view(), name='search'),
    path('inventory', vs.Inventory.as_view(), name='store-inventory'),
    path('timeslots', vs.Timeslots.as_view(), name='store-timeslots'),
    path('<int:storeID>/', vs.StoreView.as_view(), name='store-view'),
    path('create-booking/', vs.Booking.as_view(), name='create-booking'),
    path('create_store', vs.StoreCreateView.as_view(), name='create-store'),
    path('create_item', vs.ItemCreateView.as_view(), name='create-item'),
    path('update_item', vs.ItemUpdateView.as_view(), name='update-item'),
]
