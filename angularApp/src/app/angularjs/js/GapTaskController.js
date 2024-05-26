var app = angular.module("myApp");

app.controller("GapTaskController", function($scope, CorrectAnswerService, FeedbackService) {
    $scope.userAnswer1 = "";
    $scope.userAnswer2 = "";
    $scope.isCorrectAnswer1 = null;
    $scope.isCorrectAnswer2 = null;
    $scope.isAnswered1 = false;
    $scope.isAnswered2 = false;
    $scope.hintIndex = -1; // Start bei -1, um den ersten Klick auf "Hint" erforderlich zu machen
    $scope.maxHintIndex = -1; // Maximal angezeigter Hinweisindex
    $scope.feedbacks = [];
    $scope.allHintsShown = false; // Variable, die angibt, ob alle Hinweise gezeigt wurden
    $scope.highlightLine = null; // Zeile, die hervorgehoben werden soll


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

    $scope.getHint = function() {
        var taskId = $scope.$parent.currentTask.id;
        if ($scope.feedbacks.length === 0) {
            $scope.feedbacks = FeedbackService.getFeedbacks(taskId);
        }
        if ($scope.hintIndex < $scope.feedbacks.length - 1) {
            $scope.hintIndex++;
            $scope.maxHintIndex = $scope.hintIndex; // Update maxHintIndex when a new hint is shown
            var currentHint = $scope.feedbacks[$scope.hintIndex];
            $scope.hintText = currentHint.text;
            $scope.highlightLine = currentHint.highlight;
            if ($scope.hintIndex >= $scope.feedbacks.length - 1) {
                $scope.allHintsShown = true; // Alle Hinweise wurden angezeigt
            }
        } else {
            $scope.hintText = "Keine weiteren Hints verfügbar.";
        }
    };

    $scope.nextHint = function() {
        if ($scope.hintIndex < $scope.maxHintIndex) {
            $scope.hintIndex++;
            var currentHint = $scope.feedbacks[$scope.hintIndex];
            $scope.hintText = currentHint.text;
            $scope.highlightLine = currentHint.highlight;
        }
    };

    $scope.previousHint = function() {
        if ($scope.hintIndex > 0) {
            $scope.hintIndex--;
            var currentHint = $scope.feedbacks[$scope.hintIndex];
            $scope.hintText = currentHint.text;
            $scope.highlightLine = currentHint.highlight;
        }
    };
});
