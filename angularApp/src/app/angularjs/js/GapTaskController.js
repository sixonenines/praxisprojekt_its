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
    $scope.positiveFeedbacks = [];
    $scope.allHintsShown = false; // Variable, die angibt, ob alle Hinweise gezeigt wurden
    $scope.highlightLine = null; // Zeile, die hervorgehoben werden soll
    $scope.noButtonsOnFeedback = false; // Wenn pos/neg Feedback, dann keine prev/next Buttons
    $scope.hintsGiven = false; 

    $scope.checkGapAnswer1 = function(userAnswer1, taskID) {
        var isCorrect = CorrectAnswerService.checkAnswer(taskID, userAnswer1);
        var timestamp = new Date().getTime();
        var StoredUser= localStorage.getItem("currentUser");
        var UserInfoJson= JSON.parse(StoredUser);
        var experienceLevelLevel = UserInfoJson.experienceLevelLevel;
        var username = UserInfoJson.username;
        var logged_data = {"useranswer":userAnswer1,"taskid":taskID,"isCorrectAnswer1":isCorrect,"userid":username,"timestamp":timestamp,"numHints":$scope.hintIndex, "experienceLevelLevel":experienceLevelLevel};
        window.logHelperFunction(logged_data);
        $scope.isCorrectAnswer1 = isCorrect;
        $scope.isAnswered1 = true;
        if ($scope.isCorrectAnswer2 !== null) {
            updateCompletionStatus();
        }
    };
    
    $scope.checkGapAnswer2 = function(userAnswer2, taskID) {
        var isCorrect = CorrectAnswerService.checkAnswer(taskID, userAnswer2);
        var timestamp = new Date().getTime();
        var StoredUser= localStorage.getItem("currentUser");
        var UserInfoJson= JSON.parse(StoredUser);
        var experienceLevel = UserInfoJson.experienceLevel;
        var username = UserInfoJson.username;
        var logged_data = {"useranswer":userAnswer2,"taskid":taskID,"isCorrectAnswer2":isCorrect,"userid":username,"timestamp":timestamp,"numHints":$scope.hintIndex, "experienceLevel":experienceLevel};
        window.logHelperFunction(logged_data);
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
    
    $scope.provideFeedback = function() {
        var taskId = $scope.$parent.currentTask.id;
        if (taskId === "F1C1"){
            var isCorrect = $scope.isCorrectAnswer1 && $scope.isCorrectAnswer2;
        } else {
            var isCorrect = $scope.isCorrectAnswer1;
        }
        
        $scope.noButtonsOnFeedback = true;
    
        if (isCorrect) {
            $scope.positiveFeedbacks = FeedbackService.getPositiveFeedbacks(taskId);
            if ($scope.positiveFeedbacks.length > 0) {
                $scope.hintText = $scope.positiveFeedbacks[0].text;
                FeedbackService.updatePythonTutorImage('positive');
            }
        } else {
            $scope.negativeFeedbacks = FeedbackService.getNegativeFeedbacks(taskId);
            if ($scope.negativeFeedbacks.length > 0) {
                var randomIndex = Math.floor(Math.random() * $scope.negativeFeedbacks.length);
                $scope.hintText = $scope.negativeFeedbacks[randomIndex].text;
                FeedbackService.updatePythonTutorImage('negative');
            }
        }
    };

    $scope.checkGapAnswers = function(userAnswer1, userAnswer2) {
        $scope.checkGapAnswer1(userAnswer1, "F1C1_1");
        $scope.checkGapAnswer2(userAnswer2, "F1C1_2");
    };

    $scope.onBlurGapAnswer1 = function() {
        $scope.provideFeedback();
    };

    $scope.onBlurGapAnswer2 = function() {
        $scope.provideFeedback();
    };

    $scope.onBlurGapAnswerOneAnswer = function(){
        $scope.provideFeedback();
    }

    function updateCompletionStatus() {
        if ($scope.isCorrectAnswer1 && $scope.isCorrectAnswer2) {
            $scope.updateTaskStatus($scope.$parent.currentTask.id, 'correct');
            var timestamp = new Date().getTime();
            var StoredUser= localStorage.getItem("currentUser");
            var UserInfoJson= JSON.parse(StoredUser);
            var experienceLevel = UserInfoJson.experienceLevel;
            var username = UserInfoJson.username;
            var logged_data = {"useranswer1":$scope.isCorrectAnswer1,"useranswer2":$scope.isCorrectAnswer2,"taskid":taskID,"isCorrectFullAnswer":"correct","userid":username,"timestamp":timestamp,"numHints":$scope.hintIndex, "experienceLevel":experienceLevel};
            window.logHelperFunction(logged_data);
        
            
        } else if ($scope.isCorrectAnswer1 !== null && $scope.isCorrectAnswer2 !== null) {
            $scope.updateTaskStatus($scope.$parent.currentTask.id, 'incorrect');
            var timestamp = new Date().getTime();
            var StoredUser= localStorage.getItem("currentUser");
            var UserInfoJson= JSON.parse(StoredUser);
            var experienceLevel = UserInfoJson.experienceLevel;
            var username = UserInfoJson.username;
            var logged_data = {"useranswer1":$scope.isCorrectAnswer1,"useranswer2":$scope.isCorrectAnswer2,"taskid":taskID,"isCorrectFullAnswer":"incorrect","userid":username,"timestamp":timestamp,"numHints":$scope.hintIndex, "experienceLevel":experienceLevel};
            window.logHelperFunction(logged_data);
        }
    }

    $scope.getHint = function() {
        // Deaktiviere den Hint-Button und starte die Fortschrittsbalken-Animation
        $scope.hintButtonDisabled = true;
        $scope.noButtonsOnFeedback = false; 
        $scope.hintsGiven = true;
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
    $scope.backToHints = function() {
        $scope.noButtonsOnFeedback = false;
        var currentHint = $scope.feedbacks[$scope.hintIndex];
        $scope.hintText = currentHint.text;
    };
});
