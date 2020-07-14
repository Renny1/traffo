// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

angular.module('ionic.utils', ['starter.controllers'])
  .factory('$localstorage', ['$window', function($window) {
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      },
      clear: function(){
        return $window.localStorage.clear();
      }
    }
  }])

 .factory('SocketService',function(socketFactory){
        //Create socket and connect to http://chat.socket.io 
     // 'ioSocket': io.connect('http://chat-partners-global.cloudno.de')
     //'ioSocket': io.connect('http://127.0.0.1:8100')
      return socketFactory({

            'ioSocket': io.connect('http://chat-partners-global.cloudno.de')

        });
      

    })



  ;


angular.module('starter', ['ionic', 'ionic.utils', 'starter.controllers', 'starter.services', 'ngCordova', 'ngCordovaOauth', 'btford.socket-io', 'angularMoment'])

.factory('IDEALFactory', function($localstorage) {

  var _infoUser = $localstorage.getObject('infoUser');
  var _infoCodId = $localstorage.getObject('infoCodId');
  



  return {

    setInfoUser: function(infoUser, manterConectado) {
      if (manterConectado) {
        $localstorage.setObject('infoUser', JSON.stringify(infoUser));
      }
      _infoUser = JSON.stringify(infoUser);
    },
    getInfoUser: function() {
      return JSON.parse(_infoUser);
    },



    setInfoCodId: function(infoCodId) {
    $localstorage.setObject('infoCodId', JSON.stringify(infoCodId));
      _infoCodId = JSON.stringify(infoCodId);
    },
    getInfoCodId: function() {
      return JSON.parse(_infoCodId);
    },

  };


})



.run(function($ionicPlatform, IDEALFactory, $state) {

  $ionicPlatform.ready(function() {




    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
     
          document.addEventListener('deviceready', function() {
           


        }, true);



/*if (localStorage.getItem("infoUser") !== null) {

  var user = IDEALFactory.getInfoUser();
 
    if (typeof user.infoUser.id !== 'undefined' && user.infoUser.id !== null) {
      $state.go('app.inicio');
    } else {
      $state.go('login');
    }
}*/

  });




})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })


    .state('app.inicio', {
      url: '/inicio',

        views: {
        'menuContent': {
      templateUrl: 'templates/inicio.html',
      controller: 'InicioCtrl'
        }
      }
    })

    .state('app.enterChat', {
      url: '/enterChat',
        views: {
        'menuContent': {
            templateUrl: 'templates/enterChat.html',
            controller: 'EnterChatCtrl'
        }
      }
    })
    .state('app.chat', {
      url: '/chat',

        views: {
        'menuContent': {
            templateUrl: 'templates/chat.html',
            controller: 'ChatCtrl'
        }
      }
    })


    .state('app.convidados', {
      url: '/convidados',

        views: {
        'menuContent': {
      templateUrl: 'templates/convidados.html',
      controller: 'ConvidadosCtrl'
        }
      }
    })

 

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});