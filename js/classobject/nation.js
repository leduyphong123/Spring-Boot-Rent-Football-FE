class NATION {
    constructor(name,city){
        this.name = name;
        this.city = city;
    }
}

class CITY {
    constructor(name,district){
        this.name = name;
        this.district = district;
    }
}

class DISTRICT {
    constructor(name, town){
        this.name = name;
        this.town = town;
    }
}

class TOWN {
    constructor(name,street){
        this.name = name;
        this.street = street;
    }
}
class STREET {
    constructor(name){
        this.name=name;
    }
}
// Đường phố
var street1 = new STREET("Nguyễn Du");
var street2 = new STREET("Lê Lai");

// Phường
var town1 = new TOWN("Phường Bến Thành", [street1]);
var town2 = new TOWN("Phường Nguyễn Cư Trinh", [street2]);

// Quận
var district1 = new DISTRICT("Quận 1", [town1, town2]);

// Thành phố
var city = new CITY("Thành phố Hồ Chí Minh", [district1]);
var city1 = new CITY("Thành phố ", [district1]);
let nation = new NATION("VIỆT NAME",[city,city1]);

export {nation};