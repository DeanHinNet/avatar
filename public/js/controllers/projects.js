angular.module('ProjectsControllerMod', [])
	.controller('ProjectsController', ['$scope', '$http', 'Projects', 
		function($scope, $http, Projects){
			$scope.formData = {};
			Projects.get()
				.success(function(data){
					$scope.projects = data;
				});
			$scope.createProject = function(){
				if ($scope.formData.name != undefined){
					Projects.create($scope.formData)
						.success(function(data){
							$scope.formData = {};
							$scope.projects = data;
						});
				}
			};

			$scope.deleteProject = function(id){
				Projects.delete(id)
					.success(function(data){
						$scope.projects = data;
					});
			};

	}]);