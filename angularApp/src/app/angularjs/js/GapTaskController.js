var app = angular.module("myApp");

app.controller("GapTaskController", function($scope, $timeout, $interval, CorrectAnswerService, FeedbackService) {
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
        if ($scope.isCorrectAnswer2 !== null) {
            updateCompletionStatus();
        }
    };
    
    $scope.checkGapAnswer2 = function(userAnswer2, taskID) {
        var isCorrect = CorrectAnswerService.checkAnswer(taskID, userAnswer2);
        $scope.isCorrectAnswer2 = isCorrect;
        $scope.isAnswered2 = true;
        if ($scope.isCorrectAnswer1 !== null) {
            updateCompletionStatus();
        }
    };
    
    $scope.checkGapAnswerOneAnswer = function(userAnswer1) {
        var isCorrect = CorrectAnswerService.checkAnswer("L1C1", userAnswer1);
        $scope.isCorrectAnswer1 = isCorrect;
        $scope.isAnswered1 = true;
        if(isCorrect){
            $scope.updateTaskStatus($scope.$parent.currentTask.id, 'correct');
        }else{
            $scope.updateTaskStatus($scope.$parent.currentTask.id, 'incorrect');
        }
    };
    

    $scope.checkGapAnswers = function(userAnswer1, userAnswer2) {
        $scope.checkGapAnswer1(userAnswer1, "F1C1_1");
        $scope.checkGapAnswer2(userAnswer2, "F1C1_2");
    };


    function updateCompletionStatus() {
        if ($scope.isCorrectAnswer1 && $scope.isCorrectAnswer2) {
            $scope.updateTaskStatus($scope.$parent.currentTask.id, 'correct');
        } else if ($scope.isCorrectAnswer1 !== null && $scope.isCorrectAnswer2 !== null) {
            $scope.updateTaskStatus($scope.$parent.currentTask.id, 'incorrect');
        }
    }

    $scope.getHint = function() {
        // Deaktiviere den Hint-Button und starte die Fortschrittsbalken-Animation
        $scope.hintButtonDisabled = true;
        $scope.startHintButtonAnimation();
    
        // Dein bestehender Code für das Anzeigen des Hinweises
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
    
        // Aktiviere den Hint-Button nach 20 Sekunden wieder
        $timeout(function() {
            $scope.stopHintButtonAnimation();
        }, 5000);
    };
    
    $scope.startHintButtonAnimation = function() {
        var totalTime = 5000; // Gesamtzeit in Millisekunden (5 Sekunden)
        var currentTime = 0; // Aktuelle Zeit
        $scope.hintButtonAnimationInterval = $interval(function() {
            currentTime += 100; // Inkrementiere die aktuelle Zeit um den Intervallwert
            console.log(currentTime);

            // Berechne die Fortschrittsbalkenbreite basierend auf dem Verhältnis von aktueller Zeit zu Gesamtzeit
            $scope.progressBarWidth = (currentTime / totalTime) * 100 + '%';
    
            // Stoppe die Animation, wenn die Gesamtzeit erreicht ist
            if (currentTime >= totalTime) {
                $scope.stopHintButtonAnimation();
            }
        }, 100);
    };
    
    $scope.stopHintButtonAnimation = function() {
        $interval.cancel($scope.hintButtonAnimationInterval);
        $scope.hintButtonDisabled = false;
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
