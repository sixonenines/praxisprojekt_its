var app = angular.module("myApp");

app.controller("dragDropController", function($scope, $timeout) {
    $scope.codeSnippet = "i = 1\n    while i < 6:\n        if i == 3()\n    break\n        i += 1";
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

    function init() {
        var $ = go.GraphObject.make;

        myDiagram = $(go.Diagram, "myDiagramDiv", {
            "undoManager.isEnabled": true,
            "linkingTool.direction": go.LinkingTool.Either,
            "allowDrop": true 
        });

        myDiagram.nodeTemplate = $(
            go.Node, "Auto",
            
            $(go.Shape, { 
                strokeWidth: 1, 
                fill: "white", 
                portId: "",
                cursor: "pointer",
                fromLinkable: true,
                toLinkable: true,
                fromSpot: go.Spot.AllSides,
                toSpot: go.Spot.AllSides },
                new go.Binding("figure", "shape")),
            $(go.TextBlock, { margin: 8 },
                new go.Binding("text", "text"))
        );

        myDiagram.linkTemplate =
            $(go.Link,
                { routing: go.Link.AvoidsNodes, corner: 5 },
                $(go.Shape, { strokeWidth: 1.5 }),
                $(go.Shape, { toArrow: "Standard" })
            );

        myDiagram.model = new go.GraphLinksModel([], []);

        
       
    }

    $scope.addNode = function() {
        if ($scope.selectedLine) {
            myDiagram.startTransaction("add node");
            myDiagram.model.addNodeData({
                key: ++nodeIdCounter,
                text: $scope.selectedLine,
                shape: $scope.selectedShape
            });
            myDiagram.commitTransaction("add node");
            $scope.availableLines.splice($scope.availableLines.indexOf($scope.selectedLine), 1);
            $scope.selectedLine = $scope.availableLines.length > 0 ? $scope.availableLines[0] : null;
        }
    };

    $scope.undo = function() {
        myDiagram.commandHandler.undo();
    };

    $scope.redo = function() {
        myDiagram.commandHandler.redo();
    };

    $scope.refresh = function() {
        myDiagram.model.clear();
        nodeIdCounter = 0;
        $scope.availableLines = [
            "i = 1",
            "while i < 6:",
            "if i == 3:",
            "break",
            "i += 1"
        ];
        $scope.selectedLine = $scope.availableLines[0];
    };

    

    

    $timeout(init, 0); // Initialize the diagram after the DOM has loaded
});
