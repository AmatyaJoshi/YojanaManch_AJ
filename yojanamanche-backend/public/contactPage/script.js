function toggleAnswer(id) {
    var answer = document.getElementById('answer' + id);
    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
    } else {
        // Hide all answers
        var answers = document.querySelectorAll('.answer');
        answers.forEach(function(ans) {
            ans.classList.remove('active');
        });
        // Show the selected answer
        answer.classList.add('active');
    }
}