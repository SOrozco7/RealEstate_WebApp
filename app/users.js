function User()
{
  this.email = "";
  this.password = "";
  this.nickname = "";
  this.age = 0;
  this.photourl = "";
};

function insertUser()
{
  try
  {
    var val_email = $('#email').val();
    var val_password = $('#password').val();
    var val_nickname = $('#nickname').val();
    var val_age = $('#age').val();
    var val_photourl = sessionStorage.urlImage;

    var myUser = new User();
    myUser.email = val_email;
    myUser.password = val_password;
    myUser.nickname = val_nickname;
    myUser.age = val_age;
    myUser.photourl = val_photourl;

    var form_data = new FormData();
    form_data.append("email", myUser.email);
    form_data.append("password", myUser.password);
    form_data.append("nickname", myUser.nickname);
    form_data.append("age", myUser.age);
    form_data.append("photourl", myUser.photourl);

    jQuery.support.cors = true; //CORS -> Cross-Origin Resource Sharing 

    jQuery.ajax({
      url: "/createUser",
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: "post",
      crossDomain: true,
      success: function(response){

        // alert("key generada " + response);
        $('#email').val(String.empty);
        $('#pass').val(String.empty);
        $('#nickname').val(String.empty);
        $('#age').val(String.empty);
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
}

function getAllUsers()
{
  jQuery.support.cors = true;

  try
  {
    $.ajax({
      url: "/readAllUsers",
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      type: 'get',
      crossDomain: true,
      success: function(response){

        $("#listUsers").empty();
        users = response;
        // alert(response);

        var myTableUsers="<table class='table table-striped table-advanced table-hover'>" +
          " <tbody id='devices'> " +
          "  <tr> " + 
          "    <th> </th> " +
          // "    <th> entityKey </th> " +
          "    <th> Photo </th> " +
          "    <th> Email </th> " +
          "    <th> Password </th> " +
          "    <th> Nickname </th> " +
          "    <th> Delete </th> " +
          "  </tr> ";

        users.forEach(function(user)
        {
          myTableUsers += "<tr> " + 
                          "<td>" +
          "<button onclick='getOneUser(\"" + user.id + "\")' class='btn btn-primary' > " + 
          "<i class='fa fa fa-ban'></i> Edit </button> " + 
            "</td>" +
            // "<td > " + user.id + " </td> " + 
            "<td > " + "<img src=\"" + user.photourl + "\" style=\"width:128px;height:128px;\">" +
            "<td > " + user.email + "</td> " +
            "<td > " + user.password + "</td> " +
            "<td > " + user.nickname + "</td> " + 
            "<td>" +
          "<button onclick='deleteUser(\"" + user.id + "\")' class='btn btn-danger'> " + 
          "<i class='fa fa fa-ban'></i> Delete </button>" + 
            "</td>" + 
            "</div> " +
            "</td> " +
            "</tr> ";
        });

        myTableUsers += "</tbody>" + "</table>";
        $("#listUsers").append(myTableUsers);
      }
    });
  }
  catch(e)
  {
    alert("error : " + e);
  }
}

function getOneUser(userKey)
{
  // alert(userKey);
  jQuery.support.cors =  true;
  try {
    $.ajax({
      url: "/readOneUser",
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: true,
      data: {"key": userKey},
      type: 'get',
      crossDomain: true,
      success : function(response){

        $('#email').val(response.email);
        $('#password').val(response.password);
        $('#nickname').val(response.nickname);
        $('#age').val(response.age);
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

function updateUser()
{
  try
  {
    var myKeyUpdate = sessionStorage['keyUpdate'];
    // alert(myKeyUpdate);

    var val_email = $('#email').val();
    var val_password = $('#password').val();
    var val_nickname = $('#nickname').val();
    var val_age = $('#age').val();
    var val_photourl = $('#photourl').val();

    var myUserUpdate = new User();
    myUserUpdate.email = val_email;
    myUserUpdate.password = val_password;
    myUserUpdate.nickname = val_nickname;
    myUserUpdate.age = val_age;
    myUserUpdate.photourl = val_photourl;

    var form_data = new FormData();
    form_data.append("key", myKeyUpdate);
    form_data.append("email", myUserUpdate.email);
    form_data.append("password", myUserUpdate.password);
    form_data.append("nickname", myUserUpdate.nickname);
    form_data.append("age", myUserUpdate.age);
    form_data.append("photourl", myUserUpdate.photourl);

    jQuery.support.cors = true;

    jQuery.ajax({

      url: "/updateUser",
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: "post",
      crossDomain: true,
      success: function(response){

        // alert("key updated : " + response);
        $('#email').val(String.empty);
        $('#password').val(String.empty);
        $('#nickname').val(String.empty);
        $('#age').val(String.empty);
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
}

function deleteUser(userKey){

  try{

    // alert(userKey);
    var form_data = new FormData();
    form_data.append("key", userKey);

    jQuery.support.cors = true;
    jQuery.ajax({

      url: "/deleteUser",
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
}