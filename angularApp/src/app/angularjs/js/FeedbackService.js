var app = angular.module("myApp");

app.factory('FeedbackService', function() {
    var feedbacks = {
        V1C1: [
            "Hint 1 für V1C1: Der Wert von 'a' wird zweimal gesetzt.",
            "Hint 2 für V1C1: Der letzte gesetzte Wert von 'a' ist entscheidend.",
            "Hint 3 für V1C1: Der Wert, der zuletzt gesetzt wird, wird ausgegeben."
        ],
        V3C1: [
            "Hint 1 für V3C1: Denken Sie an die Reihenfolge der Operationen.",
            "Hint 2 für V3C1: Überprüfen Sie, welche Variablen verwendet werden.",
            "Hint 3 für V3C1: Berücksichtigen Sie mögliche Überschreibungen."
        ],
        V5C1: [
            "Hint 1 für V5C1: Achten Sie auf Schleifen und Bedingungen.",
            "Hint 2 für V5C1: Überprüfen Sie die Endbedingungen der Schleifen.",
            "Hint 3 für V5C1: Beachten Sie, wie Variablen innerhalb der Schleifen verändert werden."
        ],
        F1C1: [
            "Hint 1 für F1C1: Achten Sie auf Schleifen und Bedingungen.",
            "Hint 2 für F1C1: Überprüfen Sie die Endbedingungen der Schleifen.",
            "Hint 3 für F1C1: Beachten Sie, wie Variablen innerhalb der Schleifen verändert werden."
        ],
        L1C1: [
            "Hint 1 für L1C1: Achten Sie auf Schleifen und Bedingungen.",
            "Hint 2 für L1C1: Überprüfen Sie die Endbedingungen der Schleifen.",
            "Hint 3 für L1C1: Beachten Sie, wie Variablen innerhalb der Schleifen verändert werden."
        ]
    };

    return {
        getFeedbacks: function(taskId) {
            return feedbacks[taskId] || [];
        }
    };
});
