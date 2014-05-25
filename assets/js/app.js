var app = angular.module("konstituen", ['ngRoute', 'ngResource','chieffancypants.loadingBar']);
app.config(["$routeProvider",
  function($route) {
    $route
      .when("/", {
        templateUrl: "assets/views/berita.html",
        controller: "BeritaCtrl"
      })
      .when("/beranda", {
        templateUrl: "assets/views/home.html",
        controller: "BeritaCtrl"
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
  ["$scope", "$rootScope" , "$http", "$resource",
  function ($s,$rs,$h,$r) {
    $rs.hideLoader = false;
    $s.display = true;
    var url = "http://api.pemiluapi.org/berita?json=get_recent_posts&apiKey=fea6f7d9ec0b31e256a673114792cb17";
    var BeritaAPI = $r(url, { callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});

    $s.getNews = function() {
      BeritaAPI.get(function(data){
          $s.data = data;
          $rs.hideLoader = true;
          $s.display = false;
      }, function(err){
          alert('request failed');
      });
    };
    $s.getNews();
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