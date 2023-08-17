import { nation } from "./classobject/nation.js";

$(document).ready(() => {
    renderSelect("#registerCity", "#showOptionCity", nation.city);
    $("#registerDistrict").click(()=>{
        if ($("#registerCity").val() != "") {
            let city = search(nation.city, $("#registerCity").val());
            console.log(city);
            renderSelect("#registerDistrict", "#showOptionDistrict",city.district);
        }
    })
   
})
function search(data, name) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].name == name) {
            return data[i];
        }
    }
}

function renderSelect(idSelectInput, idOptionValue, data) {
    $(idSelectInput).on("input", () => {
        $(idOptionValue).show();
    });
    $(idSelectInput).click(() => {
        $(idOptionValue).show();
    });
    renderOption(idSelectInput, idOptionValue, data);

}

function renderOption(idSelectInput, idOptionValue, data) {
    let temp = "";
    for (let i = 0; i < data.length; i++) {
        temp += `<li onclick="getValue('${idSelectInput}','${idOptionValue}','${data[i].name}')">${data[i].name}</li>`
    }
    $(idOptionValue).html(temp);
}




