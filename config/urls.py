from django.conf.urls import include, url
from django.contrib import admin

from config import views
from config.router import router

admin.autodiscover()

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r"^api/", include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^(?!(admin|api|api-auth)($|/))', views.index),
]
