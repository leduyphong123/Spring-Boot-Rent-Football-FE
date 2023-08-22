import { checkNotValue, checkFromOnInput } from "./register-pitch.js";
import { nation } from "./classobject/nation.js";
import { validateFormInputSuccesDanger } from "./login.js";
import { messageBox, SUCCESS, ERROR } from "./messageBox.js";
const LOOK_GOOD = "Looks good!";

$(document).ready(() => {

    $.ajax({
        url: "http://localhost:8080/api/pitch/list",
        type: "GET",
        dataType: "json",
        crossDomain: true,
        headers: {Authorization: 'Bearer '+window.localStorage.getItem("token")},
        contentType: 'application/json',
        success: (response) => {
            callApiPitch(response.content);
            renderPagingPitch(response.totalPages, response.pageable.pageNumber);

        },
        erorr: (e) => {
            console.log(e);
        }
    })
    $("#btnSubmit").click(() => {
        let isName = checkNotValue("#name", "#statusMessageName");
        let isMin = checkNotValue("#min", "#statusMessageMin");
        let isMax = checkNotValue("#max", "#statusMessageMax");
        let isPrice = checkNotValue("#price", "#statusMessagePrice");

        checkFromOnInput();
        if (isName && isMin && isMax && isPrice) {
            callApiEditPitch();
        }
    })
})



function renderPagingPitch(totalPages, pageNumber) {
    let temp = " <ul class='pagination'>";
    if (pageNumber == 0) {
        temp += `<li class='page-item disabled'><a class="page-link" onclick="pageRenderPitch(${pageNumber})" tabindex="-1" aria-disabled="true">Previous</a>`
            + "</li>";
    } else {
        temp += `<li class='page-item '><a class="page-link" onclick="pageRenderPitch(${pageNumber -1})" tabindex="-1" >Previous</a>`
            + "</li>";
    }

    for (let i = 0; i < totalPages; i++) {
        if(i == pageNumber){
            temp += ` <li class="page-item active" aria-current="page">
            <a class="page-link" onclick="pageRenderPitchDasboard(${pageNumber})">${i+1} <span class="visually-hidden">(current)</span></a>
        </li>`;
        }else if(totalPages -6 >1){
            temp +=`<li class="page-item">.</li>`;
            continue;
        }
        else{
            temp += `<li class="page-item"><a class="page-link" onclick="pageRenderPitchDasboard(${i})">${i+1}</a></li>`;
        }

    }
    if (pageNumber == totalPages -1) {
        temp += `<li class="page-item disabled">
                        <a class="page-link" onclick="pageRenderPitchDasboard(${pageNumber})" aria-disabled="true">Next</a>
                 </li>
                </ul>`;
    } else {
        temp += `<li class="page-item">
                        <a class="page-link" onclick="pageRenderPitchDasboard(${pageNumber +1})"">Next</a>
                    </li>
                </ul>`;
    }
        $("#pagingPitch").html(temp);
}
function callApiEditPitch() {
    let dataRequestEditPitch = JSON.stringify({
        name: $("#name").val(),
        min_people: $("#min").val(),
        max_people: $("#max").val(),
        price: $("#price").val(),
    });
    $.ajax({
        url: "http://localhost:8080/api/pitch/edit/" + $("#idPitch").val(),
        dataType: "json",
        type: "POST",
        data: dataRequestEditPitch,
        headers: {Authorization: 'Bearer '+window.localStorage.getItem("token")},
        crossDomain: true,
        contentType: 'application/json',
        success: (result) => {
            console.log("result");
            if (result) {
                messageBox(SUCCESS, "Edit pitch");
                setTimeout(() => {
                    window.location.href = "http://127.0.0.1:5500/html/pitch.html";
                }, 4000);
            } else {
                history.go(0);
                messageBox(ERROR, "Edit pitch");
            }
        },
        error: (e) => {
            messageBox(ERROR, "Edit pitch");
        }
    })
}

function callApiPitch(data) {
    let temp = "";
    if(data == null){
        temp="<div>NO LIST</div>";
    }else{
    for (let i = 0; i < data.length; i++) {
        temp += `<tr>
                        <td>${i + 1}</td>
                        <td class="fw-normal mb-1">${data[i].name}</td>
                        <td>${data[i].min_people}</td>
                        <td>${data[i].max_people}</td>
                        <td>
                            <button type="button" class="btn btn-outline-info btn-rounded" data-mdb-ripple-color="dark" onclick="editPitch(${data[i].id})">edit</button>`;
        if (data[i].status) {
            temp += `<button type="button" class="btn btn-outline-success btn-rounded" data-mdb-ripple-color="dark" onclick="isStatus(${data[i].id})">is active</button>
                     </td>
                     </tr>`;
        } else {
            temp += `<button type="button" class="btn btn-outline-danger btn-rounded" data-mdb-ripple-color="dark" onclick="isStatus(${data[i].id})">stop working</button>
            </td>
            </tr>`;
        }
    }}
    $("#renderPitch").html(temp);
}

