$(document).ready(()=>{
    $.ajax({
        url: "http://localhost:8080/api/buisiness",
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        dataType: "json",
        success:  (response) =>{
           renderDataById(response.name,"#idName");
           renderDataById(response.time_open,"#timeOpen");
           renderDataById(response.time_close,"#timeClose");
           renderDataById(response.likes,"#like");
           renderDataById(response.views,"#view");
           renderDataById(response.totalPitch,"#pitchSize");
           renderDataById(response.describes,"#descibe");
           renderDataById(response.description,"#description");
        },
        error: (e)=>{
            console.log(e);
        }
    })
})

function renderDataById(data,idName){
    $(idName).html(data);
}