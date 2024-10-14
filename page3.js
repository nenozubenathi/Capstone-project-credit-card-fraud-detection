document.addEventListener('DOMContentLoaded', () => {
    const facts = [
        "Over 47% of all credit card fraud occurs online.",
        "In 2022, credit card fraud losses exceeded $40 billion globally.",
        "Skimming devices can capture your card information without you knowing.",
        "Identity theft through credit card fraud can impact your credit score for years.",
        "Regularly updating your passwords can significantly reduce your risk of fraud."
    
    ];

    let currentFactIndex = 0;
    const factTextElement = document.getElementById('did-you-know-fact');
    const thoughtBubble = document.getElementById('thought-bubble');

    // Function to show the next fact
    function showNextFact() {
        if (!factTextElement) {
            console.error('Did you know fact element not found.');
            return;
        }

        factTextElement.style.opacity = 0; // Fade out the current fact
        setTimeout(() => {
            factTextElement.textContent = facts[currentFactIndex];
            factTextElement.style.opacity = 1; // Fade in the new fact
            currentFactIndex = (currentFactIndex + 1) % facts.length; // Move to the next fact
        }, 500); // Fade transition duration
    }

    // Event listener for clicking on the thought bubble
    if (thoughtBubble) {
        thoughtBubble.addEventListener('click', () => {
            showNextFact();
        });
    } else {
        console.error('Thought bubble element not found.');
    }

    // Show the first fact immediately
    showNextFact();
});

// Arrays of tips for each category
const avoidFraudTips = [
    "Use strong, unique passwords for your accounts.",
    "Enable two-factor authentication on your financial accounts.",
    "Be cautious about sharing your credit card details online.",
    "Monitor your bank statements regularly for unauthorized charges.",
    "Avoid storing your credit card information on websites or apps."
];

const detectFraudTips = [
    "Watch for unexpected charges or withdrawals on your bank statements.",
    "Set up transaction alerts to notify you of purchases over a set amount.",
    "Use secure payment methods like virtual credit cards or mobile wallets.",
    "Be wary of phishing emails asking for your credit card details.",
    "Monitor your credit report regularly for suspicious activity."
];

const afterFraudSteps = [
    "Immediately contact your bank or card issuer to report the fraud.",
    "Freeze or cancel your credit card to prevent further unauthorized transactions.",
    "Review your recent transactions and dispute any fraudulent charges.",
    "Change your account passwords and enable two-factor authentication.",
    "Monitor your credit report and bank statements for further suspicious activity."
];

// Function to display tips
function displayTips() {
    document.getElementById('avoid-fraud-tip').textContent = avoidFraudTips[0];
    document.getElementById('detect-fraud-tip').textContent = detectFraudTips[0];
    document.getElementById('after-fraud-tip').textContent = afterFraudSteps[0];
}

// Function to shuffle tips (Unnecessary here, unless used elsewhere)
function shuffleTips() {
    const categories = ['avoidFraudTips', 'detectFraudTips', 'afterFraudSteps'];
    
    categories.forEach(category => {
        const tipId = `${category.replace('Tips', '')}-tip`;
        const shuffledTips = shuffleArray(eval(category));
        document.getElementById(tipId).textContent = shuffledTips[0];
    });
}

// Shuffle function
function shuffleArray(array) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// Function to show more advice in a modal
function showMore(category) {
    let additionalTips = [];
    let title = '';

    if (category === 'avoidFraud') {
        additionalTips = avoidFraudTips;
        title = "More Tips on Avoiding Credit Card Fraud";
    } else if (category === 'detectFraud') {
        additionalTips = detectFraudTips;
        title = "More Tips on Detecting Credit Card Fraud";
    } else if (category === 'afterFraud') {
        additionalTips = afterFraudSteps;
        title = "More Tips on Steps After Credit Card Fraud";
    }

    const modalTitle = document.getElementById('modal-title');
    const modalList = document.getElementById('modal-advice-list');
    const modal = document.getElementById('more-advice-modal');
    const closeBtn = document.querySelector('.modal .close-btn');

    if (modalTitle && modalList) {
        modalTitle.textContent = title;
        modalList.innerHTML = additionalTips.map(tip => `<li>${tip}</li>`).join('');
    } else {
        console.error('Modal elements not found.');
    }

    if (modal) {
        modal.style.display = 'block';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    } else {
        console.error('Close button not found.');
    }
}

// Initialize the display of tips and set up the modal
document.addEventListener('DOMContentLoaded', () => {
    displayTips();
    // Ensure the random facts are not updated here
});
