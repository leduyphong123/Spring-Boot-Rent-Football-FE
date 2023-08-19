$(document).ready(() => {
    $("#editBuisiness").hide();
    $.ajax({
        url: "http://localhost:8080/api/buisiness",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        success: (response) => {
            if(response.status){
                $("#isActive").show();
                $("#stopWorking").hide();
            }else{
                $("#stopWorking").show();
                $("#isActive").hide();
            }
            renderBuisiness(response);
            $("#idBuisiness").val(response.id);
            
        },
        error: (e) => {
            console.log(e);
        }
    })
    hendleClickStatus("#isActive");
    hendleClickStatus("#stopWorking");
 
 
})

function hendleClickStatus(id){
    $(id).click(()=>{
        $.ajax({
            url: "http://localhost:8080/api/buisiness-status/"+$("#idBuisiness").val(),
            type: "post",
            dataType: "json",
            crossDomain: true,
            success: (response) => {
                console.log(response);
                history.go(0);
            },
            error: (e) => {
                console.log(e);
            }
        })
    })
}

function renderBuisiness(data) {
    console.log(data.name);
    let temp = `<div class="mb-2">
                    <span class="fw-bold text-decoration-underline fs-6">Name: </span>
                    <span> ${data.name}</span>
                </div>
                <div class="mb-2">
                    <span class="fw-bold text-decoration-underline fs-6">Date register: </span>
                    <span> ${data.date_create}</span>
                </div>
                <div class="mb-2">
                    <span class="fw-bold text-decoration-underline fs-6">Time open: </span>
                    <span> ${data.time_open}</span>
                </div>
                <div class="mb-2">
                    <span class="fw-bold text-decoration-underline fs-6">Time close: </span>
                    <span> ${data.time_close}</span>
                </div>
                <div class="mb-2">
                    <span class="fw-bold text-decoration-underline fs-6">Address: </span>
                    <span> ${data.address}</span>
                </div>
                <div class="mb-2">
                    <span class="fw-bold text-decoration-underline fs-6">Describes: </span>
                    <span> ${data.describes}</span>
                </div>
                <div class="mb-2">
                    <span class="fw-bold text-decoration-underline fs-6">Description: </span>
                    <div> ${data.description}</div>
                </div>`;
    $("#renderBuisiness").html(temp);           
}


