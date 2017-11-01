function PropertyObject(entityKey,
                        myTitle, 
                        myStatus,
                        myPrice,
                        myAddress,
                        myCity,
                        myState,
                        myZipCode,
                        myRooms,
                        myBathrooms,
                        myPropertyType,
                        myYearBuilt,
                        myArea,
                        myPhotoUrl,
                        myDescription,
                        myLatitude,
                        myLongitude) {
    
    this.entityKey = entityKey;
    this.title = myTitle;
    this.status = myStatus;
    this.price = myPrice;
    this.address = myAddress;
    this.city = myCity;
    this.state = myState;
    this.zipcode = myZipCode;
    this.rooms = myRooms;
    this.bathrooms = myBathrooms;
    this.propertyType = myPropertyType;
    this.yearBuilt = myYearBuilt;
    this.area = myArea;
    this.description = myDescription;
    this.photourl = myPhotoUrl;
    this.latitude = myLatitude;
    this.longitude = myLongitude;
    this.token = sessionStorage.token;

    this.toJsonString = function () { return JSON.stringify(this); };
};

function TokenObject() {
    
    this.token = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function addProperty()
{
	try
    {
        var myData = new PropertyObject(entityKey = "",
                                        title = $("#title").val(),
                                        status = $("#status").val(),
                                        price = $("#price").val(),
                                        address = $("#address").val(),
                                        city = $("#city").val(),
                                        state = $("#state").val(),
                                        zipcode = $("#zipcode").val(),
                                        rooms = $("#rooms").val(),
                                        bathrooms = $("#bathrooms").val(),
                                        propertyType = $("#propertyType").val(),
                                        yearBuilt = $("#yearBuilt").val(),
                                        area = $("#area").val(),
                                        photourl = sessionStorage.urlImage,
                                        description = $("#description").val(),
                                        latitude = null,
                                        longitude = null);

        var address = $("#address").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var zipcode = $("#zipcode").val();

        jQuery.ajax({

            type: "POST",
            url: "http://localhost:8080/_ah/api/property_api/v1/property/insert",
            // url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/insert", //Use this when the website is live
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                    // do something
                    //alert (response.code + " " + response.message);
                    getPropertyCoords(address, city, state, zipcode);
            },
        
            error: function (error) {            
                    // error handler
                    alert("error :" + error.message);
            }
        });
    }
    catch(error)
    {
        alert(error);
    }
}

function loadPropertyInformation()
{
    try
    {
        var urlVariables = getURLVariables();
        propertyKey = urlVariables.propertyID;
        var myProperty = new PropertyObject(entityKey = propertyKey);
        // alert(myProperty.toJsonString());

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/property_api/v1/property/get",
            // url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/get", //Use this when the website is live
            data: myProperty.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // do something

                totalProperties = response.data;

                try{
                    totalProperties.forEach(function(property){

                        $("#title").val(property.title);
                        $("#status").val(property.status);
                        $("#price").val(property.price);
                        $("#address").val(property.address);
                        $("#city").val(property.city);
                        $("#state").val(property.state);
                        $("#zipcode").val(property.zipcode);
                        $("#rooms").val(property.rooms);
                        $("#bathrooms").val(property.bathrooms);
                        $("#propertyType").val(property.propertyType);
                        $("#yearBuilt").val(property.yearBuilt);
                        $("#area").val(property.area);
                        $("#description").val(property.description);
                        $("#photourl").val(property.photourl);
                    });
                }
                catch(error){
                    
                    alert(error);
                }
            },
       
            error: function (error) {            
                // error handler
                alert("error :" + error.message)
            }
        });
   }
   catch(error)
   {
        alert(error);
   }
}

