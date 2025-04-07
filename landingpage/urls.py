
from django.urls import path, include, re_path
from . import views



urlpatterns = [
    
    path('', views.landingpage, name='landingpage'),
    
    path('enviar-correo/', views.enviar_correo, name='enviar_correo'),

    path('terminosdeservicio/', views.terminosdeservicio, name='terminosdeservicio'),

    path('politicadeprivacidad/', views.politicadeprivacidad, name='politicadeprivacidad'),
  
    re_path(r'^i18n/', include('django.conf.urls.i18n')),
    
]