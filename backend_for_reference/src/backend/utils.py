from HackApp.serializers import GetUserSerializer


def my_jwt_response_handler(token, user=None, request=None):
    info=GetUserSerializer(user, context={'request': request})
    datas={}
    for sd in info.data:
        datas.update({sd:info.data[sd]})
    datas.pop('password', None)
    datas.pop('groups', None)
    datas.pop('date_joined', None)
    datas.pop('is_active', None)
    datas.pop('is_staff', None)
    datas.pop('is_superuser', None)
    datas.pop('last_login', None)
    datas.pop('user_permissions', None)

    datas.update({'token':token})

    return {
        "success" : True,
        "data": datas
        
    }