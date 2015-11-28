angular.module('view-controllers')

.controller('WorkSpaceCtrl',['$rootScope','$scope','NewRegS',
	        function($rootScope,$scope,NewRegS){
                $scope.isMaster = true
    $scope.submitPassword = function (form){//password,confirm,masterActivationCode){
       if(!form.$valid)
              return

       var password = form.password.$viewValue
       var confirm = form.confirm.$viewValue


        if(password!=confirm)
           return PopupsS.show('The passwords do not match.','OK') 

        var d =$q.defer()

            if(!$rootScope.isMaster){
                NewRegS.studentChoosePassword(password,$rootScope.userID).then(function(res){

                        AuthS.RegistrationCompeleteSingIn(res.userData).then(function(){
                                              $ionicHistory.nextViewOptions({
                                                disableBack: true
                                              })
                                              $ionicHistory.clearHistory()
                                              $state.go('app.home-view')
                        },function (err){
                            //TODO LOG ERROR
                            console.log("ChoosePasswordViewCtrl=>SubmitPassword=>NewRegS.studentChoosePassword error: "+err.message)
                        })   
                    
                 
                })           
            }
            else if($rootScope.isMaster&&masterActivationCode){
              var masterActivationCode = form.code.$viewValue
                NewRegS.masterChoosePassword(password,masterActivationCode,$rootScope.userID).then(function(res){
                    if(res.faild)
                        return PopupsS.show(res.message,'OK') 

                        AuthS.RegistrationCompeleteSingIn(res.userData).then(function(){
                                              $ionicHistory.nextViewOptions({
                                                disableBack: true
                                              })
                                              $ionicHistory.clearHistory()
                                              $state.go('app.home-view')
                        },function (err){
                            //TODO LOG ERROR
                            console.log("ChoosePasswordViewCtrl=>SubmitPassword=>NewRegS.studentChoosePassword error: "+err.message)
                        })   
                    
                    
                       
                })    
            }

        return d.promise
    }

}]) 