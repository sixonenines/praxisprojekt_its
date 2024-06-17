var app = angular.module("myApp", ["dndLists"]);

app.controller("TaskController", function ($scope, CorrectAnswerService, $templateCache, $http) {
    var templates = [
        /* Task group 1 */
        "app/angularjs/tasks/FreeTextTasks/V1C1.html",
        "app/angularjs/tasks/FreeTextTasks/V3C1.html",
        "app/angularjs/tasks/FreeTextTasks/V5C1.html",
        "app/angularjs/tasks/CompilerTasks/V1C3.html",
        "app/angularjs/tasks/CompilerTasks/V2C2.html",

        /* Task group 2 */
        "app/angularjs/tasks/GapTasks/L1C1.html",
        "app/angularjs/tasks/FlowchartTask/L3C1.html",
        "app/angularjs/tasks/FreeTextTasks/L5C1.html",
        "app/angularjs/tasks/CompilerTasks/L2C2.html",
        "app/angularjs/tasks/CompilerTasks/L4C2.html",
        "app/angularjs/tasks/CompilerTasks/L2C3.html",

        /* Task group 3 */
        "app/angularjs/tasks/GapTasks/F1C1.html",
        "app/angularjs/tasks/CompilerTasks/F1C2.html",
        "app/angularjs/tasks/CompilerTasks/F5C2.html",
        "app/angularjs/tasks/CompilerTasks/F1C3.html",
        "app/angularjs/tasks/CompilerTasks/F2C3.html",
    ];

    $scope.difficulties = ["beginner", "advanced", "expert"];
    $scope.selectedExperienceLevel = 'beginner';

    /* Enthaelt alle Aufgaben*/
    $scope.taskGroups = {
        TaskGroup1: ['V1C1', 'V3C1', 'V5C1', 'V2C2', 'V1C3'],
        TaskGroup2: ['L1C1', 'L3C1', 'L5C1', 'L2C2', 'L4C2', 'L2C3'],
        TaskGroup3: ['F1C1', 'F1C2', 'F3C2', 'F5C2', 'F1C3', 'F2C3'],
    };

    var taskGroupsByDifficulty = {
        beginner: {
            TaskGroup1: ['V1C1', 'V3C1', 'V5C1', 'V2C2', 'V1C3'],
            TaskGroup2: ['L1C1', 'L3C1', 'L5C1', 'L2C2', 'L4C2', 'L2C3'],
            TaskGroup3: ['F1C1', 'F1C2', 'F3C2', 'F5C2', 'F1C3', 'F2C3'],
        },
        advanced: {
            TaskGroup1: ['V2C2', 'V1C3'],
            TaskGroup2: ['L2C2', 'L4C2', 'L2C3'],
            TaskGroup3: ['F1C2', 'F3C2', 'F5C2', 'F1C3', 'F2C3'],
        },
        expert: {
            TaskGroup1: ['V1C3'],
            TaskGroup2: ['L2C3'],
            TaskGroup3: ['F1C3', 'F2C3'],
        }
    };

    $scope.isTaskInGroup = function (group) {
        return $scope.taskGroups[group].includes($scope.currentTask.id);
    };




    var user = JSON.parse(localStorage.getItem("currentUser"));

    // Aufgaben basierend auf Schwierigkeitsgrad filtern



    $scope.onDifficultyChangeTaskView = function (taskID) {
        console.log("mmmmmmmmmmmmmmmmm");
        $scope.changeTaskDifficultySelection(taskID);
        $scope.calculateProgress(taskID, true);



    };


    $scope.changeTaskDifficultySelection = function (taskID) {
        var experienceLevel = $scope.selectedExperienceLevel;

        // Überprüfen, ob die ausgewählte Schwierigkeitsstufe vorhanden ist
        if (!taskGroupsByDifficulty.hasOwnProperty(experienceLevel)) {
            return false;
        }

        // Durchsuchen der Aufgaben in der aktuellen Schwierigkeitsstufe
        for (var taskGroup in taskGroupsByDifficulty[experienceLevel]) {
            if (taskGroupsByDifficulty[experienceLevel].hasOwnProperty(taskGroup)) {
                // Überprüfen, ob die aktuelle Aufgabe in der Gruppe enthalten ist
                if (taskGroupsByDifficulty[experienceLevel][taskGroup].includes(taskID)) {
                    return true; // Aufgabe wurde gefunden
                }
            }
        }

        return false; // Aufgabe nicht gefunden
    }



    // Initialize TaskGroup1 as visible
    $scope.visibleGroups = {
        TaskGroup1: true
    };

    $scope.toggleGroup = function (groupName) {
        $scope.visibleGroups[groupName] = !$scope.visibleGroups[groupName];
    };

    $scope.isGroupVisible = function (groupName) {
        return $scope.visibleGroups[groupName];
    };

    templates.forEach(function (template) {
        $http.get(template, { cache: $templateCache });
    });

    $scope.tasks = [
        /*Task group 1 */
        { id: 'V1C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/V1C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'V3C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/V3C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'V5C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/V5C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'V2C2', templateUrl: "app/angularjs/tasks/CompilerTasks/V2C2.html", isCompleted: false, status: 'not_answered' },
        { id: 'V1C3', templateUrl: "app/angularjs/tasks/CompilerTasks/V1C3.html", isCompleted: false, status: 'not_answered' },

        /*Task group 2 */
        { id: 'L1C1', templateUrl: "app/angularjs/tasks/GapTasks/L1C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'L3C1', templateUrl: "app/angularjs/tasks/FlowchartTask/L3C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'L5C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/L5C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'L2C2', templateUrl: "app/angularjs/tasks/CompilerTasks/L2C2.html", isCompleted: false, status: 'not_answered' },
        { id: 'L4C2', templateUrl: "app/angularjs/tasks/CompilerTasks/L4C2.html", isCompleted: false, status: 'not_answered' },
        { id: 'L2C3', templateUrl: "app/angularjs/tasks/CompilerTasks/L2C3.html", isCompleted: false, status: 'not_answered' },

        /*Task group 3 */
        { id: 'F1C1', templateUrl: "app/angularjs/tasks/GapTasks/F1C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'F1C2', templateUrl: "app/angularjs/tasks/CompilerTasks/F1C2.html", isCompleted: false, status: 'not_answered' },
        { id: 'F5C2', templateUrl: "app/angularjs/tasks/CompilerTasks/F5C2.html", isCompleted: false, status: 'not_answered' },
        { id: 'F1C3', templateUrl: "app/angularjs/tasks/CompilerTasks/F1C3.html", isCompleted: false, status: 'not_answered' },
        { id: 'F2C3', templateUrl: "app/angularjs/tasks/CompilerTasks/F2C3.html", isCompleted: false, status: 'not_answered' },
    ];

    $scope.currentTaskIndex = 0;
    $scope.currentTask = $scope.tasks[$scope.currentTaskIndex];

    $scope.prevTask = function () {
        if ($scope.currentTaskIndex > 0) {
            $scope.currentTaskIndex--;
            $scope.currentTask = $scope.tasks[$scope.currentTaskIndex];
        }
    };

    $scope.nextTask = function () {
        if ($scope.currentTaskIndex < $scope.tasks.length - 1 ) {
            $scope.currentTaskIndex++;
            $scope.currentTask = $scope.tasks[$scope.currentTaskIndex];
        }
    };

    $scope.isNextDisabled = function () {
        return $scope.currentTaskIndex === $scope.tasks.length - 1;
    };

    $scope.isPrevDisabled = function () {
        return $scope.currentTaskIndex === 0;
    };

    $scope.selectTask = function (taskId) {
        var timestamp = new Date().getTime()
        var StoredUser = localStorage.getItem("currentUser")
        var UserInfoJson = JSON.parse(StoredUser)
        var experienceLevel = UserInfoJson.experienceLevel
        var username = UserInfoJson.username
        var task = $scope.tasks.find(function (t) {
            return t.id === taskId;
        });
        var logged_data = { "taskID": taskId, "username": username, "statusOfTask": task.status, "timestamp": timestamp, "experience": experienceLevel }
        window.logHelperFunction(logged_data);
        $scope.isAnswered = true;


        var task = $scope.tasks.find(function (t) {
            return t.id === taskId;
        });
        if (task) {
            $scope.currentTaskIndex = $scope.tasks.indexOf(task);
            $scope.currentTask = task;
        }
    };

    $scope.isTaskActive = function (taskId) {
        return $scope.currentTask && $scope.currentTask.id === taskId;
    };

    $scope.getStatusIcon = function (taskId) {
        var task = $scope.tasks.find(function (t) {
            return t.id === taskId;
        });

        var color = "";

        if ($scope.currentTask.id == taskId) {
            console.log("active: " + $scope.currentTask.id + "  " + taskId);
            color = " status-icon-active";
        }

        if (task) {
            if (task.status === 'correct') {
                return 'fas fa-check' + color;
            } else if (task.status === 'incorrect') {
                return 'fas fa-times' + color;
            } else {
                return 'fas fa-question' + color;
            }
        }
        return 'fas fa-question' + color;
    };

    // Function to update task status
    $scope.updateTaskStatus = function (taskId, status) {
        var task = $scope.tasks.find(function (t) {
            return t.id === taskId;
        });
        if (task) {
            task.status = status;
            task.isCompleted = true;
        }
    };

    $scope.updateTaskStatus = function (taskID, status) {
        var task = $scope.tasks.find(function (t) {
            return t.id === taskID;
        });
        if (task) {
            task.status = status;
            task.isCompleted = (status === 'correct');
            $scope.calculateProgress(taskID, false);
        }
    };

    $scope.calculateProgress = function (taskID, difficultyChange) {
        console.log("METHODENAUFRUF   " + $scope.selectedExperienceLevel);
        // Gesamtanzahl der Aufgaben für das aktuelle Schwierigkeitsniveau berechnen
        var experienceLevel = $scope.selectedExperienceLevel;
        var totalTasks = 0;
        var taskGroups = taskGroupsByDifficulty[experienceLevel];
        var completedTasks = 0;
        var progress = 0;
        if (difficultyChange) {
            var completedTasks = 0;
            progress = 0;
            document.getElementById('progress-bar').style.width = '0%';
        } else {
            var completedTasks = $scope.tasks.filter(function (task) {
                return task.status === 'correct' && $scope.changeTaskDifficultySelection(task.id);
            }).length;
        }

        /* Berechnen der Anzahl der Aufgaben pro Gruppe */
        for (var taskGroup in taskGroups) {
            if (taskGroups.hasOwnProperty(taskGroup)) {
                totalTasks += taskGroups[taskGroup].length;
            }
        }

        for (var taskGroup in taskGroups) {
            if (taskGroups.hasOwnProperty(taskGroup)) {
                if (taskGroups[taskGroup].includes(taskID)) {
                    progress = (completedTasks / totalTasks) * 100;
                    if (progress == 100) {
                        console.log("Progress: " + progress);
                        /* Endseite ? */

                    }

                    document.getElementById('progress-bar').style.width = progress + '%';
                    document.getElementById('progress-text').innerText = progress.toFixed(2) + '% of the tasks completed';


                }
            }
        }
    }
});