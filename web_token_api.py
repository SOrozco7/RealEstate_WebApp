import endpoints
from google.appengine.ext import ndb
from google.appengine.api import app_identity
from protorpc import remote

import jwt
import time

from CustomExceptions import NotFoundException

from messages import EmailPasswordMessage, TokenMessage, CodeMessage, Token, TokenKey, MessageNone
from messages import EmpresaInput, EmpresaUpdate, EmpresaList
from messages import UserInput, UserUpdate, UserList
from messages import PropertyInput, PropertyUpdate, PropertyList

from endpoints_proto_datastore.ndb import EndpointsModel

import models
from models import validarEmail
from models import Empresa, Usuarios, Property

###############
# Usuarios API
###############
@endpoints.api(name='usuarios_api', version='v1', description='usuarios endpoints')
class UsuariosApi(remote.Service):
###############get the info of one########
 @endpoints.method(TokenKey, UserList, path='user/get', http_method='POST', name='user.get')
 def user_get(cls, request):
  try:                 
    token = jwt.decode(request.token, 'secret')  #checa token
    userentity = ndb.Key(urlsafe=request.entityKey)
    user = Usuarios.get_by_id(userentity.id()) #obtiene usuario
              #user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
    lista = []  #crea lista
    lstMessage = UserList(code=1) # crea objeto mensaje
    lista.append(UserUpdate(token='', 
                            entityKey= user.entityKey,
                            #empresa_key = user.empresa_key.urlsafe(),
                            name = user.name,
                            email = user.email))
    lstMessage.data = lista#ASIGNA a la salida la lista
    message = lstMessage
  except jwt.DecodeError:
    message = UserList(code=-1, data=[]) #token invalido
  except jwt.ExpiredSignatureError:
    message = UserList(code=-2, data=[]) #token expiro
  return message

 @endpoints.method(Token, UserList, path='user/getCurrentUser', http_method='POST', name='user.getCurrentUser')
 def user_getCurrentUser(cls, request):
    try:  
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
      
      lista = []  #crea lista
      lstMessage = UserList(code=1) # crea objeto mensaje
      lista.append(UserUpdate(token='', 
                              entityKey= user.entityKey,
                              #empresa_key = user.empresa_key.urlsafe(),
                              name = user.name,
                              email = user.email))

      lstMessage.data = lista#ASIGNA a la salida la lista
      message = lstMessage
    except jwt.DecodeError:
      message = UserList(code=-1, data=[]) #token invalido
    except jwt.ExpiredSignatureError:
      message = UserList(code=-2, data=[]) #token expiro
    return message

########################## list###################
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(Token, UserList, path='user/list', http_method='POST', name='user.list')
 def user_list(cls, request):
    try:
      token = jwt.decode(request.token, 'secret')  #checa token
      user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
      lista = []  #crea lista
      lstMessage = UserList(code=1) # crea objeto mensaje
      lstBd = Usuarios.query().fetch() # recupera de base de datos
      
      for i in lstBd: # recorre
        lista.append(UserUpdate(token='',
                                entityKey=i.entityKey,
                                #empresa_key=user.empresa_key.urlsafe(),
                                email=i.email,
                                name = i.name)) # agrega a la lista
      
      lstMessage.data = lista # la manda al messa
      message = lstMessage #regresa
      
    except jwt.DecodeError:
      message = UserList(code=-1, data=[]) #token invalido
    except jwt.ExpiredSignatureError:
      message = UserList(code=-2, data=[]) #token expiro
    
    return message

 @endpoints.method(TokenKey, CodeMessage, path='user/delete', http_method='POST', name='user.delete')
 def user_remove(cls, request):
    try:
      
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      usersentity = ndb.Key(urlsafe=request.entityKey)#Obtiene el elemento dado el EntitKey
      usersentity.delete()#BORRA
      message = CodeMessage(code=1, message='Succesfully deleted')
    
    except jwt.DecodeError:
      message = CodeMessage(code=-2, message='Invalid token')
    
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code=-1, message='Token expired')
    
    return message

