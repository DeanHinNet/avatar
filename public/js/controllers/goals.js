angular.module('GoalsControllerMod', [])
	.controller('GoalsController', ['$scope', '$http', 'Goals', 
		function($scope, $http, Goals){
			$scope.formData = {};
			Goals.get()
				.success(function(data){
					console.log('yes');
					$scope.goals = data;
				});

			$scope.createGoal = function(){
				if ($scope.formData.name != undefined){
					Goals.create($scope.formData)
						.success(function(data){
							$scope.formData = {};
							$scope.goals = data;
						});
				}
			};

			$scope.deleteGoal = function(id){
				Goals.delete(id)
					.success(function(data){
						$scope.goals = data;
					});
			};

	}]);