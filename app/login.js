// contact
function LoginObject(myEmail, myPasswd) {
    this.email = myEmail;
    this.password = myPasswd;
    this.toJsonString = function () { return JSON.stringify(this); };

};

function loginDemo()
{
	//alert("testing...")
	var myData = new LoginObject($("#email").val(), $("#password").val());
    alert(myData.toJsonString());

	jQuery.ajax({
         
        type: "POST",
        url: "http://localhost:8080/_ah/api/usuarios_api/v1/users/login",
        data: myData.toJsonString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
              // do something
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
