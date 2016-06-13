myApp.controller('RegistrationController', [
	'$scope', 
	'AuthenticationService',
	function( $scope, AuthenticationService ) {	

		// Login success
		$scope.login = function() {
			AuthenticationService.login( $scope.user );
		} // login

		// logout
		$scope.logout = function() {
			AuthenticationService.logout();
		} // logout

		// registration success
		$scope.register = function() {
			AuthenticationService.register( $scope.user );
		} // register
}]); // Controller