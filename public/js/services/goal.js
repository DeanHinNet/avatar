angular.module('GoalServiceMod', [])

	.factory('Goals', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/goals');
			},
			create : function(GoalData) {

				return $http.post('/api/goals', GoalData);
			},
			delete : function(id) {
				return $http.delete('/api/goals/' + id);
			}
		}
	}]);