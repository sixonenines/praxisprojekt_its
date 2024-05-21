/*var app = angular.module("myApp", []);

// Service zur Überprüfung der Antworten
app.factory('CorrectAnswerService', function() {
    return {
        checkAnswer: function(taskId, userAnswer) {
            var correctAnswer = "";
            switch(taskId) {
                case 'V1C1':
                    correctAnswer = "20";
                    break;
                case 'V3C1':
                    correctAnswer = "101";
                    break;
                case 'V5C1':
                    correctAnswer = "20 20";
                    break;
                default:
                    correctAnswer = "";
            }
            return userAnswer === correctAnswer;
        }
    };
});

app.controller("MainController", function($scope, CorrectAnswerService) {
    $scope.tasks = [
        { id: 'V1C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/V1C1.html", isCompleted: false },
        { id: 'V3C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/V3C1.html", isCompleted: false },
        { id: 'V5C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/V5C1.html", isCompleted: false },
        { id: 'F1C3', templateUrl: "app/angularjs/tasks/CompilerTasks/F1C3.html", isCompleted: false }
    ];

    $scope.currentTaskIndex = 0;
    $scope.currentTask = $scope.tasks[$scope.currentTaskIndex];
    $scope.isCorrectAnswer = null;
    $scope.isAnswered = false;

    $scope.checkAnswer = function(userAnswer) {
        var isCorrect = CorrectAnswerService.checkAnswer($scope.currentTask.id, userAnswer);
        $scope.isCorrectAnswer = isCorrect;
        $scope.isAnswered = true;
        if (isCorrect) {
            $scope.tasks[$scope.currentTaskIndex].isCompleted = true;
            $scope.tasks[$scope.currentTaskIndex].isCorrect = true;
        } else {
            console.log("Falsche Antwort. Bitte versuche es erneut.");
        }
    };

    $scope.prevTask = function() {
        if ($scope.currentTaskIndex > 0) {
            $scope.currentTaskIndex--;
            $scope.currentTask = $scope.tasks[$scope.currentTaskIndex];
        }
    };

    $scope.nextTask = function() {
        if ($scope.currentTaskIndex < $scope.tasks.length - 1 && $scope.currentTask.isCompleted) {
            $scope.currentTaskIndex++;
            $scope.currentTask = $scope.tasks[$scope.currentTaskIndex];
        }
    };

    $scope.isNextDisabled = function() {
        return $scope.currentTaskIndex === $scope.tasks.length - 1 || !$scope.currentTask.isCompleted;
    };

    $scope.isPrevDisabled = function() {
        return $scope.currentTaskIndex === 0;
    };
});*/