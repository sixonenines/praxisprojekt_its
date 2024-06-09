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
        $scope.selectedZone = ($scope.selectedZone === zone) ? null : zone;
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
    
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
    
        var textElement = document.createElementNS(svgNS, 'text');
        textElement.setAttribute('x', '50%');
        textElement.setAttribute('y', '50%');
        textElement.setAttribute('dominant-baseline', 'middle');
        textElement.setAttribute('text-anchor', 'middle');
        textElement.setAttribute('font-size', '0.5em');
        textElement.setAttribute('font-family', '"Courier New", Courier, monospace');
        textElement.setAttribute('font-weight', 'bold');
        textElement.textContent = $scope.selectedText;
    
        var shape;
        if ($scope.selectedShape === 'Rectangle') {
            shape = document.createElementNS(svgNS, 'rect');
            shape.setAttribute('x', '10%');
            shape.setAttribute('y', '10%');
            shape.setAttribute('width', '80%');
            shape.setAttribute('height', '80%');
            shape.setAttribute('stroke', 'black');
            shape.setAttribute('stroke-width', '2px');
            shape.setAttribute('fill', 'none');
        } else if ($scope.selectedShape === 'Diamond') {
            shape = document.createElementNS(svgNS, 'polygon');
            var points = `50%,10% 90%,50% 50%,90% 10%,50%`;
            shape.setAttribute('points', points);
            shape.setAttribute('stroke', 'black');
            shape.setAttribute('stroke-width', '1px');
            shape.setAttribute('fill', 'none');
        }
    
        svg.appendChild(shape);
        svg.appendChild(textElement);
    
        zone.appendChild(svg);

        /*Einfügen der svg in die Zone-Div*/
        $scope.$applyAsync(function() {
            $scope.zonesWithSVG[$scope.selectedZone] = true;
            $scope.usedTextOptions[$scope.selectedText] = true;
            $scope.usedZoneOptions[$scope.selectedZone] = true;
            $scope.selectedText = '';
            $scope.selectedShape = '';
            $scope.selectedZone = null;
    
            // Create dots around the placed element
            $scope.createDots(zone.getAttribute('data-zone'));
        });
    };

    /*Pfeile rote Punkte*/
    $scope.drawArrow = function(fromZone, toZone, fromPosition) {
        var fromElement = document.getElementById('zone' + fromZone);
        var toElement = document.getElementById('zone' + toZone);
        if (!fromElement || !toElement) {
            console.error('Zones not found.');
            return;
        }

        var fromRect = fromElement.getBoundingClientRect();
        var toRect = toElement.getBoundingClientRect();

        var svgNS = "http://www.w3.org/2000/svg";
        var arrowSvg = document.createElementNS(svgNS, 'svg');
        arrowSvg.setAttribute('width', '100%');
        arrowSvg.setAttribute('height', '100%');
        arrowSvg.style.position = 'absolute';
        arrowSvg.style.top = 0;
        arrowSvg.style.left = 0;

        var line = document.createElementNS(svgNS, 'line');
        line.setAttribute('stroke', 'black');
        line.setAttribute('stroke-width', '2px');

        var arrowHead = document.createElementNS(svgNS, 'polygon');
        arrowHead.setAttribute('stroke', 'black');
        arrowHead.setAttribute('stroke-width', '2px');
        arrowHead.setAttribute('fill', 'black');

        if (fromPosition === 'top') {
            line.setAttribute('x1', fromRect.left + fromRect.width / 2);
            line.setAttribute('y1', fromRect.top);
            line.setAttribute('x2', toRect.left + toRect.width / 2);
            line.setAttribute('y2', toRect.bottom);

            arrowHead.setAttribute('points', `${toRect.left + toRect.width / 2},${toRect.bottom} ${toRect.left + toRect.width / 2 - 5},${toRect.bottom + 10} ${toRect.left + toRect.width / 2 + 5},${toRect.bottom + 10}`);
        } else if (fromPosition === 'right') {
            line.setAttribute('x1', fromRect.right);
            line.setAttribute('y1', fromRect.top + fromRect.height / 2);
            line.setAttribute('x2', toRect.left);
            line.setAttribute('y2', toRect.top + toRect.height / 2);

            arrowHead.setAttribute('points', `${toRect.left},${toRect.top + toRect.height / 2} ${toRect.left - 10},${toRect.top + toRect.height / 2 - 5} ${toRect.left - 10},${toRect.top + toRect.height / 2 + 5}`);
        } else if (fromPosition === 'bottom') {
            line.setAttribute('x1', fromRect.left + fromRect.width / 2);
            line.setAttribute('y1', fromRect.bottom);
            line.setAttribute('x2', toRect.left + toRect.width / 2);
            line.setAttribute('y2', toRect.top);

            arrowHead.setAttribute('points', `${toRect.left + toRect.width / 2},${toRect.top} ${toRect.left + toRect.width / 2 - 5},${toRect.top - 10} ${toRect.left + toRect.width / 2 + 5},${toRect.top - 10}`);
        } else if (fromPosition === 'left') {
            line.setAttribute('x1', fromRect.left);
            line.setAttribute('y1', fromRect.top + fromRect.height / 2);
            line.setAttribute('x2', toRect.right);
            line.setAttribute('y2', toRect.top + toRect.height / 2);

            arrowHead.setAttribute('points', `${toRect.right},${toRect.top + toRect.height / 2} ${toRect.right + 10},${toRect.top + toRect.height / 2 - 5} ${toRect.right + 10},${toRect.top + toRect.height / 2 + 5}`);
        }

        arrowSvg.appendChild(line);
        arrowSvg.appendChild(arrowHead);

        document.body.appendChild(arrowSvg);
    };

    $scope.createDots = function(zone) {
        var zoneElement = document.querySelector(`[data-zone="${zone}"]`);
        var svg = zoneElement.querySelector('svg');
    
        ['top', 'right', 'bottom', 'left'].forEach(position => {
            var dot = document.createElement('div');
            dot.className = `dot ${position}`;
            dot.setAttribute('draggable', 'true');
            dot.setAttribute('data-zone', zone);
            dot.setAttribute('data-position', position);
            dot.addEventListener('dragstart', dragStart);
            zoneElement.appendChild(dot);
    
            // Position the dots correctly around the svg element
            var svgRect = svg.getBoundingClientRect();
            var dotSize = 10; // Size of the dot
    
            switch (position) {
                case 'top':
                    dot.style.top = `${svgRect.top - dotSize / 2}px`;
                    dot.style.left = `${svgRect.left + svgRect.width / 2 - dotSize / 2}px`;
                    break;
                case 'right':
                    dot.style.top = `${svgRect.top + svgRect.height / 2 - dotSize / 2}px`;
                    dot.style.left = `${svgRect.right - dotSize / 2}px`;
                    break;
                case 'bottom':
                    dot.style.top = `${svgRect.bottom - dotSize / 2}px`;
                    dot.style.left = `${svgRect.left + svgRect.width / 2 - dotSize / 2}px`;
                    break;
                case 'left':
                    dot.style.top = `${svgRect.top + svgRect.height / 2 - dotSize / 2}px`;
                    dot.style.left = `${svgRect.left - dotSize / 2}px`;
                    break;
            }
        });
    };

    $scope.onDrop = function(event, zone) {
        event.preventDefault();
        var data = JSON.parse(event.dataTransfer.getData("text/plain"));
    
        // Check if we're placing a new element or drawing an arrow
        if (data.fromZone === undefined) {
            // New element placement
            $scope.selectedZone = zone;
            $scope.createSVG();
        } else {
            // Arrow placement
            var toZone = zone;
            if (data && toZone) {
                $scope.drawArrow(data.fromZone, toZone, data.position);
            }
        }
    };
    
    function dragStart(event) {
        event.dataTransfer.setData("text/plain", JSON.stringify({
            fromZone: event.target.getAttribute('data-zone'),
            position: event.target.getAttribute('data-position')
        }));
    }
    
    document.addEventListener('dragover', function(event) {
        event.preventDefault();
    });
    
    document.addEventListener('drop', function(event) {
        event.preventDefault();
        var dropZoneElement = event.target.closest('.dropzone');
        if (dropZoneElement) {
            var zone = dropZoneElement.getAttribute('data-zone');
            angular.element(document.getElementById('controller')).scope().$apply(function(scope) {
                scope.onDrop(event, zone);
            });
        }
    });

    $scope.isTextUsed = function(text) {
        return $scope.usedTextOptions[text];
    };

    $scope.isZoneUsed = function(zone) {
        return $scope.usedZoneOptions[zone];
    };
});

function dragStart(event) {
    event.dataTransfer.setData("text/plain", JSON.stringify({
        fromZone: event.target.getAttribute('data-zone'),
        position: event.target.getAttribute('data-position')
    }));
}

document.addEventListener('dragover', function(event) {
    event.preventDefault();
});

document.addEventListener('drop', function(event) {
    event.preventDefault();
    var data = JSON.parse(event.dataTransfer.getData("text/plain"));
    var toZone = event.target.closest('.dropzone').getAttribute('data-zone');
    if (data && toZone) {
        angular.element(document.getElementById('controller')).scope().$apply(function(scope) {
            scope.drawArrow(data.fromZone, toZone, data.position);
        });
    }
});