function editProperty()
{
	try
    {
        var urlVariables = getURLVariables();
        propertyKey = urlVariables.propertyID;
        
        var myData = new PropertyObject(entityKey = propertyKey,
                                        title = $("#title").val(),
                                        status = $("#status").val(),
                                        price = $("#price").val(),
                                        address = $("#address").val(),
                                        city = $("#city").val(),
                                        state = $("#state").val(),
                                        zipcode = $("#zipcode").val(),
                                        rooms = $("#rooms").val(),
                                        bathrooms = $("#bathrooms").val(),
                                        propertyType = $("#propertyType").val(),
                                        yearBuilt = $("#yearBuilt").val(),
                                        area = $("#area").val(),
                                        photourl = sessionStorage.urlImage,
                                        description = $("#description").val(),
                                        latitude = null,
                                        longitude = null);

        var address = $("#address").val();
        var city = $("#city").val();
        var state = $("#state").val();
        var zipcode = $("#zipcode").val();
        
        alert(myData.toJsonString());
        
        jQuery.ajax({

            type: "POST",
            url: "http://localhost:8080/_ah/api/property_api/v1/property/update",
            // url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/update", //Use this when the website is live
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                    // do something
                    // alert (response.code + " " + response.message);
                    getPropertyCoords(address, city, state, zipcode);
            },
        
            error: function (error) {            
                    // error handler
                    alert("error :" + error.message)
            }
        });
    }
    catch(error)
    {
        alert(error);
    }
}

function deleteProperty(propertyKey)
{
	try
    {   
        var myProperty = new PropertyObject(entityKey = propertyKey);
        // alert("myProperty.toJsonString() = " + myProperty.toJsonString());

        jQuery.support.cors = true;

        jQuery.ajax({

            type: "POST",
            url: "http://localhost:8080/_ah/api/property_api/v1/property/delete",
            // url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/delete", //Use this when the website is live
            data: myProperty.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // do something
                // alert (response.code + " " + response.message);
                window.location = "/myProperties";
            },
        
            error: function (error) {            
                // error handler
                alert("error :" + error.message)
            }
        });
    }
    catch(error)
    {
        alert(error);
    }
}

function getPropertyData()
{
    try
    {   
        var urlVariables = getURLVariables();
        propertyKey = urlVariables.propertyID;
        var myProperty = new PropertyObject(entityKey = propertyKey);

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/property_api/v1/property/get",
            // url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/get", //Use this when the website is live
            data: myProperty.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // do something

                totalProperties = response.data;

                try{
                    totalProperties.forEach(function(property){

                        getPropertyTitleBar(property);
                        getPropertyPricing(property);
                        getPropertyPictures(property);
                        getPropertyMap(property);
                        document.getElementById("yearBuilt").innerHTML += "Year Built: <span>" + property.yearBuilt + "</span>";
                    });
                }
                catch(error){
                    
                    alert(error);
                }
            },
       
            error: function (error) {            
                // error handler
                alert("error :" + error.message)
            }
        });
   }
   catch(error)
   {
        alert(error);
   }
}

function getPropertyTitleBar(property){

    var title = "<h2>";
    title += property.title;
    title += "<span class='property-badge'>";
    title += property.status;
    title += "</span></h2>";

    document.getElementById("propertyTitle").innerHTML += title;

    var location = "";
    location += "<span>";
    location += "<a href='#location' class='listing-address'>";
    location += "<i class='fa fa-map-marker'></i>";
    location += property.address + ", " + property.state;
    location += "</a>";
    location += "</span>";

    document.getElementById("propertyTitle").innerHTML += location;
}

function getPropertyPricing(property){

    document.getElementById("propertyPrice").innerHTML = "$" + property.price;
    document.getElementById("propertyPricePerUnitArea").innerHTML = "$" + parseFloat(property.price/property.area).toFixed(2) + " / sq. meter";
}

