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

function getUserName()
{       
    var userName = "";

    try
    {
        var myData = new TokenObject();
        $("#userName").empty();

        jQuery.ajax({
            type: "POST",
            // url: "http://localhost:8080/_ah/api/property_api/v1/property/getCurrentUser",
            url: "https://realestate-salvador.appspot.com/_ah/api/usuarios_api/v1/user/getCurrentUser",
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                // do something

                totalUsers = response.data
                totalUsers.forEach(function(user){

                    var email = user.email;
                    var words = email.split("@");
                    var userName = words[0];
                    $("#userName").append(userName);
                });
                            
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