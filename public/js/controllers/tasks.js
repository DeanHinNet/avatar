angular.module('TasksControllerMod', [])
	
	.controller('TasksController', ['$scope','$http','TasksFactory', function($scope, $http, TasksFactory) {
		$scope.formData = {};
		$scope.docInfo = {};
		$scope.cells = {};
		$scope.unique = {};
		$scope.docText = {};
		$scope.sorted = 'projects';
		$scope.reverse = 'reverse';
		$scope.editing = false;
		$scope.display = {
			name: true,
			projects: true,
			goals: true,
			skills: true,
			status: true,
			due: true,
			created: true,
			fieldSelect: false
		};

		$scope.displayToggle = function(selection){
			$scope.display[selection]= !$scope.display[selection];
		};
		
		$scope.editFields = function(){
			$scope.editing = !$scope.editing;
		};

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
			entry['projects']=$scope.cells[myID+'projects'];
			entry['goals']=$scope.cells[myID+'goals'];
			entry['skills']=$scope.cells[myID+'skills'];
			entry['status']=$scope.cells[myID+'status'];
			entry['due']=$scope.cells[myID+'due'];
			entry['created']=$scope.cells[myID+'created'];
			
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
			$scope.docEdit = true;

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
			$scope.docEdit = false;
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