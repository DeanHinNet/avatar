angular.module('ProjectsControllerMod', [])
	.controller('ProjectsController', ['$scope', '$http', 'Projects', 
		function($scope, $http, Projects){
			$scope.formData = {};
			Projects.get()
				.success(function(data){
					$scope.projects = data;
				});
			$scope.select = function(related, selection){
				if (selection=='all'){
					ProjectsFactory.get()
						.success(function(data) {
						$scope.projects = data;
					});
				}
				else
				{
					ProjectsFactory.select(related, selection)
						.success(function(data) {
							$scope.projects = data;
						});
				}
			};
			$scope.createProject = function(){
				if ($scope.formData.name != undefined){
					Projects.create($scope.formData)
						.success(function(data){
							$scope.formData.name ="";				
							$scope.formData.resources = "";
							$scope.projects = data;
						});
				}
			};
			$scope.clearEntry = function(){
				$scope.formData = {};
			};
			$scope.deleteProject = function(id){
				Projects.delete(id)
					.success(function(data){
						$scope.projects = data;
					});
			};
			$scope.sortCol = function(criteria){
			$scope.sorted = criteria;
			$scope.reverse = !$scope.reverse;
		};

	}]);