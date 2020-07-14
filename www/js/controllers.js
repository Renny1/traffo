angular.module('starter.controllers', ['ionic', 'ngCordova', 'ngCordovaOauth'])

.filter('trustAsHtml', function($sce) {
    return $sce.trustAsHtml;
  })

  .controller('AppCtrl', function($localstorage, $scope, PostService, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading, $rootScope) {

    $scope.getBack = function() {

      if (IDEALFactory.getInfoUser().infoUser.rsocial == "F") {

        // Facebook logout
        facebookConnectPlugin.logout(function() {
            $ionicLoading.hide();
            $state.go("login");
          },
          function(fail) {
            /*   */
          });


      }

      var infoUser = {};
      IDEALFactory.setInfoUser({
        'infoUser': infoUser
      }, true);
      $localstorage.clear();

      $ionicLoading.hide();



    }

    if (window.screen.width >= 441) {
      $scope.widthMenu = 470;
    } else {
      $scope.widthMenu = 270;
    }



    var user = IDEALFactory.getInfoUser().infoUser;

    $scope.name = user.name;
    $scope.url = user.url;


    $ionicLoading.hide();

  })

.controller('LoginCtrl', function($localstorage, $scope, PostService, $ionicPopup, $state, $http, $timeout, $interval, IDEALFactory, $ionicLoading, $rootScope, $cordovaOauth) {
  /*var string = "http://localhost/traffo/www/#/login";
   var replacedString = string.replace(/[/]/g, "");
            var getUsuario = "datasnap/rest/TServerMethods1/PutEscritor/3243244323/Joaquim Oliveira/"+ replacedString +"/joaguim@gmail.com/F";


            PostService.Post(getUsuario).success(function(data) {

   alert(JSON.stringify(data, null, 4));

  });
  alert("passou");*/


    $scope.getMobileOperatingSystem = function() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
  {
    return 'iOS';

  }
  else if( userAgent.match( /Android/i ) )
  {

    return 'Android';
  }
  else
  {
    return 'unknown';
  }
}

  if($scope.getMobileOperatingSystem() == 'iOS'){

$scope.statusService = false;

/*  var codigoId = document.getElementById('codigoId');
  codigoId.value = "";*/
}

  var idImei = '';
  var codId = '';

$scope.connected = false;
/*    $interval(function() {
       getStatus();
      
    }, 5000);*/



  document.addEventListener('deviceready', function() {
    myService = cordova.plugins.myService;
    getStatus();
  }, true);

  document.addEventListener('resume', function() {

    getStatus();

  }, true);



  $scope.data = {};
  $scope.data.persistente = true;

 $scope.entrar = function(connected) {
 if(connected){
/*  getStatusLogin();*/
 $state.go('app.inicio');
  }
 }


  $scope.insertCod = function() {




var codsArray = [];
codsArray = ['AM22', 'CR22'];

if(codsArray.indexOf($scope.data.codigo.toUpperCase()) != -1){



  $( ".signCod" ).fadeOut( "slow", function() {
    $(".signSocial").fadeIn("slow");
  });

  codId = $scope.data.codigo.toUpperCase();

          var infoCodId = {
               
          infoCodId: codId

        };
        IDEALFactory.setInfoCodId({
          'infoCodId': infoCodId
        }, true);


}else{


  var codigoId = document.getElementById('codigoId');
  codigoId.value = "";


}

}
  $scope.activeService = function(stringStorage) {



    $timeout(function() {
      startService();
    }, 200);
    $timeout(function() {
      enableTimer();
    }, 400);
    $timeout(function() {
      registerForUpdates();
    }, 600);
    $timeout(function() {
      registerForBootStart();
    }, 800);
    $timeout(function() {
      setConfig(stringStorage);

    }, 1000);
    /*        $timeout(function() {
          getStatus();
        }, 1000);*/
  }

  function getStatus() {
    myService.getStatus(function(r) {
        updateData(r)
      },
      function(e) {
        handleError(e)
      });
  };




  function startService() {
    myService.startService(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });

  }

  function stopService() {
    myService.stopService(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function enableTimer() {
    myService.enableTimer(5000,
      function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function disableTimer() {
    myService.disableTimer(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  };

  function registerForBootStart() {
    myService.registerForBootStart(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function deregisterForBootStart() {
    myService.deregisterForBootStart(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function registerForUpdates() {
    myService.registerForUpdates(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function deregisterForUpdates() {
    myService.deregisterForUpdates(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }


  function updateData(data) {

//    alert(JSON.stringify(data, null, 4));
    if (data.LatestResult != null) {
      try {
        $timeout(function() {
          $scope.$apply(function() {
            $scope.statusService = data.ServiceRunning;
        $scope.testeParams = data.Configuration.testeParams;
        var resultMessage1 = document.getElementById("resultMessage1");
        resultMessage1.innerHTML = data.Configuration.connected;

$scope.connected = Boolean(data.Configuration.connected);



          });
        });
        /*        alert(data.Configuration.testeParams);
                idImei = data.Configuration.testeParams;*/
      } catch (err) {}
    }
  }




  function handleError(e) {
    //alert("Erro de instalacao do servico");
  }


  function setConfig(params) {

    /*    var helloToTxt = "Testing Params";
        var helloToString = helloToTxt;*/



    var config = {
      "paramsUser": params,
      "codId": codId
    };
    myService.setConfiguration(config,
      function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });

  }



/*    var infoUser = {
        id: "teste",
        url: "teste",
        email: "teste",
        name: "teste"
      };
      IDEALFactory.setInfoUser({
        'infoUser': infoUser
      }, true);*/


  /*
  var url = "datasnap/rest/TServerMethods1/PutUsuario/23413235/testeDoTio/worksPlease/ForaDilma";

        PostService.Post(url).success(function(data) {



        alert("foi" + data);

           var infoUser = {
                id: data.id,
                url: data.picture.data.url,
                email: data.email,
                name: data.name
              };
              IDEALFactory.setInfoUser({
                'infoUser': infoUser
              }, true);

     alert("foi2");

       }).error(function(data) {
    alert("erro");
        });


  */


  var fbLoginSuccess = function(response) {
    if (!response.authResponse) {
      fbLoginError("Cannot find the authResponse");
      return;
      alert("Cannot find the authResponse");
    }
    var authResponse = response.authResponse;
    facebookConnectPlugin.api('/me?fields=email,name,picture&access_token=' + authResponse.accessToken, null,
      function(response) {
        // Define the string
        alert(JSON.stringify(response, null, 4))

        var string = "http://graph.facebook.com/" + response.id + "/picture";
        // Encode the String
        var replacedString = string.replace(/[/]/g, "+");
        var idUser = response.id.toString();
        //var getUsuario = "datasnap/rest/TServerMethods1/GetEscritor/" + idImei;
        /*var getUsuario = "datasnap/rest/TServerMethods1/GetEscritor/" + idUser;*/
        alert("testando");

        var resultString = response.name + "/" + replacedString + "/" + response.email + "/F"

        $scope.activeService(resultString.replace(" ", "+"));


        var infoUser = {
          id: idUser,
          name: response.name,
          url: replacedString,
          email: response.email,
          rsocial: 'F'
        };
        IDEALFactory.setInfoUser({
          'infoUser': infoUser
        }, true);

        $timeout(function() {
          $scope.$apply(function() {
            $scope.statusService = true;

          });
        });
        $ionicLoading.hide();

        /*        PostService.Post(getUsuario).success(function(data) {
                  alert("veio");

                  var getUsuario = data.result[0];
                  if (data.result[0].table.length > 0) {
                    alert("existe");
                    var infoUser = {
                      id: getUsuario.ID[0],
                      name: getUsuario.NAME[0],
                      url: getUsuario.URL[0],
                      email: getUsuario.EMAIL[0],
                      rsocial: 'F'
                    };

                    IDEALFactory.setInfoUser({
                      'infoUser': infoUser
                    }, true);

                    $ionicLoading.hide();
                    $state.go('app.inicio');
                  } else {
                    alert("nao existe");
                    alert(replacedString);
                    alert(idImei);
                    alert(response.name);
                    var url = "datasnap/rest/TServerMethods1/PutEscritor/" + idImei + "/" + response.name + "/" + replacedString + "/" + response.email + "/F";
                    PostService.Post(url).success(function(data) {
                      alert("cadastrou");
                      var infoUser = {
                        id: idImei,
                        name: response.name,
                        url: replacedString,
                        email: response.email,
                        rsocial: 'F'
                      };
                      IDEALFactory.setInfoUser({
                        'infoUser': infoUser
                      }, true);
                      $ionicLoading.hide();
                      $state.go('app.inicio');
                    }).error(function(data) {
                      alert("erro");
                      $ionicLoading.hide();
                    });
                  }
                }).error(function(data) {
                  alert("erro");
                  $ionicLoading.hide();
                });
              },
              function(response) {
                alert("erro");
                $ionicLoading.hide();
              }
            );*/
      });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error) {
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };
  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success) {
      if (success.status === 'connected') {

        // alert(JSON.stringify(profileInfo, null, 4));
        /*var user = UserService.getUser('facebook');*/
/*      if (localStorage.getItem("infoUser") !== null) {
         //var user = IDEALFactory.getInfoUser().infoUser;
         //"http://graph.facebook.com/" + success.authResponse.id + "/picture?type=large"
          $ionicLoading.hide();
          $state.go('app.inicio');
        } else {
          facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, function(error) {
            console.log("erro" + error)
          });
        }*/

          facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, function(error) {
            console.log("erro" + error)
          });
 



      } else {

        console.log('getLoginStatus', success.status);


        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, function(error) {
          alert("Erro");
        });
      }
    });
  };


  $scope.linkedInSignIn = function() {
    alert("testando2");
    $cordovaOauth.linkedin("77xnvrcauoxbp1", "akFDKlVYpPYCTm5a", ["r_basicprofile", "r_emailaddress"],
      "ASsaASdsaaddaSADsa").then(function(result) {
      alert(JSON.stringify(result));
      var access_token = result.access_token;
      var expire_date = result.expires_in;

      alert(access_token);
      PostService.GetLinkedin(access_token).success(function(data) {

        alert(JSON.stringify(data));

        // var getUsuario = "datasnap/rest/TServerMethods1/GetEscritor/" + idImei;
        /*    var getUsuario = "datasnap/rest/TServerMethods1/GetEscritor/" + data.id;*/

        if (data.pictureUrl) {
          replacedString = data.pictureUrl.replace(/[/]/g, " ");
        } else {
          replacedString = "NãoContémImagem";
        }

        var resultString = data.firstName + " " + data.lastName + "/" + replacedString + "/" + data.emailAddress + "/L";

        $scope.activeService(resultString.replace(" ", "+"));

//data.id.toString()

        var infoUser = {
               
          id: data.id.toString(),
          name: data.firstName + " " + data.lastName,
          url: replacedString,
          email: data.emailAddress,
          rsocial: 'F'
        };
        IDEALFactory.setInfoUser({
          'infoUser': infoUser
        }, true);


        $timeout(function() {
          $scope.$apply(function() {
            $scope.statusService = true;

          });
        });
        $ionicLoading.hide();

        /*
                PostService.Post(getUsuario).success(function(result) {
                  var getUsuario = result.result[0];
                  if (result.result[0].table.length > 0) {
                    var infoUser = {
                      id: getUsuario.ID[0],
                      name: getUsuario.NAME[0],
                      url: getUsuario.URL[0],
                      email: getUsuario.EMAIL[0],
                      rsocial: 'L'

                    };
                    IDEALFactory.setInfoUser({
                      'infoUser': infoUser
                    }, true);

                    $ionicLoading.hide();
                    $state.go('app.inicio');
                  } else {
                    alert("verificando");
                    alert(JSON.stringify(data));
                    alert(data.pictureUrl);
                    if (data.pictureUrl) {
                      replacedString = data.pictureUrl.replace(/[/]/g, " ");
                    } else {
                      replacedString = "Não contém imagem";
                    }



                    var url = "datasnap/rest/TServerMethods1/PutEscritor/" + idImei + "/" + data.firstName + " " + data.lastName + "/" + replacedString + "/" + data.emailAddress + "/L";
                    PostService.Post(url).success(function(data) {
                      var infoUser = {
                        id: idImei,
                        name: data.firstName + " " + data.lastName,
                        url: replacedString,
                        email: data.emailAddress,
                        rsocial: 'L'
                      };
                      IDEALFactory.setInfoUser({
                        'infoUser': infoUser
                      }, true);
                      $ionicLoading.hide();
                      $state.go('app.inicio');
                    }).error(function(data) {
                      alert("erro");
                      $ionicLoading.hide();
                    });
                  }
                }).error(function(data) {
                  alert("erro");
                  $ionicLoading.hide();
                });*/


      }).error(function(data) {
        alert("erro");
        $ionicLoading.hide();
      });
    });
  };

  $scope.googleSignIn = function() {

    /*      var url = "109914458555392057758?key=AIzaSyCf4izUJajpOwp9cseftKB-6P3EAuShhRA";
                  PostService.Get(url).success(function(data) {
                     alert(JSON.stringify(data.image.url));
                  });*/
    $ionicLoading.show({});
    window.plugins.googleplus.login({},
      function(user_data) {
        // For the purpose of this example I will store user data on local storage
        /*        alert(JSON.stringify(user_data, null, 4));
                alert("testandoGoogle");
                alert(idImei);
                var getUsuario = "datasnap/rest/TServerMethods1/GetEscritor/" + idImei;
                alert("vindo");*/
        /*var getUsuario = "datasnap/rest/TServerMethods1/GetEscritor/" + user_data.userId;*/

        var urlImage = user_data.userId.toString() + "?key=AIzaSyCf4izUJajpOwp9cseftKB-6P3EAuShhRA";

        PostService.Get(urlImage).success(function(data) {

          var encodedString = data.image.url.replace(/[/]/g, " ");

          alert(encodedString);
        var resultString = user_data.displayName + "/" + encodedString + "/" + user_data.email + "/G";

        $scope.activeService(resultString.replace(" ", "+"));

          var infoUser = {
            id: user_data.userId.toString(),
            name: user_data.displayName,
            url: encodedString,
            email: user_data.email,
            rsocial: 'G'
          };
          IDEALFactory.setInfoUser({
            'infoUser': infoUser
          }, true);
          $timeout(function() {
            $scope.$apply(function() {
              $scope.statusService = true;

            });
          });
          $ionicLoading.hide();
        }).error(function(data) {

        var resultString = user_data.displayName + "/NaoContemImagem/" + user_data.email + "/G";

        $scope.activeService(resultString.replace(" ", "+"));

          var infoUser = {
            id: user_data.userId.toString(),
            name: user_data.displayName,
            url: "NaoContemImagem",
            email: user_data.email,
            rsocial: 'G'
          };
          IDEALFactory.setInfoUser({
            'infoUser': infoUser
          }, true);
          $timeout(function() {
            $scope.$apply(function() {
              $scope.statusService = true;

            });
          });
          $ionicLoading.hide();
        });

        /*
               PostService.Post(getUsuario).success(function(data) {

                  var getUsuario = data.result[0];
                  if (data.result[0].table.length > 0) {
                    var infoUser = {
                      id: getUsuario.ID[0],
                      name: getUsuario.NAME[0],
                      url: getUsuario.URL[0],
                      email: getUsuario.EMAIL[0],
                      rsocial: 'G'

                    };
                    IDEALFactory.setInfoUser({
                      'infoUser': infoUser
                    }, true);

                    $ionicLoading.hide();
                    $state.go('app.inicio');
                  } else {
                    alert("nao existe");
                    alert(JSON.stringify(user_data, null, 4));

                    var urlImage = user_data.userId + "?key=AIzaSyCf4izUJajpOwp9cseftKB-6P3EAuShhRA";

                    PostService.Get(urlImage).success(function(data) {
                      alert("com foto");
                      alert(data.image.url);
                      var encodedString = data.image.url.replace(/[/]/g, " ");
                      encodedString = encodedString.replace("?sz=50", "");
                      alert(encodedString);

                      var url = "datasnap/rest/TServerMethods1/PutEscritor/" + idImei + "/" + user_data.displayName + "/" + encodedString + "/" + user_data.email + "/G";
                      PostService.Post(url).success(function(data) {

                        var infoUser = {
                          id: idImei,
                          name: user_data.displayName,
                          url: encodedString,
                          email: user_data.email,
                          rsocial: 'G'
                        };
                        IDEALFactory.setInfoUser({
                          'infoUser': infoUser
                        }, true);
                        $ionicLoading.hide();
                        $state.go('app.inicio');
                      }).error(function(data) {
                        alert("erro");
                        $ionicLoading.hide();
                      });


                    }).error(function(data) {
                      alert("sem foto");
                      var url = "datasnap/rest/TServerMethods1/PutEscritor/" + user_data.userId + "/" + user_data.displayName + "/Nao contém imagem/" + user_data.email + "/G";
                      PostService.Post(url).success(function(data) {
                        var infoUser = {
                          id: idImei,
                          name: user_data.displayName,
                          url: "Não tem imagem",
                          email: user_data.email,
                          rsocial: 'G'
                        };
                        IDEALFactory.setInfoUser({
                          'infoUser': infoUser
                        }, true);
                        $ionicLoading.hide();
                        $state.go('app.inicio');
                      }).error(function(data) {
                        alert("erro");
                        $ionicLoading.hide();
                      });

                    });

                  }
                }).error(function(data) {
                  alert("erro");
                  $ionicLoading.hide();
                });*/


      },
      function(msg) {
        alert("erro");
        $ionicLoading.hide();
      }
    );
  };


})

.controller('InicioCtrl', function($scope, $ionicPlatform, PostService, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading, $rootScope, $cordovaLocalNotification, $cordovaOauth) {



  /*var url = "datasnap/rest/TServerMethods1/getAgenda/VENTURI/"+$scope.year+"-"+$scope.day+"-"+$scope.month;*/


  // Define the string
  var string = 'http://www.corvolouco.com.br/wp-content/uploads/2015/12/Com-o-impeachment-da-Dilma-quem-assume-afinal.jpg';

  // Encode the String
/*  var encodedString = Base64.encode(string);
  console.log(encodedString)*/; // Outputs: "SGVsbG8gV29ybGQh"

  function binEncode(data) {
    var binArray = []
    var datEncode = "";

    for (i = 0; i < data.length; i++) {
      binArray.push(data[i].charCodeAt(0).toString(2));
    }
    for (j = 0; j < binArray.length; j++) {
      var pad = padding_left(binArray[j], '0', 8);
      datEncode += pad + ' ';
    }

    function padding_left(s, c, n) {
      if (!s || !c || s.length >= n) {
        return s;
      }
      var max = (n - s.length) / c.length;
      for (var i = 0; i < max; i++) {
        s = c + s;
      }
      return s;
    }
    console.log(binArray);
  }



  var idUser = "123";
/*  var foto = binEncode(encodedString);*/
  var email = "fulado@ciclano.com";
  var name = "Fulano";
  var cargo = "auxiliar de auxiliar";
  var nivel = "1";
  var notas = "etc";



  /*

          var url = "datasnap/rest/TServerMethods1/PutUsuario/" + idUser + "/" + encodedString + "/" + foto + "/" + email + "/" + name + "/" + cargo + "/" + nivel + "/" + notas;



                PostService.Post(url).success(function(data) {




                });*/


})

.controller('MapaCtrl', function($interval, $scope, PostService, $ionicPopup, $state, $http, $timeout, IDEALFactory, $ionicLoading, $rootScope) {



  $ionicLoading.show({});

  var playerX = 0;
  var playerY = 0;
  var pos1 = 1;
  var pos2 = 2;
  var pos3 = 3;
  var borda = 50;



  var canvas = $('<canvas id="canvas" width="700" height="950" ></canvas>')
    .addClass('gameboard')
    .appendTo('article')
    .off('mousedown')
    .off('mouseup')
    .off('mousemove');

  var ctx = canvas.get(0).getContext('2d');
  var centerX = canvas.get(0).width / 2;
  var centerY = canvas.get(0).height / 2;
  var radius = 20;
  var canvasWidthNow = canvas.get(0).width;
  var canvasHeightNow = canvas.get(0).height;


  var board = {
    'width': canvas.width(),
    'height': canvas.height(),
    'x': 0,
    'y': 32,
    'bg': canvas.css('background-color'),

  };

  canvasWidthNow /= 1.1;
  canvasHeightNow /= 1.1;

  $("#canvas").animate({
    "width": canvasWidthNow,
    "height": canvasHeightNow
  }, "fast");
  canvasWidthNow /= 1.1;
  canvasHeightNow /= 1.1;

  $("#canvas").animate({
    "width": canvasWidthNow,
    "height": canvasHeightNow
  }, "fast");
  canvasWidthNow /= 1.1;
  canvasHeightNow /= 1.1;

  $("#canvas").animate({
    "width": canvasWidthNow,
    "height": canvasHeightNow
  }, "fast");

  var position1 = {
    'x': 0 + borda / 2,
    'y': 0 + borda / 2,
    'distance': 200
  };
  var position2 = {
    'x': ((canvas.get(0).width - borda) / 2) + borda / 2,
    'y': (canvas.get(0).height - borda) + borda / 2,
    'distance': 1
  };

  var position3 = {
    'x': (canvas.get(0).width - borda) + borda / 2,
    'y': 0 + borda / 2,
    'distance': 300
  };
  var position4 = {
    'x': 0,
    'y': 0,
    'distance': 150
  };
  var position5 = {
    'x': 0,
    'y': 0,
    'distance': 180
  };


  $scope.clearScreen = function() {

    ctx.beginPath();
    ctx.rect(0, 0, canvas.get(0).width, canvas.get(0).height);
    ctx.fillStyle = '#ccc';
    ctx.fill();
    ctx.stroke();



    ctx.beginPath();
    ctx.rect(borda / 2, borda / 2, canvas.get(0).width - borda, canvas.get(0).height - borda);



    ctx.fillStyle = '#9999FF';

    ctx.fill();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#333';
    ctx.stroke();



    ctx.beginPath();

    ctx.lineWidth = 10;


    ctx.moveTo(225, 25);
    ctx.lineTo(225, 250);


    ctx.moveTo(25, 325);
    ctx.lineTo(575, 325);


    // detalhe porta
    ctx.moveTo(650, 325);
    ctx.lineTo(675, 325);



    ctx.moveTo(225, 325);
    ctx.lineTo(225, 625);

    // detalhe porta
    ctx.moveTo(25, 625);
    ctx.lineTo(250, 625);

    ctx.moveTo(325, 625);
    ctx.lineTo(575, 625);


    // detalhe porta
    ctx.moveTo(650, 625);
    ctx.lineTo(675, 625);


    ctx.moveTo(425, 625);
    ctx.lineTo(425, 925);


    ctx.stroke();

    ctx.closePath();
  }


  $(document).on("click", ".mais", function() {


    canvasWidthNow *= 1.1;
    canvasHeightNow *= 1.1;

    $("#canvas").animate({
      "width": canvasWidthNow,
      "height": canvasHeightNow
    }, "fast");



  });

  $(document).on("click", ".menos", function() {
    canvasWidthNow /= 1.1;
    canvasHeightNow /= 1.1;

    $("#canvas").animate({
      "width": canvasWidthNow,
      "height": canvasHeightNow
    }, "fast");



  });


  var gameinterval = $interval(function() {
    /*  getStatus();*/
    $scope.render();
  }, 1);

  $scope.render = function() {

    $scope.clearScreen();


    if (position1.distance < position2.distance && position1.distance < position3.distance && position1.distance < position4.distance && position1.distance < position5.distance) {

      playerX = 450 - (radius / 2);
      playerY = (350 / 2) - (radius / 2);

    } else if (position3.distance < position1.distance && position3.distance < position2.distance && position3.distance < position4.distance && position3.distance < position5.distance) {

      playerX = (275 / 2) - (radius / 2);
      playerY = (375 / 2) - (radius / 2);

    } else if (position2.distance < position1.distance && position2.distance < position3.distance && position2.distance < position4.distance && position2.distance < position5.distance) {


      playerX = 450 - (radius / 2);
      playerY = 485 - (radius / 2);


    } else if (position4.distance < position1.distance && position4.distance < position3.distance && position4.distance < position2.distance && position4.distance < position5.distance) {


      playerX = 240 - (radius / 2);
      playerY = 795 - (radius / 2);



    } else if (position5.distance < position1.distance && position5.distance < position3.distance && position5.distance < position2.distance && position5.distance < position4.distance) {


      playerX = 558 - (radius / 2);
      playerY = 795 - (radius / 2);

    } else if (position1.distance == position3.distance) {

      playerX = 235 - (radius / 2);
      playerY = 296 - (radius / 2);

    } else if (position2.distance == position3.distance) {


      playerX = 623 - (radius / 2);
      playerY = 335 - (radius / 2);

    } else if (position4.distance == position3.distance) {

      playerX = 296 - (radius / 2);
      playerY = 635 - (radius / 2);

    } else if (position5.distance == position3.distance) {

      playerX = 625 - (radius / 2);
      playerY = 635 - (radius / 2);

    } else {

      /*   playerX = 623 - (radius / 2);
        playerY = 635 - (radius / 2);*/



    }



    ctx.beginPath();
    ctx.arc(playerX, playerY, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#6600CC';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#003300';
    ctx.stroke();


  };

  document.addEventListener('deviceready', function() {
    myService = cordova.plugins.myService;


    $timeout(function() {
      startService();
    }, 200);
    $timeout(function() {
      enableTimer();
    }, 400);
    $timeout(function() {
      registerForUpdates();
    }, 600);
    $timeout(function() {
      registerForBootStart();
    }, 800);

    $timeout(function() {
      getStatus();
    }, 1000);
    /*          $timeout(function() { setConfig(); }, 6000);   */

  }, true);

  function getStatus() {
    myService.getStatus(function(r) {
        updateData(r)
      },
      function(e) {
        handleError(e)
      });
  };

  function startService() {
    myService.startService(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });

  }

  function stopService() {
    myService.stopService(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function enableTimer() {
    myService.enableTimer(5000,
      function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function disableTimer() {
    myService.disableTimer(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  };

  function registerForBootStart() {
    myService.registerForBootStart(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function deregisterForBootStart() {
    myService.deregisterForBootStart(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function registerForUpdates() {
    myService.registerForUpdates(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function deregisterForUpdates() {
    myService.deregisterForUpdates(function(r) {
        handleSuccess(r)
      },
      function(e) {
        handleError(e)
      });
  }

  function setConfig() {
    alert("veio");
    var helloToTxt = "testando Beacons";
    var helloToString = helloToTxt;
    var config = {
      "HelloTo": helloToString
    };
    myService.setConfiguration(config,
      function(r) {
        updateData(r)
      },
      function(e) {
        handleError(e)
      });
    alert("fim");
  }



  function updateData(data) {

    /*  alert(JSON.stringify(data, null, 4));*/
    if (data.LatestResult != null) {
      try {
        var resultMessage1 = document.getElementById("resultMessage1");
        resultMessage1.innerHTML = data.Configuration.HelloTo1;

        /*      var resultMessage2 = document.getElementById("resultMessage2");
              resultMessage2.innerHTML = data.Configuration.HelloTo2 + "-----------" + data.Configuration.HelloTo2*100;

              var resultMessage3 = document.getElementById("resultMessage3");
              resultMessage3.innerHTML = data.Configuration.HelloTo3 + "-----------" + data.Configuration.HelloTo3*100;

              var resultMessage4 = document.getElementById("resultMessage4");
              resultMessage4.innerHTML = data.Configuration.HelloTo4 + "-----------" + data.Configuration.HelloTo4*100;*/



        /*  playerX = positions.x;
          playerY = positions.y;*/

        /*   position1.distance = data.Configuration.HelloTo1;*/
        /*   position2.distance = data.Configuration.HelloTo2*100;
           position3.distance = data.Configuration.HelloTo3*100;
           position4.distance = data.Configuration.HelloTo4*100;
           position5.distance = data.Configuration.HelloTo5*100;*/



        /*
        350 ---- 2 
        x ---- r
        */
      } catch (err) {}
    }
  }

  function handleError(e) {
    alert("trying error");

  }


  /*$interval(function() {

   

  }, 100);
  */

  $ionicLoading.hide();

})

.controller('EnterChatCtrl', function($scope, PostService, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading, $rootScope, SocketService) {

  $scope.enterRoom = function(room_name) {

    $rootScope.current_room = "Chat";
    /*localStorageService.set('room', room_name);*/

    var room = {
      'id': IDEALFactory.getInfoUser().infoUser.id,
      'room_name': $rootScope.current_room,
      'user': IDEALFactory.getInfoUser().infoUser.name,
      'text': '',
      'time': moment(),
      'advice': true
    };

    SocketService.emit('join:room', room);

    $state.go('app.chat');
  };

})


.controller('ChatCtrl', function($scope, $window, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading, $rootScope, SocketService, moment, $ionicScrollDelegate) {

    $rootScope.online = navigator.onLine;
    $window.addEventListener("offline", function() {
      $rootScope.$apply(function() {
        $rootScope.online = false;
      });
    }, false);

    $window.addEventListener("online", function() {
      $rootScope.$apply(function() {
        $rootScope.online = true;
      });
    }, false);


    $scope.messages = [];

    $scope.humanize = function(timestamp) {
      return moment(timestamp).fromNow();
    };


    $scope.current_user = IDEALFactory.getInfoUser().infoUser.name;
    var id_user = Math.floor((Math.random() * 1000) + 1);

    $scope.isNotCurrentUser = function(idUser) {

      if (id_user != idUser) {
        return 'not-current-user';
      }
      return 'current-user';
    };

    $scope.isNotCurrentUserToName = function(idUser, advice) {

      if (id_user == idUser) {
        return 'displayNone';
      }

      if (advice) {
        return 'displayNone';
      }



    };


    $scope.checkConnection = function() {
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN] = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI] = 'WiFi connection';
      states[Connection.CELL_2G] = 'Cell 2G connection';
      states[Connection.CELL_3G] = 'Cell 3G connection';
      states[Connection.CELL_4G] = 'Cell 4G connection';
      states[Connection.CELL] = 'Cell generic connection';
      states[Connection.NONE] = 'No network connection';

      alert('Connection type: ' + states[networkState]);
      return states[networkState];
    }

    setInterval(function() {
      if ($scope.checkConnection() == 'No network connection') {
        alert("Nao ha conexao para entrar no chat");
        $state.go('app.enterChat');
      }
    }, 10000);


    $scope.sendTextMessage = function() {

      var msg = {
        'id': id_user,
        'room': $rootScope.current_room,
        'user': $scope.current_user,
        'text': $scope.message,
        'time': moment(),
        'advice': false
      };

      $scope.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();

      $scope.message = '';

      SocketService.emit('send:message', msg);
    };


    $scope.leaveRoom = function() {

      var msg = {
        'id': id_user,
        'user': $scope.current_user,
        'room': $rootScope.current_room,
        'text': '',
        'time': moment(),
        'advice': true
      };

      SocketService.emit('leave:room', msg);


      $state.go('app.enterChat');



    };

    SocketService.on('message', function(msg) {

      $scope.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();
    });

    SocketService.on('exit', function(msg) {

      msg.time = moment();
      $scope.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();

    });

    SocketService.on('entrou', function(msg) {


      $scope.messages.push(msg);
      $ionicScrollDelegate.scrollBottom();


    });

    SocketService.on('qtd', function(qtd) {

      alert("teste");
      $scope.$apply(function() {
        $scope.qtd = qtd;

      });


    });



  })
  .controller('ConvidadosCtrl', function($scope, PostService, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading, $rootScope) {

    $scope.codId = IDEALFactory.getInfoCodId().infoCodId.infoCodId;

alert($scope.codId);


  })
   .controller('ClientesCtrl', function($scope, PostService, $ionicPopup, $state, $http, IDEALFactory, $ionicLoading, $rootScope) {

  })