'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

	var original = {id: '', side: '', quantity: ''};

	$scope.data = [
		{
			id: 1,
			side: 'Buy',
			name: 'ABC',
			quantity: 10,
			rem_qty: null,
			status: ''
		},
		{
			id: 2,
			side: 'Sell',
			name: 'XYZ',
			quantity: 15,
			rem_qty: null,
			status: ''
		},
		{
			id: 3,
			side: 'Sell',
			name: 'ABC',
			quantity: 13,
			rem_qty: null,
			status: ''
		},
		{
			id: 4,
			side: 'Buy',
			name: 'XYZ',
			quantity: 10,
			rem_qty: null,
			status: ''
		},
		{
			id: 5,
			side: 'Buy',
			name: 'XYZ',
			quantity: 8,
			rem_qty: null,
			status: ''
		},
	];
	$scope.company = [
		{
			id: 1,
			name: 'ABC',
			rem_qty: 0
		},
		{
			id: 2,
			name: 'XYZ',
			rem_qty: 0
		}
	];

	var init = function() {
		angular.forEach($scope.data, function(value, key){
			value.rem_qty = value.quantity;
		});
		$scope.input = $scope.data;
	}

	/*$scope.calculate = function(){
		var count_i = 0, count_j = 0;
		for (var i = 0; i < $scope.data.length; i++)
		{
			if ($scope.data[i].rem_qty != 0){
				for (var j = i + 1; j < $scope.data.length; j++){
					if ($scope.data[i].name === $scope.data[j].name){
						if ($scope.data[i].rem_qty > $scope.data[j].rem_qty){
							$scope.data[i].rem_qty = Math.abs($scope.data[i].rem_qty - $scope.data[j].rem_qty);
							$scope.data[i].status = 'Open';
							$scope.data[j].rem_qty = 0;
							$scope.data[j].status = 'Closed';
						}
						else{							
							$scope.data[j].rem_qty = Math.abs($scope.data[i].rem_qty - $scope.data[j].rem_qty);
							$scope.data[j].status = 'Open';
							$scope.data[i].rem_qty = 0;
							$scope.data[i].status = 'Closed';
						}					
					}
				}
			}						
		}
	}*/

	$scope.calculate = function(){
		var count_i = 0, count_j = 0;
		for (var i = 0; i < $scope.data.length; i++)
		{
			for (var j = i + 1; j < $scope.data.length; j++){
				if ($scope.data[i].name === $scope.data[j].name && $scope.data[i].rem_qty != 0){
					if ($scope.data[i].rem_qty > $scope.data[j].rem_qty){
						$scope.data[i].rem_qty = Math.abs($scope.data[i].rem_qty - $scope.data[j].rem_qty);
						$scope.data[i].status = 'Open';
						$scope.data[j].rem_qty = 0;
						$scope.data[j].status = 'Closed';
					}
					else{							
						$scope.data[j].rem_qty = Math.abs($scope.data[i].rem_qty - $scope.data[j].rem_qty);
						$scope.data[j].status = 'Open';
						$scope.data[i].rem_qty = 0;
						$scope.data[i].status = 'Closed';
					}					
				}
			}
									
		}
	}	

	init();

}]);