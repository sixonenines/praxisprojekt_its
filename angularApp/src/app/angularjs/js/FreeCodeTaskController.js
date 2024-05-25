var app = angular.module("myApp");
console.log("Check Module working");

app.controller("FreeCodeTaskController", function($scope, CorrectAnswerService) {
    $scope.isCorrectAnswer = null;
    $scope.isAnswered = false;

    $scope.checkFreeCodeAnswer = function() {
        var targetElement = document.getElementById('mpy-editor-1-output');
        var userAnswer = targetElement;
        console.log(userAnswer);
        var isCorrect = CorrectAnswerService.checkAnswer($scope.$parent.currentTask.id, userAnswer);
        $scope.isCorrectAnswer = isCorrect;
        $scope.isAnswered = true;
        if (isCorrect) {
            $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCompleted = true;
            $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCorrect = true;
        }
    };
});