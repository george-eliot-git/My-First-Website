// GitHub username - change this to your username
const GITHUB_USERNAME = 'george-eliot-git';

// Wait for the page to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to sections
    animateSections();

    // Start the clock
    updateTime();
    setInterval(updateTime, 1000);

    // Fetch and display GitHub repos
    fetchGitHubRepos();
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

// Fetch GitHub repositories and display them
async function fetchGitHubRepos() {
    const container = document.getElementById('projects-container');

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);

        if (!response.ok) {
            throw new Error('Failed to fetch repos');
        }

        const repos = await response.json();

        // Clear loading message
        container.innerHTML = '';

        if (repos.length === 0) {
            container.innerHTML = '<p>No public repositories found.</p>';
            return;
        }

        // Create a card for each repo
        repos.forEach(function(repo) {
            const card = document.createElement('div');
            card.className = 'project-card';

            const title = document.createElement('h3');
            const link = document.createElement('a');
            link.href = repo.html_url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = repo.name;
            title.appendChild(link);

            const description = document.createElement('p');
            description.textContent = repo.description || 'No description provided.';

            const meta = document.createElement('div');
            meta.className = 'repo-meta';

            if (repo.language) {
                const language = document.createElement('span');
                language.className = 'repo-language';
                language.textContent = repo.language;
                meta.appendChild(language);
            }

            const stars = document.createElement('span');
            stars.className = 'repo-stars';
            stars.textContent = repo.stargazers_count + ' stars';
            meta.appendChild(stars);

            card.appendChild(title);
            card.appendChild(description);
            card.appendChild(meta);

            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = '<p>Unable to load projects. Please try again later.</p>';
        console.error('Error fetching repos:', error);
    }
}
