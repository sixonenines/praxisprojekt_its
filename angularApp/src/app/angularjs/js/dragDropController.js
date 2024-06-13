var app = angular.module("myApp");

app.controller("dragDropController", function($scope, $timeout, $interval, CorrectFlowchartService, FeedbackService) {
    $scope.codeSnippet = "i = 1\nwhile i < 6:\nif i == 3()\nbreak\ni += 1";
    $scope.availableLines = [
        "i = 1",
        "while i < 6:",
        "if i == 3:",
        "break",
        "i += 1"
    ];
    $scope.selectedLine = $scope.availableLines[0];
    $scope.selectedShape = "RoundedRectangle";
    var nodeIdCounter = 0;
    var myDiagram;

    $scope.isCorrectAnswer = null;
    $scope.isAnswered = false;
    $scope.hintText = "";
    $scope.hintIndex = -1;
    $scope.maxHintIndex = -1;
    $scope.feedbacks = [];
    $scope.positiveFeedbacks = [];
    $scope.negativeFeedbacks = [];
    $scope.allHintsShown = false;
    $scope.noButtonsOnFeedback = false;
    $scope.hintsGiven = false;
    $scope.connectedNodes = [];

    $scope.addLink = function(fromNodeKey, toNodeKey) {
        myDiagram.startTransaction("add link");
        myDiagram.model.addLinkData({
            from: fromNodeKey,
            to: toNodeKey,
            color: "black" // Initial color
        });
        myDiagram.commitTransaction("add link");
        $scope.updateConnectedNodes();
    };

    function init() {
        var $ = go.GraphObject.make;

        myDiagram = $(go.Diagram, "myDiagramDiv", {
            "undoManager.isEnabled": true,
            "linkingTool.direction": go.LinkingTool.Either,
            "allowDrop": true
        });

        myDiagram.nodeTemplate = $(go.Node, "Auto",
            $(go.Shape, {
                strokeWidth: 1,
                fill: "white",
                portId: "",
                cursor: "pointer",
                fromLinkable: true,
                toLinkable: true,
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides
            },
                new go.Binding("figure", "shape"),
                new go.Binding("stroke", "color")),
            $(go.TextBlock, { margin: 8 },
                new go.Binding("text", "text"))
        );

        myDiagram.linkTemplate =
            $(go.Link,
                { routing: go.Routing.AvoidsNodes, corner: 10 },
        $(go.Shape, { strokeWidth: 1.5 },
            new go.Binding("stroke", "color")),
        $(go.Shape, { toArrow: "Standard" },
            new go.Binding("stroke", "color"),
            new go.Binding("fill", "color"))
            );

        myDiagram.model = new go.GraphLinksModel([], []);

        myDiagram.addDiagramListener("Modified", function() {
            $scope.updateConnectedNodes();
        });
    }

    $scope.updateConnectedNodes = function() {
        var connectedNodes = [];
        myDiagram.nodes.each(function(node) {
            var linksOut = [];
            node.findLinksOutOf().each(function(link) {
                linksOut.push(link.toNode.data.key);
            });
            connectedNodes.push({
                key: node.data.key,
                text: node.data.text,
                shape: node.data.shape,
                linksOut: linksOut
            });
        });
        $scope.connectedNodes = connectedNodes;
    };

    $scope.addNode = function() {
        if ($scope.selectedLine) {
            myDiagram.startTransaction("add node");
            myDiagram.model.addNodeData({
                key: ++nodeIdCounter,
                text: $scope.selectedLine,
                shape: $scope.selectedShape,
                color: "black"
            });
            myDiagram.commitTransaction("add node");
            $scope.availableLines.splice($scope.availableLines.indexOf($scope.selectedLine), 1);
            $scope.selectedLine = $scope.availableLines.length > 0 ? $scope.availableLines[0] : null;
            $scope.updateConnectedNodes();
        }
    };

    $scope.refresh = function() {
        myDiagram.model = new go.GraphLinksModel([], []);;
        nodeIdCounter = 0;
        $scope.availableLines = [
            "i = 1",
            "while i < 6:",
            "if i == 3:",
            "break",
            "i += 1"
        ];
        $scope.selectedLine = $scope.availableLines[0];
        $scope.updateConnectedNodes();
        
    };

    $scope.checkFlowchart = function() {
        var userAnswer = {
            nodes: myDiagram.model.nodeDataArray.map(node => ({ key: node.key, text: node.text, shape: node.shape })),
            links: myDiagram.model.linkDataArray.map(link => ({ from: link.from, to: link.to }))
        };
        var taskId = 'L3C1';
        var isCorrect = CorrectFlowchartService.checkFlowchartAnswer(taskId, userAnswer);
        $scope.isCorrectAnswer = isCorrect;
        var timestamp = new Date().getTime();
        var StoredUser = localStorage.getItem("currentUser");
        var UserInfoJson = JSON.parse(StoredUser);
        var experience = UserInfoJson.experience;
        var username = UserInfoJson.username;
        var logged_data = { "useranswer": JSON.stringify(userAnswer), "taskid": taskId, "isCorrect": isCorrect, "userid": username, "timestamp": timestamp, "numHints": $scope.hintIndex, "experience": experience };
        window.logHelperFunction(logged_data);
        $scope.isAnswered = true;

        if (isCorrect) {
            $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCompleted = true;
            $scope.$parent.tasks[$scope.$parent.currentTaskIndex].isCorrect = true;
            $scope.updateTaskStatus(taskId, "correct");
            FeedbackService.updatePythonTutorImage('positive');
        } else {
            $scope.updateTaskStatus(taskId, "incorrect");
            FeedbackService.updatePythonTutorImage('negative');
        }

        highlightNodesAndLinks(userAnswer, isCorrect);

        $scope.userReassurance();
    };

    function highlightNodesAndLinks(userAnswer, isCorrect) {
        var correctAnswer = CorrectFlowchartService.correctAnswers['L3C1'];

        // Node highlight
        userAnswer.nodes.forEach(function(node) {
            var correctNode = correctAnswer.nodes.find(n => n.key === node.key);
            var color = (correctNode && correctNode.text === node.text && correctNode.shape === node.shape) ? "green" : "red";
            var diagramNode = myDiagram.findNodeForKey(node.key);
            if (diagramNode) {
                myDiagram.model.setDataProperty(diagramNode.data, "color", color);
            }
        });

        userAnswer.links.forEach(function(link) {
            var correctLink = correctAnswer.links.find(l => l.from === link.from && l.to === link.to);
            var diagramLink = myDiagram.findLinkForData(link);
            if (diagramLink) {
                var color = correctLink ? "green" : "red";
                myDiagram.model.setDataProperty(diagramLink.data, "color", color);
            }
        });
    }

    $scope.userReassurance = function() {
        var taskId = $scope.$parent.currentTask.id;
        var isCorrect = $scope.isCorrectAnswer;
        $scope.noButtonsOnFeedback = true;

        if (isCorrect) {
            $scope.positiveFeedbacks = FeedbackService.getPositiveFeedbacks(taskId);
            if ($scope.positiveFeedbacks.length > 0) {
                $scope.hintText = $scope.positiveFeedbacks[0].text;
            }
        } else {
            $scope.negativeFeedbacks = FeedbackService.getNegativeFeedbacks(taskId);
            if ($scope.negativeFeedbacks.length > 0) {
                var randomIndex = Math.floor(Math.random() * $scope.negativeFeedbacks.length);
                $scope.hintText = $scope.negativeFeedbacks[randomIndex].text;
            }
        }
    };

    $scope.getHint = function() {
        $scope.hintButtonDisabled = true;
        $scope.noButtonsOnFeedback = false;
        $scope.hintsGiven = true;
        $scope.startHintButtonAnimation();

        var taskId = $scope.$parent.currentTask.id;
        if ($scope.feedbacks.length === 0) {
            $scope.feedbacks = FeedbackService.getFeedbacks(taskId);
        }
        if ($scope.hintIndex < $scope.feedbacks.length - 1) {
            $scope.hintIndex++;
            $scope.maxHintIndex = $scope.hintIndex;
            var currentHint = $scope.feedbacks[$scope.hintIndex];
            $scope.hintText = currentHint.text;
            $scope.highlightLine = currentHint.highlight;
            if ($scope.hintIndex >= $scope.feedbacks.length - 1) {
                $scope.allHintsShown = true;
            }
        } else {
            $scope.hintText = "Keine weiteren Hints verfügbar.";
        }

        $timeout(function() {
            $scope.stopHintButtonAnimation();
        }, 5000);
    };

    $scope.startHintButtonAnimation = function() {
        var totalTime = 5000;
        var currentTime = 0;
        $scope.hintButtonAnimationInterval = $interval(function() {
            currentTime += 100;
            $scope.progressBarWidth = (currentTime / totalTime) * 100 + '%';
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

    $timeout(init, 0);
});

app.factory('CorrectFlowchartService', function() {
    var correctAnswers = {
        'L3C1': {
            nodes: [
                { key: 1, text: "i = 1", shape: "RoundedRectangle" },
                { key: 2, text: "while i < 6:", shape: "Diamond" },
                { key: 3, text: "if i == 3:", shape: "Diamond" },
                { key: 4, text: "break", shape: "RoundedRectangle" },
                { key: 5, text: "i += 1", shape: "RoundedRectangle" }
            ],
            links: [
                { key: 1, from: 1, to: 2, label: true},
                { key: 2, from: 2, to: 3, label: true },
                { key: 3, from: 3, to: 4, label: true },
                { key: 4, from: 3, to: 5, label: true },
                { key: 5, from: 5, to: 2, label: false }
            ]
        }
    };

    function compareNodes(userNodes, correctNodes) {
        if (userNodes.length !== correctNodes.length) return false;
        for (let i = 0; i < userNodes.length; i++) {
            if (userNodes[i].key !== correctNodes[i].key ||
                userNodes[i].text !== correctNodes[i].text ||
                userNodes[i].shape !== correctNodes[i].shape) {
                return false;
            }
        }
        return true;
    }

    function compareLinks(userLinks, correctLinks) {
        if (userLinks.length !== correctLinks.length) return false;
        for (let i = 0; i < userLinks.length; i++) {
            if (userLinks[i].from !== correctLinks[i].from ||
                userLinks[i].to !== correctLinks[i].to) {
                return false;
            }
        }
        return true;
    }

    return {
        checkAnswer: function(taskId, userAnswer) {
            return userAnswer == correctAnswers[taskId];
        },
        checkFlowchartAnswer: function(taskId, userAnswer) {
            var correctAnswer = correctAnswers[taskId];
            if (!correctAnswer) return false;
            return compareNodes(userAnswer.nodes, correctAnswer.nodes) &&
                   compareLinks(userAnswer.links, correctAnswer.links);
        },
        correctAnswers: correctAnswers
    };
});
