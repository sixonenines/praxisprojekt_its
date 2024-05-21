var app = angular.module("myApp");

app.controller("GapTaskController", function($scope, CorrectAnswerService) {
    $scope.userAnswer1 = "";
    $scope.userAnswer2 = "";
    $scope.isCorrectAnswer1 = null;
    $scope.isCorrectAnswer2 = null;
    $scope.isAnswered1 = false;
    $scope.isAnswered2 = false;

    $scope.checkGapAnswer1 = function(userAnswer1) {
        var isCorrect = CorrectAnswerService.checkAnswer('F1C1_1', userAnswer1);
        $scope.isCorrectAnswer1 = isCorrect;
        $scope.isAnswered1 = true;
        updateCompletionStatus();
    };

    $scope.checkGapAnswer2 = function(userAnswer2) {
        var isCorrect = CorrectAnswerService.checkAnswer('F1C1_2', userAnswer2);
        $scope.isCorrectAnswer2 = isCorrect;
        $scope.isAnswered2 = true;
        updateCompletionStatus();
    };

    $scope.checkGapAnswers = function(userAnswer1, userAnswer2) {
        $scope.checkGapAnswer1(userAnswer1);
        $scope.checkGapAnswer2(userAnswer2);
    };

    function updateCompletionStatus() {
        var isTask1Completed = $scope.isCorrectAnswer1 && !$scope.isAnswered2;
        var isTask2Completed = $scope.isCorrectAnswer2 && !$scope.isAnswered1;
        $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCompleted = isTask1Completed || isTask2Completed;
    }

});