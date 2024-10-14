// Wait for the page to fully load before triggering the animation
document.addEventListener('DOMContentLoaded', () => {
    // Add the class that triggers the heading and tagline animation
    document.body.classList.add('show-heading');

    // Example of functionality you might add later
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            console.log(`${button.textContent} button clicked!`);
        });
    });
});
