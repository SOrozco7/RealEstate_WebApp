import webapp2
import os
import jinja2
import json
import sys
from google.appengine.ext import ndb
from models import Users
from models import Companies
from models import Properties

from google.appengine.api import app_identity
import mimetypes
import cloudstorage
from google.appengine.ext import blobstore
from google.appengine.api import images

class ModelClass(object): ## Generic class without fields; we can add fields on the go as we need them56
 pass

def ObjectClass(obj):
 return obj.__dict__

############################################## USERS ###################################################################################

class CreateUserHandler(webapp2.RequestHandler):
 	def post(self):
 		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()
 		
 		try:
 			myEmail = self.request.get('email')
 			myPassword = self.request.get('password')
 			myNickname = self.request.get('nickname')
 			myAge = self.request.get('age')
 			myPhotoUrl = self.request.get('photourl')

 			myNuevoUsuario = Users(email = myEmail, password = myPassword, nickname = myNickname, age = myAge, photourl = myPhotoUrl)
 			myUsuarioKey = myNuevoUsuario.put()

 			c.message = "inserted"
 			c.key = myUsuarioKey.urlsafe()

 		except:
 			c.message = "Exception ..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class ReadAllUsersHandler(webapp2.RequestHandler):
	def get(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		myList = []
 		try:
 			listUsers = Users.query().fetch()
 			
 			for i in listUsers:
 				c = ModelClass()
 				c.id = i.key.urlsafe()
 				c.email = i.email
 				c.password = i.password
 				c.nickname = i.nickname
 				c.age = i.age
 				c.photourl = i.photourl
 				myList.append(c)
 		except:
 			c = ModelClass()
 			c.message = "Exception..."
 			myList.append(c)

 		json_string = json.dumps(myList, default=ObjectClass)
 		self.response.write(json_string)

class ReadOneUserHandler(webapp2.RequestHandler):
	def get(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') 
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()
 		try:
 			userKey = self.request.get('key')
 			id_userKey = ndb.Key(urlsafe = userKey)
 			myUser = Users.query(Users.key == id_userKey).get()
 			c.key = userKey

 			if myUser is not None:
 				c.email = myUser.email
 				c.password = myUser.password
 				c.nickname = myUser.nickname
 				c.age = myUser.age
 				c.photourl = myUser.photourl
 			else:
 				c.message = "error: not found"
 		except:
 			c.message = "Exception..."
		
		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class UpdateUserHandler(webapp2.RequestHandler):
	def post(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()

 		try:
 			userkey = self.request.get('key')
 			myEmail = self.request.get('email')
 			myPasswd = self.request.get('password')
 			myNickname = self.request.get('nickname')
 			myAge = self.request.get('age')
 			myPhotoUrl = self.request.get('photourl')

 			id_userkey = ndb.Key(urlsafe=userkey)
 			myUser = Users.query(Users.key == id_userkey).get()
 			c.key = userkey

 			if myUser is not None:
 				myUser.email = myEmail
 				myUser.password = myPasswd
 				myUser.nickname = myNickname
 				myUser.age = myAge
 				myUser.photourl = myPhotoUrl
 				myUser.put()
 				c.message = "updated"
 			else:
 				c.message = "error: not found"

 		except:
 			c.message = "Exception..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class DeleteUserHandler(webapp2.RequestHandler): 
	def post(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()

 		try:
 			userkey = self.request.get('key') 
 			id_userkey = ndb.Key(urlsafe=userkey)
 			myUser = Users.query(Users.key == id_userkey).get()
 			c.key = userkey

 			if myUser is not None:
 				myUser.key.delete()
 				c.message = "deleted"
 			else:
 				c.message = "error: not found"

 		except:
 			c.message = "Exception..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

############################################## COMPANIES ###################################################################################

class CreateCompanyHandler(webapp2.RequestHandler):
 	def post(self):
 		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') 
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()
 		
 		try:
 			myName = self.request.get('name')
 			myAddress = self.request.get('address')
 			myRFC = self.request.get('RFC')
 			myPhotoUrl = self.request.get('photourl')

 			myNewCompany = Companies(name = myName, address = myAddress, RFC = myRFC, photourl = myPhotoUrl)
 			myNewCompanyKey = myNewCompany.put()

 			c.message = "inserted"
 			c.key = myNewCompanyKey.urlsafe()

 		except:
 			c.message = "Exception ..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class ReadAllCompaniesHandler(webapp2.RequestHandler):
	def get(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') 
 		self.response.headers['Content-Type'] = 'application/json'
 		myList = []
 		try:
 			listCompanies = Companies.query().fetch()
 			
 			for i in listCompanies:
 				c = ModelClass()
 				c.id = i.key.urlsafe()
 				c.name = i.name
 				c.address = i.address
 				c.RFC = i.RFC
 				c.photourl = i.photourl
 				myList.append(c)
 		except:
 			c = ModelClass()
 			c.message = "Exception..."
 			myList.append(c)

 		json_string = json.dumps(myList, default=ObjectClass)
 		self.response.write(json_string)

class ReadOneCompanyHandler(webapp2.RequestHandler):
	def get(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()
 		try:
 			companyKey = self.request.get('key')
 			id_companyKey = ndb.Key(urlsafe = companyKey)
 			myCompany = Companies.query(Companies.key == id_companyKey).get()
 			c.key = companyKey

 			if myCompany is not None:
 				c.name = myCompany.name
 				c.address = myCompany.address
 				c.RFC = myCompany.RFC
 				c.photourl = myCompany.photourl
 			else:
 				c.message = "error: not found"
 		except:
 			c.message = "Exception..."
		
		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class UpdateCompanyHandler(webapp2.RequestHandler):
	def post(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()

 		try:
 			companyKey = self.request.get('key')
 			myName = self.request.get('name')
 			myAddress = self.request.get('address')
 			myRFC = self.request.get('RFC')
 			myPhotoUrl = self.request.get('photourl')

 			id_companyKey = ndb.Key(urlsafe=companyKey)
 			myCompany = Companies.query(Companies.key == id_companyKey).get()
 			c.key = companyKey

 			if myCompany is not None:
 				myCompany.name = myName
 				myCompany.address = myAddress
 				myCompany.RFC = myRFC
 				myCompany.photourl = myPhotoUrl
 				myCompany.put()
 				c.message = "updated"
 			else:
 				c.message = "error: not found"

 		except:
 			c.message = "Exception..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class DeleteCompanyHandler(webapp2.RequestHandler): 
	def post(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()

 		try:
 			companyKey = self.request.get('key') 
 			id_companyKey = ndb.Key(urlsafe=companyKey)
 			myCompany = Companies.query(Companies.key == id_companyKey).get()
 			c.key = companyKey

 			if myCompany is not None:
 				myCompany.key.delete()
 				c.message = "deleted"
 			else:
 				c.message = "error: not found"

 		except:
 			c.message = "Exception..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

############################################## PROPERTIES ###################################################################################

class CreatePropertyHandler(webapp2.RequestHandler):
 	def post(self):
 		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') 
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()
 		
 		try:
 			myLatitude= self.request.get('latitude')
 			myLongitude = self.request.get('longitude')
 			myRooms = self.request.get('rooms')
 			myBathrooms = self.request.get('bathrooms')
 			myPropertyType = self.request.get('propertyType')
 			myYearBuilt = self.request.get('yearBuilt')
 			mySquareMeters = self.request.get('squareMeters')
 			myState = self.request.get('state')
 			myCountry = self.request.get('country')
 			myPhotoUrl = self.request.get('photourl')

 			myNewProperty = Properties(latitude = myLatitude, 
 									   longitude = myLongitude, 
 									   rooms = myRooms, 
 									   bathrooms = myBathrooms, 
 									   propertyType = myPropertyType, 
 									   yearBuilt = myYearBuilt, 
 									   squareMeters = mySquareMeters, 
 									   state = myState, 
 									   country = myCountry,
 									   photourl =  myPhotoUrl)
 			
 			myNewPropertyKey = myNewProperty.put()

 			c.message = "inserted"
 			c.key = myNewPropertyKey.urlsafe()

 		except:
 			c.message = "Exception ..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class ReadAllPropertiesHandler(webapp2.RequestHandler):
	def get(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') 
 		self.response.headers['Content-Type'] = 'application/json'
 		myList = []
 		try:
 			listProperties = Properties.query().fetch()
 			
 			for i in listProperties:
 				c = ModelClass()
 				c.id = i.key.urlsafe()
 				c.latitude = i.latitude
 				c.longitude = i.longitude
 				c.rooms = i.rooms
 				c.bathrooms = i.bathrooms
 				c.propertyType = i.propertyType
 				c.yearBuilt = i.yearBuilt
 				c.squareMeters = i.squareMeters
 				c.state = i.state
 				c.country = i.country
 				c.photourl = i.photourl
 				myList.append(c)
 		except:
 			c = ModelClass()
 			c.message = "Exception..."
 			myList.append(c)

 		json_string = json.dumps(myList, default=ObjectClass)
 		self.response.write(json_string)

class ReadOnePropertyHandler(webapp2.RequestHandler):
	def get(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()
 		try:
 			propertyKey = self.request.get('key')
 			id_propertyKey = ndb.Key(urlsafe = propertyKey)
 			myProperty = Properties.query(Properties.key == id_propertyKey).get()
 			c.key = propertyKey

 			if myProperty is not None:
 				c.latitude = myProperty.latitude
 				c.longitude = myProperty.longitude
 				c.rooms = myProperty.rooms
 				c.bathrooms = myProperty.bathrooms
 				c.propertyType = myProperty.propertyType
 				c.yearBuilt = myProperty.yearBuilt
 				c.squareMeters = myProperty.squareMeters
 				c.state = myProperty.state
 				c.country = myProperty.country
 			else:
 				c.message = "error: not found"
 		except:
 			c.message = "Exception..."
		
		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class UpdatePropertyHandler(webapp2.RequestHandler):
	def post(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()

 		try:
 			propertyKey = self.request.get('key')
 			myLatitude= self.request.get('latitude')
 			myLongitude = self.request.get('longitude')
 			myRooms = self.request.get('rooms')
 			myBathrooms = self.request.get('bathrooms')
 			myPropertyType = self.request.get('propertyType')
 			myYearBuilt = self.request.get('yearBuilt')
 			mySquareMeters = self.request.get('squareMeters')
 			myState = self.request.get('state')
 			myCountry =  self.request.get('country')
 			myPhotoUrl = self.request.get('photourl')

 			id_propertyKey = ndb.Key(urlsafe=propertyKey)
 			myProperty = Properties.query(Properties.key == id_propertyKey).get()
 			c.key = propertyKey

 			if myProperty is not None:
 				myProperty.latitude = myLatitude
 				myProperty.longitude = myLongitude
 				myProperty.rooms = myRooms
 				myProperty.bathrooms = myBathrooms
 				myProperty.propertyType = myPropertyType
 				myProperty.yearBuilt = myYearBuilt
 				myProperty.squareMeters = mySquareMeters
 				myProperty.state = myState
 				myProperty.country = myCountry
 				myProperty.photourl = myPhotoUrl
 				myProperty.put()
 				c.message = "updated"
 			else:
 				c.message = "error: not found"

 		except:
 			c.message = "Exception..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class SetPropertyLocationHandler(webapp2.RequestHandler):
	def post(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()

 		try:
 			propertyKey = self.request.get('key')
 			myState = self.request.get('state')
 			myCountry =  self.request.get('country')

 			id_propertyKey = ndb.Key(urlsafe=propertyKey)
 			myProperty = Properties.query(Properties.key == id_propertyKey).get()
 			c.key = propertyKey

 			if myProperty is not None:
 				myProperty.state = myState
 				myProperty.country = myCountry
 				myProperty.put()
 				c.message = "updated"
 			else:
 				c.message = "error: not found"

 		except:
 			c.message = "Exception..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

class DeletePropertyHandler(webapp2.RequestHandler): 
	def post(self):
		self.response.headers.add_header('Access-Control-Allow-Origin ', '*') ##Query from any client ("firewall" to allow crossdomain)
 		self.response.headers['Content-Type'] = 'application/json'
 		c = ModelClass()

 		try:
 			propertyKey = self.request.get('key') 
 			id_propertyKey = ndb.Key(urlsafe=propertyKey)
 			myProperty = Properties.query(Properties.key == id_propertyKey).get()
 			c.key = propertyKey

 			if myProperty is not None:
 				myProperty.key.delete()
 				c.message = "deleted"
 			else:
 				c.message = "error: not found"

 		except:
 			c.message = "Exception..."

 		json_string = json.dumps(c, default=ObjectClass)
 		self.response.write(json_string)

####################################### MAIN HANDLERS #################################################################################################

jinja_env = jinja2.Environment(
  loader=jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainHandler(webapp2.RequestHandler):
  def get(self):
    template = jinja_env.get_template('index.html')
    template_context = {}
    self.response.out.write(template.render(template_context))

class MainCompaniesHandler(webapp2.RequestHandler):
  def get(self):
    template = jinja_env.get_template('companies.html')
    template_context = {}
    self.response.out.write(template.render(template_context))

class MainUsersHandler(webapp2.RequestHandler):
  def get(self):
    template = jinja_env.get_template('users.html')
    template_context = {}
    self.response.out.write(template.render(template_context))

class MainPropertiesHandler(webapp2.RequestHandler):
  def get(self):
    template = jinja_env.get_template('properties.html')
    template_context = {}
    self.response.out.write(template.render(template_context))

class MainMapsHandler(webapp2.RequestHandler):
  def get(self):
    template = jinja_env.get_template('googlemaps.html')
    template_context = {}
    self.response.out.write(template.render(template_context))

class MainReverseGeocodingHandler(webapp2.RequestHandler):
  def get(self):
    template = jinja_env.get_template('geocoding_reverse.html')
    template_context = {}
    self.response.out.write(template.render(template_context))

####################################################################################

class UpHandler(webapp2.RequestHandler):

	def _get_urls_for(self, file_name):

		bucket_name = app_identity.get_default_gcs_bucket_name()
		path = os.path.join('/', bucket_name, file_name)
		real_path = '/gs' + path
		key = blobstore.create_gs_key(real_path)

		try:

			url = images.get_serving_url(key, size=0)

		except images.TransformationError, images.NotImageError:

			url = "http://storage.googleapis.com{}".format(path)

		return url

	def post(self):

		self.response.headers.add_header('Access-Control-Allow-Origin', '*')
		self.response.headers['Content-Type'] = 'application/json'

		bucket_name = app_identity.get_default_gcs_bucket_name()
		uploaded_file = self.request.POST.get('uploaded_file')
		file_name = getattr(uploaded_file, 'filename', None)
		file_content = getattr(uploaded_file, 'file', None)
		real_path = ''

		if file_name and file_content:
			content_t = mimetypes.guess_type(file_name)[0]
			real_path = os.path.join('/', bucket_name, file_name)

		with cloudstorage.open(real_path, 'w', content_type=content_t,
			options={'x-goog-acl': 'public-read'}) as f:
			f.write(file_content.read())

		key = self._get_urls_for(file_name)
		self.response.write(key)

app = webapp2.WSGIApplication([
	('/', MainHandler),
	('/home', MainHandler),
	('/users', MainUsersHandler),
	('/companies', MainCompaniesHandler),
	('/properties', MainPropertiesHandler),
	('/maps', MainMapsHandler),
	#####################################################
	('/setPropertyLocation', SetPropertyLocationHandler),
	('/reverseGeocoding', MainReverseGeocodingHandler),
	#####################################################
 	('/createUser', CreateUserHandler),
 	('/readAllUsers', ReadAllUsersHandler),
 	('/readOneUser', ReadOneUserHandler),
 	('/updateUser', UpdateUserHandler),
	('/deleteUser', DeleteUserHandler),
	####################################################
	('/createCompany', CreateCompanyHandler),
 	('/readAllCompanies', ReadAllCompaniesHandler),
 	('/readOneCompany', ReadOneCompanyHandler),
 	('/updateCompany', UpdateCompanyHandler),
	('/deleteCompany', DeleteCompanyHandler),
	####################################################
	('/createProperty', CreatePropertyHandler),
 	('/readAllProperties', ReadAllPropertiesHandler),
 	('/readOneProperty', ReadOnePropertyHandler),
 	('/updateProperty', UpdatePropertyHandler),
	('/deleteProperty', DeletePropertyHandler),
	########################################
	('/up', UpHandler)
	], debug=True)
