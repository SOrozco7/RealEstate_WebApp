from protorpc import remote #web service 
from endpoints_proto_datastore.ndb import EndpointsModel 
from google.appengine.ext import ndb # Import the NDB (Google's No SQL database)
#import endpoints

class CustomBaseModel(EndpointsModel):
    def populate(self, data):
        super(self.__class__, self).__init__()
        for attr in self._message_fields_schema:
            if hasattr(data, attr):
                setattr(self, attr, getattr(data, attr))

#####USERS#########
class Users(CustomBaseModel): #Equivalente al 'Create Table'
    _message_fields_schema = ('email', 'password', 'nickname', 'age', 'photourl')
    email = ndb.StringProperty()
    password = ndb.StringProperty()
    nickname = ndb.StringProperty()
    age = ndb.StringProperty()
    photourl = ndb.StringProperty()

#####COMPANIES#########
class Companies(CustomBaseModel):
    _message_fields_schema = ('name', 'address', 'RFC', 'photourl')
    name = ndb.StringProperty()
    address = ndb.StringProperty()
    RFC = ndb.StringProperty()
    photourl = ndb.StringProperty()

#####PROPERTIES#########
class Properties(CustomBaseModel):
    _message_fields_schema = ('latitude', 
                              'longitude', 
                              'rooms', 
                              'bathrooms', 
                              'propertyType', 
                              'yearBuilt', 
                              'squareMeters', 
                              'state', 
                              'country', 'photourl')

    latitude = ndb.StringProperty()
    longitude = ndb.StringProperty()
    rooms = ndb.StringProperty()
    bathrooms = ndb.StringProperty()
    propertyType = ndb.StringProperty()
    yearBuilt = ndb.StringProperty()
    squareMeters = ndb.StringProperty()
    state = ndb.StringProperty()
    country = ndb.StringProperty()
    photourl = ndb.StringProperty()