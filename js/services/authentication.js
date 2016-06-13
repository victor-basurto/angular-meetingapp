'use strict';
myApp.factory('AuthenticationService', [
	'$rootScope', 
	'$firebaseAuth',
	'$firebaseObject',
	'$location', 
	'FIREBASE_URL', 
	function( $rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL ) {	// pass $scope as dependency

		// firebase connection
		var ref = new Firebase( FIREBASE_URL ),
			auth= $firebaseAuth( ref ),
			appData = {};

		/**
		 * @param {object} - current user, get info
		 */
		auth.$onAuth( function( authUser ) {
			if ( authUser ) {
				var userRef = new Firebase( FIREBASE_URL + 'user/' + authUser.uid ),
					userObj = $firebaseObject( userRef );

				$rootScope.currentUser = userObj;
			} else {
				$rootScope.currentUser = '';
			}
		});

		appData = {
			/**
			 * @param {object} -User- current user, set email and pass, return a promise 
			 * @param {object} -regUser- send user to $location path
			 * @param {object} -Error- message if error
			 */
			login: function( user ) {
				auth.$authWithPassword({
					email: user.email,
					password: user.password
				}).then( function( regUser ) {	// if success, path to success
					$location.path( '/success' );
				}).catch( function( err ) {
					$rootScope.message = err.message;
				});
				$rootScope.message = 'Message ' + user.email;
			},	// login

			logout: function() {
				return auth.$unauth();
			},	// logout

			requireAuth: function() {
				return auth.$requireAuth();
			},	// require auth

			/**
			 * @param {object} -User- current user, create new user
			 * @param {object} -regUser- Promise, set user data
			 * @param {object} -Error- message if error
			 */
			register: function( user ) {
				// create user
				auth.$createUser({
					email: user.email,
					password: user.password
				}).then(function( regUser ) {	// return a promise with an object to make sure user is created

					var regRef = new Firebase( FIREBASE_URL + 'user' )
						.child( regUser.uid ).set({
							date: Firebase.ServerValue.TIMESTAMP,
							regUser: regUser.uid,
							firstname: user.firstname,
							lastname: user.lastname,
							email: user.email
						});

					appData.login( user );

				}).catch(function( err ) {		// catch error
					// error msg
					$rootScope.message = err.message;
				});	
			}	// register
		}

		return appData;
}]); // Factory