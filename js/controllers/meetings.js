'use strict';
myApp.controller( 'MeetingsController', [ 
	'$scope', 
	'$rootScope',
	'$firebaseAuth',
	'$firebaseArray',
	'FIREBASE_URL',
	function( $scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL ) {
		
		var ref = new Firebase( FIREBASE_URL ),
			auth = $firebaseAuth( ref );

		// if user exists
		auth.$onAuth(function( authUser ) {
			if ( authUser ) {
				var meetingsRef, meetingsInfo;

				meetingsRef = 
					new Firebase( FIREBASE_URL + 'user/' + $rootScope.currentUser.$id + '/meetings' );			
				meetingsInfo = $firebaseArray( meetingsRef );

				// list of meetings into the meetings model
				$scope.meetings = meetingsInfo;

				// add new meeting
				$scope.addMeeting = function() {
					meetingsInfo.$add({
						name: $scope.meetingname,
						date: Firebase.ServerValue.TIMESTAMP
					}).then( function() {
						$scope.meetingname = '';
					});
				}
			}
		});
}]);