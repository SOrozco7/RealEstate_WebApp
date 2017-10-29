import base64
import Crypto
from Crypto.Hash import SHA256
from google.appengine.ext import ndb
from google.appengine.ext import blobstore
from protorpc import remote
from endpoints_proto_datastore.ndb import EndpointsModel
import endpoints
from google.appengine.api import mail
from google.appengine.ext.webapp import blobstore_handlers

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

###########################
#### Empresa
###########################
class Empresa(CustomBaseModel):
    _message_fields_schema = ('entityKey', 'codigo_empresa', 'nombre_empresa')
    codigo_empresa = ndb.StringProperty()
    nombre_empresa = ndb.StringProperty()
    
       ###Empresa####
    def empresa_m(self, data):
        empresa = Empresa()#Crea una variable de tipo Base de datos
        empresa.populate(data)#Llena la variables con los datos dados por el request en main.py
        #empresa.empresa_key=empresakey #inserta el entityKey de la empresa que es un parametro que se manda en main.py
        empresa.put()#inserta o hace un update depende del main.py
        return 0

###############
#### Usuarios
###############
class Usuarios(CustomBaseModel):
    _message_fields_schema = ('entityKey', 'name', 'email', 'password', 'salt')

    empresa_key = ndb.KeyProperty(kind=Empresa)
    name = ndb.StringProperty()
    email = ndb.StringProperty()
    password = ndb.StringProperty()
    salt = ndb.StringProperty(indexed=False)
   
    def hash_password(self):
        """ Create a cryptographyc random secure salt and hash the password
            using the salt created and store both in the database, the password
            and the salt """
        # Note: It is needed to encode in base64 the salt, otherwise it will
        # cause an exception trying to store non utf-8 characteres
        self.salt = base64.urlsafe_b64encode(
            Crypto.Random.get_random_bytes(16))
        hash_helper = SHA256.new()
        hash_helper.update(self.password + self.salt)
        self.password = hash_helper.hexdigest()

    def verify_password(self, password):
        """ Verify if the password is correct """
        hash_helper = SHA256.new()
        hash_helper.update(password + self.salt)
        return hash_helper.hexdigest() == self.password

       ###Usuarios####
    def usuario_m(self, data, empresakey):
        user = Usuarios()#Crea una variable de tipo Base de datos
        user.populate(data)#Llena la variables con los datos dados por el request en main.py
        user.empresa_key=empresakey
        user.status=1
        user.hash_password()#encripta la contrasena
        user.put()#inserta o hace un update depende del main.py
        return 0

###########################
#### Property
###########################
class Property(CustomBaseModel):
    _message_fields_schema = ('entityKey',
                              'title',
                              'status',
                              'price',
                              'address',
                              'city',
                              'state',
                              'country', 
                              'zipcode',
                              'rooms', 
                              'bathrooms', 
                              'propertyType', 
                              'yearBuilt', 
                              'area', 
                              'photourl',
                              'description')

    usuario_key = ndb.KeyProperty(kind=Usuarios)
    title = ndb.StringProperty()
    status = ndb.StringProperty()
    price = ndb.StringProperty()
    address = ndb.StringProperty()
    city = ndb.StringProperty()
    state = ndb.StringProperty()
    country = ndb.StringProperty()
    zipcode = ndb.StringProperty()
    rooms = ndb.StringProperty()
    bathrooms = ndb.StringProperty()
    propertyType = ndb.StringProperty()
    yearBuilt = ndb.StringProperty()
    area = ndb.StringProperty()
    photourl = ndb.StringProperty()
    description = ndb.StringProperty()

    def property_m(self, data, usuario_key):

        myProperty = Property()
        myProperty.populate(data)
        myProperty.usuario_key = usuario_key
        myProperty.put()
        return 0

#### create demo

def validarEmail(email):
    emailv = Usuarios.query(Usuarios.email == email)
    if not emailv.get():
        return False
    else:
        return True

#### create root Empresa
if validarEmail("adsoft@kubeet.com") == False:
    
    empresaAdmin = Empresa(
      codigo_empresa = 'kubeet',
      nombre_empresa="kubeet srl de cv",
    )
    empresaAdmin.put()

    #### create root user  

    keyadmincol = ndb.Key(urlsafe=empresaAdmin.entityKey)
    admin = Usuarios(
          empresa_key = keyadmincol,
          name = "Adsoft",
          email="adsoft@kubeet.com",
          password="qubit",
    )
    admin.hash_password()
    admin.put()

#### create another user
if validarEmail("salvador@orozco.in") == False:
    
    empresaOther = Empresa(
        codigo_empresa = 'orvis',
        nombre_empresa="orvis srl de cv",
    )
    empresaOther.put()

#### create another user 

    keyadmincolOther = ndb.Key(urlsafe=empresaOther.entityKey)
    adminOther = Usuarios(
          empresa_key = keyadmincolOther,
          name = "Salvador",
          email="salvador@orozco.in",
          password="12345",
    )
    adminOther.hash_password()
    adminOther.put()