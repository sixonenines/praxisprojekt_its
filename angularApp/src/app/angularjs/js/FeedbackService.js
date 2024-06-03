var app = angular.module("myApp");

var app = angular.module("myApp");
app.factory('FeedbackService', function() {
    var feedbacks = {
        V1C1: [
            { text: "Hint 1 for V1C1: The value of 'a' is set twice.", highlight: null },
            { text: "Hint 2 for V1C1: The last assigned value of 'a' is crucial.", highlight: 2 },
            { text: "Hint 3 for V1C1: The value that is set last will be outputted.", highlight: null }
        ],
        V3C1: [
            { text: "Hint 1 for V3C1: Consider the sequence of operations.", highlight: null },
            { text: "Hint 2 for V3C1: Check which variables are being used.", highlight: 2 },
            { text: "Hint 3 for V3C1: Take possible overrides into account.", highlight: null }
        ],
        V5C1: [
            { text: "Hint 1 for V5C1: Pay attention to loops and conditions.", highlight: null },
            { text: "Hint 2 for V5C1: Verify the loop termination conditions.", highlight: 2 },
            { text: "Hint 3 for V5C1: Notice how variables are altered within the loops.", highlight: null }
        ], 
        F1C1: [
            { text: "Hint 1 for F1C1: Remember to call the function 'my_func' in line 4.", highlight: null },
            { text: "Hint 2 for F1C1: Create a function named 'my_func' in line 1.", highlight: null },
            { text: "Hint 3 for F1C1: Check if the arguments in the function 'my_func' are correct.", highlight: null }
        ],
        L1C1: [
            { text: "Hint 1 for L1C1: Ensure that the loop condition in line 2 is correct.", highlight: null },
            { text: "Hint 2 for L1C1: Don't forget to increment the counter correctly in line 4.", highlight: null},
            { text: "Hint 3 for L1C1:  Initialize the counter 'i' in line 1 with the correct value.", highlight: null }
        ],
        F1C3: [
            { text: "Hint 1 for F1C3: C", highlight: null },
            { text: "Hint 2 for F1C3: B", highlight: null},
            { text: "Hint 3 for F1C3:  A", highlight: null }
        ]

    };

    this.getFeedbacks = function(taskId) {
        return feedbacks[taskId] || [];
    };

    return this;
});
