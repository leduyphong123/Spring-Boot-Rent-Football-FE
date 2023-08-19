import { messageBox, SUCCESS, ERROR } from "./messageBox.js";
const LOOK_GOOD = "Looks good!";


$(document).ready(() => {
    checkUserLocalStorage();

    //login
    $("#login-btn").click(() => {
        checkValueFormInputLoginPhone("#loginPhone", "#statusMessagePhone");
        saveUserLogin();
        callApiLogin();
    })
    $("#loginPhone").on("input", () => {
        checkValueFormInputLoginPhone("#loginPhone", "#statusMessagePhone");
    })
    $("#loginPassword").on("input", () => {
        checkValueFormInputLoginPassword("#loginPassword", "#statusMessagePassword");
    })

    //register
    $("#register-btn").click(() => {
        checkValueFormInputLoginPhone("#registerPhone", "#statusMessagePhoneRegister");
        checkPasswordRegister();
    })
    $("#registerPhone").on("input", () => {
        checkValueFormInputLoginPhone("#registerPhone", "#statusMessagePhoneRegister");
    })
    $("#registerPassword").on("input", () => {
        checkValueFormInputLoginPassword("#registerPassword", "#statusMessagePasswordRegister");
    })
    $("#registerRepeatPassword").on("input", () => {
        checkValueFormInputLoginPassword("#registerRepeatPassword", "#statusMessageRepeatPasswordRegister");
    })

})

//login start

function callApiLogin() {
    let dataRequestRegister = JSON.stringify(
        {
            phone: $("#loginPhone").val(),
            password: $("#loginPassword").val()
        }
    );
    $.ajax({
        url: "http://localhost:8080/api/login",
        dataType: "json",
        type: "POST",
        data: dataRequestRegister,
        headers: {Authentication: 'Bearer '},
        crossDomain: true,
        contentType: 'application/json',
        success: (result) => {
            console.log(result);
            if (result) {
                messageBox(SUCCESS, "Login");
                setTimeout(()=>{
                    window.location.href = "http://127.0.0.1:5500/html/home.html";
                },4000);
            } else {
                history.go(0);
                messageBox(ERROR, "Login");
            }
        },
        error: (e) => {
            messageBox(ERROR, "Login");
        }
    })
};

function saveUserLogin() {
    if ($("#loginCheck").prop("checked")) {
        localStorage.setItem("phone", $("#loginPhone").val());
        localStorage.setItem("password", $("#loginPassword").val());
    }
}
function checkUserLocalStorage() {
    let phone = localStorage.getItem("phone");
    let password = localStorage.getItem("password");
    if ((phone != null) && (password != null)) {
        $("#loginPhone").val(phone);
        $("#loginPassword").val(password);
        $("#loginPassword").trigger("focus");
        $("#loginPhone").trigger("focus");
    }
}

function checkValueFormInputLoginPhone(idPhoneName, idStatusPhone) {
    let phone = $(idPhoneName).val();

    if (!(phone != "" && phone.length > 9 && isPhone(phone))) {
        let message = "Phone number is not in the correct format";
        validateFormInputSuccesDanger(idPhoneName,idStatusPhone,"is-valid","is-invalid","text-success","text-danger",message);
    } else {
     
        validateFormInputSuccesDanger(idPhoneName,idStatusPhone,"is-invalid","is-valid","text-danger","text-success",LOOK_GOOD);
    }

}


function isPhone(number) {
    return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
}

function checkValueFormInputLoginPassword(idPassword, idStatusPassword) {
    let password = $(idPassword).val();
    if (!(password.length >= 6 && password != "" && isPassword)) {
        let message = "Passwword is not in the correct format";
        validateFormInputSuccesDanger(idPassword,idStatusPassword,"is-valid","is-invalid","text-success","text-danger",message);
    } else {
        validateFormInputSuccesDanger(idPassword,idStatusPassword,"is-invalid","is-valid","text-danger","text-success",LOOK_GOOD);

    }
}

function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

//login end

//register start
function checkPasswordRegister() {
    checkValueFormInputLoginPassword("#registerPassword", "#statusMessagePasswordRegister");
    checkValueFormInputLoginPassword("#registerRepeatPassword", "#statusMessageRepeatPasswordRegister");
    let passwordRegister = $("#registerPassword").val();
    let repeatPasswordRegister = $("#registerRepeatPassword").val();
    if (passwordRegister == repeatPasswordRegister) {
        callApiRegister();
    } else {
        let message = "Password incorrect";
        validateFormInputSuccesDanger("#registerPassword","#statusMessagePasswordRegister","is-valid","is-invalid","text-success","text-danger",message);
        validateFormInputSuccesDanger("#registerRepeatPassword","#statusMessageRepeatPasswordRegister","is-valid","is-invalid","text-success","text-danger",message);
    }
}

function callApiRegister() {
    let dataRequestRegister = JSON.stringify(
        {
            phone: $("#registerPhone").val(),
            password: $("#registerPassword").val(),
            name: $("#registerName").val(),
            address: $("#registerAddress").val(),
        }
    );
    $.ajax({
        url: "http://localhost:8080/api/register",
        dataType: "json",
        type: "POST",
        data: dataRequestRegister,
        crossDomain: true,
        contentType: 'application/json',
        success: (result) => {
            if (result) {
                messageBox(SUCCESS, "Register");
                setTimeout(()=>{
                    history.go(0);
                },4000);
            } else {
                messageBox(ERROR, "Register");
            }
        },
        error: (e) => {
            messageBox(ERROR, "Register");
        }
    })
}

//register end

function validateFormInputSuccesDanger(id,idStatus,remove,add,removeStatus,addStatus,message){
    $(id).removeClass(remove);
    $(id).addClass(add);
    $(idStatus).removeClass(removeStatus);
    $(idStatus).addClass(addStatus);
    $(idStatus).html(message);
}

export {validateFormInputSuccesDanger};