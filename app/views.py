from django.conf import settings
from django.shortcuts import render, render_to_response
from models import AutoModel

# Create your views here.
def index(request):
    return render_to_response('main.html')

def create_auto(request):

    return