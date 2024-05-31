document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value;
    searchMovie(searchInput);
});

function searchMovie(query) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your MovieDB API key
    const url = `https://api.themoviedb.org/3/search/movie?api_key=948b1cb609c3a4f19c721b623cc07716&query=${query}`;

    axios.get(url)
        .then(response => {
            displayResults(response.data.results);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = 'No results found.';
        return;
    }

    const ul = document.createElement('ul');
    results.forEach(movie => {
        const li = document.createElement('li');

        const title = document.createElement('h2');
        title.textContent = movie.title;

        const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'path/to/default-image.jpg'; // Replace with a path to a default image if desired

        const poster = document.createElement('img');
        poster.src = posterPath;
        poster.alt = movie.title;

        li.appendChild(title);
        li.appendChild(poster);
        ul.appendChild(li);
    });

    resultsContainer.appendChild(ul);
}