# insert
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(UserInput, CodeMessage, path='user/insert', http_method='POST', name='user.insert')
 def user_add(cls, request):
    try:
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      user = Usuarios.get_by_id(token['user_id'])
    
      if validarEmail(request.email) == False: #checa si el email esta registrado
                       #empresakey = ndb.Key(urlsafe=request.empresa_key) #convierte el string dado a entityKey
        if user.usuario_m(request, user.empresa_key) == 0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
          codigo = 1
        
        else:
          codigo = -3
                         #la funcion josue_m puede actualizar e insertar
                         #depende de la ENTRADA de este endpoint method
        message = CodeMessage(code = codigo, message = 'Succesfully added')
    
      else:
        message = CodeMessage(code = -4, message = 'El email ya ha sido registrado')
    
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

##login##

 @endpoints.method(EmailPasswordMessage, TokenMessage, path='user/login', http_method='POST', name='user.login')
 def user_login(cls, request):
  try:
   user = Usuarios.query(Usuarios.email == request.email).fetch() #obtiene el usuario dado el email
   if not user or len(user) == 0: #si no encuentra user saca
    raise NotFoundException()
   user = user[0] 
   keye = user.empresa_key.urlsafe() # regresa como mensaje el empresa key
   if not user.verify_password(request.password): # checa la contrasena
    raise NotFoundException()

   token = jwt.encode({'user_id': user.key.id(), 'exp': time.time() + 43200}, 'secret') #crea el token
   message = TokenMessage(token=token, message=keye, code=1) # regresa token
  except NotFoundException:
   message = TokenMessage(token=None, message='Wrong username or password', code=-1)
  return message

##login##

 @endpoints.method(Token, TokenMessage, path='user/logout', http_method='POST', name='user.logout')
 def user_logout(cls, request):
  try:

   token = jwt.encode({'user_id': None, 'exp': time.time() + 43200}, 'secret') #crea el token
   message = TokenMessage(token=None, message=None, code=1) # regresa token
  except NotFoundException:
   message = TokenMessage(token=None, message='Wrong username or password', code=-1)
  return message

##update##
# update
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(UserUpdate, CodeMessage, path='user/update', http_method='POST', name='user.update')
#siempre lleva cls y request
 def user_update(cls, request):
  try:
   token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
   user = Usuarios.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de USUARIOS
   empresakey = ndb.Key(urlsafe=user.empresa_key.urlsafe())#convierte el string dado a entityKey
   if user.usuario_m(request, empresakey)==0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
    codigo = 1
   else:
    codigo = -3
      #la funcion josue_m puede actualizar e insertar
      #depende de la ENTRADA de este endpoint method
   message = CodeMessage(code=1, message='Sus cambios han sido guardados exitosamente')
  except jwt.DecodeError:
   message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
   message = CodeMessage(code=-1, message='Token expired')
  return message

###########################
#### Empresa API
###########################

## Google Cloud Endpoint
@endpoints.api(name='empresas_api', version='v1', description='empresas REST API')
class EmpresasApi(remote.Service):

# get one
 @endpoints.method(TokenKey, EmpresaList, path='empresa/get', http_method='POST', name='empresa.get')
#siempre lleva cls y request
 def empresa_get(cls, request):
  try:
    token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      #Obtiene el elemento dado el entityKey
    empresaentity = ndb.Key(urlsafe=request.entityKey)
      #CREA LA SALIDA de tipo JosueInput y le asigna los valores, es a como se declaro en el messages.py
      #empresaentity.get().empresa_key.urlsafe() para poder optener el EntityKey
     ##### ejemplo real
    ####### message = EmpresaList(code=1, data=[EmpresaUpdate(token='Succesfully get', nombre_empresa=empresaentity.get().nombre_empresa, empresa_key=empresaentity.get().empresa_key.urlsafe(), entityKey=empresaentity.get().entityKey)])
    message = EmpresaList(code=1, data = [EmpresaUpdate(token='Succesfully get',
    entityKey = empresaentity.get().entityKey,
    codigo_empresa=empresaentity.get().codigo_empresa, 
    nombre_empresa = empresaentity.get().nombre_empresa)])

  except jwt.DecodeError:
    message = EmpresaList(code=-1, data=[])
  except jwt.ExpiredSignatureError:
    message = EmpresaList(code=-2, data=[])
  return message

 @endpoints.method(TokenKey, CodeMessage, path='empresa/delete', http_method='POST', name='empresa.delete')
