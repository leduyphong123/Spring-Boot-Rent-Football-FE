import { checkNotValue, checkFromOnInput } from "./register-pitch.js";
import { nation } from "./classobject/nation.js";
import { validateFormInputSuccesDanger } from "./login.js";
import { messageBox, SUCCESS, ERROR } from "./messageBox.js";
const LOOK_GOOD = "Looks good!";

$(document).ready(() => {
    let requestParam = getParamSort();
            let sreach = requestParam == null ? "" : requestParam[1];
            let pageIndex = requestParam == null ? "":requestParam[3];
    $.ajax({
        url: `http://localhost:8080/api/rent/manage-rent?search=${sreach}&page=${pageIndex}`,
        headers: { Authorization: 'Bearer ' + window.localStorage.getItem("token") },
        type: "GET",
        dataType: "json",
        crossDomain: true,
        contentType: 'application/json',
        success: (response) => {

            renderManageRent(response.content);
            renderPagingManagerRent(response.totalPages, response.pageable.pageNumber);

        },
        erorr: (e) => {
            console.log(e);
        }
    })
    $("#searchRent").on("input", () => {

        let phone = $("#searchRent").val();

        history.pushState(null, null, "?search=" + phone);
        $.ajax({
            url: "http://localhost:8080/api/rent/manage-rent?search=" + phone,
            type: "GET",
            dataType: "json",
            crossDomain: true,
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem("token") },
            contentType: 'application/json',
            success: (response) => {
                console.log("c");
                renderManageRent(response.content);
                renderPagingManagerRent(response.totalPages, response.pageable.pageNumber);

            },
            erorr: (e) => {
                console.log(e);
            }
        })


    })

})

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


function renderPagingManagerRent(totalPages, pageNumber) {
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
            <a class="page-link" onclick="pageRenderPitchDasboard(${pageNumber})">${i + 1} <span class="visually-hidden">(current)</span></a>
        </li>`;
        } else if (totalPages - 6 > 1) {
            temp += `<li class="page-item">.</li>`;
            continue;
        }
        else {
            temp += `<li class="page-item"><a class="page-link" onclick="pageRenderPitchDasboard(${i})">${i + 1}</a></li>`;
        }

    }
    if (pageNumber == totalPages - 1) {
        temp += `<li class="page-item disabled">
                        <a class="page-link" onclick="pageRenderPitchDasboard(${pageNumber})" aria-disabled="true">Next</a>
                 </li>
                </ul>`;
    } else {
        temp += `<li class="page-item">
                        <a class="page-link" onclick="pageRenderPitchDasboard(${pageNumber + 1})"">Next</a>
                    </li>
                </ul>`;
    }
    $("#pagingPitch").html(temp);
}


function renderManageRent(data) {
    let temp = "";
    for (let i = 0; i < data.length; i++) {
        temp += `<tr>
                        <td>${i + 1}</td>
                        <td class="fw-normal mb-1">${data[i].phone}</td>
                        <td>${data[i].pitch.name}</td>
                        <td>${data[i].dateRent}</td>
                        <td>${data[i].timeStart}</td>
                        <td>${data[i].timeEnd}</td>`;

    }
    $("#renderManage").html(temp);
}

