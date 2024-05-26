var app = angular.module("myApp");

app.controller("dragDropController", function($scope) {
    // Funktion zum Ermöglichen des Ablegens in Dropzones
    $scope.allowDrop = function(event) {
        event.preventDefault();
    };

    // Funktion zum Durchführen des Ziehens
    $scope.drag = function(event) {
        event.dataTransfer.setData("text", event.target.id);
    };

    // Funktion zum Durchführen des Ablegens
    $scope.drop = function(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData("text");
        var draggableElement = document.getElementById(data);
        var dropzoneElement = event.target;

        // Überprüfen, ob das gezogene Element vorhanden ist und vollständig gerendert wurde
        if (!draggableElement || !draggableElement.offsetWidth) {
            console.error("Draggable element not found or not fully rendered:", draggableElement);
            return;
        }

        // Berechnen Sie die Mausposition relativ zum Dropzone-Element
        var rect = dropzoneElement.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        // Erstellen eines neuen foreignObject-Elements, um das gezogene Element zu enthalten
        var foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
        foreignObject.setAttribute("width", draggableElement.offsetWidth);
        foreignObject.setAttribute("height", draggableElement.offsetHeight);
        foreignObject.setAttribute("x", x - draggableElement.offsetWidth / 2);
        foreignObject.setAttribute("y", y - draggableElement.offsetHeight / 2);

        // Append the clone of the draggable element to the foreignObject
        var clonedElement = draggableElement.cloneNode(true);
        clonedElement.removeAttribute("id"); // Remove the id to prevent duplicate IDs
        foreignObject.appendChild(clonedElement);

        // Append the foreignObject to the dropzoneElement
        dropzoneElement.appendChild(foreignObject);
    };
});


// var app = angular.module("myApp");

// document.addEventListener('DOMContentLoaded', (event) => {
//   const dropzones = document.getElementsByTagName('path');

//   dropzones.forEach(zone => {
//       zone.addEventListener('dragover', handleDragOver);
//       zone.addEventListener('dragleave', handleDragLeave);
//       zone.addEventListener('drop', handleDrop);
//   });

//   document.addEventListener('dragstart', handleDragStart);
//   document.addEventListener('dragend', handleDragEnd);

//   // Neues draggable Element erstellen
//   const draggable = document.createElement("svg");
//   draggable.classList.add('source');
//   draggable.textContent = "Neues draggable Element";
//   draggable.draggable = true;
//   draggable.addEventListener('dragstart', onDragStart);

//   // Dem Dokument hinzufügen
//   document.body.appendChild(draggable);
// });

// function onDragStart(event) {
//   event.dataTransfer.setData("text/plain", event.target.innerHTML);
// }

// function handleDragStart(event) {
//   event.target.classList.add('dragging');
// }

// function handleDragEnd(event) {
//   event.target.classList.remove('dragging');
// }

// function handleDragOver(event) {
//   event.preventDefault();
//   event.target.classList.add('highlight');
// }

// function handleDragLeave(event) {
//   event.target.classList.remove('highlight');
// }

// function handleDrop(event) {
//   event.preventDefault();
//   event.target.classList.remove('highlight');
//   const data = event.dataTransfer.getData("text");
//   // Handle the dropped data with the controller
//   console.log(`Dropped data: ${data} in zone: ${event.target.id}`);
// }

// var app = angular.module('myApp');

// app.directive('draggable', function() {
//   return function(scope, element) {
//     // this gives us the native JS object
//     var el = element[0];
    
//     el.draggable = true;
    
//     el.addEventListener(
//       'dragstart',
//       function(e) {
//         e.dataTransfer.effectAllowed = 'move';
//         e.dataTransfer.setData('Text', this.id);
//         this.classList.add('drag');
//         return false;
//       },
//       false
//     );
    
//     el.addEventListener(
//       'dragend',
//       function(e) {
//         this.classList.remove('drag');
//         return false;
//       },
//       false
//     );
//   }
// });

// app.directive('droppable', function() {
//   return {
//     scope: {
//       drop: '&' // parent
//     },
//     link: function(scope, element) {
//       // again we need the native object
//       var el = element[0];
      
//       el.addEventListener(
//         'dragover',
//         function(e) {
//           e.dataTransfer.dropEffect = 'move';
//           // allows us to drop
//           if (e.preventDefault) e.preventDefault();
//           this.classList.add('over');
//           return false;
//         },
//         false
//       );
      
//       el.addEventListener(
//         'dragenter',
//         function(e) {
//           this.classList.add('over');
//           return false;
//         },
//         false
//       );
      
//       el.addEventListener(
//         'dragleave',
//         function(e) {
//           this.classList.remove('over');
//           return false;
//         },
//         false
//       );
      
//       el.addEventListener(
//         'drop',
//         function(e) {
//           // Stops some browsers from redirecting.
//           if (e.stopPropagation) e.stopPropagation();
          
//           this.classList.remove('over');
          
//           var item = document.getElementById(e.dataTransfer.getData('Text'));
//           this.appendChild(item);
          
//           // call the drop passed drop function
//           scope.$apply('drop()');
          
//           return false;
//         },
//         false
//       );
//     }
//   }
// });

// app.controller('dragDropController', function($scope) {
//   $scope.handleDrop = function() {
//     alert('Item has been dropped');
//   }
// });