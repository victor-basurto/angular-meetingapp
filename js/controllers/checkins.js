'use strict';
myApp.controller( 'CheckinsController', [ 
	'$scope', 
	'$rootScope',
	'$location',
	'$firebaseObject',
	'$firebaseArray',
	'$routeParams',
	'FIREBASE_URL',
	function( $scope, $rootScope, $location, $firebaseObject, $firebaseArray, $routeParams, FIREBASE_URL ) {
		
		$scope.whichmeeting = $routeParams.mId;
		$scope.whichuser = $routeParams.uId;

		// connection to firebase path
		var ref = new Firebase( FIREBASE_URL + 'user/' + 
							$scope.whichuser + '/meetings/' + 
							$scope.whichmeeting + '/checkins' );

		var checkinsList = $firebaseArray( ref );
		$scope.checkins = checkinsList;

		$scope.order = 'firstname';
		$scope.direction = null;
		$scope.query = '';

		// add object
		$scope.addCheckin = function() {
			var checkinsInfo = $firebaseArray( ref );
			var	myData = {
				firstname: $scope.user.firstname,
				lastname: $scope.user.lastname,
				email: $scope.user.email,
				date: Firebase.ServerValue.TIMESTAMP
			}

			/**
			 * @param {object} myData is added to firebase
			 * @promise - send user to meeting list 
			 */
			checkinsInfo.$add( myData ).then( function() {
				$location.path( '/checkins/' + $scope.whichuser + '/' 
							+ $scope.whichmeeting + '/checkinsList' );
			});
		}

		$scope.deleteCheckin = function( id ) {
			var refDel = new Firebase( FIREBASE_URL + 'user/' + $scope.whichuser + '/meetings/' + 
										$scope.whichmeeting + '/checkins/' + id );
			var record = $firebaseObject( refDel );

			var answer = confirm('are you sure you want to delete: ' + id );
			if ( angular.equals( answer, false ) ) {
				return;
			} else {
				record.$remove( id );
			}
		}

}]);