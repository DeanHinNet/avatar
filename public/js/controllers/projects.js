angular.module('ProjectsControllerMod', [])
	.controller('ProjectsController', ['$scope', '$http', 'ProjectsFactory', 
		function($scope, $http, ProjectsFactory){
			$scope.formData = {};
			$scope.docInfo = {};
			$scope.cells = {};
			$scope.unique = {};
			$scope.docText = {};
			$scope.sorted = 'projects';
			$scope.reverse = 'reverse';

			ProjectsFactory.get()
				.success(function(data){
					$scope.projects = data;
				});

			$scope.updateInfoAll = function(id, key) {
			myID = id.toString();
			entry = {};
			entry['_id']=id;
			entry['name']=$scope.cells[myID+'name'];
			entry['category']=$scope.cells[myID+'categories'];
			entry['progress']=$scope.cells[myID+'progress'];
			entry['status']=$scope.cells[myID+'status'];
			entry['notes']=$scope.cells[myID+'notes'];
			entry['resources']=$scope.cells[myID+'resources'];
			entry['skills']=$scope.cells[myID+'skills'];
			entry['tasks']=$scope.cells[myID+'tasks'];
			entry['goals']=$scope.cells[myID+'goals'];

			ProjectsFactory.update(entry)
				.success(function(data){
					$scope.cells = {};
					$scope.projects = data;
			 })
		};

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
					ProjectsFactory.create($scope.formData)
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
				ProjectsFactory.delete(id)
					.success(function(data){
						$scope.projects = data;
					});
			};
			$scope.sortCol = function(criteria){
			$scope.sorted = criteria;
			$scope.reverse = !$scope.reverse;
		};

	}]);