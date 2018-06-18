var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");



/////////////////////////MÓDULOS DE APIS//////////////////////////
///////API DAVID///////////////////
var apiBuilders = require("./apis/builders.js");
///////API PACO/////////////////////
var apiMotogpStats = require(__dirname + "/apis/motogp-stats.js");
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
app.use("/builders", express.static(path.join(__dirname + "/public/public_apis/builders")));
app.use("/builders/front", express.static(path.join(__dirname + "/public/public_apis/builders/front-end")));
app.use("/motogp-stats", express.static(path.join(__dirname + "/public/public_apis/motogp")));
app.use("/motogp-stats/front", express.static(path.join(__dirname + "/public/public_apis")));
app.use("/buses/secure", express.static(path.join(__dirname + "/public/security/security_apis/buses_security")));
app.use("/buses/frontsecure", express.static(path.join(__dirname + "/public/security/security_apis/buses_security/front-end_security")));
app.use("/builders/secure", express.static(path.join(__dirname + "/public/security/security_apis/builders_security")));
app.use("/builders/frontsecure", express.static(path.join(__dirname + "/public/security/security_apis/builders_security/front-end_security")));
app.use("/motogp-stats/secure", express.static(path.join(__dirname + "/public/security/security_apis/motogp_security")));
app.use("/motogp-stats/frontsecure", express.static(path.join(__dirname + "/public/security/security_apis/motogp_security/front-end_security")));

////////CONEXION BASE DE DATOS//////////////////////////////////////////////////
var MongoClient = require("mongodb").MongoClient;
var mdbURL = "mongodb://dbbuses:12345@ds121118.mlab.com:21118/sos1718-10-sandbox";

var port = (process.env.PORT || 1607);
var BASE_API_PATH = "/api/v1";
var BASE_API_PATH_V2 = "/api/v2";
var BASE_API_PATH_SECURE = "/api/v1/security";

var request = require('request');


/////////// PROXY PACO-LEE

var paths = '/proxyFGG';
var apiServerHost = 'https://sos1718-03.herokuapp.com/api/v1/pollution-cities';

app.use(paths, function(req, res) {
  var url = apiServerHost + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

/////////// PROXY PACO-LEE NAMES

var paths0 = '/proxyFGGW';
var apiServerHostName = 'https://api.abalin.net/get/namedays?day=20&month=6&country=es';

app.use(paths0, function(req, res) {
  var url = apiServerHostName + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

/////////// PROXY PACO-LEE fran

var paths1 = '/proxyFGGF';
var apiServerFran = 'http://sos1718-07.herokuapp.com/api/v1/homicide-reports-data';

app.use(paths1, function(req, res) {
  var url = apiServerFran + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

/////////// PROXY PACO-LEE miguel

var paths1 = '/proxyFGGM';
var apiServerMigue = 'http://sos1718-07.herokuapp.com/api/v1/global-terrorism-data';

app.use(paths1, function(req, res) {
  var url = apiServerMigue + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});




/////////// PROXY BUILDERS

var pathsBuilders = '/proxyBuilders';
var apiServerHostBuildes = 'https://sos1718-05.herokuapp.com/api/v1/world-stats';

app.use(pathsBuilders, function(req, res) {
  var url = apiServerHostBuildes + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});


/////////// PROXY INTEGRACIÓN FOOTBALL-DATA

var pathsBuilders2 = '/proxyIntegration';
var apiServerHostBuildes2 = 'http://api.football-data.org/v1/competitions';

app.use(pathsBuilders2, function(req, res) {
  var url = apiServerHostBuildes2 + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

/////////// PROXY BUSES

var pathsBuses = '/proxyBuses';
var apiServerHostBuses = 'https://sos1718-12.herokuapp.com/api/v2/rape-stats';

app.use(pathsBuses, function(req, res) {
  var url = apiServerHostBuses + req.url;
  console.log('piped: ' + req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);
});

//////////////////////////////////////////////////////////////////////
console.log("x");
MongoClient.connect(mdbURL, { native_parser: true }, (err, mlabs) => {
console.log("y");
  if (err) {
    console.error("Error accesing DB: " + err);
    process.exit(1);
  }
  console.log("Connected to DB");

  var database = mlabs.db("sos1718-10-sandbox")
  var db = database.collection("buses");
  var dbd = database.collection("builders");
  var dbp = database.collection("motogp-stats");


  /////////////////////////////////////////////CONEXIÓN CON MÓDULOS///////////////////////////////////////////////////////
  apiBuilders.register(app, dbd, BASE_API_PATH, security.checkApiKeyFunction);
  apiMotogpStats.register(app, dbp, BASE_API_PATH, security.checkApiKeyFunction);
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
console.log("t");

////////////////////////////////////////////////////////////////////////////////
