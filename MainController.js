var app = angular.module("AdvertismentApp", ["ngRoute"]);

app.controller("AdController", function($scope, $http, $location){

  $scope.company = {
    orgNr:"",
    name:"",
    phone:"",
    address:"",
    zip:"",
    city:"",
    invoiceAddress:"",
    invoiceZip:"",
    invoiceCity:""
  };

  $scope.sub = {
    id:"0",
    name:"0",
    phone:"0",
    zip:"0",
    address:"0",
    city:"0"
  };

  $scope.ad = {
    heading:'none',
    content:'none',
    price:'none'
  };

  $scope.readSubAds = function () {
    $http.get("php_files/read_ads_sub.php").then( function(response){
      $scope.subAds = response.data;
      //console.log($scope.Ads);
    });
  };
  $scope.readSubAds();

  $scope.readCompanyAds = function(){

    $http.get('php_files/read_ads_company.php').then(function (response) {
      $scope.companyAds = response.data;
    })
  };
  $scope.readCompanyAds();

  $scope.subRedirect = function (id) {
    var string = "http://localhost/API/public/index.php/api/sub/"+id;
    $http.get(string).then(function (response) {
      $scope.subs = response.data;

      $scope.sub.id = $scope.subs[0].Sub_ID;
      $scope.sub.name = $scope.subs[0].Sub_Name;
      $scope.sub.phone = $scope.subs[0].Sub_PhoneNr;
      $scope.sub.zip = $scope.subs[0].Sub_Zip;
      $scope.sub.address = $scope.subs[0].Sub_Address;
      $scope.sub.city = $scope.subs[0].Sub_City;
    });
    $location.path('/subInfo');
  };

  $scope.toUpdate = function () {
    $location.path('/updateSub');
  };

  $scope.updateSub = function () {
    var string = "http://localhost/API/public/index.php/api/sub/edit"
    $http.post(string, {
      'id':$scope.sub.id,
      'name':$scope.sub.name,
      'phone':$scope.sub.phone,
      'zip':$scope.sub.zip,
      'address':$scope.sub.address,
      'city':$scope.sub.city
    });
    $location.path('/subInfo');
  };

  $scope.adRedirect = function () {
    $location.path('/addAd');
  };

  $scope.orgRedirect = function (id) {
    $scope.company.orgNr = id;
    $location.path('/companyForm');
  };

  $scope.createAdvts = function() {
    console.log($scope.company);

    $http.post('php_files/create_advts.php',{
      'id':$scope.company.orgNr,
      'name':$scope.company.name,
      'phone':$scope.company.phone,
      'address':$scope.company.address,
      'zip':$scope.company.zip,
      'city':$scope.company.city,
      'invoiceaddress':$scope.company.invoiceAddress,
      'invoicezip':$scope.company.invoiceZip,
      'invoicecity':$scope.company.invoiceCity
    });
    $location.path('/addAdComp');
    console.log("klar");
  };

  $scope.createAd = function(x){
    //sub or org
    if(x){
      //create subscriber ad
      $http.post('php_files/create_ad_sub.php',{
        'heading':$scope.ad.heading,
        'content':$scope.ad.content,
        'price':$scope.ad.price
      });
    }else{
      console.log("else");
      //create subscriber company
      $http.post('php_files/create_ad_company.php',{
        'heading':$scope.ad.heading,
        'content':$scope.ad.content,
        'price':$scope.ad.price,
        'id':$scope.company.orgNr
      });


    console.log("klar");
  };
  $scope.readSubAds();
  $scope.readCompanyAds();
  $location.path('/');

};

});

app.config(function ($routeProvider) {

  $routeProvider
  .when('/', {templateUrl:"html/table.html"})

  .when('/subInfo',{templateUrl:"html/subInfo.html"})

  .when('/updateSub', {templateUrl:"html/updateSub.html"})

  .when('/addAd', {templateUrl:'html/addAd.html'})

  .when('/companyForm', {templateUrl:'html/companyForm.html'})

  .when('/addAdComp', {templateUrl:'html/addAd_company.html'});

});
