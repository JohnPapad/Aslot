
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_jwt.settings import api_settings

from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

from .models import User, Report, History, Comment

class UserSerializerWithToken(serializers.ModelSerializer):

    CITIZEN="citizen"
    AUTHORITY="authority"
    TYPE_CHOICES = [
        (CITIZEN, "citizen"),
        (AUTHORITY, "authority"),
    ]

    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    username = serializers.CharField(
            required=True,max_length=32,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )
    
    password = serializers.CharField(required=True,min_length=8,write_only=True)
    
    first_name =serializers.CharField(required=True,min_length=2)
    last_name =serializers.CharField(required=True,min_length=2)

    userType = serializers.ChoiceField(choices=TYPE_CHOICES,required=True)
    
    municipality = serializers.CharField(max_length=100,required=False)
    address = serializers.CharField(required=False)
    lng = serializers.DecimalField(max_digits=20, decimal_places=10,required=False)
    lat = serializers.DecimalField(max_digits=20, decimal_places=10,required=False)

    birthDate = serializers.DateField(required=False)

    img =serializers.ImageField(required=False)

    token = serializers.SerializerMethodField()
    
    def get_token(self, object):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(object)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        print(validated_data)
        if validated_data['userType']=="citizen":
            user = User.objects.create_user(
                username = validated_data['username'],
                first_name = validated_data['first_name'],
                last_name = validated_data['last_name'],
                password = validated_data['password'],
                email = validated_data['email'],
                userType = validated_data['userType'],
                municipality = validated_data['municipality'],
                address = validated_data['address'],
                lng = validated_data['lng'],
                lat = validated_data['lat'],
                birthDate = validated_data['birthDate'],
            )
        else:
            user = User.objects.create_user(
                username = validated_data['username'],
                first_name = validated_data['first_name'],
                last_name = validated_data['last_name'],
                password = validated_data['password'],
                email = validated_data['email'],
                userType = validated_data['userType'],
            )
        user.save()
        return user

    class Meta:
        model = User
        fields = "__all__"

class CheckUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=False,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    username = serializers.CharField(
            max_length=32,required=False,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    class Meta:
        model = User
        fields = ('username', 'email',)

class GetUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"

class ReportSerializer(serializers.ModelSerializer):

    img =serializers.ImageField(required=True)

    municipality = serializers.CharField(max_length=100,required=True)
    address = serializers.CharField(required=True)
    lng = serializers.DecimalField(max_digits=20, decimal_places=10,required=True)
    lat = serializers.DecimalField(max_digits=20, decimal_places=10,required=True)
    
    significance = serializers.FloatField(
            validators=[MinValueValidator(0.0), MaxValueValidator(5.0)],required=True
        )
    description = serializers.CharField(max_length=500,required=True)

    def create(self, validated_data):
        report = Report.objects.create(
            user = validated_data['user'],
            username = validated_data['username'],
            img = validated_data['img'],
            municipality = validated_data['municipality'],
            address = validated_data['address'],
            lng = validated_data['lng'],
            lat = validated_data['lat'],
            description = validated_data['description'],
        )
        report.save()
        return report
    
    class Meta:
        model = Report
        fields = "__all__"

class ReportListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Report
        fields = "__all__"



class ReportRetrievetSerializer(serializers.ModelSerializer):

    user = serializers.RelatedField(many=True,read_only='True')

    class Meta:
        model = Report
        fields = "__all__"


class HistorySerializer(serializers.ModelSerializer):

    text = serializers.CharField(max_length=500,required=True)

    def create(self, validated_data):
        history = History.objects.create(
            text = validated_data['text'],
        )
        history.save()
        return history

    class Meta:
        model = History
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):

    text = serializers.CharField(max_length=500,required=True)

    def create(self, validated_data):
        comment = Comment.objects.create(
            text = validated_data['text'],
            user = validated_data['user'],
            report = validated_data['report'],
        )
        comment.save()
        return comment

    class Meta:
        model = Comment
        fields = "__all__"

class CompleteReport(serializers.ModelSerializer):

    comment = CommentSerializer(many=True, read_only=True)
    history  = HistorySerializer(many=True, read_only=True)

    class Meta:
        model = Report
        fields = "__all__"
