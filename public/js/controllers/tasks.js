angular.module('TasksControllerMod', [])
	
	.controller('TasksController', ['$scope','$http','TasksFactory', function($scope, $http, TasksFactory) {
		$scope.formData = {};
		$scope.docInfo = {};
		$scope.cells = {};
		$scope.unique = {};
		$scope.docText = {};
		$scope.sorted = 'projects';
		$scope.reverse = 'reverse';
		
		$scope.sortCol = function(criteria){
			console.log(criteria);
			$scope.sorted = criteria;
			$scope.reverse = !$scope.reverse;
		};
		TasksFactory.get()
			.success(function(data) {
				$scope.tasks = data;
			});
		$scope.createTask = function() {
			if ($scope.formData.name != undefined) {
				TasksFactory.create($scope.formData)
					.success(function(data) {
						$scope.formData.name = "";
						$scope.tasks = data;
					});
			}
		};
		$scope.clearEntry = function(){
			$scope.formData = {};
		};
		$scope.updateInfo = function(id, key) {
			entry = {};
			entry['_id']=id;
			entry[key]=$scope.cells[id.toString()+key];
			TasksFactory.update(entry)
				.success(function(data){
					return $scope.tasks = data;
			 })
		};
		$scope.updateInfoAll = function(id, key) {
			myID = id.toString();
			entry = {};
			entry['_id']=id;
			entry['name']=$scope.cells[myID+'name'];
			entry['category']=$scope.cells[myID+'category'];
			entry['sub']=$scope.cells[myID+'sub'];
			entry['path']=$scope.cells[myID+'path'];
			entry['points']=$scope.cells[myID+'points'];
			
			TasksFactory.update(entry)
				.success(function(data){
					$scope.cells = {};
					$scope.tasks = data;

		
			 })
		};
		$scope.deleteTask = function(id) {
			TasksFactory.delete(id)
				.success(function(data) {
					$scope.tasks = data;
			})
		};
		
		//DOC STUFF
			$scope.startDoc = function(id){
			//Grabs Info about the task fro $scope.tasks
			var object = $scope.tasks.filter(function(data){
				return (data._id==id) ? true:false;
			});
			$scope.docInfo = object[0];
			$scope.editing = true;

			//grab the document from the database
			TasksFactory.readDoc('tasks', id)
				.success(function(data){
					// console.log(data);
					str = data[0]['text'];
					$scope.docText = str;
				});
			
		};

		$scope.saveDoc = function(id){
			entry = {};
			entry['block_id']=id;
			entry['block']='tasks';
			entry['text']= $scope.docText;
			TasksFactory.saveDoc(entry)
				.success(function(data){
					$scope.docText = data[0]['text'];
				});
		};

		$scope.stopDoc = function(){
			$scope.editing = false;
		};

		$scope.select = function(related, selection){
			if (selection=='all'){
				TasksFactory.get()
					.success(function(data) {
					$scope.tasks = data;
				});
			}
			else
			{
				TasksFactory.select(related, selection)
					.success(function(data) {
						$scope.tasks = data;
					});
			}
		};
	}
	]);