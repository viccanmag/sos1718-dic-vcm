var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");



/////////////////////////MÓDULOS DE APIS//////////////////////////

///////API VICTOR//////////////////
var apiBuses = require(__dirname + "/apis/buses.js");
var security = require("./security.js")

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname + "/public")));
app.use("/secure", express.static(path.join(__dirname + "/public/security")));
app.use("/buses", express.static(path.join(__dirname + "/public/public_apis/buses")));
app.use("/buses/front", express.static(path.join(__dirname + "/public/public_apis/buses/front-end")));

app.use("/buses/secure", express.static(path.join(__dirname + "/public/security/security_apis/buses_security")));
app.use("/buses/frontsecure", express.static(path.join(__dirname + "/public/security/security_apis/buses_security/front-end_security")));


////////CONEXION BASE DE DATOS//////////////////////////////////////////////////
var MongoClient = require("mongodb").MongoClient;
var mdbURL = "mongodb://dbbuses:12345@ds121118.mlab.com:21118/sos1718-10-sandbox";

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_V2 = "/api/v2";
var BASE_API_PATH_SECURE = "/api/v1/security";

var request = require('request');




/////////// PROXY BUSES

var pathsBuses = '/proxyBuses';
var apiServerHostBuses = 'https://sos1718-12.herokuapp.com/api/v2/rape-stats';

app.use(pathsBuses, function(req, res) {
  var url = apiServerHostBuses + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//////////////////////////////////////////////////////////////////////

MongoClient.connect(mdbURL, { native_parser: true }, (err, mlabs) => {
console.log("y");
  if (err) {
    console.error("Error accesing DB: " + err);
    process.exit(1);
  }
  console.log("Connected to DB");

  var database = mlabs.db("sos1718-10-sandbox")
  var db = database.collection("buses");



  /////////////////////////////////////////////CONEXIÓN CON MÓDULOS///////////////////////////////////////////////////////

  apiBuses.register(app, db, BASE_API_PATH, security.checkApiKeyFunction);

  app.listen(port, () => {
console.log("u");
    console.log("Server Ready on port" + port + "!");
  }).on("error", (e) => {
    console.log("Server NOT READY:" + e + "!");
  });
console.log("z");
  console.log("Server setting up....");
});


////////////////////////////////////////////////////////////////////////////////
