class NATION {
    constructor(name, city) {
        this.name = name;
        this.city = city;
    }
}

class CITY {
    constructor(name, district) {
        this.name = name;
        this.district = district;
    }
}

class DISTRICT {
    constructor(name, town) {
        this.name = name;
        this.town = town;
    }
}

class TOWN {
    constructor(name, street) {
        this.name = name;
        this.street = street;
    }
}
class STREET {
    constructor(name) {
        this.name = name;
    }
}
// Đường phố
var street1 = new STREET("Đường Hoàng Sa");
var street2 = new STREET("Đường Trường Xa");
var street3 = new STREET("Đường Hai Bà Trưng");
var street4 = new STREET("Đường Phan Liêm");
var street5 = new STREET("Đường Võ thị sáu");

// Phường quan 1
var town1 = new TOWN("Phường Tân Định", [
    street1,
    street2,
    street3,
    street4,
    street5
]);
var town2 = new TOWN("Phường Đa Kao", [
    street1,
    street2,
    street3,
    street4,
    street5
]);
var town3 = new TOWN("Phường Bến Nghé", [
    street1,
    street2,
    street3,
    street4,
    street5
]);
var town4 = new TOWN("Phường Bến Thành", [
    street1,
    street2,
    street3,
    street4,
    street5
]);
var town5 = new TOWN("Phường Nguyễn Thái Bình", [
    street1,
    street2,
    street3,
    street4,
    street5
]);
var town6 = new TOWN("Phường Phạm Ngũ Lão", [
    street1,
    street2,
    street3,
    street4,
    street5
]);
var town7 = new TOWN("Phường Cầu Ông Lãnh", [
    street1,
    street2,
    street3,
    street4,
    street5
]);
var town8 = new TOWN("Phường Cô Giang", [
    street1,
    street2,
    street3,
    street4,
    street5
]);
var town9 = new TOWN("Phường Nguyễn Cư Trinh", [
    street1,
    street2,
    street3,
    street4,
    street5
]);
var town10 = new TOWN("Phường Cầu Kho", [
    street1,
    street2,
    street3,
    street4,
    street5
]);

// Quận hcm
var district1 = new DISTRICT("Quận 1", [
    town1,
    town2,
    town3,
    town4,
    town5,
    town6,
    town7,
    town8,
    town9,
    town10
]);
var district2 = new DISTRICT("Quận 2", []);
var district3 = new DISTRICT("Quận 3", []);
var district4 = new DISTRICT("Quận 4", []);
var district5 = new DISTRICT("Quận 5", []);
var district6 = new DISTRICT("Quận 6", []);
var district7 = new DISTRICT("Quận 7", []);
var district8 = new DISTRICT("Quận 8", []);
var district9 = new DISTRICT("Quận 9", []);
var district10 = new DISTRICT("Quận 10", []);
var district11 = new DISTRICT("Quận 11", []);
var district12 = new DISTRICT("Quận 12", []);
var district13 = new DISTRICT("Quận Bình Tân", []);
var district14 = new DISTRICT("Quận Bình Thạnh", []);
var district15 = new DISTRICT("Quận Gò Vấp", []);
var district16 = new DISTRICT("Quận Phú Nhuận", []);
var district17 = new DISTRICT("Quận Tân Bình", []);
var district18 = new DISTRICT("Quận Tân Phú", []);
var district19 = new DISTRICT("Quận Thủ Đức", []);
var district20 = new DISTRICT("Huyện Bình Chánh", []);
var district21 = new DISTRICT("Huyện Cần Giờ", []);
var district22 = new DISTRICT("Huyện Củ Chi", []);
var district23 = new DISTRICT("Huyện Hóc Môn", []);
var district24 = new DISTRICT("Huyện Nhà Bè", []);

// Thành phố
var city = new CITY("Thành phố Hồ Chí Minh", [
    district1,
    district2,
    district3,
    district4,
    district5,
    district6,
    district7,
    district8,
    district9,
    district10,
    district11,
    district12,
    district13,
    district14,
    district15,
    district16,
    district17,
    district18,
    district19,
    district20,
    district21,
    district22,
    district23,
    district24
]);
var city1 = new CITY("Hà Nội ", [district1]);
let nation = new NATION("VIỆT NAME", [city, city1]);

export { nation };