function uploadDemo()
{
	var file_data = $("#uploaded_file").prop("files")[0];
	var form_data = new FormData();
	form_data.append("uploaded_file", file_data);

	jQuery.support.cors = true;

	try{

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

				document.getElementById("preview").src=response;
				sessionStorage.urlImage = response;
				alert(response)
				document.getElementById("photourl").value = response;
			}});
	}
	catch(e){

		alert("error : " + e);
	}
}