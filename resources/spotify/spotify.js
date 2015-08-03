var app = angular.module('spotify', []).
controller('MainCtrl', function($scope, $http) {
  $scope.gender;
  $scope.age;
  $scope.customTrackList = {};
  $scope.$watch('age', function(){
    if(($scope.age !== undefined) && ($scope.gender !== undefined)){
      $http.get('resources/spotify/customTracks' + ($scope.age + $scope.gender) + '.json').
      success(function(data, status, headers, config) {
        $scope.customTrackList = data;
        console.log(data);
        console.log($scope.age + $scope.gender);
      }).
      error(function(data, status, headers, config) {
        // log error
      });
    }
  });
  $scope.$watch('gender', function(){
    if(($scope.age !== undefined) && ($scope.gender !== undefined)){
      $http.get('resources/spotify/customTracks' + ($scope.age + $scope.gender) + '.json').
      success(function(data, status, headers, config) {
        $scope.customTrackList = data;
        console.log(data);
      }).
      error(function(data, status, headers, config) {
        // log error
      });
    }
  });

  $scope.trackListGains = [["Blame", "Calvin Harris", 12294095], ["Shake It Off", "Taylor Swift", 11924637], ["All About That Bass", "Meghan Trainor", 10717542], ["All About That Bass - USRC1140178", "Meghan Trainor", 10716442], ["Thinking Out Loud", "Ed Sheeran", 9795668], ["Rude", "MAGIC!", 9786082], ["Summer", "Calvin Harris", 9482413], ["Break Free", "Ariana Grande", 9101875], ["Dangerous (feat. Sam Martin)", "David Guetta", 8651613], ["Stay With Me", "Sam Smith", 8537137], ["Chandelier", "Sia", 8493093], ["Rather Be feat. Jess Glynne", "Clean Bandit", 8491112], ["Take Me To Church", "Hozier", 8462820], ["Rather Be (feat. Jess Glynne)", "Clean Bandit", 8439169], ["Maps", "Maroon 5", 8328898], ["Animals", "Maroon 5", 8076199], ["Outside", "Calvin Harris", 7994099], ["Wiggle (feat. Snoop Dogg)", "Jason Derulo", 7977611], ["Dark Horse", "Katy Perry", 7952065], ["Problem", "Ariana Grande", 7890249]];
  $scope.trackListConsistent = [["All of Me", "John Legend", 47], ["Counting Stars", "OneRepublic", 46], ["Radioactive", "Imagine Dragons", 45], ["Waves - Robin Schulz Radio Edit", "Mr. Probz", 40], ["Demons", "Imagine Dragons", 39], ["Dark Horse", "Katy Perry", 39], ["Pompeii", "Bastille", 38], ["Riptide", "Vance Joy", 37], ["Wake Me Up", "Avicii", 37], ["Summer", "Calvin Harris", 36], ["Am I Wrong", "Nico & Vinz", 36], ["Timber", "Pitbull", 34], ["Let Her Go", "Passenger", 32], ["Fancy", "Iggy Azalea", 32], ["Team", "Lorde", 31], ["Trumpets", "Jason Derulo", 30], ["Problem", "Ariana Grande", 30], ["Rather Be (feat. Jess Glynne)", "Clean Bandit", 29], ["Magic", "Coldplay", 28], ["Bad (feat. Vassy) - Radio Edit", "David Guetta", 28]];
  $scope.trackListNotConsistent = [["This Is How We Do", "Katy Perry", -952115], ["Superheroes", "The Script", -835551], ["Stay High - Habits Remix", "Tove Lo", -751695], ["Hideaway", "Kiesza", -751064], ["Rather Be feat. Jess Glynne", "Clean Bandit", -704668], ["The Days", "Avicii", -685611], ["Addicted To You", "Avicii", -477141], ["All About That Bass", "Meghan Trainor", -474330], ["Busy Doin' Nothin'", "Ace Wilder", -466610], ["Boom Clap", "The Fault In Our Stars", -433252], ["The Man", "Aloe Blacc", -360665], ["Wake Me Up", "Avicii", -354918], ["#SELFIE", "The Chainsmokers", -353225], ["Don't Tell 'Em", "Jeremih", -347098], ["Amnesia", "5 Seconds Of Summer", -336787], ["Love Never Felt So Good", "Michael Jackson", -313711], ["The Fox (What Does The Fox Say?)", "Ylvis", -310057], ["Warriors", "Imagine Dragons", -309157], ["Blame", "Calvin Harris", -300594], ["Summer", "Calvin Harris", -293258]];


});