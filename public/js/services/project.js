angular.module('ProjectServiceMod', [])

	.factory('Projects', ['$http',function($http) {
		return {
			get : function() {
	
				return $http.get('/api/projects');
			},
			create : function(projectData) {

				return $http.post('/api/projects', projectData);
			},
			delete : function(id) {
				return $http.delete('/api/projects/' + id);
			}
		}
	}]);