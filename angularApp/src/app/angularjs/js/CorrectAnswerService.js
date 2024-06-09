var app = angular.module("myApp");

app.factory('CorrectAnswerService', function() {
    var correctAnswers = {
        'V1C1': "20",
        'V3C1': "101",
        'V5C1': "20 20",
        'F1C1_1': "def my_func():",
        'F1C1_2': "my_func()",
        'L1C1' : "while",
        'F1C3' : "155",
        'F2C3' : "15",
        'F5C2' : "Name:EmmaSalary:55000Name:BenSalary:46000",
        'L2C3' : "235711131719",
        'V1C3' : "11", 
        'L3C1_1' : "arrow_down",
        'L3C1_2' : "process : i = 1",
        'L3C1_3' : "arrow_down",
        'L3C1_4' : "process : while i < 6:",
        'L3C1_5' : "arrow_down",
        'L3C1_6.1' : "",
        'L3C1_6.2' : "decision : if i == 3",
        'L3C1_6.3' :"",
        'L3C1_7.1' : "",
        'L3C1_7.2' : "arrow_down",
        'L3C1_8.1' : "",
        'L3C1_8.2' : "process : i += 1"
    };

    return {
        checkAnswer: function(taskId, userAnswer) {
            console.log( userAnswer == correctAnswers[taskId]);
            return userAnswer == correctAnswers[taskId];
        }
    };
});