function getPropertyPictures(property){
   
    $("#propertyImg1").attr('href', property.photourl);
    $("#propertyImg1").attr('data-background-image', property.photourl);
    var currStyle1 = $("#propertyImg1").attr('style');
    $("#propertyImg1").attr('style', replaceURLWithThePropertyPicture(currStyle1, property.photourl));
    document.getElementById("propertyImgSlider1").innerHTML = "<img src='" + property.photourl + "' alt=''>"; 

    $("#propertyImg2").attr('href', property.photourl);
    $("#propertyImg2").attr('data-background-image', property.photourl);
    var currStyle2 = $("#propertyImg2").attr('style');
    $("#propertyImg2").attr('style', replaceURLWithThePropertyPicture(currStyle2, property.photourl));
    document.getElementById("propertyImgSlider2").innerHTML = "<img src='" + property.photourl + "' alt=''>";   

    $("#propertyImg3").attr('href', property.photourl);
    $("#propertyImg3").attr('data-background-image', property.photourl);
    var currStyle3 = $("#propertyImg3").attr('style');
    $("#propertyImg3").attr('style', replaceURLWithThePropertyPicture(currStyle3, property.photourl));
    document.getElementById("propertyImgSlider3").innerHTML = "<img src='" + property.photourl + "' alt=''>";   

    $("#propertyImg4").attr('href', property.photourl);
    $("#propertyImg4").attr('data-background-image', property.photourl);
    var currStyle4 = $("#propertyImg4").attr('style');
    $("#propertyImg4").attr('style', replaceURLWithThePropertyPicture(currStyle4, property.photourl));
    document.getElementById("propertyImgSlider4").innerHTML = "<img src='" + property.photourl + "' alt=''>";

    $("#propertyImg5").attr('href', property.photourl);
    $("#propertyImg5").attr('data-background-image', property.photourl);
    var currStyle5 = $("#propertyImg5").attr('style');
    $("#propertyImg5").attr('style', replaceURLWithThePropertyPicture(currStyle5, property.photourl));
    document.getElementById("propertyImgSlider5").innerHTML = "<img src='" + property.photourl + "' alt=''>";

    $("#propertyImg6").attr('href', property.photourl);
    $("#propertyImg6").attr('data-background-image', property.photourl);
    var currStyle6 = $("#propertyImg6").attr('style');
    $("#propertyImg6").attr('style', replaceURLWithThePropertyPicture(currStyle6, property.photourl));
    document.getElementById("propertyImgSlider6").innerHTML = "<img src='" + property.photourl + "' alt=''>";
}

function replaceURLWithThePropertyPicture(currStyle, propertyPhotoURL){

    /*Replaces the substring between parentheses with the following string:

        "(" + propertyPhotoURL + ")"
    */
    return currStyle.replace(/\(.*?[^\)]\)/g, "(" + propertyPhotoURL + ")");
}

function getPropertyMap(property){

    $("#propertyMap").attr("data-latitude", property.latitude);
    $("#propertyMap").attr("data-longitude", property.longitude);

    var googleMapsKey = "AIzaSyDQ-EJE-bBjDQKTJdBlQyuQwNC_CUsIbFM";
    var urlGoogleMaps = "https://www.google.com/maps/embed/v1/place?key=" 
                        + googleMapsKey 
                        + "&q=" + property.latitude + "," + property.longitude;

    $("#newMap").attr('width', '600');
    $("#newMap").attr('height', '450');
    $("#newMap").attr('frameborder', '0');
    $("#newMap").attr('style', 'border:0');
    $("#newMap").attr('src', urlGoogleMaps);
}

function getMyProperties()
{
    try
    {
        alert("token : " + sessionStorage.token);
        var myData = new TokenObject();
        // alert(myData.toJsonString());

        jQuery.ajax({
            type: "POST",
            url: "http://localhost:8080/_ah/api/property_api/v1/property/list",
            // url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // do something

                $("#listProperties").empty();
                // alert(JSON.stringify(response));
                totalProperties = response.data;

                var myTableProperties = "<table class='manage-table responsive-table'>" +
                                        "<tr>" +
                                            "<th><i class='fa fa-file-text'></i> Property</th>" +
                                            // "<th class='expire-date'><i class='fa fa-calendar'></i> Expiration Date</th>" +
                                            "<th></th>" +
                                        "</tr>";

                try{
                                    
                    totalProperties.forEach(function(property){

                        myTableProperties +=    "<tr>" +
                                                    "<td class='title-container'>" + 
                                                    "<img src=" + property.photourl + " alt=''>" +
                                                        "<div class='title'>" +
                                                            "<form action='/getProperty' method='GET'>" +
                                                                "<h4><a>" + property.title + "</a></h4>" +
                                                                "<span class='table-property-price'>$" + property.price + "</span>" +
                                                                "<span>" + property.address + "</span>" +
                                                                "<input type='hidden' name='propertyID' value='" + property.entityKey + "'/>" +
                                                                "<input type='submit' value='View details'/>" +
                                                            "</form>" +
                                                        "</div>" +
                                                    "</td>" +
                                                    // "<td class='expire-date'>December 30, 2016</td>" +
                                                    "<td class='action'>" +
                                                        "<form action='/editProperty' method='GET'>" +
                                                            "<input type='hidden' name='propertyID' value='" + property.entityKey + "'/>" +
                                                            "<input type='submit' value='Edit'/>" +
                                                        "</form>" +
                                                        "<a href='#'><i class='fa  fa-eye-slash'></i> Hide</a>" +
                                                        "<a onclick='deleteProperty(\"" + property.entityKey + "\")' class='delete'><i class='fa fa-remove'></i> Delete</a>" +
                                                    "</td>" +
                                                "</tr>";
                    });
                }
                catch(error){

                    alert(error);
                }

                myTableProperties += "</table>" +
                                     "<a href='/submitProperty' class='margin-top-40 button'>Submit New Property</a>";

                $("#listProperties").append(myTableProperties);
            },
       
            error: function (error) {            
                // error handler
                alert("error :" + error.message)
            }
        });
   }
   catch(error)
   {
        alert(error);
   }
}

