function Property()
{ 
  this.latitude = "";
  this.longitude = "";
  this.rooms = "";
  this.bathrooms = "";
  this.propertyType = "";
  this.yearBuilt = "";
  this.squareMeters = "";
  this.state = "";
  this.country = "";
  this.photourl = "";
};

function insertProperty()
{
  try
  {
    var val_latitude = $('#latitude').val();
    var val_longitude = $('#longitude').val();
    var val_rooms = $('#rooms').val();
    var val_bathrooms = $('#bathrooms').val();
    var val_propertyType = $('#propertyType').val();
    var val_yearBuilt = $('#yearBuilt').val();
    var val_squareMeters = $('#squareMeters').val();
    var val_state = null;
    var val_country = null;

    var myProperty = new Property();
    myProperty.latitude = val_latitude;
    myProperty.longitude = val_longitude;
    myProperty.rooms = val_rooms;
    myProperty.bathrooms = val_bathrooms;
    myProperty.propertyType = val_propertyType;
    myProperty.yearBuilt = val_yearBuilt;
    myProperty.squareMeters = val_squareMeters;
    myProperty.state = val_state;
    myProperty.country = val_country;
    myProperty.photourl = sessionStorage.urlImage;

    var form_data = new FormData();
    form_data.append("latitude",  myProperty.latitude);
    form_data.append("longitude", myProperty.longitude);
    form_data.append("rooms", myProperty.rooms);
    form_data.append("bathrooms", myProperty.bathrooms);
    form_data.append("propertyType", myProperty.propertyType);
    form_data.append("yearBuilt", myProperty.yearBuilt);
    form_data.append("squareMeters", myProperty.squareMeters);
    form_data.append("state", myProperty.state);
    form_data.append("country", myProperty.country);
    form_data.append("photourl", myProperty.photourl);

    jQuery.support.cors = true; //CORS -> Cross-Origin Resource Sharing 

    jQuery.ajax({
      url: "/createProperty",
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: "post",
      crossDomain: true,
      success: function(response){

        alert("key generada " + response);
        $('#latitude').val(String.empty);
        $('#longitude').val(String.empty);
        $('#rooms').val(String.empty);
        $('#bathrooms').val(String.empty);
        $('#propertyType').val(String.empty);
        $('#yearBuilt').val(String.empty);
        $('#squareMeters').val(String.empty);
        $('#photourl').val(String.empty);

        sessionStorage.setItem('keyUpdate', response);
        alert("1_keyUpdate = " + response);
        geocodeLatLng(val_latitude + "," + val_longitude);
      },
      error: function(error){

        alert(error);
      }
    });
  }
  catch(error)
  {
    alert(error);
  }

  getAllProperties();
}

function getAllProperties()
{
  // alert("Getting all!");
  jQuery.support.cors = true;

  try
  {
    $.ajax({
      url: "/readAllProperties",
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      type: 'get',
      crossDomain: true,
      success: function(response){

        $("#listProperties").empty();
        totalProperties = response;
        // alert(response);

        var myTableProperties = "<table class='table table-striped table-advanced table-hover'>" +
          " <tbody id='devices'> " +
          "  <tr> " + 
          "    <th> </th> " +
          // "    <th> entityKey </th> " +

          "    <th>  </th> " +
          "    <th> Photo </th> " +
          "    <th> Latitude </th> " +
          "    <th> Longitude </th> " +
          "    <th> Rooms </th> " + 
          "    <th> Bathrooms </th> " + 
          "    <th> Type </th> " + 
          "    <th> Year built </th> " + 
          "    <th> Square meters </th> " + 
          "    <th> State </th> " + 
          "    <th> Country </th> " + 
          "    <th>  </th> " +
          "  </tr> ";

        totalProperties.forEach(function(property)
        {
          myTableProperties += "<tr> " + 
                               "<td> " +
            "<button onclick='getOneProperty(\"" + property.id + "\")' class='btn btn-primary' > " + 
            "<i class='fa fa fa-ban'></i> Edit </button> " + 
            "</td>" +
            "<td>" +
            "<button onclick='initMap(\"" + property.latitude + "," + property.longitude + "\")' class='btn btn-primary' > " + 
            "<i class='fa fa fa-ban'></i> Show in Map </button> " + 
            "</td>" +
            // "<td > " + property.id + " </td> " + 
            "<td > " + "<img src=\"" + property.photourl + "\" style=\"width:256px;height:256px;\">" +
            "<td > " + property.latitude + "</td> " +
            "<td > " + property.longitude + "</td> " +
            "<td > " + property.rooms + "</td> " + 
            "<td > " + property.bathrooms + "</td> " + 
            "<td > " + property.propertyType + "</td> " + 
            "<td > " + property.yearBuilt + "</td> " + 
            "<td > " + property.squareMeters + "</td> " + 
            "<td > " + property.state + "</td> " + 
            "<td > " + property.country + "</td> " + 
            "<td>" +
            "<button onclick='deleteProperty(\"" + property.id + "\")' class='btn btn-danger'> " + 
            "<i class='fa fa fa-ban'></i> Delete </button>" + 
            "</td>" + 
            "</div> " +
            "</td> " +
            "</tr> ";
        });

        myTableProperties += "</tbody>" + "</table>";
        $("#listProperties").append(myTableProperties);
      }
    });
  }
  catch(e)
  {
    alert("error : " + e);
  }
}

