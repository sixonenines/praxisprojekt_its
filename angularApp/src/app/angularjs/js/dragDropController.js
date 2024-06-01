var app = angular.module("myApp");

app.controller('dragDropController', function($scope) {
    $scope.selectedText = '';
    $scope.selectedShape = '';
    $scope.selectedZone = null;
    $scope.zonesWithSVG = {};
    $scope.usedTextOptions = {};
    $scope.usedZoneOptions = {};

    $scope.selectText = function(text) {
        if (!$scope.usedTextOptions[text]) {
            $scope.selectedText = ($scope.selectedText === text) ? '' : text;
        }
    };

    $scope.selectShape = function(shape) {
        $scope.selectedShape = ($scope.selectedShape === shape) ? '' : shape;
    };

    $scope.selectZone = function(zone) {
        if (!$scope.isZoneUsed(zone)) {
            $scope.selectedZone = ($scope.selectedZone === zone) ? null : zone;
        }
    };

    $scope.createSVG = function() {
        if (!$scope.selectedText || !$scope.selectedShape || !$scope.selectedZone) {
            alert("Please select text, shape, and zone.");
            return;
        }

        var svgNS = "http://www.w3.org/2000/svg";
        var svg = document.createElementNS(svgNS, 'svg');

        var zone = document.getElementById('zone' + $scope.selectedZone);
        if (!zone) {
            console.error('Target zone not found.');
            return;
        }

        var zoneRect = zone.getBoundingClientRect();
        var width = zoneRect.width;
        var height = zoneRect.height;

        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.style.position = 'absolute';

        var textElement = document.createElementNS(svgNS, 'text');
        textElement.setAttribute('x', width / 2);
        textElement.setAttribute('y', height / 2);
        textElement.setAttribute('dominant-baseline', 'middle');
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('font-size', '0.5em');
        textElement.setAttribute('font-family', '"Courier New", Courier, monospace');
        textElement.setAttribute('font-weight', 'bold');
        textElement.textContent = $scope.selectedText;

        var shape;
        if ($scope.selectedShape === 'Rectangle') {
            shape = document.createElementNS(svgNS, 'rect');
            shape.setAttribute('x', 0);
            shape.setAttribute('y', 0);
            shape.setAttribute('width', width);
            shape.setAttribute('height', height);
            shape.setAttribute('stroke', 'black');
            shape.setAttribute('stroke-width', '2px');
            shape.setAttribute('fill', 'none');
        } else if ($scope.selectedShape === 'Diamond') {
            shape = document.createElementNS(svgNS, 'polygon');
            var points = `${width / 2},0 ${width},${height / 2} ${width / 2},${height} 0,${height / 2}`;
            shape.setAttribute('points', points);
            shape.setAttribute('stroke', 'black');
            shape.setAttribute('stroke-width', '1px');
            shape.setAttribute('fill', 'none');
        }

        svg.appendChild(shape);
        svg.appendChild(textElement);

        zone.appendChild(svg);
        $scope.$applyAsync(function() {
            $scope.zonesWithSVG[$scope.selectedZone] = true;
            $scope.usedTextOptions[$scope.selectedText] = true;
            $scope.usedZoneOptions[$scope.selectedZone] = true;
            $scope.selectedText = '';
            $scope.selectedShape = '';
            $scope.selectedZone = null;
        });
    };

    $scope.onDrop = function(event, zone) {
        $scope.selectZone(zone);
    };

    $scope.isTextUsed = function(text) {
        return $scope.usedTextOptions[text];
    };

    $scope.isZoneUsed = function(zone) {
        return $scope.usedZoneOptions[zone];
    };
});