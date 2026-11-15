// Answer Key definition
const correctAnswers = {
    q1: "markup",
    q2: "web",
    q3: "B",
    q4: "C",
    q5: "C",
    q6: ["Flexbox", "Grid", "Float"],
    q7: "C",
    q8: "A",
    q9: "A",
    q10: "C"
};

let timeLeft = 600;
let timerInterval = setInterval(updateTimer, 1000);
let startTime = Date.now();

function updateTimer() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById('timer').textContent =
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    if (timeLeft <= 0) {
        clearInterval(timerInterval);
        alert("Time is up! Submitting your quiz automatically.");
        submitQuiz();
        return;
    }
    timeLeft--;
}

function submitQuiz() {
    clearInterval(timerInterval);
    let score = 0;
    let totalQuestions = 10;
    let breakdownHtml = "<h3>Detailed Question Breakdown:</h3><ul>";

    function addResultRow(label, answerText, isCorrect, expectedText) {
        breakdownHtml += `<li>${label}: Your answer "${answerText}" - <span class="${isCorrect ? 'badge-correct' : 'badge-incorrect'}">${isCorrect ? 'Correct' : 'Incorrect'}</span> ${expectedText}</li>`;
    }

    let q1Val = document.querySelector('input[name="q1"]').value.trim().toLowerCase();
    let q1Correct = q1Val === correctAnswers.q1;
    if (q1Correct) score++;
    addResultRow('Q1', q1Val || 'None', q1Correct, '(Expected: markup)');

    let q2Val = document.querySelector('input[name="q2"]').value.trim().toLowerCase();
    let q2Correct = q2Val === correctAnswers.q2;
    if (q2Correct) score++;
    addResultRow('Q2', q2Val || 'None', q2Correct, '(Expected: web)');

    const radioKeys = ['q3', 'q4', 'q5', 'q7', 'q8', 'q9', 'q10'];
    radioKeys.forEach(q => {
        let selected = document.querySelector(`input[name="${q}"]:checked`);
        let val = selected ? selected.value : 'None';
        let isCorrect = val === correctAnswers[q];
        if (isCorrect) score++;
        addResultRow(q.toUpperCase(), val, isCorrect, `(Correct: ${correctAnswers[q]})`);
    });

    let checkedBoxes = Array.from(document.querySelectorAll('input[name="q6"]:checked')).map(cb => cb.value);
    let q6Correct = arraysEqual([...checkedBoxes].sort(), [...correctAnswers.q6].sort());
    if (q6Correct) score++;
    addResultRow('Q6', `[${checkedBoxes.join(', ') || 'None'}]`, q6Correct, '(Correct: Flexbox, Grid, Float)');

    breakdownHtml += "</ul>";

    let percentage = (score / totalQuestions) * 100;
    let passed = percentage >= 70;
    let elapsedTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
    let minutesSpent = Math.floor(elapsedTimeSeconds / 60);
    let secondsSpent = elapsedTimeSeconds % 60;

    document.getElementById('final-score').textContent = score;
    document.getElementById('final-percentage').textContent = percentage;
    document.getElementById('time-spent').textContent = `${minutesSpent}m ${secondsSpent}s`;

    let statusBox = document.getElementById('overall-status');
    statusBox.textContent = passed ? "OVERALL RESULT: PASS" : "OVERALL RESULT: FAIL";
    statusBox.className = passed ? "status-box status-pass" : "status-box status-fail";

    document.getElementById('question-breakdown').innerHTML = breakdownHtml;
    document.getElementById('results-dashboard').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function resetQuiz() {
    document.getElementById('quiz-form').reset();
    document.getElementById('results-dashboard').classList.add('hidden');
    clearInterval(timerInterval);
    timeLeft = 600;
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
