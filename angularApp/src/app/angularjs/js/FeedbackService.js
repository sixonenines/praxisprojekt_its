var app = angular.module("myApp");
app.factory('FeedbackService', function($timeout) {
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
            { text: 'Return the results of the addition and subtraction as a tuple from the function. When calling the function, capture the returned values and print them in a single print statement. Tuples are returned in parentheses, and you can print multiple values separated by a comma.', highlight: null },
            { text: 'When calling the function, capture both returned values by assigning them to two variables, which can then be printed or used in further calculations.', highlight: null}
        ],
        F2C3: [
            { text: 'Start by defining a function that accepts three parameters. Use the def keyword and name your function something descriptive, such as find_largest.', highlight: null },
            { text: 'Inside the function, use conditional statements to compare the three numbers. You can use if-elif-else statements to determine which number is the largest. Remember to handle cases where two or more numbers might be equal.', highlight: null},
            { text: 'Ensure that your function returns the largest number found. You dont need to print anything inside the function; just return the value. When calling the function, print the returned value directly without any additional text.', highlight: null },
            { text: 'Return the largest number found using a single return statement without any additional text. This should be done after all comparisons are made.', Highlight: null}
        ],
        F5C2: [
            { text: 'Think about how to pass both the name and the salary to the show_employee function. You need to add an extra parameter in the function definition.', highlight: null },
            { text: 'In case the function is called without a salary value, it should use a default value. Consider using default parameter values in Python.', highlight: null},
            { text: 'Pay attention to how the arguments are passed in the function calls. Ensure that the order of the arguments in the calls matches the order in the function definition.', highlight: null },
            { text: 'If a default salary is intended for cases where the salary is not provided, set a default value for the salary parameter in the function definition. This way, the function can be called with just the name and still work correctly.'}
        ],
        L2C3: [
            { text: 'Use a loop to iterate through all the numbers from start to end, inclusive. The range function will be helpful here.', highlight: null },
            { text: 'Inside the loop, create a helper function to check if a number is prime. A number is prime if it is greater than 1 and has no divisors other than 1 and itself. You can check for divisors by looping from 2 up to the square root of the number (to optimize performance).', highlight: null},
            { text: 'If the number is determined to be prime, print it. Ensure that you print only the prime numbers without any additional text.', highlight: null },
            { text: 'Optimize the helper function by checking for divisors only up to the square root of the number, as any factor larger than the square root would have a corresponding factor smaller than the square root.', highlight: null}
        ],
        V1C3: [
            { text: 'You need a variable to keep track of the running total as you loop through the numbers from 1 to "end". Initialize this variable to 0 before the loop starts.', highlight: null },
            { text: 'Use a for loop to iterate through the range of numbers from 1 to "end", inclusive. The range function will be helpful here, but remember that it usually goes up to but does not include the stop value.', highlight: null},
            { text: 'Inside the loop, add each number to your sum variable. After the loop finishes, print the result. Make sure to print only the sum without any additional text.', highlight: null },
            { text: 'After the loop has completed, print the sum variable. Make sure to print only the sum without any additional text.', highlight: null}
        ],
        L3C1: [
            { text: 'Remember, conditions usually have a diamond shape and represent decisions, while processes are rectangles that show actions.', highlight: null },
            { text: "Remember to follow the logical flow of your code. Each step should naturally lead to the next. If you find a step that doesn't seem to fit, it might be in the wrong place.", highlight: null},
            { text: 'Take a closer look at your connections. Each node should logically connect to the next step in the process. If a connection seems out of place, consider where it should logically flow to maintain the correct sequence.', highlight: null }
        ]

    };

    var positiveFeedbacks = {
        V1C1: [
            { text: 'Spot on! You got the correct output of 20. The reason is that in python, variables can be reassigned. Initially "a" was set to 200, then immediately to 20, so the final value is what gets printed.' , highlight: null }
        ],
        V3C1: [
            { text: 'Well done! 101 is the correct answer. This is because, after initally setting "a" to 100, it is incremented by 1 in the next line with "a = a + 1", so the final value printed is 101.', highlight: null }
        ],
        V5C1: [
            { text: 'Excellent! You correctly identified the output as 20 20. Since "a" was initially set to 100 and then changed to 20, while "b" was set to 20 and stayed the same, the final output is 20 20.', highlight: null }         
        ], 
        F1C1: [
            { text: 'You got it! By defining the function my_func() in line 1, you created a reusable block of code that prints "Hello". Then, by calling my_func() in line 4, you executed this function, resulting in "Hello" being printed. Your solution effectively demonstrates the concept of function definition and invocation. Well done!', highlight: null }
        ],
        L1C1: [
            { text: 'Good job! "while" is the correct keyword to initiate a loop that continues as long the a specified condition "while i <6:" remains true.', highlight: null }
        ],
        F1C3: [
            { text: 'Fantastic job! You successfully created a program that defines a function to perform addition and subtraction on two arguments and returns both results in a single call. It shows that you have a solid understanding of defining a function and how to return multiple variables using data structures.', highlight: null }
        ],
        F2C3: [
            { text: 'Awesome! You successfully created a program that defines a function to find the largest number among three numbers, considering cases where two numbers are identical and larger than the third. Your function accepts three numbers and correctly returns the largest of them. ', highlight: null }
        ],
        F5C2: [
            { text: 'You correctly identified the error in the code and fixed it by adding a second parameter with a default value in the function definition. By adding the second parameter "salary=46000" in line 1 and setting it to the default value, you ensure that the function show_employee() works correctly even if the salary is not explicitly provided. This shows that you have a clear understanding of default parameters in function definitions.', highlight: null }
        ],
        L2C3: [
            { text: 'Great job! You have a solid understanding of both iteration and prime number concepts! Your code efficiently iterates through the range to determine which numbers are prime.', highlight: null }
        ],
        V1C3: [
            { text: 'Nice work! Your code fulfills all given requirements! Your implementation correctly adds each incremented value to the sum up to the end value. ', highlight: null }
        ],
        L3C1: [
            {text: 'Wow you seem to be in the "flow" right now! Way to go!'}
        ]

    };

    var reassuringFeedbacks = [
        "That's not quite it, but your effort level is off the charts!",
        "Not quite, but hey, Rome wasn't built in a day!",
        "Not quite the jackpot, but you're getting closer!",
        "Not quite right, but your effort deserves an A+!",
        "Not quite the bullseye, but you're definitely hitting the target!",
        "Not quite there, but your persistence is admirable!",
        "Don't be discouraged by setbacks. Use them as opportunities to learn and grow!",
        "Believe in yourself and your abilities. You've got this!",
        "You're doing better than you think. Keep going and you'll reach your goal!",
        "Learning is a journey, not a destination. Keep moving forward!",
        "Stay positive and keep pushing through challenges. You're making progress!",
        "Don't worry, mistakes are part of the learning process. Keep trying!",
        "You're getting closer with each attempt. Keep pushing forward!",
        "Learning something new takes time and effort. You're doing great!",
    ];
    
    var negativeFeedbacks = {
        V1C1: reassuringFeedbacks,
        V3C1: reassuringFeedbacks,
        V5C1: reassuringFeedbacks,
        F1C1: reassuringFeedbacks,
        L1C1: reassuringFeedbacks,
        F1C3: reassuringFeedbacks,
        F2C3: reassuringFeedbacks,
        F5C2: reassuringFeedbacks,
        L2C3: reassuringFeedbacks,
        V1C3: reassuringFeedbacks,
        L3C1: reassuringFeedbacks
    };

    // Sollte evtl. Feedback individueller, Implementierung bisher problematisch
    
    // var negativeFeedbacksForFC = {
    //     incorretNodeFeedback: [
    //         {text: "Hm, the shapes of the nodes seem off."}
    //     ],
    //     incorrectLinkDirection: [
    //         {text: "Are you sure the links are correctly placed?"}
    //     ],
    //     incorrectLinkText: [
    //         {text: "Check again for the truthiness or falseness of the conditions!"}
    //     ],
    //     missingElements: [
    //         {text: "Your flowchart looks good so far, but there still seems to be something missing..."}
    //     ],
    //     combinedFlowchartFeedback: [
    //         {text: "You're doing great, but there are some issues in your flowchart. Carefully revise the code and your adjust your flowchart. You can do it!"}
    //     ]
    // }
    
    // this.getNegativeFeedbacksForFC = function(feedbackFC) {
    //     return negativeFeedbacksForFC[feedbackFC] || [];
    // };

    this.getFeedbacks = function(taskId) {
        return feedbacks[taskId] || [];
    };

    this.getPositiveFeedbacks = function(taskId) {
        return positiveFeedbacks[taskId] || [];
    };

    this.getNegativeFeedbacks = function(taskId) {
        if (negativeFeedbacks[taskId]) {
            return [{
                text: reassuringFeedbacks[Math.floor(Math.random() * reassuringFeedbacks.length)]
            }];
        }
        return [];
    };

    

    

    // Sad/Happy Tutor 
    this.updatePythonTutorImage = function(feedbackType) {
        var imageElement = document.getElementById('python-tutor-img');
        if (feedbackType === 'positive') {
            imageElement.src = 'assets/happy_pythonTutor.png'; 
        } else if (feedbackType === 'negative') {
            imageElement.src = 'assets/sad_pythonTutor.png';
        }

        // Nach 5 Sek. wieder zu default Bild
        $timeout(function() {
            imageElement.src = 'assets/pythonTutor.png'; 
        }, 5000);
    };

    return this;
    
});
