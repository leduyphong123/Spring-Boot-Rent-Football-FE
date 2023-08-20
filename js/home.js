$(document).ready(()=>{
    callApiHome();
    callApiHomeNew();
    callApiHomeLike();
    callApiHomeView();
    // callApiOutstanding();
    //vvv

})

function callApiHomeNew(){
    $.ajax({
        url: "http://localhost:8080/api/home/new",
        type: "GET",
        headers: {Authentication: 'Bearer '},
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success:  (response) =>{
          console.log(response);
          renderHomeNew(response,"#renderHomeNew");
        },
        error: (e)=>{
            console.log(e);
        }
    });
}
function renderHomeNew(response,idRender){
    let temp="";
    if(response.length == null || response.length == ""){
     temp= `<div class="text-center"> No List</div>`
    }else{
     for(let i=0;i<response.length;i++){
       temp +=` <div class="carousel-item active">
       <img src="${response[i].img}" class="d-block w-100" alt="Wild Landscape" style="height: 775px;"/>
       <div class="carousel-caption d-none d-md-block">
         <h5>${response[i].name}</h5>
         <p>${response[i].describes}</p>
         <a href='#!' class='btn btn-primary'>See</a>
       </div>
     </div>`;
     }
    }
    $(idRender).html(temp);
    
}
function callApiHomeView(){
    $.ajax({
        url: "http://localhost:8080/api/home/view",
        type: "GET",
        headers: {Authentication: 'Bearer '},
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success:  (response) =>{
          renderHomeLikeView(response,"#renderHomeView");
        },
        error: (e)=>{
            console.log(e);
        }
    });
}

function callApiHomeLike(){
    $.ajax({
        url: "http://localhost:8080/api/home/like",
        type: "GET",
        headers: {Authentication: 'Bearer '},
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success:  (response) =>{
          renderHomeLikeView(response,"#renderHomeLike");
        },
        error: (e)=>{
            console.log(e);
        }
    });
}

function renderHomeLikeView(response,idRender){
    let temp="";
   if(response.length == null || response.length == ""){
    temp= `<div class="text-center"> No List</div>`
   }else{
    for(let i=0;i<response.length;i++){
      temp+=`<div class='col-3'>
      <div class='card' style='position: relative;'>
          <div class='like-box text-center'>
              <i class='fa-solid fa-heart'></i>
              <div>${response[i].likes}</div>
          </div>
          <div class='bg-image hover-overlay ripple' data-mdb-ripple-color='light'>
              <img src='${response[i].img}' class='img-fluid' />
              <a href='#!'>
                  <div class='mask' style='background-color: rgba(251, 251, 251, 0.15);'></div>
              </a>
          </div>
          <div class='card-body'>
              <h5 class='card-title'>${response[i].name}</h5>
              <p class='card-text mb-1'>${response[i].describes}.</p>
              <div class='d-flex mb-2 hover-link '>
                  <div class='' style='margin-right: 10px;'>${response[i].views}</div>
                  <div>View</div>
              </div>
              <a href='#!' class='btn btn-primary'>See</a>
          </div>
      </div>
  </div>`;
    }
   }
   $(idRender).html(temp);

}

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

