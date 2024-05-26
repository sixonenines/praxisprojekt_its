angular.module('myApp').service('DifficultyService', function() {
    let difficulty = '';
  
    this.setDifficulty = function(level) {
      difficulty = level;
    };
  
    this.getDifficulty = function() {
      return difficulty;
    };
  
    this.isDifficultySet = function() {
      return difficulty !== '';
    };
  });