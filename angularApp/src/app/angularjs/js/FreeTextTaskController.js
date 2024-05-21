var app = angular.module("myApp");

app.controller("FreeTextTaskController", function($scope, CorrectAnswerService) {
    $scope.userAnswer = "";
    $scope.isCorrectAnswer = null;
    $scope.isAnswered = false;

    $scope.checkFreeTextAnswer = function(userAnswer) {
        var isCorrect = CorrectAnswerService.checkAnswer($scope.$parent.currentTask.id, userAnswer);
        $scope.isCorrectAnswer = isCorrect;
        $scope.isAnswered = true;
        if (isCorrect) {
            $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCompleted = true;
            $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCorrect = true;
        }
    };
});