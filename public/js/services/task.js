angular.module('TaskServiceMod', [])

	.factory('TasksFactory', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/tasks');
			},
			create : function(data) {
				return $http.post('/api/tasks', data);
			},
			delete : function(id) {
				return $http.delete('/api/tasks/' + id);
			},
			update : function(data) {
				return $http.post('/api/tasks/update',data);
			},
			select: function(selection){
				return $http.get('/api/tasks/select/'+selection);
			},
			readDoc: function(block,blockId){
				return $http.get('/api/docs/'+block+'/'+blockId)
			},
			saveDoc: function(data){
				return $http.post('/api/docs', data)
			}
		}
	}]);