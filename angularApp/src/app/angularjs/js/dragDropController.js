var app = angular.module("myApp");
app.controller("DragDropController", function($scope, $timeout, $interval, CorrectFlowchartService, FeedbackService, $sce,) {
    $scope.codeSnippet = "i = 1\nwhile i < 6:\nif i == 3()\nbreak\ni += 1";
    $scope.availableLines = [
        "i = 1",
        "while i < 6:",
        "if i == 3:",
        "break",
        "i += 1"
        ];
    $scope.selectedLine = $scope.availableLines[0];
    $scope.selectedShape = "Rectangle";
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
    
    function init() {
        var $ = go.GraphObject.make;
    
        myDiagram = $(go.Diagram, "myDiagramDiv", {
            "undoManager.isEnabled": true,
            "linkingTool.direction": go.LinkingTool.Either,
            "allowDrop": true
        });
    
        myDiagram.model = $(go.GraphLinksModel, {
            linkFromKeyProperty: function(linkData) {
                return linkData.from;
            },
            linkToKeyProperty: function(linkData) {
                return linkData.to;
            }
        });
    
        myDiagram.nodeTemplate = $(go.Node, "Auto",
            $(go.Shape, {
                strokeWidth: 3,
                fill: "white",
                portId: "",
                cursor: "pointer",
                fromLinkable: true,
                toLinkable: true,
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides,
                minSize: new go.Size(80, 40)
            },
                new go.Binding("figure", "shape"),
                new go.Binding("stroke", "color")),
            $(go.TextBlock, { margin: 1, font: '10pt system-ui' },
                new go.Binding("text", "text")),
        );
    
        myDiagram.linkTemplate =
            $(go.Link,
                { routing: go.Routing.AvoidsNodes, corner: 10 },
                $(go.Shape, { strokeWidth: 4 },
                    new go.Binding("stroke", "color")),
                $(go.Shape, { toArrow: "Standard" },
                    new go.Binding("stroke", "color"),
                    new go.Binding("fill", "color")),
                $(go.TextBlock, { stroke: "white", background: "rgb(38, 38, 38)", segmentOffset: new go.Point(0, -10), editable: true},
                    new go.Binding("text", "text")),
                {
                    contextMenu: $("ContextMenu",
                        $("ContextMenuButton",
                            $(go.TextBlock, "Set True"),
                            {
                                click: function(e, obj) {
                                    var link = obj.part.adornedPart;
                                    e.diagram.model.commit(function(m) {
                                        m.set(link.data, "text", "True");
                                    }, "Set link text to true");
                                }
                            }
                        ),
                        $("ContextMenuButton",
                            $(go.TextBlock, "Set False"),
                            {
                                click: function(e, obj) {
                                    var link = obj.part.adornedPart;
                                    e.diagram.model.commit(function(m) {
                                        m.set(link.data, "text", "False");
                                    }, "Set link text to false");
                                }
                            }
                        )
                    )
                }
            );
    
        myDiagram.model = new go.GraphLinksModel([
            // {key: 6, text: "Start", shape: "Ellipse", color: "gray"},
            // {key: 7, text: "End", shape: "Ellipse", color: "gray"}
            ], []);
    
        myDiagram.addDiagramListener("Modified", function() {
            $scope.updateConnectedNodes();
        });
    
        myDiagram.addDiagramListener("LinkDrawn", function(e) {
            var link = e.subject;
            e.diagram.model.set(link.data, "color", "white");
        });

        myDiagram.addDiagramListener("SelectionDeleted", function(e) {
            e.subject.each(function(part) {
                if (part instanceof go.Node) {
                    $scope.$apply(function() {
                        $scope.availableLines.push(part.data.text);
                    });
                }
            });
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
                color: "gray"
            });
            myDiagram.commitTransaction("add node");
            $scope.availableLines.splice($scope.availableLines.indexOf($scope.selectedLine), 1);
            $scope.selectedLine = $scope.availableLines.length > 0 ? $scope.availableLines[0] : null;
            $scope.updateConnectedNodes();
        }
    };
    
    $scope.addLink = function(fromNodeKey, toNodeKey) {
        myDiagram.startTransaction("add link");
        myDiagram.model.addLinkData({
            from: fromNodeKey,
            to: toNodeKey,
            color: "white",
            text: null
            
        });
        myDiagram.commitTransaction("add link");
        $scope.updateConnectedNodes();
    };
    
    $scope.refresh = function() {
        myDiagram.model = new go.GraphLinksModel([
            // {key: 6, text: "Start", shape: "Ellipse", color: "gray"},
            // {key: 7, text: "End", shape: "Ellipse", color: "gray"}
            ], []);
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
            links: myDiagram.model.linkDataArray.map(link => ({ from: link.from, to: link.to, text: link.text }))
        };

        // Übernommen von anderen Tasks
        var taskId = 'L3C1';
        var isCorrect = CorrectFlowchartService.checkFlowchartAnswer(taskId, userAnswer);
        $scope.isCorrectAnswer = isCorrect;
        var timestamp = new Date().getTime();
        var StoredUser = localStorage.getItem("currentUser");
        var UserInfoJson = JSON.parse(StoredUser);
        var experienceLevel = UserInfoJson.experienceLevel;
        var username = UserInfoJson.username;
        var logged_data = { "task_form": "flowchart","useranswer": JSON.stringify(userAnswer), "taskid": taskId, "isCorrect": isCorrect, "username": username, "timestamp": timestamp, "numHints": $scope.hintIndex, "experienceLevel": experienceLevel };
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
        
        // Node Highlight
        userAnswer.nodes.forEach(function(node) {
            var correctNode = correctAnswer.nodes.find(n => n.key === node.key);
            var color = (correctNode && correctNode.text === node.text && correctNode.shape === node.shape) ? "green" : "red";
            var diagramNode = myDiagram.findNodeForKey(node.key);
            if (diagramNode) {
                myDiagram.model.setDataProperty(diagramNode.data, "color", color);
            }
        });
        //  Link Highlight
        myDiagram.startTransaction("clear links");
        myDiagram.model.linkDataArray = [];
        myDiagram.commitTransaction("clear links");
    
        userAnswer.links.forEach(function(link) {
            var correctLink = correctAnswer.links.find(l => l.from === link.from && l.to === link.to && l.text === link.text);
            var color = correctLink ? "green" : "red";
            myDiagram.startTransaction("add colored link");
            myDiagram.model.addLinkData({
                from: link.from,
                to: link.to,
                color: color,
                text: link.text
            });
            myDiagram.commitTransaction("add colored link");
        });
    }
    
    // Pos/Neg Feedback
    $scope.userReassurance = function() {
        var taskId = $scope.$parent.currentTask.id;
        var isCorrect = $scope.isCorrectAnswer;
        $scope.noButtonsOnFeedback = true;
    
        if (isCorrect) {
            $scope.positiveFeedbacks = FeedbackService.getPositiveFeedbacks(taskId);
            if ($scope.positiveFeedbacks.length > 0) {
                $scope.hintText = $sce.trustAsHtml($scope.positiveFeedbacks[0].text);
            }
        } else {
            $scope.negativeFeedbacks = FeedbackService.getNegativeFeedbacks(taskId);
            if ($scope.negativeFeedbacks.length > 0) {
                var randomIndex = Math.floor(Math.random() * $scope.negativeFeedbacks.length);
                $scope.hintText = $sce.trustAsHtml($scope.negativeFeedbacks[randomIndex].text);
            }
        }
    };
    
    // How to button Funktion
    $scope.howToUse = function() {
        $scope.noButtonsOnFeedback = true;
        $scope.hintText = 
            '<b>How to use:</b> <br>' +
            '1. Select the code line and if it is a condition or a Process <br>' +
            '   -> Process: Indicates a specific action or operation that moves the workflow forward. <br>' +
            '   -> Condition: Represents a decision point that dictates the next step based on whether the condition is true or false <br>' +
            '2. Click "Add Node" to place it on the canvas <br>' +
            '3. Hold the left mouse button on a node to drag it. <br>' +
            '4. To connect two nodes, hover over a node. When you see the pointer, hold the left mouse button to drag a link to another node to connect them.<br>' +
            '5. Right click on a link and select whether the condition is "True" or "False".<br>' +
            '6. Once you are done, click on the "Check" button. <br>' +
            '7. Click on the "Refresh" button to start over.';

        // Mark the hint text as trusted HTML
        $scope.hintText = $sce.trustAsHtml($scope.hintText);
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
            $scope.hintText = $sce.trustAsHtml(currentHint.text);
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
            $scope.hintText = $sce.trustAsHtml(currentHint.text);
            $scope.highlightLine = currentHint.highlight;
        }
    };
    
    $scope.previousHint = function() {
        if ($scope.hintIndex > 0) {
            $scope.hintIndex--;
            var currentHint = $scope.feedbacks[$scope.hintIndex];
            $scope.hintText = $sce.trustAsHtml(currentHint.text);
            $scope.highlightLine = currentHint.highlight;
        }
    };

    $scope.backToHints = function() {
        $scope.noButtonsOnFeedback = false;
        var currentHint = $scope.feedbacks[$scope.hintIndex];
        $scope.hintText = $sce.trustAsHtml(currentHint.text);
    };

    $timeout(init, 0);
    });
    
    app.factory('CorrectFlowchartService', function() {
        var correctAnswers = {
            'L3C1': {
                nodes: [
                    { key: 1, text: "i = 1", shape: "Rectangle" },
                    { key: 2, text: "while i < 6:", shape: "Diamond" },
                    { key: 3, text: "if i == 3:", shape: "Diamond" },
                    { key: 4, text: "break", shape: "Rectangle" },
                    { key: 5, text: "i += 1", shape: "Rectangle" },
                    // { key: 6, text: "Start", shape: "Ellipse" },
                    // { key: 7, text: "End", shape: "Ellipse" }
                ],
                links: [
                    { key: 1, from: 1, to: 2},
                    { key: 2, from: 2, to: 3, text: "True" },
                    { key: 3, from: 3, to: 4, text: "True" },
                    { key: 4, from: 3, to: 5, text: "False" },
                    { key: 5, from: 5, to: 2},
                    // { key: 6, from: 6, to: 1},
                    // { key: 7, from: 4, to: 7},
                    // { key: 8, from: 2, to: 7}
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
    
        function compareLinksText(userLinks, correctLinks) {
            if (userLinks.length !== correctLinks.length) return false;
            for (let i = 0; i < userLinks.length; i++) {
                if (userLinks[i].text !== correctLinks[i].text) {
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
                    compareLinks(userAnswer.links, correctAnswer.links) &&
                    compareLinksText(userAnswer.links, correctAnswer.links);
            },
            correctAnswers: correctAnswers
        };
    });