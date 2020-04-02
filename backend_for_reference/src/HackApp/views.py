from rest_framework import status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.parsers import FileUploadParser
from rest_framework_jwt.views import ObtainJSONWebToken
import mimetypes

from . import serializers as srs
from . import models as mds

class UserLogin(ObtainJSONWebToken):

    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code in [400]:
            return Response({"success":False}, status=status.HTTP_200_OK)
        return response

class UserCreate(APIView):

    permission_classes = (AllowAny,)
          
    def get(self, request): #checks for validity of email and username
        if len(request.GET.keys())!=1:
            return Response({"success":True}, status=status.HTTP_200_OK)

        data={}
        for key in request.GET.keys():
            data.update({key:request.GET[key]})

        serializer = srs.CheckUserSerializer(data=data)
        if serializer.is_valid():
            return Response({"success":False}, status=status.HTTP_200_OK)
        return Response({"success":True}, status=status.HTTP_200_OK)


    def post(self, request, format='json'):#creates the user
        password1=request.data.pop('password1',None)

        errors={}
        if request.data["password"]!=password1:
            errors.update({'passwords':'Passwords do not match'}) 
        
        serializer = srs.UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
                    
            if not errors:
                user = serializer.save()

                if user:
                    response={'success':True}
                    datas={}
                    for sd in serializer.data:
                        datas.update({sd:serializer.data[sd]})
                    datas.pop('groups', None)
                    datas.pop('date_joined', None)
                    datas.pop('is_active', None)
                    datas.pop('is_staff', None)
                    datas.pop('is_superuser', None)
                    datas.pop('last_login', None)
                    datas.pop('user_permissions', None)

                    response.update({ "data":datas })

                    return Response(response, status=status.HTTP_201_CREATED)

        for key in serializer.errors.keys():
            errors.update({key:serializer.errors[key][0]})

        response={'success':False}
        response.update({"data":{"message":errors}})

        return Response(response, status=status.HTTP_200_OK)

class ReportCreate(APIView):
    parser_class = (FileUploadParser,)
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user_id=request.user.id
        request.data.update({"user":user_id})
        user=request.user.username
        request.data.update({"username":user})
        sig={"significance":float(request.data["significance"])}
        request.data.pop('significance', None)

        request.data.update(sig)
        serializer = srs.ReportSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class CommentCreate(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user_id=request.user.id
        request.data.update({"user":user_id})
       # user=request.user.username
       # request.data.update({"username":user})
        serializer = srs.CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


from django.core.files import File
import base64
def get_img(obj):
    f=open("C://Users//student//Desktop//stCatsHackathon//backend//src"+obj,'rb')
    image= File(f)
    data= base64.b64encode(image.read())
    f.close()
    return data 
            

class ReportList(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format=None):

        queryset = mds.Report.objects.all()
        serializer_class = srs.CompleteReport(queryset, many=True)
        serialized_data =  {'data': serializer_class.data}
        for d in serialized_data['data']:
            durl=d['img']
            d.pop('img',None)
            d.update({"img":get_img(durl)})
        return Response(serialized_data)
        

class ReportOwn(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

      serializer = srs.ReportSerializer(data=request.data)

      if serializer.is_valid():
          serializer.save()
          return Response(serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

class ReportRate(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        report = mds.Report.objects.get(id=request.data["id"])
        report.significance = ((report.significance*(report.voters+1))+int(request.data["vote"]))/(report.voters+2)  # change field
        report.save() 
        return Response({"success":True}, status=status.HTTP_200_OK)

class ReportState(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):

        report = mds.Report.objects.get(id=request.data["id"])
        report.state = request.data["state"]
        report.save() 
        return Response({"success":True}, status=status.HTTP_200_OK)

