// contact
function LoginObject(myEmail, myPasswd) {
    this.email = myEmail;
    this.password = myPasswd;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function TokenObject() {
    
    this.token = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
};

function loginDemo()
{
	//alert("testing...")
	var myData = new LoginObject($("#email").val(), $("#password").val());
    alert(myData.toJsonString());

	jQuery.ajax({
         
        type: "POST",
        url: "http://localhost:8080/_ah/api/usuarios_api/v1/user/login",
        // url: "https://realestate-salvador.appspot.com/_ah/api/usuarios_api/v1/user/login",
        data: myData.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
              // do something
              sessionStorage.clear();
              sessionStorage.token = response.token;
              alert ("token generado: " + sessionStorage.token);
              window.location = "/";
        },
     
        error: function (error) {            
              // error handler
              alert(error)
        }
    });
}

function logout()
{
    var myData = new TokenObject();

	jQuery.ajax({
         
        type: "POST",
        url: "http://localhost:8080/_ah/api/usuarios_api/v1/user/logout",
        // url: "https://realestate-salvador.appspot.com/_ah/api/usuarios_api/v1/user/logout",
        data: myData.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
              // do something
              sessionStorage.clear();
              sessionStorage.token = response.token;
              window.location = "/";
              sessionStorage.token = null;
        },
     
        error: function (error) {            
              // error handler
              alert(error);
        }
    });
}
