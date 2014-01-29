angular.module("angfire", ["firebase","ui.bootstrap"]).controller(
  "Angfire",["$rootScope","$scope","$firebase", "$modal","$log" ,function($rootScope,$scope, $firebase,$modal, $log)  {
      var ref= new Firebase("https://angfirebase.firebaseio.com/");
       $rootScope.fl = 0;
       $rootScope.authClient = new FirebaseSimpleLogin(ref, function(error, user) {
        if (error) {
         console.log(error);
        return;
           }
        if (user) {
          $rootScope.fl = 1;
        console.log(user + " is logged in.");
        console.log(user);
        $rootScope.user = user;

         } else {
          console.log("user is loged out.");
          console.log($rootScope.fl);
          if($rootScope.fl==0){
            $scope.open();
          }
          
          }
        });
      // $scope.angfireLogin = function(lgin){
      //   authClient.login(lgin);
      // };
      
      $scope.angfireLogout = function(lgout){
        $rootScope.fl = 2;
        $rootScope.authClient.logout();
      }
      $scope.comments= $firebase(ref);
      //$scope.username = "User" + Math.floor(Math.random() * 101)
      $scope.username = $rootScope.authClient.user;

      $scope.addComment = function(e){
        if (e.keyCode != 13) return;
        $scope.comments.$add({
           from: $rootScope.user.name,
           body: $scope.newComment,
           fid: $rootScope.user.id
      });
      $scope.newComment= "";  
      console.log("Comments by the user" + $rootScope.user.name);
     }
     
   
    $scope.open = function () {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: ModalInstanceCtrl,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
    }

  var ModalInstanceCtrl = function ($rootScope,$scope, $modalInstance, items) {

  /*$scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };
*/
  $scope.ok = function () {
    $modalInstance.close(authClient.login(lgin));
     };

  $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
      };

  $scope.angfireLogin = function(lgin){
        $rootScope.authClient.login(lgin);
        $modalInstance.close();
      };

};

  }
]);


