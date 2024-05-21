var app = angular.module("myApp");

app.controller("GapTaskController", function($scope, CorrectAnswerService) {
    $scope.userAnswer1 = "";
    $scope.userAnswer2 = "";
    $scope.isCorrectAnswer1 = null;
    $scope.isCorrectAnswer2 = null;
    $scope.isAnswered1 = false;
    $scope.isAnswered2 = false;

    $scope.checkGapAnswer1 = function(userAnswer1, taskID) {
        var isCorrect = CorrectAnswerService.checkAnswer(taskID, userAnswer1);
        $scope.isCorrectAnswer1 = isCorrect;
        $scope.isAnswered1 = true;
        updateCompletionStatus();
    };

    $scope.checkGapAnswer2 = function(userAnswer2, taskID) {
        var isCorrect = CorrectAnswerService.checkAnswer(taskID, userAnswer2);
        $scope.isCorrectAnswer2 = isCorrect;
        $scope.isAnswered2 = true;
        updateCompletionStatus();
    };

    $scope.checkGapAnswers = function(userAnswer1, userAnswer2) {
        $scope.checkGapAnswer1(userAnswer1, "F1C1_1");
        $scope.checkGapAnswer2(userAnswer2, "F1C1_2");
    };

    $scope.checkGapAnswerOneAnswer = function(userAnswer1) {
        $scope.checkGapAnswer1(userAnswer1, "L1C1");
    };

    function updateCompletionStatus() {
        var isTask1Completed = $scope.isCorrectAnswer1 || $scope.isCorrectAnswer2;
        $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCompleted = isTask1Completed;
    }
});
