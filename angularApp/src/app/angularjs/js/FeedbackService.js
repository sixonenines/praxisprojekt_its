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
            { text: 'Start by defining a function named calculation that accepts two parameters, num1 and num2. Use the def keyword to define the function.', highlight: null },
            { text: 'Inside the function, perform both the addition and the subtraction. Store the results of these operations in separate variables. You need to calculate num1 + num2 and num1 - num2.', highlight: null},
            { text: 'Return the results of the addition and subtraction as a tuple from the function. When calling the function, capture the returned values and print them in a single print statement. Tuples are returned in parentheses, and you can print multiple values separated by a comma.', highlight: null }
        ],
        F2C3: [
            { text: 'Start by defining a function that accepts three parameters. Use the def keyword and name your function something descriptive, such as find_largest.', highlight: null },
            { text: 'Inside the function, use conditional statements to compare the three numbers. You can use if-elif-else statements to determine which number is the largest. Remember to handle cases where two or more numbers might be equal.', highlight: null},
            { text: 'Ensure that your function returns the largest number found. You dont need to print anything inside the function; just return the value. When calling the function, print the returned value directly without any additional text.', highlight: null }
        ],
        F5C2: [
            { text: 'Think about how to pass both the name and the salary to the show_employee function. You need to add an extra parameter in the function definition.', highlight: null },
            { text: 'In case the function is called without a salary value, it should use a default value. Consider using default parameter values in Python.', highlight: null},
            { text: 'Pay attention to how the arguments are passed in the function calls. Ensure that the order of the arguments in the calls matches the order in the function definition.', highlight: null }
        ],
        L2C3: [
            { text: 'Use a loop to iterate through all the numbers from start to end, inclusive. The range function will be helpful here.', highlight: null },
            { text: 'Inside the loop, create a helper function to check if a number is prime. A number is prime if it is greater than 1 and has no divisors other than 1 and itself. You can check for divisors by looping from 2 up to the square root of the number (to optimize performance).', highlight: null},
            { text: 'If the number is determined to be prime, print it. Ensure that you print only the prime numbers without any additional text.', highlight: null }
        ],
        V1C3: [
            { text: 'You need a variable to keep track of the running total as you loop through the numbers from 1 to "end". Initialize this variable to 0 before the loop starts.', highlight: null },
            { text: 'Use a for loop to iterate through the range of numbers from 1 to "end", inclusive. The range function will be helpful here, but remember that it usually goes up to but does not include the stop value.', highlight: null},
            { text: 'Inside the loop, add each number to your sum variable. After the loop finishes, print the result. Make sure to print only the sum without any additional text.', highlight: null }
        ]

    };

    this.getFeedbacks = function(taskId) {
        return feedbacks[taskId] || [];
    };

    return this;
});
