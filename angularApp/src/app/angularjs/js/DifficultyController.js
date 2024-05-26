angular.module('myApp').controller('DifficultyController', function($scope, DifficultyService, TaskService) {
  $scope.selectDifficulty = function(level) {
    console.log(level)
    DifficultyService.setDifficulty(level);
    $scope.closePopup();
    TaskService.loadTasks(level); // Laden der Aufgaben basierend auf dem Schwierigkeitsgrad
  };

  $scope.closePopup = function() {
    document.getElementById('difficulty-popup').style.display = 'none';
  };
});