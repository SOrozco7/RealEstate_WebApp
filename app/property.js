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
                        myDescription) {
    
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
    this.tokenint = sessionStorage.token;

    this.toJsonString = function () { return JSON.stringify(this); };
};

function TokenObject() {
    
    this.tokenint = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function addProperty()
{
	try
    {
        alert("token : " + sessionStorage.token);
        
        var myData = new PropertyObject(entityKey = "!!??",
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
                                        description = $("#description").val());
        
        alert(myData.toJsonString());

        jQuery.ajax({

            type: "POST",
            // url: "http://localhost:8080/_ah/api/property_api/v1/property/insert",
            url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/insert", //Use this when the website is live
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                    // do something
                    alert (response.code + " " + response.message);
                    window.location = "/myProperties";
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

function showEditProperty(propertyKey)
{
	try
    {
        alert("sessionStorage.token = " + sessionStorage.token);
        var myProperty = new PropertyObject(entityKey = propertyKey);
        alert("myProperty.toJsonString() = " + myProperty.toJsonString());

        jQuery.support.cors = true;

        jQuery.ajax({

            type: "GET",
            // url: "http://localhost:8080/_ah/api/property_api/v1/property/showupdate",
            url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/showupdate", //Use this when the website is live
            data: myProperty.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // do something
                // alert (response.code + " " + response.message);
                window.location = "/editProperty";
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

function editProperty(propertyKey)
{
	try
    {
        alert("token : " + sessionStorage.token);
        
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
                                        description = $("#description").val());
        
        alert(myData.toJsonString());

        jQuery.ajax({

            type: "POST",
            // url: "http://localhost:8080/_ah/api/property_api/v1/property/update",
            url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/update", //Use this when the website is live
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

function deleteProperty(propertyKey)
{
	try
    {   
        var myProperty = new PropertyObject(entityKey = propertyKey);
        alert("myProperty.toJsonString() = " + myProperty.toJsonString());

        jQuery.support.cors = true;

        jQuery.ajax({

            type: "POST",
            // url: "http://localhost:8080/_ah/api/property_api/v1/property/delete",
            url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/delete", //Use this when the website is live
            data: myProperty.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // do something
                alert (response.code + " " + response.message);
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

function getProperty()
{
    try
    {
        var urlVariables = getURLVariables();
        propertyKey = urlVariables.propertyID;
        var myProperty = new PropertyObject(entityKey = propertyKey);

        jQuery.ajax({
            type: "POST",
            // url: "http://localhost:8080/_ah/api/property_api/v1/property/get",
            url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/get", //Use this when the website is live
            data: myProperty.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // do something

                totalProperties = response.data;
                $("#property").empty();

                var myProperty = "";

                totalProperties.forEach(function(property){

                    getPropertyTitleBar(property);
                    getPropertyPictures(property);

                    myProperty += "<!-- Property Description -->" + 
                                "<div class='property-description'>" + 
                                    "<!-- Main Features -->" + 
                                    "<ul class='property-main-features'>" +
                                        "<li>Area <span>" + property.area + " m^2</span></li>" + 
                                        "<li>Rooms <span>" + property.rooms + "</span></li>" + 
                                        // "<li>Bedrooms <span>2</span></li>" + 
                                        "<li>Bathrooms <span>" + property.bathrooms + "</span></li>" +
                                    "</ul>" +

                                    "<!-- Description -->" +
                                    "<h3 class='desc-headline'>Description</h3>" + 
                                    "<div class='show-more'>" +
                                        "<p>" + property.description + " <br><br><br><br> </p>" +
                                        "<a href='#' class='show-more-button'>Show More <i class='fa fa-angle-down'></i></a>" +
                                    "</div>" + 

                                    "<!-- Details -->" +
                                    "<h3 class='desc-headline'>Details</h3>" + 
                                    "<ul class='property-features margin-top-0'>" + 
                                        "<li>Built in: <span>" + property.yearBuilt + "</span></li>" +
                                        "<li>Parking: <span>Attached Garage</span></li>" +
                                        "<li>Cooling: <span>Central Cooling</span></li>" +
                                        "<li>Heating: <span>Forced Air, Gas</span></li>" +
                                        "<li>Sewer: <span>Public/City</span></li>" +
                                        "<li>Water: <span>City</span></li>" +
                                        "<li>Exercise Room: <span>Yes</span></li>" +
                                        "<li>Storage Room: <span>Yes</span></li>" +
                                    "</ul>" +

                                    // "<!-- Features -->" +
                                    // "<h3 class='desc-headline'>Features</h3>" +
                                    // "<ul class='property-features checkboxes margin-top-0'>" +
                                    //     "<li>Air Conditioning</li>" +
                                    //     "<li>Swimming Pool</li>" +
                                    //     "<li>Central Heating</li>" +
                                    //     "<li>Laundry Room</li>" +
                                    //     "<li>Gym</li>" +
                                    //     "<li>Alarm</li>" +
                                    //     "<li>Window Covering</li>" +
                                    //     "<li>Internet</li>" +
                                    // "</ul>" +

                                    // "<!-- Floorplans -->" +
                                    // "<h3 class='desc-headline no-border'>Floorplans</h3>" +
                                    // "<!-- Accordion -->" +
                                    // "<div class='style-1 fp-accordion'>" +
                                    //     "<div class='accordion'>" +
                
                                    //         "<h3>First Floor <span>460 sq ft</span> <i class='fa fa-angle-down'></i> </h3>" +
                                    //         "<div>" +
                                    //             "<a class='floor-pic mfp-image' href='https://i.imgur.com/kChy7IU.jpg'>" +
                                    //                 "<img src='https://i.imgur.com/kChy7IU.jpg' alt=''>" +
                                    //             "</a>" +
                                    //             "<p>Mauris mauris ante, blandit et, ultrices a, susceros. Nam mi. Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque vulputate aliquam egestas litora torquent conubia.</p>" +
                                    //         "</div>" +
                    
                                    //         "<h3>Second Floor <span>440 sq ft</span> <i class='fa fa-angle-down'></i></h3>" +
                                    //         "<div>" +
                                    //             "<a class='floor-pic mfp-image' href='https://i.imgur.com/l2VNlwu.jpg'>" +
                                    //                 "<img src='https://i.imgur.com/l2VNlwu.jpg' alt=''>" +
                                    //             "</a>" +
                                    //             "<p>Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet purus vivamus hendrerit, dolor at aliquet laoreet, mauris turpis porttitor velit, faucibus interdum tellus libero ac justo. Vivamus non quam. Nullam laoreet, velit ut taciti sociosqu condimentum feugiat.</p>" +
                                    //         "</div>" +
                    
                                    //         "<h3>Garage <span>140 sq ft</span> <i class='fa fa-angle-down'></i></h3>" +
                                    //         "<div>" +
                                    //             "<a class='floor-pic mfp-image' href='https://i.imgur.com/0zJYERy.jpg'>" +
                                    //                 "<img src='https://i.imgur.com/0zJYERy.jpg' alt=''>" +
                                    //             "</a>" +
                                    //         "</div>" +
                    
                                    //     "</div>" +
                                    // " </div>" +
                        
                                    // "<!-- Video -->" +
                                    // "<h3 class='desc-headline no-border'>Video</h3>" +
                                    // "<div class='responsive-iframe'>" +
                                    //     "<iframe width='560' height='315' src='https://www.youtube-nocookie.com/embed/UPBJKppEXoQ?rel=0&amp;showinfo=0' frameborder='0' allowfullscreen></iframe>" +
                                    // "</div>" +
                        
                                    "<!-- Location -->" +
                                    "<h3 class='desc-headline no-border' id='location'>Location</h3>" +
                                    "<div id='propertyMap-container'>" +
                                        "<div id='propertyMap' data-latitude='40.7427837' data-longitude='-73.11445617675781'></div>" +
                                        "<a href='#' id='streetView'>Street View</a>" +
                                    "</div>" +

                                    "<!-- Similar Listings Container -->" +
                                    "<h3 class='desc-headline no-border margin-bottom-35 margin-top-60'>Similar Properties</h3>" +

                                    "<!-- Layout Switcher -->" +
                    
                                    "<div class='layout-switcher hidden'><a href='#' class='list'><i class='fa fa-th-list'></i></a></div>" +
                                    "<div class='listings-container list-layout'>" +
                    
                                        "<!-- Listing Item -->" +
                                        "<div class='listing-item'>" +
                    
                                            "<a href='#' class='listing-img-container'>" +
                    
                                                "<div class='listing-badges'>" +
                                                    "<span>For Rent</span>" +
                                                "</div>" +
                    
                                                "<div class='listing-img-content'>" +
                                                    "<span class='listing-price'>$1700 <i>monthly</i></span>" +
                                                    "<span class='like-icon'></span>" +
                                                "</div>" +
                    
                                                "<img src='images/listing-03.jpg' alt=''>" +
                    
                                            "</a>" +
                                            
                                            "<div class='listing-content'>" +
                    
                                                "<div class='listing-title'>" +
                                                    "<h4><a href='#'>Meridian Villas</a></h4>" +
                                                    "<a href='https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom' class='listing-address popup-gmaps'>" +
                                                        "<i class='fa fa-map-marker'></i>" +
                                                        "778 Country St. Panama City, FL" +
                                                    "</a>" +
                    
                                                    "<a href='#' class='details button border'>Details</a>" +
                                                "</div>" +
                    
                                                "<ul class='listing-details'>" +
                                                    "<li>1450 sq ft</li>" +
                                                    "<li>1 Bedroom</li>" +
                                                    "<li>2 Rooms</li>" +
                                                    "<li>2 Rooms</li>" +
                                                "</ul>" +
                    
                                                "<div class='listing-footer'>" +
                                                    "<a href='#'><i class='fa fa-user'></i> Chester Miller</a>" +
                                                    "<span><i class='fa fa-calendar-o'></i> 4 days ago</span>" +
                                                "</div>" +
                    
                                            "</div>" +
                                            "<!-- Listing Item / End -->" +
                    
                                        "</div>" +
                                        "<!-- Listing Item / End -->" +
                    
                    
                                        "<!-- Listing Item -->" +
                                        "<div class='listing-item'>" +
                    
                                            "<a href='#' class='listing-img-container'>" +
                    
                                                "<div class='listing-badges'>" +
                                                    "<span>For Sale</span>" +
                                                "</div>" +
                    
                                                "<div class='listing-img-content'>" +
                                                    "<span class='listing-price'>$420,000 <i>$770 / sq ft</i></span>" +
                                                    "<span class='like-icon'></span>" +
                                                "</div>" +
                    
                                                "<div><img src='images/listing-04.jpg' alt=''></div>" +
                    
                                            "</a>" +
                                            
                                            "<div class='listing-content'>" +
                    
                                                "<div class='listing-title'>" +
                                                    "<h4><a href='#'>Selway Apartments</a></h4>" +
                                                    "<a href='https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom' class='listing-address popup-gmaps'>" +
                                                        "<i class='fa fa-map-marker'></i>" +
                                                        "33 William St. Northbrook, IL" +
                                                    "</a>" +
                    
                                                    "<a href='#' class='details button border'>Details</a>" +
                                                "</div>" +
                    
                                                "<ul class='listing-details'>" +
                                                    "<li>540 sq ft</li>" +
                                                    "<li>1 Bedroom</li>" +
                                                    "<li>3 Rooms</li>" +
                                                    "<li>2 Bathroom</li>" +
                                                "</ul>" +
                    
                                                "<div class='listing-footer'>" +
                                                    "<a href='#'><i class='fa fa-user'></i> Kristen Berry</a>" +
                                                    "<span><i class='fa fa-calendar-o'></i> 3 days ago</span>" +
                                                "</div>" +
                    
                                            "</div>" +
                                            "<!-- Listing Item / End -->" +
                    
                                        "</div>" +
                                        "<!-- Listing Item / End -->" +
                    
                                        "<!-- Listing Item -->" +
                                        "<div class='listing-item'>" +
                    
                                            "<a href='#' class='listing-img-container'>" +
                                                "<div class='listing-badges'>" +
                                                    "<span>For Sale</span>" +
                                                "</div>" +
                    
                                                "<div class='listing-img-content'>" +
                                                    "<span class='listing-price'>$535,000 <i>$640 / sq ft</i></span>" +
                                                    "<span class='like-icon'></span>" +
                                                "</div>" +
                    
                                                "<img src='images/listing-05.jpg' alt=''>" +
                                            "</a>" +
                                            
                                            "<div class='listing-content'>" +
                    
                                                "<div class='listing-title'>" +
                                                    "<h4><a href='#'>Oak Tree Villas</a></h4>" +
                                                    "<a href='https://maps.google.com/maps?q=221B+Baker+Street,+London,+United+Kingdom&hl=en&t=v&hnear=221B+Baker+St,+London+NW1+6XE,+United+Kingdom' class='listing-address popup-gmaps'>" +
                                                        "<i class='fa fa-map-marker'></i>" +
                                                        "71 Lower River Dr. Bronx, NY" +
                                                    "</a>" +
                    
                                                    "<a href='' class='details button border'>Details</a>" +
                                                "</div>" +
                    
                                                "<ul class='listing-details'>" +
                                                    "<li>350 sq ft</li>" +
                                                    "<li>1 Bedroom</li>" +
                                                    "<li>2 Rooms</li>" +
                                                    "<li>1 Bathroom</li>" +
                                                "</ul>" +
                    
                                                "<div class='listing-footer'>" +
                                                    "<a href='#'><i class='fa fa-user'></i> Mabel Gagnon</a>" +
                                                    "<span><i class='fa fa-calendar-o'></i> 4 days ago</span>" +
                                                "</div>" +
                    
                                            "</div>" +
                                            "<!-- Listing Item / End -->" +
                    
                                        "</div>" +
                                        "<!-- Listing Item / End -->" +
                    
                                    "</div>" +
                                    "<!-- Similar Listings Container / End -->" +

                                "</div>" +
                                "<!-- Property Description / End -->";
                });

                $("#property").append(myProperty);
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

    $("#titlebar").empty();

    var titleBar = "";
    titleBar += "<div class='container'>" + 
                    "<div class='row'>" + 
                        "<div class='col-md-12'>" + 
                            
                            "<a href='listings-list-with-sidebar.html' class='back-to-listings'></a>" + 
                            "<div class='property-title'>" + 
                                "<h2>" + property.title + "<span class='property-badge'>For Sale</span></h2>" + 
                                "<span>" + 
                                    "<a href='#location' class='listing-address'>" + 
                                        "<i class='fa fa-map-marker'></i>" + 
                                        property.address + 
                                    "</a>" + 
                                "</span>" + 
                            "</div>" + 

                            "<div class='property-pricing'>" + 
                                "<div class='property-price'>$" + property.price + "</div>" + 
                                "<div class='sub-price'>$" + parseFloat(property.price/property.area).toFixed(2) + " / m^2 </div>" + 
                            "</div>" + 
                        "</div>" + 
                    "</div>" + 
                "</div>";

    $("#titlebar").append(titleBar);
}

function getPropertyPictures(property){

    $("#propertyPictures").empty();
    var propertyPictures = "";

    propertyPictures += "<div class='row margin-bottom-50'>" + 
                            "<div class='col-md-12'>" + 
                            
                                "<!-- Slider -->" + 
                                "<div class='property-slider default'>" + 
                                    "<a href='" + property.photourl + "' data-background-image='" + property.photourl + "' class='item mfp-gallery'></a>" +
                                "</div>" + 

                                "<!-- Slider Thumbs -->" + 
                                "<div class='property-slider-nav'>" + 
                                    "<div class='item'><img src='" + property.photourl + "' alt=''></div>" + 
                                "</div>" + 

                            "</div>" + 
                        "</div>";

    $("#propertyPictures").append(propertyPictures);
}

function getMyProperties()
{
    try
    {
        //alert("token : " + sessionStorage.token);
        var myData = new TokenObject();
        alert(myData.toJsonString());

        jQuery.ajax({
            type: "POST",
            // url: "http://localhost:8080/_ah/api/property_api/v1/property/list",
            url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/property/list",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // do something
                alert (response.data);

                $("#listProperties").empty();
                totalProperties = response.data;
                // alert(response);

                var myTableProperties = "<table class='manage-table responsive-table'>" +
                                        "<tr>" +
                                            "<th><i class='fa fa-file-text'></i> Property</th>" +
                                            // "<th class='expire-date'><i class='fa fa-calendar'></i> Expiration Date</th>" +
                                            "<th></th>" +
                                        "</tr>";
                                    
                totalProperties.forEach(function(property){

                    myTableProperties +=    "<tr>" +
                                                "<td class='title-container'>" + 
                                                "<img src=" + property.photourl + " alt=''>" +
                                                    "<div class='title'>" +
                                                        "<form action='/getProperty' method='GET'>" +
                                                            "<h4><a>" + property.title + "</a></h4>" +
                                                            "<span class='table-property-price'>$" + property.price + "</span>" +
                                                            "<span>" + property.address + "</span>" +
                                                            "<input type='hidden' name='propertyID' value='" + property.entityKey+ "'/>" +
                                                            "<input type='submit' value='View details'/>" +
                                                        "</form>" +
                                                    "</div>" +
                                                "</td>" +
                                                // "<td class='expire-date'>December 30, 2016</td>" +
                                                "<td class='action'>" +
                                                    "<a onclick='showEditProperty(\"" + property.entityKey + "\")'><i class='fa fa-pencil'></i> Edit</a>" +
                                                    "<a href='#'><i class='fa  fa-eye-slash'></i> Hide</a>" +
                                                    "<a onclick='deleteProperty(\"" + property.entityKey + "\")' class='delete'><i class='fa fa-remove'></i> Delete</a>" +
                                                "</td>" +
                                            "</tr>";
                });

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
                document.getElementById("url_photo").value = response;
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