var app = angular.module("myApp");

app.factory('CorrectAnswerService', function() {
    var correctAnswers = {
        'V1C1': "20",
        'V3C1': "101",
        'V5C1': "20 20",
        'F1C1_1': "def my_func():",
        'F1C1_2': "my_func()",
        'L1C1' : "while"
    };

    return {
        checkAnswer: function(taskId, userAnswer) {
            return userAnswer === correctAnswers[taskId];
        }
    };
});