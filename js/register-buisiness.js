import { nation } from "./classobject/nation.js";
import { validateFormInputSuccesDanger } from "./login.js";
const LOOK_GOOD = "Looks good!";

$(document).ready(() => {
    address();
   checkFormInputNotValue();
   $("#btnSubmit").click(() => {
    let isName= checkNotValue("#registerName", "#statusMessageRegisterName");
    let isTimeOpen= checkNotValue("#registerTimeOpen", "#statusMessageRegisterTimeOpen");
    let isTimeClose= checkNotValue("#registerTimeClose", "#statusMessageRegisterTimeClose");
    let isDescribe= checkNotValue("#registerDescribe", "#statusMessageRegisterDescribe");
    let isDescription= checkNotValue("#registerDescription", "#statusMessageRegisterDescription");
    if(isName && isTimeOpen && isTimeClose && isDescribe && isDescription
        && $("#registerCity").val() != ""
        && $("#registerDistrict").val() != ""
        && $("#registerTown").val() != ""
        && $("#registerStreet").val() != ""
        ){
            console.log("b");
            callApiRegisterBuisiness();
    }
})
})

function callApiRegisterBuisiness(){
    let city = $("#registerCity").val();
    let district = $("#registerDistrict").val();
    let town = $("#registerTown").val();
    let street = $("#registerStreet").val();
    let addressHome = $("#registerAddressHome").val();
    let addressData="";
    if(addressHome == ""){
        addressData = street+","+town+","+district+","+city;
    }else{
        addressData = addressHome+","+ street+","+town+","+district+","+city;

    }
    let dataRequestRegisterBuisiness = JSON.stringify(
        {
            name: $("#registerName").val(),
            time_openStr: $("#registerTimeOpen").val(),
            time_closeStr: $("#registerTimeClose").val(),
            describes: $("#registerDescribe").val(),
            description: $("#registerDescription").val(),
            address: addressData
        }
    );
    $.ajax({
        url: "http://localhost:8080/apis/register-buisiness",
        dataType: "json",
        type: "POST",
        data: dataRequestRegisterBuisiness,
        headers: {Authentication: 'Bearer '},
        crossDomain: true,
        contentType: 'application/json',
        success: (result) => {
            console.log(result);
            if (result) {
                messageBox(SUCCESS, "Register buisines");
                setTimeout(()=>{
                    window.location.href = "http://127.0.0.1:5500/html/home.html";
                },4000);
            } else {
                history.go(0);
                messageBox(ERROR, "Register buisines");
            }
        },
        error: (e) => {
            messageBox(ERROR, "Register buisines");
        }
    })
}

function checkFormInputNotValue(){
  
    $("#registerName").on("input",()=>{
        checkNotValue("#registerName", "#statusMessageRegisterName");
    })
    $("#registerTimeOpen").on("input",()=>{
        checkNotValue("#registerTimeOpen", "#statusMessageRegisterTimeOpen");
    })
    $("#registerTimeClose").on("input",()=>{
        checkNotValue("#registerTimeClose", "#statusMessageRegisterTimeClose");
    })
    $("#registerDescribe").on("input",()=>{
        checkNotValue("#registerDescribe", "#statusMessageRegisterDescribe");
    })
    $("#registerDescription").on("input",()=>{
        checkNotValue("#registerDescription", "#statusMessageRegisterDescription");
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

function renderOptionOnchange(idSelectInput, idOptionValue, supData, idSelectInputNext) {
    $(idSelectInput).on("input", () => {
        $(idOptionValue).show();
        let temp = supData.slice();
        let data = searchChange(temp, $(idSelectInput).val());
        renderOption(idSelectInput, idOptionValue, data, idSelectInputNext);
    });
}

function searchChange(data, value) {
    let temp = data;
    for (let i = 0; i < data.length; i++) {
        if (!(checkName(data[i].name, value))) {
            temp.splice(i, 1);
        }
    }
    return temp;
}

function checkName(name, values) {
    let temp = "/(" + values + ")/";
    const reguarExp = new RegExp(values);
    return reguarExp.test(name);
}

function address() {
    $("#registerDistrict").attr("disabled", "disabled");
    $("#registerTown").attr("disabled", "disabled");
    $("#registerStreet").attr("disabled", "disabled");
    renderSelect("#registerCity", "#showOptionCity", nation.city, "#registerDistrict");
    let district = false;
    let town = false;
    $("#registerDistrict").click(() => {
        let city = search(nation.city, $("#registerCity").val());
        renderSelect("#registerDistrict", "#showOptionDistrict", city.district, "#registerTown");
        district = true;
    })
    $("#registerTown").click(() => {
        let city = search(nation.city, $("#registerCity").val());
        let district = search(city.district, $("#registerDistrict").val());
        renderSelect("#registerTown", "#showOptionTown", district.town, "#registerStreet");
        town = true;

    })
    $("#registerStreet").click(() => {
        let city = search(nation.city, $("#registerCity").val());
        let district = search(city.district, $("#registerDistrict").val());
        let town = search(district.town, $("#registerTown").val());
        renderSelect("#registerStreet", "#showOptionStreet", town.street);

    })
    renderOptionOnchange("#registerCity", "#showOptionCity", nation.city, "#registerDistrict");
    renderOptionOnchange("#registerDistrict", "#showOptionDistrict", nation.city.district, "#registerTown");
    if (district) {

        renderOptionOnchange("#registerTown", "#showOptionTown", nation.city.district.town, "#registerStreet");
    }
    if (town) {
        renderOptionOnchange("#registerStreet", "#showOptionStreet", nation.city.district.town.street);

    }
}
function search(data, name) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == name) {
            return data[i];
        }
    }
}

function renderSelect(idSelectInput, idOptionValue, data, idSelectInputNext) {

    $(idSelectInput).click(() => {
        $(idOptionValue).show();
        renderOption(idSelectInput, idOptionValue, data, idSelectInputNext);
    });


}

function renderOption(idSelectInput, idOptionValue, data, idSelectInputNext) {
    let temp = "";
    if (data != null) {
        for (let i = 0; i < data.length; i++) {
            temp += `<li onclick="getValue('${idSelectInput}','${idOptionValue}','${data[i].name}','${idSelectInputNext}')">${data[i].name}</li>`
        }
    } else {
        temp = "<li style='visibility: hidden;'></li>";
    }
    $(idOptionValue).html(temp);
}




$(document).mouseup(function (e) {
    var showCity = $("#showOptionCity");
    var showDistrict = $("#showOptionDistrict");
    var showTown = $("#showOptionTown");
    var showStreet = $("#showOptionStreet");

    hiddenElementBox(showCity, e);
    hiddenElementBox(showDistrict, e);
    hiddenElementBox(showTown, e);
    hiddenElementBox(showStreet, e);

});

function hiddenElementBox(container, e) {
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
}