function upload()
{
    var file_data = $("#uploaded_file").prop("files")[0];
    var form_data = new FormData();
    form_data.append("uploaded_file", file_data);
    alert("uploading this => " + file_data);

    jQuery.support.cors = true;
    try
    {
        $.ajax({
            url: "/up",
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
            crossDomain: true,
            success: function(response){

                document.getElementById("preview").src = response;
                alert("response" + response);
                sessionStorage.urlImage = response;
                document.getElementById("photourl").value = response;
                alert(sessionStorage.urlImage);
            },

            error: function (error) {            
                // error handler
                alert("WTF!!?? -> error :" + error.message)
            }
        });
    }
    catch(e)
    {
        alert("error : " +  e);
    }
}

function getURLVariables() {
    
    var vars = {};
     
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
         
         vars[key] = value;
    });
 
    return vars;
}

function getPropertyCoords(address, city, state, zipcode){

    var totalAddress = address + "+" + city + "+" + state + "+" + zipcode;
    alert("getPropertyCoords !!!");
    
    jQuery.support.cors = true;
    try
    {
        $.ajax({
            url: "https://maps.google.com/maps/api/geocode/json?address=" + totalAddress + "&key=" + "AIzaSyDQ-EJE-bBjDQKTJdBlQyuQwNC_CUsIbFM",
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            type: 'post',
            crossDomain: true,
            success: function(response){
                
                var googleMapsResponse = JSON.parse(response);
                alert(response);
                var propertyLatitude = googleMapsResponse.results["0"].geometry.location.lat;
                var propertyLongitude = googleMapsResponse.results["0"].geometry.location.lng;

                alert("getPropertyCoords -> propertyLatitude = " + propertyLatitude + "; propertyLongitude = " + propertyLongitude);
                assignPropertyCoords(propertyLatitude, propertyLongitude);
                window.location = "/myProperties";
            },

            error: function (error) {            
                // error handler
                alert("WTF!!?? -> error :" + error.message);
            }
        });
    }
    catch(e)
    {
        alert("error : " +  e);
    }
}

function assignPropertyCoords(propertyLatitude, propertyLongitude){
    
    try
    {
        var urlVariables = getURLVariables();
        propertyKey = urlVariables.propertyID;
        
        var myData = new PropertyObject(entityKey = propertyKey,
                                        title = $("#title").val(),
                                        status = $("#status").val(),
                                        price = $("#price").val(),
                                        address = $("#address").val(),
                                        city = $("#city").val(),
                                        state = $("#state").val(),
                                        zipcode = $("#zipcode").val(),
                                        rooms = $("#rooms").val(),
                                        bathrooms = $("#bathrooms").val(),
                                        propertyType = $("#propertyType").val(),
                                        yearBuilt = $("#yearBuilt").val(),
                                        area = $("#area").val(),
                                        photourl = sessionStorage.urlImage,
                                        description = $("#description").val(),
                                        latitude = propertyLatitude.toString(),
                                        longitude = propertyLongitude.toString());
        
        alert(myData.toJsonString());

        jQuery.ajax({

            type: "POST",
            url: "http://localhost:8080/_ah/api/property_api/v1/property/update",
            // url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/update", //Use this when the website is live
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                    // do something
                    alert (response.code + " " + response.message);
            },
        
            error: function (error) {            
                    // error handler
                    alert("error :" + error.message)
            }
        });
    }
    catch(error)
    {
        alert(error);
    }
}