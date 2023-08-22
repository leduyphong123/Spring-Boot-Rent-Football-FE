import { nation } from "./classobject/nation.js";
import { validateFormInputSuccesDanger } from "./login.js";
import { messageBox, SUCCESS, ERROR } from "./messageBox.js";
const LOOK_GOOD = "Looks good!";
$(document).ready(() => {
    checkFromOnInput();
    $("#btnSubmit").click(() => {
        let isName = checkNotValue("#name", "#statusMessageName");
        let isMin = checkNotValue("#min", "#statusMessageMin");
        let isMax = checkNotValue("#max", "#statusMessageMax");
        let isPrice = checkNotValue("#price", "#statusMessagePrice");
        if (isName && isMin && isMax && isPrice) {
            callApiRegisterPitch();
        }
    })
})

function callApiRegisterPitch() {
    let dataRequestRegisterPitch = JSON.stringify({
        name: $("#name").val(),
        min: $("#min").val(),
        max: $("#max").val(),
        price: $("#price").val(),
    });
    $.ajax({
        url: "http://localhost:8080/api/pitch/register",
        dataType: "json",
        type: "POST",
        data: dataRequestRegisterPitch,
        headers: {Authentication: 'Bearer '},
        crossDomain: true,
        contentType: 'application/json',
        success: (result) => {
            if (result) {
                messageBox(SUCCESS, "Register pitch");
                setTimeout(()=>{
                    window.location.href = "http://127.0.0.1:5500/html/pitch.html";
                },4000);
            } else {
                history.go(0);
                messageBox(ERROR, "Register pitch");
            }
        },
        error: (e) => {
            messageBox(ERROR, "Register pitch");
        }
    })
}

function checkFromOnInput() {
    $("#name").on("input", () => {
        checkNotValue("#name", "#statusMessageName");
    })
    $("#min").on("input", () => {
        checkNotValue("#min", "#statusMessageMin");
    })
    $("#max").on("input", () => {
        checkNotValue("#max", "#statusMessageMax");
    })
    $("#price").on("input", () => {
        checkNotValue("#price", "#statusMessagePrice");
    })
}
function checkNotValue(idInput, idStatus) {
    let value = $(idInput).val();
    if (value == null || value == "") {
        let message = "Cannot be left blank";
        validateFormInputSuccesDanger(idInput, idStatus, "is-valid", "is-invalid", "text-success", "text-danger", message);
        return false;
    } else {
        validateFormInputSuccesDanger(idInput, idStatus, "is-invalid", "is-valid", "text-danger", "text-success", LOOK_GOOD);
        return true;
    }

}

export {checkNotValue,checkFromOnInput}