function Company()
{ 
  this.name = "";
  this.address = "";
  this.RFC = "";
  this.photourl = "";
};

function insertCompany()
{
  try
  {
    var val_name = $('#name').val();
    var val_address = $('#address').val();
    var val_RFC = $('#RFC').val();
    var val_photourl = sessionStorage.urlImage;

    var myCompany = new Company();
    myCompany.name = val_name;
    myCompany.address = val_address;
    myCompany.RFC = val_RFC;
    myCompany.photourl = val_photourl;

    var form_data = new FormData();
    form_data.append("name", myCompany.name);
    form_data.append("address", myCompany.address);
    form_data.append("RFC", myCompany.RFC);
    form_data.append("photourl", myCompany.photourl);

    jQuery.support.cors = true; //CORS -> Cross-Origin Resource Sharing 

    jQuery.ajax({
      url: "/createCompany",
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: "post",
      crossDomain: true,
      success: function(response){

        // alert("key generada " + response);
        $('#name').val(String.empty);
        $('#address').val(String.empty);
        $('#RFC').val(String.empty);
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

function getAllCompanies()
{
  jQuery.support.cors = true;

  try
  {
    $.ajax({
      url: "/readAllCompanies",
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: false,
      type: 'get',
      crossDomain: true,
      success: function(response){

        $("#listCompanies").empty();
        totalCompanies = response;
        // alert(response);

        var myTableCompanies = "<table class='table table-striped table-advanced table-hover'>" +
          " <tbody id='devices'> " +
          "  <tr> " + 
          "    <th> </th> " +
          // "    <th> entityKey </th> " +
          "    <th> Photo </th> " +
          "    <th> Name </th> " + 
          "    <th> Address </th> " + 
          "    <th> RFC </th> " + 
          "    <th> Delete </th> " +
          "  </tr> ";

        totalCompanies.forEach(function(company)
        {
          myTableCompanies += "<tr> " + 
                          "<td>" +
          "<button onclick='getOneCompany(\"" + company.id + "\")' class='btn btn-primary' > " + 
          "<i class='fa fa fa-ban'></i> Edit </button> " + 
            "</td>" +
            // "<td > " + company.id + " </td> " + 
            "<td > " + "<img src=\"" + company.photourl + "\" style=\"width:128px;height:128px;\">" +
            "<td > " + company.name + "</td> " + 
            "<td > " + company.address + "</td> " + 
            "<td > " + company.RFC + "</td> " + 
            "<td>" +
          "<button onclick='deleteCompany(\"" + company.id + "\")' class='btn btn-danger'> " + 
          "<i class='fa fa fa-ban'></i> Delete </button>" + 
            "</td>" + 
            "</div> " +
            "</td> " +
            "</tr> ";
        });

        myTableCompanies += "</tbody>" + "</table>";
        $("#listCompanies").append(myTableCompanies);
      }
    });
  }
  catch(e)
  {
    alert("error : " + e);
  }
}

function getOneCompany(companyKey)
{
  // alert(companyKey);
  jQuery.support.cors = true;
  try {
    $.ajax({
      url: "/readOneCompany",
      dataType: 'json',
      cache: false,
      contentType: false,
      processData: true,
      data: {"key": companyKey},
      type: 'get',
      crossDomain: true,
      success : function(response){

        $('#name').val(response.name);
        $('#address').val(response.address);
        $('#RFC').val(response.RFC);
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

function updateCompany()
{
  try
  {
    var myKeyUpdate = sessionStorage['keyUpdate'];
    // alert(myKeyUpdate);

    var val_name = $('#name').val();
    var val_address = $('#address').val();
    var val_RFC = $('#RFC').val();
    var val_photourl = $('#photourl').val();

    var myCompanyUpdate = new Company();
    myCompanyUpdate.name = val_name;
    myCompanyUpdate.address = val_address;
    myCompanyUpdate.RFC = val_RFC;
    myCompanyUpdate.photourl = val_photourl;

    var form_data = new FormData();
    form_data.append("key", myKeyUpdate);
    form_data.append("name", myCompanyUpdate.name);
    form_data.append("address", myCompanyUpdate.address);
    form_data.append("RFC", myCompanyUpdate.RFC);
    form_data.append("photourl", myCompanyUpdate.photourl);

    jQuery.support.cors = true;

    jQuery.ajax({

      url: "/updateCompany",
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      type: "post",
      crossDomain: true,
      success: function(response){

        // alert("key updated : " + response);
        $('#name').val(String.empty);
        $('#address').val(String.empty);
        $('#RFC').val(String.empty);
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

function deleteCompany(companyKey){

  try{

    // alert(companyKey);
    var form_data = new FormData();
    form_data.append("key", companyKey);

    jQuery.support.cors = true;
    jQuery.ajax({

      url: "/deleteCompany",
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