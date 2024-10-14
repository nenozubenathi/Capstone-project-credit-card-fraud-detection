// Function to evaluate the fraud self-assessment form
function submitFraudForm() {
    let score = 0;
    let totalQuestions = 10; // There are 10 questions in the form
    let formResult = document.getElementById("formResult");
    let resultHtml = "<h2>Your Assessment Results:</h2>";

    // Questions and correct answers: The 'yes' answers indicate higher risk
    let questions = {
        q1: "yes",  // Unfamiliar transactions indicate fraud risk
        q2: "yes",  // Suspicious emails or phone calls raise fraud concern
        q3: "no",   // Sharing banking details is risky
        q4: "yes",  // Unusual login attempts could indicate fraud
        q5: "yes",  // Temporary blocks for suspicious activity are warning signs
        q6: "yes",  // Losing important documents increases fraud risk
        q7: "yes",  // Unexpected withdrawals or transfers are major red flags
        q8: "no",   // Using public Wi-Fi for banking increases risk
        q9: "yes",  // Fake contacts from "banks" asking for info are suspicious
        q10: "no"   // Sharing PINs/passwords with third-parties is risky
    };

    // Iterate through each question to check user answers
    for (let question in questions) {
        let userAnswer = document.querySelector(`input[name="${question}"]:checked`);

        if (userAnswer && userAnswer.value === questions[question]) {
            score++;
        }
    }

    // Calculate the percentage of correct (risky) answers
    let percentage = (score / totalQuestions) * 100;

    // Display the score and percentage
    resultHtml += `<h3>Your Score: ${score} out of ${totalQuestions}</h3>`;
    resultHtml += `<h3>Percentage: ${percentage.toFixed(2)}%</h3>`;

    // Fraud suspicion evaluation logic based on responses
    if (percentage >= 80) {
        resultHtml += `<h3 style="color:red;">Urgent: There is a high likelihood of fraud based on your responses. Please contact your bank immediately!</h3>`;
    } else if (percentage >= 50 && percentage < 80) {
        resultHtml += `<h3 style="color:orange;">Warning: You may be at risk of fraud. Monitor your accounts closely and take precautions.</h3>`;
    } else {
        resultHtml += `<h3 style="color:green;">Low Risk: There is a low likelihood of fraud based on your responses. Stay vigilant and cautious.</h3>`;
    }

    // Update the result div with the results
    formResult.innerHTML = resultHtml;
}
