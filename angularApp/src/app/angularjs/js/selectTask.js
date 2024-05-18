var app = angular.module("myApp", []);

app.controller("MainController", function($scope) {
    // Array mit den Aufgaben
    $scope.tasks = [
        {
            id: 'V1C1',
            templateUrl: "app/angularjs/tasks/V1C1.html",
            isCompleted: false // Flag, um den Abschluss der Aufgabe zu verfolgen
        },
        {
            id: 'V3C1',
            templateUrl: "app/angularjs/tasks/V3C1.html",
            isCompleted: false
        },
        {
            id: 'V5C1',
            templateUrl: "app/angularjs/tasks/V5C1.html",
            isCompleted: false
        }
        // Weitere Aufgaben können hier hinzugefügt werden
    ];


    // Index der aktuellen Aufgabe
    $scope.currentTaskIndex = 0;
    $scope.currentTask = $scope.tasks[$scope.currentTaskIndex]; // Aktuelle Aufgabe
    $scope.isCorrectAnswer = null;
    $scope.isAnswered = false;

    // Funktion zum Überprüfen der Antwort
    $scope.checkAnswer = function(userAnswer) {
        var taskId = $scope.currentTask.id;
        var isCorrect = correctAnswerFreeText.checkAnswer(taskId, userAnswer);
        $scope.isCorrectAnswer = isCorrect;
        $scope.isAnswered = true;
        if (isCorrect) {
            $scope.tasks[$scope.currentTaskIndex].isCompleted = true;
            $scope.tasks[$scope.currentTaskIndex].isCorrect = true; // Markieren Sie die Aufgabe als korrekt beantwortet
    
        } else {
            // Füge hier ggf. Logik hinzu, um falsche Antworten zu verarbeiten (z.B. Feedback an den Benutzer)
            console.log("Falsche Antwort. Bitte versuche es erneut.");
        }
    };

    // Funktion zum Wechseln zur vorherigen Aufgabe
    $scope.prevTask = function() {
        if ($scope.currentTaskIndex > 0) {
            $scope.currentTaskIndex--;
            $scope.currentTask = $scope.tasks[$scope.currentTaskIndex];
        }
    };

    // Funktion zum Wechseln zur nächsten Aufgabe
    $scope.nextTask = function() {
        if ($scope.currentTaskIndex < $scope.tasks.length - 1 && $scope.currentTask.isCompleted) {
            $scope.currentTaskIndex++;
            $scope.currentTask = $scope.tasks[$scope.currentTaskIndex];
        }
    };

    // Funktion zur Überprüfung, ob der "Next" Button deaktiviert werden soll
    $scope.isNextDisabled = function() {
        return $scope.currentTaskIndex === $scope.tasks.length - 1 || !$scope.currentTask.isCompleted;
    };

    // Funktion zur Überprüfung, ob der "Previous" Button deaktiviert werden soll
    $scope.isPrevDisabled = function() {
        return $scope.currentTaskIndex === 0;
    };
});