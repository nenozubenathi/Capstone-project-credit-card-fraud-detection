document.addEventListener('DOMContentLoaded', () => {
    const facts = [
        "Regular maintenance can extend your car's lifespan! Routine oil changes, tire rotations, and brake inspections keep your vehicle running smoothly and efficiently.",
        "Keeping your tires properly inflated improves fuel efficiency. Under-inflated tires can decrease your mileage by up to 3%, costing you more at the pump.",
        "Using the recommended fuel type can enhance performance. Check your owner’s manual for the optimal fuel grade to ensure your car runs at its best.",
        "A clean air filter can boost your car’s efficiency. Replacing a clogged air filter can improve acceleration and increase fuel economy by up to 10%.",
        "Driving habits matter! Gentle acceleration and braking, along with maintaining a steady speed, can significantly improve your vehicle's fuel efficiency."
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

// Simulating real-time traffic data
let currentUsage = 0;
let waterSaved = 0;
let leakDetected = false;
let points = 0;

// Chart initialization for traffic usage
let ctxUsage = document.getElementById('usageChart').getContext('2d');
let usageChart = new Chart(ctxUsage, {
    type: 'line',
    data: {
        labels: [], // Dynamic labels
        datasets: [{
            label: 'Traffic (people)',
            data: [],
            borderColor: '#00796b',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Usage (people)' } }
        }
    }
});

// Chart initialization for cost
let ctxCost = document.getElementById('costChart').getContext('2d');
let costChart = new Chart(ctxCost, {
    type: 'line',
    data: {
        labels: [], // Dynamic labels
        datasets: [{
            label: 'Cost (USD)',
            data: [],
            borderColor: '#f57f17',
            borderWidth: 2,
            fill: false
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Cost (USD)' } }
        }
    }
});

// Update traffic usage every second
function updateTraffic() {
    let currentTime = new Date().toLocaleTimeString();

    currentUsage += Math.random() * 10; // Simulate random traffic increase
    document.getElementById('current-usage').innerText = currentUsage.toFixed(2);

    let estimatedCost = (currentUsage * 0.02).toFixed(2); // Estimate cost
    document.getElementById('monthly-cost').innerText = estimatedCost;

    waterSaved += Math.random() * 5; // Simulate water saved
    document.getElementById('water-saved').innerText = waterSaved.toFixed(2);

    // Update usage chart
    usageChart.data.labels.push(currentTime);
    usageChart.data.datasets[0].data.push(currentUsage.toFixed(2));
    usageChart.update();

    // Update cost chart
    costChart.data.labels.push(currentTime);
    costChart.data.datasets[0].data.push(estimatedCost);
    costChart.update();

    // Simulate leak detection
    if (Math.random() > 0.95 && !leakDetected) {
        leakDetected = true;
        document.getElementById('fraud-alert').innerText = "Fraud detected!";
        document.getElementById('fraud-alert').style.color = "red";
    }

    updateRewards();
}

// Update rewards system
function updateRewards() {
    points += Math.floor(waterSaved / 10);
    document.getElementById('points-earned').innerText = points;
}

// Dark mode toggle
const toggle = document.getElementById('darkModeToggle');
if (toggle) {
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
} else {
    console.error('Dark mode toggle element not found.');
}

// Voice command functionality
if ('webkitSpeechRecognition' in window) {
    let recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        let command = event.results[0][0].transcript.toLowerCase();
        if (command.includes("traffic")) {
            alert("Here's your current traffic: " + currentUsage.toFixed(2) + " people");
        } else if (command.includes("savings tip")) {
            alert("Tip: " + tips[Math.floor(Math.random() * tips.length)]);
        }
    };

    recognition.onerror = (event) => {
        console.error(event);
    };

    document.body.addEventListener('dblclick', () => {
        recognition.start();
    });
}

// Geolocation-based insights
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude + 
                " Longitude: " + position.coords.longitude);
}

// Start updating traffic usage every second
setInterval(updateTraffic, 1000);

