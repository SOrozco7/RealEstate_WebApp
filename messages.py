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

class EmpresaUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    entityKey = messages.StringField(2, required=True)
    codigo_empresa = messages.StringField(3)
    nombre_empresa = messages.StringField(4)

#regresa una lista para la base de datos Empresa
class EmpresaList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(EmpresaUpdate, 2, repeated=True)

###########################
#### Property
###########################
class PropertyInput(messages.Message):
    token = messages.StringField(1, required=True) 
    title = messages.StringField(2)
    status = messages.StringField(3)
    price = messages.StringField(4)
    address = messages.StringField(5)
    city = messages.StringField(6)
    state = messages.StringField(7)
    zipcode = messages.StringField(8)
    rooms = messages.StringField(9)
    bathrooms = messages.StringField(10)
    propertyType = messages.StringField(11)
    yearBuilt = messages.StringField(12)
    area = messages.StringField(13)
    photourl = messages.StringField(14)
    description = messages.StringField(15)
    latitude = messages.StringField(16)
    longitude = messages.StringField(17)

class PropertyUpdate(messages.Message):
    token = messages.StringField(1, required=True)
    entityKey = messages.StringField(2, required=True)
    title = messages.StringField(3)
    status = messages.StringField(4)
    price = messages.StringField(5)
    address = messages.StringField(6)
    city = messages.StringField(7)
    state = messages.StringField(8)
    zipcode = messages.StringField(9)
    rooms = messages.StringField(10)
    bathrooms = messages.StringField(11)
    propertyType = messages.StringField(12)
    yearBuilt = messages.StringField(13)
    area = messages.StringField(14)
    photourl = messages.StringField(15)
    description = messages.StringField(16)
    latitude = messages.StringField(17)
    longitude = messages.StringField(18)

#regresa una lista para la base de datos Property
class PropertyList(messages.Message):
    code = messages.IntegerField(1)
    data = messages.MessageField(PropertyUpdate, 2, repeated=True)