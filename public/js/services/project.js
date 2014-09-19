angular.module('ProjectServiceMod', [])

	.factory('ProjectsFactory', ['$http',function($http) {
		return {
			update : function(data) {
				console.log("inside projects factory");
				return $http.post('/api/projects/update',data);
			},
			get : function() {
	
				return $http.get('/api/projects');
			},
			create : function(projectData) {

				return $http.post('/api/projects', projectData);
			},
			delete : function(id) {
				return $http.delete('/api/projects/' + id);
			},
			select: function(related, selection){
				return $http.get('/api/projects/'+related+'/'+selection);
			}
		}
	}]);