#siempre lleva cls y request
 def empresa_remove(cls, request):
  try:
    token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
    empresaentity = ndb.Key(urlsafe=request.entityKey)#Obtiene el elemento dado el EntitKey
    empresaentity.delete()#BORRA
    message = CodeMessage(code=1, message='Succesfully deleted')
  except jwt.DecodeError:
    message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
    message = CodeMessage(code=-1, message='Token expired')
  return message

  # insert
  @endpoints.method(EmpresaInput, CodeMessage, path='empresa/insert', http_method='POST', name='empresa.insert')
  #siempre lleva cls y request
  def empresa_add(cls, request):
    try:
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      user = Usuarios.get_by_id(token['user_id'])#obtiene el usuario models.py 
      myempresa = Empresa()
    
      if myempresa.empresa_m(request) == 0: 
        codigo = 1
        
      else:
        codigo = -3
          #la funcion josue_m puede actualizar e insertar
          #depende de la ENTRADA de este endpoint method
      message = CodeMessage(code=codigo, message='Succesfully added')
    
    except jwt.DecodeError:
      message = CodeMessage(code=-2, message='Invalid token')
    
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code=-1, message='Token expired')
    
    return message

# update
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(EmpresaUpdate, CodeMessage, path='empresa/update', http_method='POST', name='empresa.update')
#siempre lleva cls y request
 def empresa_update(cls, request):
  try:
    token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN 
    user = Usuarios.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de USUARIOS
      #empresakey = ndb.Key(urlsafe=request.empresa_key)#convierte el string dado a entityKey
    myempresa = Empresa()
    if myempresa.empresa_m(request) == 0:#llama a la funcion declarada en models.py en la seccion de USUARIOS
      codigo = 1
    else:
      codigo = -3
      #la funcion josue_m puede actualizar e insertar
      #depende de la ENTRADA de este endpoint method
    message = CodeMessage(code=1, message='Sus cambios han sido guardados exitosamente')
  except jwt.DecodeError:
    message = CodeMessage(code=-2, message='Invalid token')
  except jwt.ExpiredSignatureError:
    message = CodeMessage(code=-1, message='Token expired')
  return message

# list
#                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
 @endpoints.method(Token, EmpresaList, path='empresa/list', http_method='POST', name='empresa.list')
#siempre lleva cls y request
 def empresa_list(cls, request):
  try:
    token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
    user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token
    #if user.importante==1 or user.importante==2:
    lista = [] #crea lista para guardar contenido de la BD
    lstMessage = EmpresaList(code=1) #CREA el mensaje de salida
    lstBdEmpresa = Empresa.query().fetch() #obtiene de la base de datos
    for i in lstBdEmpresa: #recorre la base de datos
             #inserta a la lista creada con los elementos que se necesiten de la base de datos
             #i.empresa_key.urlsafe() obtiene el entityKey
	     #lista.append(ClientesUpdate(token='', nombre=i.nombre, status=i.status, empresa_key=i.empresa_key.urlsafe(), entityKey=i.entityKey))
      lista.append(EmpresaUpdate(token = '', 
                                 entityKey = i.entityKey,
                                 codigo_empresa = i.codigo_empresa, 
                                 nombre_empresa = i.nombre_empresa))
      
    lstMessage.data = lista #ASIGNA a la salida la lista
    message = lstMessage
      #else:
      #    message = EmpresaList(code=-3, data=[])
  except jwt.DecodeError:
    message = EmpresaList(code=-1, data=[])
  except jwt.ExpiredSignatureError:
    message = EmpresaList(code=-2, data=[])
  return message

###########################
#### Property API
###########################

