angular.module('Lottery',[]);

angular.module('Lottery').controller('MainController', function($scope, $q) {

	$scope.topNumber = 100;
	$scope.bottomNumber = 1;
	$scope.maxSeconds = 5;
	$scope.minSeconds = 2;
	
	function getNumber(){
		var deferred = $q.defer();
		
		setTimeout(function(){
			$scope.seconds = 1000 * (Math.floor( Math.random() * ( $scope.maxSeconds - $scope.minSeconds + 1 )) + $scope.minSeconds);
			do {
				$scope.randomNumber = Math.floor( Math.random() * ( $scope.topNumber - $scope.bottomNumber + 1 )) + $scope.bottomNumber;
			} while ($scope.resultNumbers.indexOf($scope.randomNumber) !== -1)
			deferred.resolve({ number: $scope.randomNumber, seconds: $scope.seconds });
        }, $scope.seconds);
		
		return deferred.promise;
	};

	$scope.firePromise = function(){
		$scope.resultNumbers = [];
		
		var promise = getNumber();
		
		promise.then(function(success){
			$scope.resultNumbers.push(success);
			return getNumber();
		}).then(function(success){
			$scope.resultNumbers.push(success);
			return getNumber();
		}).then(function(success){
			$scope.resultNumbers.push(success);
		});
	};
	
});



















