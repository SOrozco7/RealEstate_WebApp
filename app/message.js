function MessageObject(propertyKey,
                       myEmail,
                       myPhone,
                       myText) {

    this.propertyKey = entityKey;
    this.email = myEmail;
    this.phone = myPhone;
    this.text = myText;

    this.toJsonString = function () { return JSON.stringify(this); };
};

function TokenObject() {
    
    this.token = sessionStorage.token;
    this.toJsonString = function () { return JSON.stringify(this); };
}
;
function addMessage()
{
	try
    {   
        var urlVariables = getURLVariables();
        propertyKey = urlVariables.propertyID;
        var myData = new MessageObject(propertyKey = propertyKey,
                                       email = document.getElementById('email').value,
                                       phone = document.getElementById('phone').value,
                                       text = document.getElementById('text').value);

        alert(myData.toJsonString());

        jQuery.ajax({

            type: "POST",
            url: "http://localhost:8080/_ah/api/message_api/v1/message/insert",
            // url: "https://realestate-salvador.appspot.com/_ah/api/message_api/v1/message/insert", //Use this when the website is live
            data: myData.toJsonString(),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                    // do something
                    alert (response.code + " " + response.message);
                    window.location = "/getProperty?propertyID=" + propertyKey;
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

function getURLVariables() {
    
    var vars = {};
     
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
         
         vars[key] = value;
    });
 
    return vars;
}