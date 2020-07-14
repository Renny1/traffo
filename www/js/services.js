angular.module('starter.services', [])
.constant("URL", "http://192.168.1.102:8030/")
/*?json=get_posts&category_name=usuario_app*/
.service('PostService', function($q, $http, $ionicLoading, URL) {

  return {

    Post: function(url_caminho,params) {

      var deferred = $q.defer();
      var promise = deferred.promise;
      var url =  URL + url_caminho;

      $http.get(url, params)
      .success(function(data) {


         deferred.resolve(data);
        }).error(function(err) {
          deferred.reject(err);
        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      },


   Get: function(url_caminho,params) {

      var deferred = $q.defer();
      var promise = deferred.promise;
      var url =  "https://www.googleapis.com/plus/v1/people/" + url_caminho;

      $http.get(url, params)
      .success(function(data) {


         deferred.resolve(data);
        }).error(function(err) {
          deferred.reject(err);
        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      } ,
   GetLinkedin: function(url_caminho,params) {

      var deferred = $q.defer();
      var promise = deferred.promise;
      var url =  "https://api.linkedin.com/v1/people/~:(id,email-address,first-name,last-name,picture-url)?format=json&oauth2_access_token=" + url_caminho;

      $http.get(url, params)
      .success(function(data) {


         deferred.resolve(data);
        }).error(function(err) {
          deferred.reject(err);
        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      },  

    }
  })
;