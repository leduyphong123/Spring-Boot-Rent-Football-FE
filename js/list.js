$(document).ready(() => {
    callApiBuisinessList();
    
    $("#searchAddess").on("input",()=>{
        let address = $("#searchAddess").val();
        let requestParam = getParamSort();
        let sreach = address == null ? "" : address;
        let param = requestParam == null ? "":requestParam[3];
        let sor = requestParam[5] == null ? "" : requestParam[5];
        let pageIndex= requestParam[7] == null ? "" : requestParam[7];
        history.pushState(null, null, `?search=${sreach}&param=${param}&sor=${sor}&page=${pageIndex}`);

        $.ajax({
            url: `http://localhost:8080/api/buisiness/list?search=${sreach}&param=${param}&sor=${sor}&page=${pageIndex}`,
            type: "GET",
            crossDomain: true,
            contentType: 'application/json',
            dataType: "json",
            success: (response) => {
                renderBuisiness(response.content, "#renderBuisiness");
                renderPaging(response.totalPages, response.pageable.pageNumber);
            },
            error: (e) => {
                console.log(e);
            }
        })
    })
})
function callApiBuisinessList(){
    
    let requestParam = getParamSort();
    let sreach = requestParam == null ? "" : requestParam[1];
    let param = requestParam == null ? "":requestParam[3];
    let sor = requestParam[5] == null ? "" : requestParam[5];
    let pageIndex= requestParam[7] == null ? "" : requestParam[7];
    $.ajax({
        url: `http://localhost:8080/api/buisiness/list?search=${sreach}&param=${param}&sor=${sor}&page=${pageIndex}`,
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        dataType: "json",
        success: (response) => {
            renderBuisiness(response.content, "#renderBuisiness");
            renderPaging(response.totalPages, response.pageable.pageNumber);
        },
        error: (e) => {
            console.log(e);
        }
    })
}
function renderPaging(totalPages, pageNumber) {
    let temp = " <ul class='pagination'>";
    if (pageNumber == 0) {
        temp += `<li class='page-item disabled'><a class="page-link" onclick="pageRenderPitch(${pageNumber})" tabindex="-1" aria-disabled="true">Previous</a>`
            + "</li>";
    } else {
        temp += `<li class='page-item '><a class="page-link" onclick="pageRenderPitch(${pageNumber - 1})" tabindex="-1" >Previous</a>`
            + "</li>";
    }

    for (let i = 0; i < totalPages; i++) {
        if (i == pageNumber) {
            temp += ` <li class="page-item active" aria-current="page">
            <a class="page-link" onclick="pageRenderPitch(${pageNumber})">${i + 1} <span class="visually-hidden">(current)</span></a>
        </li>`;
        } else if (totalPages - 6 > 1) {
            temp += `<li class="page-item">.</li>`;
            continue;
        }
        else {
            temp += `<li class="page-item"><a class="page-link" onclick="pageRenderPitch(${i})">${i + 1}</a></li>`;
        }

    }
    if (pageNumber == totalPages - 1) {
        temp += `<li class="page-item disabled">
                        <a class="page-link" onclick="pageRenderPitch(${pageNumber})" aria-disabled="true">Next</a>
                 </li>
                </ul>`;
    } else {
        temp += `<li class="page-item">
                        <a class="page-link" onclick="pageRenderPitch(${pageNumber + 1})"">Next</a>
                    </li>
                </ul>`;
    }
    $("#paging").html(temp);
}
function getParamSort() {

    if (window.location.href.search("\\?") < 0) {
        return null;
    } else {
        let temp = window.location.href.split("?");
        let tempAnd = temp[1].split("&");
        let requestParam = [];
        let array;
        for (let i = 0; i < tempAnd.length; i++) {
            array = tempAnd[i].split("=");
            for (let i = 0; i < array.length; i++) {
                requestParam.push(array[i]);
            }
        }
        return requestParam;
    }

}

function renderBuisiness(response, idRender) {
    let temp = `<div class="d-flex justify-content-evenly mb-5">`;
    let count = 0;
    if (response.length == null || response.length == "") {
        temp = `<div class="text-center"> No List</div>`;
    } else {
        for (let i = 0; i < response.length; i++) {
            if (count % 3 == 0) {
                temp += `</div>`;
                temp += `<div class="d-flex justify-content-evenly mb-5">`;
            }
            temp += `<div class='col-3'>
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
              <a  onclick="nextDetails(${response[i].id})" class='btn btn-primary'>See</a>
          </div>
      </div>
  </div>`;
            count++;
        }
    }
    $(idRender).html(temp);

}
