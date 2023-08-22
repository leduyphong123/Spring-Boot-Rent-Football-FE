import { messageBox, SUCCESS, ERROR } from "./messageBox.js";

$(document).ready(() => {
    let idBuisiness = window.location.href.split("=");
    $.ajax({
        url: "http://localhost:8080/api/buisiness?id="+idBuisiness[1],
        type: "GET",
        crossDomain: true,
        contentType: 'application/json',
        headers: {Authorization: 'Bearer '+window.localStorage.getItem("token")},
        dataType: "json",
        success: (response) => {
            renderDataById(response.name, "#idName");
            renderDataById(response.time_open, "#timeOpen");
            renderDataById(response.time_close, "#timeClose");
            renderDataById(response.likes, "#like");
            renderDataById(response.views, "#view");
            renderDataById(response.totalPitch, "#pitchSize");
            renderDataById(response.describes, "#descibe");
            renderDataById(response.description, "#description");
        },
        error: (e) => {
            console.log(e);
        }
    })
    $("#btnRent").click(() => {
        $("#boxPitch").removeClass("hiddenBox");
        callApiPitchList();

    })

    removeHiddenBox("#btnRent", "#boxPitch");
    addHiddenBox("#deleteIcon", "#boxPitch");
    addHiddenBox("#deleteIconSet", "#boxSetPitch");
    $("#btnRentCreate").click(() => {
        let timeStart = $("#timeStart").val()+":00";
        let timeEnd = $("#timeEnd").val()+":00";
        let dateCreate = new Date().toJSON().slice(0, 10);
        let dateRent = $("#dateInput").val();
        let idPitch = $("#inputPitch").val();
        console.log(timeStart);
        let dataRequestRent = JSON.stringify({
            dateRent: dateRent,
            timeStartStr: timeStart,
            timeEndStr: timeEnd,
            dateCreate: dateCreate,
            status: true
        })
        console.log(dataRequestRent);
        $.ajax({
            url: "http://localhost:8080/api/rent/create/"+idPitch,
            type: "POST",
            dataType: "json",
            data: dataRequestRent,
            headers: {Authorization: 'Bearer '+window.localStorage.getItem("token")},
            crossDomain: true,
            contentType: 'application/json',
            success: (response) => {
                if (response) {
                    messageBox(SUCCESS, "Rent football");
                    setTimeout(()=>{
                        window.location.href = "http://127.0.0.1:5500/html/home.html";
                    },4000);
                } else {
                    history.go(0);
                    messageBox(ERROR, "Rent football");
                }
    
            },
            erorr: (e) => {
                console.log(e);
            }
        })
    })
})

function removeHiddenBox(idButton, idBox) {
    $(idButton).click(() => {
        $(idBox).removeClass("hiddenBox");
    })
}

function addHiddenBox(idDelete, idHidden) {
    $(idDelete).click(() => {
        $(idHidden).addClass("hiddenBox");
    })
}

function renderDataById(data, idName) {
    $(idName).html(data);
}

function callApiPitchList() {
    let idBuisiness = window.location.href.split("=");
    $.ajax({
        url: "http://localhost:8080/api/pitch/list/find-buisiness?id="+idBuisiness[1],
        type: "GET",
        dataType: "json",
        crossDomain: true,
        headers: {Authorization: 'Bearer '+window.localStorage.getItem("token")},
        contentType: 'application/json',
        success: (response) => {
            renderPitchList(response.content);
            renderPaging(response.totalPages, response.pageable.pageNumber);

        },
        erorr: (e) => {
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

function renderPitchList(data) {
    let temp = "";
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        temp += `<div class="row justify-content-center mb-3">
        <div class="col-md-12 col-xl-10">
          <div class="card shadow-0 border rounded-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div class="bg-image hover-zoom ripple rounded ripple-surface">
                    <img src="https://baokhanhhoa.vn/file/e7837c02857c8ca30185a8c39b582c03/dataimages/202004/original/images5400727_cau_thu_cua_cac_doi_bong_thi_dau_tai_giai_kpl_s1.jpg"
                      class="w-100" />
                    <a href="#!">
                      <div class="hover-overlay">
                        <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-6">
                  <h5>${data[i].name}</h5>
               
                  <div class="mt-1 mb-0 text-muted small">
                    <span><i class="fa-solid fa-person" style=" font-size: 1rem;"></i></span>
                   <span>${data[i].min_people}</span>
                   <span>-</span>
                   <span>${data[i].max_people}</span>
                  </div>
                 
                  <p class="text-truncate mb-4 mb-md-0">
                    There are many variations of passages of Lorem Ipsum available, but the
                    majority have suffered alteration in some form, by injected humour, or
                    randomised words which don't look even slightly believable.
                  </p>
                </div>
                <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div class="d-flex flex-row align-items-center mb-1">
                    <h4 class="mb-1 me-1">${data[i].price}</h4>
                    <span class="text-danger">30m</span>
                  </div>
                  <h6 class="text-success">${data[i].status == true ? "Empty" : "In active"}</h6>
                  <div class="d-flex flex-column mt-4">
                    <button class=" btn-sm mt-2 ${data[i].status != true ? "btn btn-outline-dark text-dark" : "btn btn-outline-primary"}" ${data[i].status != true ? "disabled" : ""} type="button" onclick="btnSetPitch(${data[i].id})">
                      set pitch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
    }

    $("#renderPitchList").html(temp);
}




