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

				// show how many meetings are available to the user
				meetingsInfo.$loaded().then( function( data ) {
					$rootScope.howManyMeetings = meetingsInfo.length;
				});

				// watch for changes in meetings Badge
				meetingsInfo.$watch( function( data ) {
					$rootScope.howManyMeetings = meetingsInfo.length;
				});

				// add new meeting
				$scope.addMeeting = function() {
					meetingsInfo.$add({
						name: $scope.meetingname,
						date: Firebase.ServerValue.TIMESTAMP
					}).then( function() {
						$scope.meetingname = '';
					});
				}

				// delete a meeting
				$scope.deleteMeeting = function( key ) {
					meetingsInfo.$remove( key );
				}
			}
		});
}]);