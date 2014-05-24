var app = angular.module("konstituen", ['ngRoute', 'chieffancypants.loadingBar']);
app.config(["$routeProvider",
  function($route) {
    $route
      .when("/", {
        templateUrl: "assets/views/berita.html",
        controller: "BeritaCtrl"
      })
      .when("/beranda", {
        templateUrl: "assets/views/home.html",
        controller: "HomeCtrl"
      })
      .when("/tentang", {
        templateUrl: "assets/views/tentang.html",
        controller: "TentangCtrl"
      })
      .when("/dapil", {
        templateUrl: "assets/views/dapil.html",
        controller: "DapilCtrl"
      })
      .when("/dapil/:id", {
        templateUrl: "assets/views/daftar-caleg.html",
        controller: "DaftarCalegCtrl"
      })
      .otherwise({
        redirectTo: "/"
      });
}]);
app.controller("BeritaCtrl",
  ["$scope", "$http",
  function ($s,$h) {
    $s.getBerita = function () {
    var key = "40381f1d8123102fd74d85aef44d70d5";
    var url = "http://api.pemiluapi.org/berita";
    $h.get(url, {params: {json: "get_recent_posts", apiKey: key, callback: "JSON_CALLBACK"}})
      .success(function (data,status, header, config) {
        console.log(data);
      })
      .error(function (data,status,header,config) {
        console.log("error")
      });
  };
  $s.getBerita();
}]);
app.controller("GeoCtrl",
  ["$scope", "$http",
  function ($s,$h) {
    // hide all content before data from Pemilu API loaded
    $s.display = true;
    $s.getData = function(lat, lon) {
      var key = "40381f1d8123102fd74d85aef44d70d5";
      var url = "http://api.pemiluapi.org/geographic/api/caleg";
      // request data from API
      $h.get(url, {params: {apiKey: key, lat: lat, long: lon, callback: "JSON_CALLBACK"}})
        .success(function (data, status, header, config) {
          console.log(data.data.results);
        })
      .error(function (data,status,header,config) {
        var loadingStatus = document.getElementsByClassName("loading-status")[0];
        loadingStatus.textContent = "Tidak bisa mengambil data dari server, periksa koneksi internet anda.";
      });
  };

    if ("geolocation" in navigator) {
      $s.status = "Geolocation bekerja";
      var success = function(position){
        $s.getData(position.coords.latitude, position.coords.longitude);
        $s.navigationError = false;
      };
      var navigatorError = function() {
        $s.navigationError = true;
      };
      navigator.geolocation.getCurrentPosition(success, navigatorError);
    } else {
      $s.status = "Geolocation tidak bekerja";
    }
}]);
var cuk = "as";