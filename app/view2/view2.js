'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ['$scope', function($scope) {

	var original = {id: '', side: '', quantity: ''};
	var calculateOutput, id = 0;	

	$scope.data = [];
	$scope.company = [
		{
			id: 1,
			name: 'ABC',
		},
		{
			id: 2,
			name: 'XYZ',
		}
	];

	var init = function() {		
	}

	var check = function(index1, index2) {
		return $scope.data[index1].name === $scope.data[index2].name && $scope.data[index1].rem_qty;
	}

	var quantity_check = function (index1, index2) {
		return $scope.data[index1].rem_qty > $scope.data[index2].rem_qty;
	}

	var swap = function(index1, index2) {
		$scope.data[index1].rem_qty = Math.abs($scope.data[index1].rem_qty - $scope.data[index2].rem_qty);
		$scope.data[index1].status = 'Open';
		$scope.data[index2].rem_qty = 0;
		$scope.data[index2].status = 'Closed';
	}

	$scope.calculate = function(){
		for (var i = 0; i < $scope.data.length; i++)
		{			
			for (var j = i + 1; j < $scope.data.length; j++){
				if (check(i, j)){
					if (quantity_check(i, j)){
						swap(i,j);
						/*$scope.data[i].rem_qty = Math.abs($scope.data[i].rem_qty - $scope.data[j].rem_qty);
						$scope.data[i].status = 'Open';
						$scope.data[j].rem_qty = 0;
						$scope.data[j].status = 'Closed';*/
					}
					else{				
						swap(j,i);			
						/*$scope.data[j].rem_qty = Math.abs($scope.data[i].rem_qty - $scope.data[j].rem_qty);
						$scope.data[j].status = 'Open';
						$scope.data[i].rem_qty = 0;
						$scope.data[i].status = 'Closed';*/
					}					
				}					
			}
		}
	}

	$scope.submit = function() {
		id++;
		console.log($scope.stock);
		var temp_stock = $scope.stock;	

		$scope.stock = angular.copy(original);
		$scope.stockForm.$setPristine();

		$scope.data.push({id: id, side: temp_stock.side, name: temp_stock.id.name, quantity: temp_stock.quantity, rem_qty: temp_stock.quantity, status: ''});
		$scope.calculate();	
	};

	init();

}]);