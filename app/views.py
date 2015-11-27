from django.http import HttpResponse
from django.shortcuts import render, render_to_response
from .models import AutoModel
from django.views.generic import View
import json

# Create your views here.
def index(request):
    return render_to_response('main.html')

class EditAuto(View):

    def post(self, request):
        data = json.loads((request.body).decode('utf-8'))
        auto_id = data['id']
        auto_name = data['name']
        if auto_id == 'create' and len(AutoModel.objects.filter(name=auto_name)) == 0:
            instance = AutoModel(name=auto_name, author=request.user)
        elif auto_id != 'create' and len(AutoModel.objects.filter(name=auto_name, id=auto_id)) <= 1:
            instance = AutoModel.objects.get(id=auto_id)
            instance.name = auto_name
        else:
            return HttpResponse('0')
        instance.save()
        return HttpResponse()

    def delete(self, request):
        auto_id = request.GET['id']
        instance = AutoModel.objects.get(pk=auto_id)
        instance.delete()
        return HttpResponse()