const apiKey = 'U7hmWAgUnyfmEnfiFCGd5MnGPHZbs0vSGIK9PhoQRjr8B3st'; // Your Currents API key
const newsContainer = document.getElementById('news-container');
const refreshBtn = document.getElementById('refresh-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
let selectedCategory = null; // No default category

// Function to fetch news based on category
function fetchNews(category) {
    let url = `https://api.currentsapi.services/v1/search?keywords=credit+card+fraud&language=en&apiKey=${apiKey}`;

    if (category === 'world') {
        // Worldwide news query
        url = `https://api.currentsapi.services/v1/search?keywords=credit+card+fraud&language=en&apiKey=${apiKey}`;
    } else if (category === 'country') {
        // Country-specific news query (e.g., South Africa)
        url = `https://api.currentsapi.services/v1/latest-news?country=za&keywords=credit+card+fraud&apiKey=${apiKey}`;
    } else if (category === 'local') {
        // Local news: using keywords for localization (e.g., South Africa)
        url = `https://api.currentsapi.services/v1/search?keywords=credit+card+fraud+south+africa&language=en&apiKey=${apiKey}`;
    }

    // Fetching the news
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.news && data.news.length > 0) {
                displayNews(data.news);
            } else {
                newsContainer.innerHTML = `<p>No news found for this category.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = `<p>Error loading news. Please try again later.</p>`;
        });
}

// Function to display news articles
function displayNews(articles) {
    newsContainer.innerHTML = ''; // Clear the container
    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
            <hr>
        `;
        newsContainer.appendChild(articleElement);
    });
}

// Event listeners for category buttons
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        selectedCategory = this.dataset.category;
        fetchNews(selectedCategory);
    });
});

// Event listener for refresh button
refreshBtn.addEventListener('click', function() {
    if (selectedCategory) {
        fetchNews(selectedCategory);
    } else {
        alert("Please select a category first!");
    }
});
