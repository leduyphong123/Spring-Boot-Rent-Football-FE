$(document).ready(()=>{
    callApiHome();


    // callApiOutstanding();
    //vvv

})

function callApiHome(){
    $.ajax({
        url: "http://localhost:8080/api/home",
        type: "GET",
        headers: {Authentication: 'Bearer '},
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success:  (response) =>{
            if(response){
                oneHiddenToTrueRemoveHiddenElement("#userNotLogin","#userLogin");
                callApiIsBuisiness();
              
            }else {
                oneHiddenToTrueRemoveHiddenElement("#userLogin","#userNotLogin");
            }
        },
        error: (e)=>{
            console.log(e);
        }
    });
}
function callApiIsBuisiness(){
    $.ajax({
        url: "http://localhost:8080/api/is-buisiness",
        type: "POST",
        crossDomain: true,
        contentType: 'application/json',
        dataType: "json",
        success:  (response) =>{
            if(response){
                oneHiddenToTrueRemoveHiddenElement("#btnRegisterABusiness","#btnBusinessManagement");
              
            }else {
                oneHiddenToTrueRemoveHiddenElement("#btnBusinessManagement","#btnRegisterABusiness");
            }
        },
        error: (e)=>{
            console.log(e);
        }
    });
}

function oneHiddenToTrueRemoveHiddenElement(idOneElement,idTrueElement){
    $(idOneElement).addClass("hiddenBox");
    $(idTrueElement).removeClass("hiddenBox");
}

