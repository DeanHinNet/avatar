angular.module('skillController', [])
	
	.controller('skilledController', ['$scope','$http','SkillsFactory', function($scope, $http, SkillsFactory) {
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

		$scope.startDoc = function(id){
			//Grabs Info about the skill fro $scope.skills
			var object = $scope.skills.filter(function(data){
				return (data._id==id) ? true:false;
			});
			$scope.docInfo = object[0];
			$scope.editing = true;

			//grab the document from the database
			SkillsFactory.readDoc('skills', id)
				.success(function(data){
					// console.log(data);
					str = data[0]['text'];
					// console.log(str);
					// str = str.replace(/"/g,"");
					// console.log(str);
					$scope.docText = str;
				});
			
		};

		$scope.saveDoc = function(id){
			entry = {};
			entry['block_id']=id;
			entry['block']='skills';
			entry['text']= $scope.docText;
			SkillsFactory.saveDoc(entry)
				.success(function(data){
					$scope.docText = data[0]['text'];
				});
		};

		$scope.stopDoc = function(){
			$scope.editing = false;
		};

		$scope.select = function(selection){
			if (selection=='all'){
				SkillsFactory.get()
					.success(function(data) {
					$scope.skills = data;
				});
			}
			else
			{
				SkillsFactory.select(selection)
					.success(function(data) {
						$scope.skills = data;
					});
			}
		};
		
		SkillsFactory.get()
			.success(function(data) {
				$scope.skills = data;
			});
		
		$scope.compute = function(id, key){

		};
		$scope.updateInfo = function(id, key) {
			entry = {};
			entry['_id']=id;
			entry[key]=$scope.cells[id.toString()+key];
			SkillsFactory.update(entry)
				.success(function(data){
					return $scope.skills = data;

			// Skills.save(entry)
			// 	.success(function(data) {
			// 		$scope.skills = data;
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
			
			SkillsFactory.update(entry)
				.success(function(data){
					$scope.cells = {};
					$scope.skills = data;

			// Skills.save(entry)
			// 	.success(function(data) {
			// 		$scope.skills = data;
			 })
		};
		$scope.deleteSkill = function(id) {
			SkillsFactory.delete(id)
				.success(function(data) {
					$scope.skills = data;
			})
		};
		$scope.createSkill = function() {
			if ($scope.formData.name != undefined) {
				SkillsFactory.create($scope.formData)
					.success(function(data) {
						$scope.formData.name = "";
						$scope.formData.points = "";
						$scope.skills = data;
					});
			}
		};

			$scope.clearEntry = function(){
			$scope.formData = {};
		};
	}
	]);