function getOneProperty(propertyKey)
{
  // alert(propertyKey);
  jQuery.support.cors =  true;
  try {
    $.ajax({
      url: "/readOneProperty",
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: true,
      data: {"key": propertyKey},
      type: 'get',
      crossDomain: true,
      success : function(response){

        $('#latitude').val(response.latitude);
        $('#longitude').val(response.longitude);
        $('#rooms').val(response.rooms);
        $('#bathrooms').val(response.bathrooms);
        $('#propertyType').val(response.propertyType);
        $('#yearBuilt').val(response.yearBuilt);
        $('#squareMeters').val(response.squareMeters);
        // $('#state').val(response.state);
        // $('#country').val(response.country);
        $('#photourl').val(response.photourl);

        sessionStorage.setItem('keyUpdate', response.key);
      }
    });
  }
  catch(e)
  {
    alert("error : " + e);
  }
}

function updateProperty()
{
  try
  {
    var myKeyUpdate = sessionStorage['keyUpdate'];

    // alert(myKeyUpdate);

    var val_latitude = $('#latitude').val();
    var val_longitude = $('#longitude').val();
    geocodeLatLng(val_latitude + "," + val_longitude);

    var val_rooms = $('#rooms').val();
    var val_bathrooms = $('#bathrooms').val();
    var val_propertyType = $('#propertyType').val();
    var val_yearBuilt = $('#yearBuilt').val();
    var val_squareMeters = $('#squareMeters').val();
    var val_state = null;
    var val_country = null;

    var myProperty = new Property();
    myProperty.latitude = val_latitude;
    myProperty.longitude = val_longitude;
    myProperty.rooms = val_rooms;
    myProperty.bathrooms = val_bathrooms;
    myProperty.propertyType = val_propertyType;
    myProperty.yearBuilt = val_yearBuilt;
    myProperty.squareMeters = val_squareMeters;
    myProperty.state = val_state;
    myProperty.country = val_country;
    myProperty.photourl = sessionStorage.urlImage;

    var form_data = new FormData();
    form_data.append("key", myKeyUpdate);
    form_data.append("latitude",  myProperty.latitude);
    form_data.append("longitude", myProperty.longitude);
    form_data.append("rooms", myProperty.rooms);
    form_data.append("bathrooms", myProperty.bathrooms);
    form_data.append("propertyType", myProperty.propertyType);
    form_data.append("yearBuilt", myProperty.yearBuilt);
    form_data.append("squareMeters", myProperty.squareMeters);
    form_data.append("state", myProperty.state);
    form_data.append("country", myProperty.country);
    form_data.append("photourl", myProperty.photourl);

    jQuery.support.cors = true;

    jQuery.ajax({

      url: "/updateProperty",
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: "post",
      crossDomain: true,
      success: function(response){

        // alert("key updated : " + response);
        $('#latitude').val(String.empty);
        $('#longitude').val(String.empty);
        $('#rooms').val(String.empty);
        $('#bathrooms').val(String.empty);
        $('#propertyType').val(String.empty);
        $('#yearBuilt').val(String.empty);
        $('#squareMeters').val(String.empty);
        $('#photourl').val(String.empty);
      },
      error: function(error){

        alert(error);
      }
    });
  }
  catch(error)
  {
    alert(error);
  }

  getAllProperties();
}

function deleteProperty(propertyKey){

  try{

    // alert(propertyKey);
    var form_data = new FormData();
    form_data.append("key", propertyKey);

    jQuery.support.cors = true;
    jQuery.ajax({

      url: "/deleteProperty",
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: "post",
      crossDomain: true,
      success: function(response){

        // alert("key eliminada: " + response);
      },
      error: function(error){

        alert(error);
      }
    });
  }
  catch(error)
  {
    alert(error);
  }

  getAllProperties();
}

function initMap(propertyCoords) {
   
  try
  {
    var latlngStr = propertyCoords.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};

    // Create the map.
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: latlng,
      mapTypeId: 'terrain'
    });

    var marker = new google.maps.Marker({ position: latlng, map: map});
  } 
  catch(error)
  {
    //something
  }   
}

function geocodeLatLng(propertyCoords) {

  var API_KEY = "AIzaSyChdYfqr_M2yaNE6JzLUNv4dkvpcj8c3_U";
  var myKeyUpdate = sessionStorage['keyUpdate'];
  alert("myKeyUpdate is equal to " + myKeyUpdate);

  try{

    jQuery.support.cors = true;
    jQuery.ajax({

      url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + propertyCoords + "&key=" + API_KEY,
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      type: "get",
      crossDomain: true,
      success: function(response){

        var d = JSON.parse(response);
        console.log(response);
        var length = d.results[0].address_components.length

        var state = null;
        var country = null;

        try{

          if(isNaN(d.results[0].address_components[length - 1].long_name)){

            state = d.results[0].address_components[length - 2].long_name;
            country = d.results[0].address_components[length - 1].long_name;
          }

          else{

            state = d.results[0].address_components[length - 3].long_name;
            country = d.results[0].address_components[length - 2].long_name;
          }
        }
        catch(error){

          alert(error);
        }

        var form_data = new FormData();
        form_data.append("key", myKeyUpdate);
        form_data.append("state",  state);
        form_data.append("country", country);

        $.ajax({

          url: "/setPropertyLocation",
          dataType: "text",
          cache: false,
          contentType: false,
          processData: false,
          data: form_data,
          type: "post",
          crossDomain: true,
          success: function(response){

            alert("Success! The property at (" + propertyCoords + ") is in " + state + ", " + country);
          },
          error: function(error){

            alert(error);
          }
        });
      },
      error: function(error){

        alert(error);
      }
    });
  }
  catch(error)
  {
    alert(error);
  }

  getAllProperties();
}

