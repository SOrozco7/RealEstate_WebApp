function UserObject(entityKey,
                    email, 
                    password,
                    salt) {

    this.entityKey = entityKey;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.tokenint = sessionStorage.token;

    this.toJsonString = function () { return JSON.stringify(this); };
};

function TokenObject() {

    this.tokenint = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function getPersonalGreeting()
{
//     try
//     {
//         empresaKey = 
//         var myProperty = new PropertyObject(entityKey = empresaKey);

//         jQuery.ajax({
//             type: "POST",
//             // url: "http://localhost:8080/_ah/api/property_api/v1/property/get",
//             url: "https://realestate-salvador.appspot.com/_ah/api/property_api/v1/user/get", //Use this when the website is live
//             data: myProperty.toJsonString(),
//             contentType: "application/json; charset=utf-8",
//             dataType: "json",
//             success: function (response) {
//                 // do something

//                 totalProperties = response.data;
                
//             },
       
//             error: function (error) {            
//                 // error handler
//                 alert("error :" + error.message)
//             }
//         });
//    }
//    catch(error)
//    {
//         alert(error);
//    }
}