## Google Cloud Endpoint
@endpoints.api(name='property_api', version='v1', description='property REST API')
class PropertyApi(remote.Service):

  #get one property
  @endpoints.method(TokenKey, PropertyList, path='property/get', http_method='POST', name='property.get')
  #siempre lleva cls y request
  def property_get(cls, request):
    try:
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      #Obtiene el elemento dado el entityKey
      propertyEntity = ndb.Key(urlsafe = request.entityKey)
      myProperty = Property.get_by_id(propertyEntity.id())

      myList = []
      listMessage = PropertyList(code=1)
      myList.append(PropertyUpdate(token = '',
                                   entityKey = propertyEntity.get().entityKey,
                                   title = propertyEntity.get().title,
                                   status = propertyEntity.get().status,
                                   price = propertyEntity.get().price,
                                   address = propertyEntity.get().address,
                                   city = propertyEntity.get().city,
                                   state = propertyEntity.get().state,
                                   zipcode = propertyEntity.get().zipcode,
                                   rooms = propertyEntity.get().rooms,
                                   bathrooms = propertyEntity.get().bathrooms,
                                   propertyType = propertyEntity.get().propertyType,
                                   yearBuilt = propertyEntity.get().yearBuilt,
                                   area = propertyEntity.get().area,
                                   photourl = propertyEntity.get().photourl,
                                   description = propertyEntity.get().description,
                                   latitude = propertyEntity.get().latitude,
                                   longitude = propertyEntity.get().longitude))

      listMessage.data = myList
      message = listMessage
    
    except jwt.DecodeError:
      message = PropertyList(code = -1, data = [])
    
    except jwt.ExpiredSignatureError:
      message = PropertyList(code = -2, data = [])
    
    return message

  #Remove a property
  @endpoints.method(TokenKey, CodeMessage, path='property/delete', http_method='POST', name='property.delete')
  def property_remove(cls, request):
    try:
      
      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      propertyEntity = ndb.Key(urlsafe = request.entityKey)#Obtiene el elemento dado el EntityKey
      propertyEntity.delete()
      message = CodeMessage(code = 1, message = 'Succesfully deleted')
    
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

  # Insert a property
  @endpoints.method(PropertyInput, CodeMessage, path = 'property/insert', http_method='POST', name='property.insert') 
  #siempre lleva cls y request
  def property_add(cls, request):
    try:

      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      user = Usuarios.get_by_id(token['user_id'])#obtiene el usuario models.py 
      
      myProperty = Property()
      
      if myProperty.property_m(request, user.key) == 0: 
        codigo = 1
      
      else:
        codigo = -3
      
      message = CodeMessage(code = codigo, message = 'Succesfully added')

    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

  # Update a property
  #                   ENTRADA    SALIDA        RUTA              siempre es POST     NOMBRE
  @endpoints.method(PropertyUpdate, CodeMessage, path = 'property/update', http_method = 'POST', name = 'property.update')
  #siempre lleva cls y request
  def property_update(cls, request):
    try:

      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN 
      user = Usuarios.get_by_id(token['user_id'])#obtiene el usuario para poder acceder a los metodos declarados en models.py en la seccion de USUARIOS
      myProperty = Property()
      userKey = user.key

      if myProperty.property_m(request, userKey) == 0:
        codigo = 1
      else:
        codigo = -3
      
      message = CodeMessage(code = 1, message = 'Sus cambios han sido guardados exitosamente')
    
    except jwt.DecodeError:
      message = CodeMessage(code = -2, message = 'Invalid token')
    
    except jwt.ExpiredSignatureError:
      message = CodeMessage(code = -1, message = 'Token expired')
    
    return message

  # List properties 
  @endpoints.method(Token, PropertyList, path='property/list', http_method = 'POST', name = 'property.list')
  def property_list(cls, request):
    try:

      token = jwt.decode(request.token, 'secret')#CHECA EL TOKEN
      lista = [] #crea lista para guardar contenido de la BD
      lstMessage = PropertyList(code = 1) #CREA el mensaje de salida
      user = Usuarios.get_by_id(token['user_id']) #obtiene usuario dado el token

      if user is not None:
        userKey = user.key
        lstBdProperty = Property.query(Property.usuario_key == userKey).fetch() #obtiene de la base de datos
        for i in lstBdProperty: #recorre la base de datos
          lista.append(PropertyUpdate(token = '', 
                                      entityKey = i.entityKey,
                                      title = i.title,
                                      status = i.status,
                                      price = i.price,
                                      address = i.address,
                                      city = i.city,
                                      state = i.state,
                                      zipcode = i.zipcode,
                                      rooms = i.rooms,
                                      bathrooms = i.bathrooms,
                                      propertyType = i.propertyType,
                                      yearBuilt = i.yearBuilt,
                                      area = i.area,
                                      photourl = i.photourl,
                                      description = i.description,
                                      latitude = i.latitude,
                                      longitude = i.longitude))
        
      lstMessage.data = lista #ASIGNA a la salida la lista
      message = lstMessage
    
    except jwt.DecodeError:
      message = PropertyList(code = -1, data = [])
    
    except jwt.ExpiredSignatureError:
      message = PropertyList(code = -2, data = [])
    
    return message

application = endpoints.api_server([UsuariosApi, EmpresasApi, PropertyApi], restricted=False)