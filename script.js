// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections
    animateSections();

    // Start the clock
    updateTime();
    setInterval(updateTime, 1000);
});

// Animate sections on page load
function animateSections() {
    const sections = document.querySelectorAll('section');

    sections.forEach(function(section, index) {
        // Stagger the animations
        setTimeout(function() {
            section.classList.add('visible');
        }, index * 200);
    });
}

// Update the time in the footer
function updateTime() {
    const timeElement = document.getElementById('current-time');
    if (timeElement) {
        const now = new Date();
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        };
        timeElement.textContent = now.toLocaleTimeString('en-US', options);
    }
}
