var app = angular.module("myApp", ["dndLists"]);

app.controller("TaskController", function($scope, CorrectAnswerService, $templateCache, $http) {
    var templates = [
        "app/angularjs/tasks/FreeTextTasks/V1C1.html",
        "app/angularjs/tasks/FreeTextTasks/V3C1.html",
        "app/angularjs/tasks/FreeTextTasks/V5C1.html",
        "app/angularjs/tasks/GapTasks/F1C1.html",
        "app/angularjs/tasks/GapTasks/L1C1.html",
        "app/angularjs/tasks/FlowchartTask/Task1.html",
        "app/angularjs/tasks/CompilerTasks/F1C3.html",
        "app/angularjs/tasks/CompilerTasks/F2C3.html",
        "app/angularjs/tasks/CompilerTasks/L2C3.html",
        "app/angularjs/tasks/CompilerTasks/V1C3.html",
        "app/angularjs/tasks/FlowchartTask/Task1.html"
    ];

    $scope.taskGroups = {
        TaskGroup1: ['V1C1', 'V3C1', 'V5C1'],
        TaskGroup2: ['F1C1', 'L1C1'],
        TaskGroup3: ['F1C3', 'F2C3', 'L2C3', 'V1C3'],
    };

    // Initialize TaskGroup1 as visible
    $scope.visibleGroups = {
        TaskGroup1: true
    };

    $scope.toggleGroup = function(groupName) {
        $scope.visibleGroups[groupName] = !$scope.visibleGroups[groupName];
    };

    $scope.isGroupVisible = function(groupName) {
        return $scope.visibleGroups[groupName];
    };

    templates.forEach(function(template) {
        $http.get(template, { cache: $templateCache });
    });

    $scope.tasks = [
        { id: 'V1C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/V1C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'V3C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/V3C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'V5C1', templateUrl: "app/angularjs/tasks/FreeTextTasks/V5C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'F1C1', templateUrl: "app/angularjs/tasks/GapTasks/F1C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'L1C1', templateUrl: "app/angularjs/tasks/GapTasks/L1C1.html", isCompleted: false, status: 'not_answered' },
        { id: 'Flowchart1', templateUrl: "app/angularjs/tasks/FlowchartTask/Task1.html", isCompleted: false, status: 'not_answered' },
        { id: 'F1C3', templateUrl: "app/angularjs/tasks/CompilerTasks/F1C3.html", isCompleted: false, status: 'not_answered' },
        { id: 'F2C3', templateUrl: "app/angularjs/tasks/CompilerTasks/F2C3.html", isCompleted: false, status: 'not_answered' },
        { id: 'L2C3', templateUrl: "app/angularjs/tasks/CompilerTasks/L2C3.html", isCompleted: false, status: 'not_answered' },
        { id: 'V1C3', templateUrl: "app/angularjs/tasks/CompilerTasks/V1C3.html", isCompleted: false, status: 'not_answered' }
    ];

    $scope.currentTaskIndex = 0;
    $scope.currentTask = $scope.tasks[$scope.currentTaskIndex];

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

    $scope.selectTask = function(taskId) {
        var task = $scope.tasks.find(function(t) {
            return t.id === taskId;
        });
        if (task) {
            $scope.currentTaskIndex = $scope.tasks.indexOf(task);
            $scope.currentTask = task;
        }
    };

    $scope.isTaskActive = function(taskId) {
        return $scope.currentTask && $scope.currentTask.id === taskId;
    };

    $scope.getStatusIcon = function(taskId) {
        var task = $scope.tasks.find(function(t) {
            return t.id === taskId;
        });
        if (task) {
            if (task.status === 'correct') {
                return 'fas fa-check';
            } else if (task.status === 'incorrect') {
                return 'fas fa-times';
            } else {
                return 'fas fa-question';
            }
        }
        return 'fas fa-question';
    };

    // Function to update task status
    $scope.updateTaskStatus = function(taskId, status) {
        var task = $scope.tasks.find(function(t) {
            return t.id === taskId;
        });
        if (task) {
            task.status = status;
            task.isCompleted = true;
        }
    };

    
    $scope.updateTaskStatus = function(taskId, status) {
        var task = $scope.tasks.find(function(t) {
            return t.id === taskId;
        });
        if (task) {
            task.status = status;
            task.isCompleted = (status === 'correct');
            $scope.calculateProgress();
        }
    };

    $scope.calculateProgress = function() {
        var completedTasks = $scope.tasks.filter(function(task) {
            return task.status === 'correct';
        }).length;
        var totalTasks = $scope.tasks.length;
        var progress = (completedTasks / totalTasks) * 100;

        // Update progress bar and text
        document.getElementById('progress-bar').style.width = progress + '%';
        document.getElementById('progress-text').innerText = progress.toFixed(2) + '% of the tasks completed';
    };

    // Initial berechnen Sie den Fortschritt
    $scope.calculateProgress();
});