var app = angular.module("myApp");

app.controller("dragDropController", function($scope, CorrectAnswerService, FeedbackService) {
    $scope.availableCodeLines = [
        { text: "i = 1", disabled: false },
        { text: "while i < 6:", disabled: false },
        { text: "if i == 3", disabled: false },
        { text: "i += 1", disabled: false }
    ];

    $scope.selectedCodeLine = null;
    $scope.selectedSymbol = null;
    $scope.selectedZone = null;
    $scope.selectedArrow = null;
    $scope.wronglyPlacedCodeLines = [];
    $scope.wronglyPlacedArrows = [];
    $scope.selectedTab = 'codeLines';
    $scope.selectedArrowIndex = null;

    $scope.selectZone = function(zone) {
        $scope.selectedZone = zone;
    };

    $scope.selectCodeLine = function(codeLine) {
        console.log("Pressed code Line: " + codeLine.text);
        $scope.selectedCodeLine = codeLine;
    };

    $scope.selectSymbol = function(symbol) {
        if (['arrow_end', 'arrow_loop'].includes(symbol)) {
            $scope.selectArrow(symbol);
        } else {
            if ($scope.selectedTab === 'codeLines') {
                $scope.selectedSymbol = symbol;
            } else {
                $scope.selectedSymbol = symbol;
            }
        }
    };

    $scope.selectArrow = function(symbol, index) {
        console.log("Pressed Arrow: " + symbol);
        $scope.selectedArrow = symbol;
        if (symbol === 'arrow_down_1' || symbol === 'arrow_loop' || symbol === 'arrow_end' || symbol === 'arrow_down_2' ||symbol === 'arrow_down_3' ||symbol === 'arrow_down_4') {
            $scope.selectedArrowIndex = index;
        }
    };

    /*Codelines*/
    $scope.placeInFlowchart = function() {
        if ($scope.selectedCodeLine && $scope.selectedSymbol && $scope.selectedZone) {
            var element = document.getElementsByClassName($scope.selectedZone.toString());
            
            if (element.length > 0) {
                if ($scope.selectedSymbol) {
                    element[0].innerHTML = `<span>${$scope.selectedCodeLine.text}</span>`;
                    element[0].className += ` ${$scope.selectedSymbol}`;
                    $scope.checkFlowChartAnswer($scope.selectedSymbol, $scope.selectedCodeLine, $scope.selectedZone, element); 
                }
            }
        }else if($scope.selectedArrow && $scope.selectedZone){
                var taskID = "L3C1_" + $scope.selectedZone;
                var flowChartID =  $scope.selectedZone + "_img";
                var selectedArrowID = $scope.selectedArrow;
                
                if($scope.selectedArrow === 'arrow_end' || $scope.selectedArrow === 'arrow_loop'){
                    var selectedArrowID = $scope.selectedArrow;
                }else{
                    var selectedArrowID = $scope.selectedArrow.substring(0, $scope.selectedArrow.length - 2);
                }

                console.log("HIER HIER HIER " + selectedArrowID);
                if(CorrectAnswerService.checkAnswer(taskID, selectedArrowID)){

                    
                    console.log("Arrow right placed");
                    $scope.isCorrectAnswer = true;
                    $scope.isAnswered = true;

                    var selectedZoneElement = document.getElementById($scope.selectedZone);
                    /*(selectedZoneElement.innerHTML = "";*/
                    selectedZoneElement.classList.add('correct-Flowchart');
                    var arrowImage = document.getElementById(flowChartID);
                    arrowImage.classList.add('test');
                    if($scope.selectedArrow === 'arrow_end' || $scope.selectedArrow === 'arrow_loop'){
                        var disableArrowButton = document.getElementById(selectedArrowID);
                        $scope.selectedArrow = disableArrowButton;
                        
                    }else{
                        var disableArrowButton = document.getElementById($scope.selectedArrow);
                    }
                    
                    
                    disableArrowButton.disabled = true;
                    arrowImage.disabled = true;
                    selectedZoneElement.disabled = true;
                    $scope.arrowPlaced = true;
                    $scope.selectedArrow.disabled = true;
                    
                }else{
                    console.log("Arrow wrong placed");
                    var selectedZoneElement = document.getElementById($scope.selectedZone);
                    selectedZoneElement.classList.add('wrong-Flowchart');
                    $scope.wronglyPlacedArrows.push({ arrow: $scope.selectedArrow, element: selectedZoneElement });
                    var arrowImage = document.getElementById(flowChartID);
                    arrowImage.classList.add('test');

                }


        }
        if($scope.checkAllElementsPlaced()){
            if((wronglyPlacedCodeLines.length === 0) && (wronglyPlacedArrows.length === 0)){
                $scope.updateTaskStatus($scope.$parent.currentTask.id, "correct");
            } 
            
            $scope.updateTaskStatus($scope.$parent.currentTask.id, "incorrect");
            
            
        }
        
    };

    $scope.checkFlowChartAnswer = function(symbol, codeLine, zone, element) {
        var taskID = "L3C1_" + zone;
        var userAnswer = symbol ? symbol + " : " + codeLine.text : codeLine.text;
        console.log(symbol + "  " + codeLine.text + " " + taskID + "  " + userAnswer);
        var isCorrect = CorrectAnswerService.checkAnswer(taskID, userAnswer);
        console.log(isCorrect);
        $scope.isCorrectAnswer = isCorrect;
        $scope.isAnswered = true;

        if (isCorrect) {
            console.log("HIER KLASSE" + $scope.$parent.currentTask.id);
            element[0].className += " correct-Flowchart";

            /*$scope.availableCodeLines = $scope.availableCodeLines.filter(function(code) {
                return code !== codeLine;
            });*/

            /*if (symbol) {
                $scope.selectedSymbol = null; // Deselect the symbol
            } 
            /*else {
                codeLine.disabled = true; // Disable the button
            }*/
            codeLine.disabled = true;
            $scope.selectedSymbol = null;
            $scope.selectedCodeLine = null;
            
        } else {
            element[0].className += " wrong-Flowchart";
            $scope.wronglyPlacedCodeLines.push({ codeLine: codeLine, element: element[0] });

            // Deselect the code line and symbol if the answer is wrong
            $scope.selectedCodeLine = null;
            $scope.selectedSymbol = null;
        }
    };

    $scope.resetWrongAnswers = function() {
        $scope.wronglyPlacedCodeLines.forEach(function(item) {
            item.element.innerHTML = "";
            item.element.className = "flowchart-cell";
            var zoneId = item.element.id.replace("'", "");
            console.log("Zone ID" + zoneId);
            item.element.innerText = zoneId.replace("'", "");
            if (!$scope.availableCodeLines.some(code => code.text === item.codeLine.text)) {
                $scope.availableCodeLines.push({ text: item.codeLine.text, disabled: false });
            }
        });
        $scope.wronglyPlacedCodeLines = [];


        $scope.wronglyPlacedArrows.forEach(function(item) {
            item.element.classList.remove('wrong-Flowchart');
            var flowChartID = item.element.id + "_img";
            var arrowImage = document.getElementById(flowChartID);
            arrowImage.classList.remove('test');
            if (!$scope.selectedArrow) {
                $scope.selectedArrow.disabled = false;
            }
        });

        // Deselect the code line and symbol after resetting wrong answers
        $scope.selectedCodeLine = null;
        $scope.selectedSymbol = null;
        $scope.selectedArrow = null;

        $scope.wronglyPlacedArrows = [];

    };


    $scope.selectedTabChanged = function() {
        $scope.selectedArrow = null;
        $scope.selectedSymbol = null;
        $scope.selectedCodeLine = null;
    };


    $scope.checkAllElementsPlaced = function(){
        for (var i = 0; i < $scope.availableCodeLines.length; i++) {
            if (!$scope.availableCodeLines[i].disabled) {
                return false;
            }
        }

        for (var zone in $scope.arrowPlaced) {
            if (!$scope.arrowPlaced[zone]) {
                return false;
            }
        }

        return true;
    }

    $scope.getHint = function() {
        alert("Hint function is not yet implemented");
    };
});
