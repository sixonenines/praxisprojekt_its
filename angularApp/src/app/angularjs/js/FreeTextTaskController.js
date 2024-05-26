app.controller("FreeTextTaskController", function($scope, CorrectAnswerService, FeedbackService) {
    $scope.userAnswer = "";
    $scope.isCorrectAnswer = null;
    $scope.isAnswered = false;
    $scope.hintText = "";
    $scope.hintIndex = -1; // Start bei -1, um den ersten Klick auf "Hint" erforderlich zu machen
    $scope.maxHintIndex = -1; // Maximal angezeigter Hinweisindex
    $scope.feedbacks = [];
    $scope.allHintsShown = false; // Variable, die angibt, ob alle Hinweise gezeigt wurden

    $scope.checkFreeTextAnswer = function(userAnswer) {
        var isCorrect = CorrectAnswerService.checkAnswer($scope.$parent.currentTask.id, userAnswer);
        $scope.isCorrectAnswer = isCorrect;
        $scope.isAnswered = true;
        if (isCorrect) {
            $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCompleted = true;
            $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCorrect = true;
        }
    };

    $scope.getHint = function() {
        var taskId = $scope.$parent.currentTask.id;
        if ($scope.feedbacks.length === 0) {
            $scope.feedbacks = FeedbackService.getFeedbacks(taskId);
        }
        if ($scope.hintIndex < $scope.feedbacks.length - 1) {
            $scope.hintIndex++;
            $scope.maxHintIndex = $scope.hintIndex; // Update maxHintIndex when a new hint is shown
            $scope.hintText = $scope.feedbacks[$scope.hintIndex];
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
            $scope.hintText = $scope.feedbacks[$scope.hintIndex];
        }
    };

    $scope.previousHint = function() {
        if ($scope.hintIndex > 0) {
            $scope.hintIndex--;
            $scope.hintText = $scope.feedbacks[$scope.hintIndex];
        }
    };
});