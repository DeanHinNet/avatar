angular.module('skillService', [])

	.factory('SkillsFactory', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/skills');
			},
			create : function(data) {

				return $http.post('/api/skills', data);
			},
			delete : function(id) {
				return $http.delete('/api/skills/' + id);
			},
			update : function(data) {
				return $http.post('/api/skills/update',data);
			},
			select: function(selection){
				console.log(selection);
				return $http.get('/api/skills/select/'+selection);
			},
			readDoc: function(block,blockId){
				return $http.get('/api/docs/'+block+'/'+blockId)
			},
			saveDoc: function(data){
				return $http.post('/api/docs', data)
			}
		}
	}]);