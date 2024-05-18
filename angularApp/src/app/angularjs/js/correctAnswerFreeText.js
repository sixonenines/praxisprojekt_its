var correctAnswerFreeText = {
    checkAnswer: function(taskId, userAnswer) {
        var correctAnswer = "";
        switch(taskId) {
            case 'V1C1':
                correctAnswer = "20";
                break;
            case 'V3C1':
                correctAnswer = "101";
                break;
            case 'V5C1':
                correctAnswer = "20 20";
                break;
            // Weitere Aufgaben können hier hinzugefügt werden, wahrscheinlich eher Gap-Aufgaben
            default:
                correctAnswer = "";
        }
        return userAnswer === correctAnswer;
    }
};

// Exportiert das correctAnswerFreeText-Objekt für den Zugriff in anderen Dateien
window.correctAnswerFreeText = correctAnswerFreeText;
