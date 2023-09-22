const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/mechanics";
mongoose.connect(url);
console.log("Database connected");

// get schema
const Admins = require("./models/admins");
const Appointments = require("./models/appointments");
const Cars = require("./models/cars");
const Clients = require("./models/clients");
const Stores = require("./models/stores");
const Availability = require("./models/availability");


// 1) Admins
const admindata = require("./collections/admins.json");
let all_admin = [];
admindata.forEach(dat => {
  // create document
  let admin = new Admins({
    email: dat.email,
    password: dat.passowrd,
  });
  all_admin.push(admin);
})
Admins.insertMany( all_admin, (err) => {
  if(err) console.log("- ERROR in saving admin: ", err)
  else console.log("ADMIN: document inserted successfully");
})


// 2) Appointments
const appdata = require("./collections/appointments.json");
let all_app = [];
appdata.forEach(dat => {
  // create document
  let appoint = new Appointments({
    clientEmail: dat.clientEmail,
    storeEmail: dat.storeEmail,
    storeName: dat.storeName,
    clientName: dat.clientName,
    clientPhoneNum: dat.clientPhoneNum,
    day: dat.day,
    timeSlot: dat.timeSlot,
    carMake: dat.carMake,
    carModel: dat.carModel,
    carYear: dat.carYear,
    carMileage: dat.carMileage,
    carTransmission: dat.carTransmission,
    carDrivetrain: dat.carDrivetrain,
    problemCate: dat.problemCate,
    problemDesc: dat.problemDesc,
    apptStatus: dat.apptStatus,
    cancelledByStore: dat.cancelledByStore,
    cancelledByClient: dat.cancelledByClient
  });
  all_app.push(appoint);
})
Appointments.insertMany( all_app, (err) => {
  if(err) console.log("- ERROR in saving appointments: ", err)
  else console.log("APPOINT: document inserted successfully");
})


// 3) Cars
const cardata = require("./collections/cars.json");
let all_car = [];
cardata.forEach(dat => {
  // create document
  let car = new Cars({
    ownerEmail: dat.ownerEmail,
    make: dat.make,
    model: dat.model,
    year: dat.year,
    mileage: dat.mileage,
    transmission: dat.transmission,
    drivetrain: dat.drivetrain
  });
  all_car.push(car);
})
Cars.insertMany( all_car, (err) => {
  if(err) console.log("- ERROR in saving car: ", err)
  else console.log("CAR: document inserted successfully");
})


// 4) Clients
const clientdata = require("./collections/clients.json");
let all_client = [];
clientdata.forEach(dat => {
  // create document
  let client = new Clients({
    email: dat.email,
    password: dat.password,
    name: dat.name,
    phoneNumber: dat.phoneNumber,
    surName: dat.surName
  });
  all_client.push(client);
})
Clients.insertMany( all_client, (err) => {
  if(err) console.log("- ERROR in saving client: ", err)
  else console.log("CLIENT: document inserted successfully");
})


// 5) Stores
const storedata = require("./collections/stores.json");
let all_store = [];
storedata.forEach(dat => {
  // create document
  let store = new Stores({
    name: dat.name,
    email: dat.email,
    password: dat.password,
    phoneNumber: dat.phoneNumber,
    supName: dat.supName,
    address: dat.address,
    city: dat.city,
    province: dat.province,
    postalCode: dat.postalCode,
    description: dat.description,
    facebook: dat.facebook,
    instagram: dat.instagram,
    service: dat.service,
    defaultQuota: dat.defaultQuota,
    imgurl: dat.imgurl
  });
  all_store.push(store);
})
Stores.insertMany( all_store, (err) => {
  if(err) console.log("- ERROR in saving store: ", err)
  else console.log("STORE: document inserted successfully");
})


// 6) Availability
var alldates=[];
for (let i=0; i<=364; i++) {
  var eachday = new Date("2023-01-01");
  eachday.setDate(eachday.getDate() + i);
  alldates.push(`${eachday.getFullYear()}-${eachday.getMonth()+1}-${eachday.getDate()}`);
}
let all_ava = [];
storedata.forEach(st => {
  alldates.forEach(da => {
    for (let j=8; j<=18; j++) {
      let newAva = new Availability({
        ownerEmail: st.email,
        date: da,
        timeSlot: j,
        totalQuota: st.defaultQuota,
        bookedQuota: 0
      })
      all_ava.push(newAva);
    }
  })
});
Availability.insertMany( all_ava, (err) => {
  if (err) console.log("- ERROR in saving ava: ", err);
  else console.log("AVA: document inserted successfully");
})