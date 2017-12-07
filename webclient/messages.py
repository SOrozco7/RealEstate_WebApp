from protorpc import messages
from protorpc import message_types

class MessageNone(messages.Message):
    inti = messages.StringField(1)
# Input messages
#Recibe el token para validar
class Token(messages.Message):
    token = messages.StringField(1, required=True)

#Recibe el token y un entityKey de cualquier base de datos para validar
class TokenKey(messages.Message):
    token = messages.StringField(1, required=True)
    entityKey = messages.StringField(2, required=True)
    #fromurl = messages.StringField(3)

#Recibe el email y contrasena para la creacion de token
class EmailPasswordMessage(messages.Message):
    email = messages.StringField(1, required=True)
    password = messages.StringField(2, required=True)

# Output messages
#regresa un token
class TokenMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)
    token = messages.StringField(3)

#regresa mensajes de lo ocurrido
class CodeMessage(messages.Message):
    code = messages.IntegerField(1)
    message = messages.StringField(2)

###########################
#### User
###########################
class UserInput(messages.Message):
    token = messages.StringField(1) 
    empresa_key = messages.StringField(2)
    email = messages.StringField(3)
    password = messages.StringField(4)
    name = messages.StringField(5)

class UserUpdate(messages.Message):
    token = messages.StringField(1)
    email = messages.StringField(2)
    password = messages.StringField(3)
    name = messages.StringField(4)
    entityKey = messages.StringField(5, required=True)

class UserList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(UserUpdate, 2, repeated=True)

###########################
#### Empresa
###########################
#Mensaje de Entrada y Salida para la base de datos Empresa
class EmpresaInput(messages.Message):
    token = messages.StringField(1, required=True) 
    codigo_empresa = messages.StringField(2)
    nombre_empresa = messages.StringField(3)
    photourl = messages.StringField(4)

class EmpresaUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    entityKey = messages.StringField(2, required=True)
    codigo_empresa = messages.StringField(3)
    nombre_empresa = messages.StringField(4)
    photourl = messages.StringField(5)

#regresa una lista para la base de datos Empresa
class EmpresaList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(EmpresaUpdate, 2, repeated=True)

###########################
#### Property
###########################
class PropertyInput(messages.Message):
    token = messages.StringField(1, required = True) 
    title = messages.StringField(2)
    status = messages.StringField(3)
    price = messages.FloatField(4)
    address = messages.StringField(5)
    city = messages.StringField(6)
    state = messages.StringField(7)
    country = messages.StringField(8)
    zipcode = messages.IntegerField(9)
    rooms = messages.IntegerField(10)
    bathrooms = messages.IntegerField(11)
    propertyType = messages.StringField(12)
    yearBuilt = messages.IntegerField(13)
    area = messages.FloatField(14)
    photourl = messages.StringField(15)
    description = messages.StringField(16)
    latitude = messages.FloatField(17)
    longitude = messages.FloatField(18)

class PropertyUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    entityKey = messages.StringField(2, required=True)
    title = messages.StringField(3)
    status = messages.StringField(4)
    price = messages.FloatField(5)
    address = messages.StringField(6)
    city = messages.StringField(7)
    state = messages.StringField(8)
    country = messages.StringField(9)
    zipcode = messages.IntegerField(10)
    rooms = messages.IntegerField(11)
    bathrooms = messages.IntegerField(12)
    propertyType = messages.StringField(13)
    yearBuilt = messages.IntegerField(14)
    area = messages.FloatField(15)
    photourl = messages.StringField(16)
    description = messages.StringField(17)
    latitude = messages.FloatField(18)
    longitude = messages.FloatField(19)

#regresa una lista para la base de datos Property
class PropertyList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(PropertyUpdate, 2, repeated=True)

###########################
#### Message
###########################
class MessageInput(messages.Message):

    propertyKey = messages.StringField(1, required=True)
    email = messages.StringField(2)
    phone = messages.StringField(3)
    text = messages.StringField(4)