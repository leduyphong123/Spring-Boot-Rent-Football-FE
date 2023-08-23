$(document).ready(() => {
    $("#btnHistory").click(() => {
        $("#historyBox").removeClass("hiddenBox");
        $.ajax({
            url: "http://localhost:8080/api/rent/history",
            type: "GET",
            headers: { Authorization: 'Bearer ' + window.localStorage.getItem("token") },
            dataType: "json",
            crossDomain: true,
            contentType: 'application/json',
            success: (response) => {
                renderHistoryByUser(response.content);
                renderPaging(response.totalPages, response.pageable.pageNumber);
            },
            error: (e) => {
                console.log(e);
            }
        });
    })
    $("#deleteIconSet").click(() => {
        $("#historyBox").addClass("hiddenBox");
    })
})

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

function renderHistoryByUser(data) {
    let temp = "";
    for (let i = 0; i < data.length; i++) {
        temp += ` <tr>
                                <td>
                                  ${i + 1}
                                </td>
                                <td>
                                  ${data[i].pitch.name}
                                </td>
                                <td>
                                  ${data[i].timeStart}
                                </td>
                                <td>${data[i].pitch.buisiness.address}</td>
                                <td>
                                  <button type="button" class="btn btn-link btn-sm btn-rounded">
                                    details
                                  </button>
                                </td>
                              </tr>`
    }
    $("#renderHistoryByUser").html(temp);
}