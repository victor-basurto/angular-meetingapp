'use strict';
var myApp = angular.module( 'myApp', 
	[ 'ngRoute', 'firebase' ] )
	.constant('FIREBASE_URL', 'https://angregistration2016.firebaseIO.com/');	// connection to database

/**
 * Resolve for non-auth users
 */
myApp.run([ '$rootScope', '$location', function( $rootScope, $location ) {
	$rootScope.$on( '$routeChangeError', function( event, next, previous, error ) {
		if ( error == 'AUTH_REQUIRED' ) {
			$rootScope.message = 'You must login to access this page';
			$location.path( '/login' );
		}
	});
}]);

/**
 * MyApp Configuration / Routing
 */
myApp.config( ['$routeProvider', function( $routeProvider ) {
	$routeProvider
		.when('/login', {
			templateUrl: './views/login.html',		// get login.html
			controller: 'RegistrationController'	// use RegistrationController
		})
		.when('/register', {
			templateUrl: './views/register.html',	// get register.html
			controller: 'RegistrationController'	// use RegistrationController
		})
		.when('/success', {
			templateUrl: './views/success.html',	// get success.html
			controller: 'SuccessController',			// use SuccessController
			resolve: {
				currentAuth: function( AuthenticationService ) { // only access if user is logged in
					return AuthenticationService.requireAuth();
				}
			}
		})
		.otherwise({
			redirectTo: '/login'					// get login 
		})
}]);
