
//   axios({
//       method: 'GET',
//       // hard code jack string search
//     // url: 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=948b1cb609c3a4f19c721b623cc07716',
//       url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=948b1cb609c3a4f19c721b623cc07716',
//   })
//   .then(response => {
//       const movies = response.data.results;
//       console.log(response);
//       const movieList = document.getElementById('movieList');

//       movies.forEach(movie => {
//           const title = movie.title;
//           const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

//           const movieElement = document.createElement('div');
//           movieElement.classList.add('movie');
//           movieElement.innerHTML = `<h2>${title}</h2><img src="${posterPath}" alt="${title}">`;

//           movieList.appendChild(movieElement);
//       });
//   })
//   .catch(error => {
//       console.error('Error fetching data:', error);
//   });
// });
// code for search 







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
        console.log()
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
      li.textContent = movie.title;
      ul.appendChild(li);
    });
  
    resultsContainer.appendChild(ul);
  }
  

axios({
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=948b1cb609c3a4f19c721b623cc07716',
})
.then(response => {
  const movies = response.data.results;
  console.log(response);
  const movieList = document.getElementById('movieList');
  const movieDetails = document.getElementById('movieDetails'); // Make sure you have an element with this ID in your HTML

  movies.forEach(movie => {
      const title = movie.title;
      const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
      movieElement.innerHTML = `<h2 class="movie-title" data-id="${movie.id}">${title}</h2><img src="${posterPath}" alt="${title}">`;

      movieList.appendChild(movieElement);
  });

  // Add click event listeners to movie titles
  const movieTitles = document.querySelectorAll('.movie-title');
  movieTitles.forEach(title => {
      title.addEventListener('click', (event) => {
          const movieId = event.target.getAttribute('data-id');
          fetchMovieDetails(movieId);
      });
  });

  function fetchMovieDetails(movieId) {
      axios({
          method: 'GET',
          url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=948b1cb609c3a4f19c721b623cc07716`,
      })
      .then(response => {
          const movie = response.data;
          console.log(movie);

          movieDetails.innerHTML = `
              <h2>${movie.title}</h2>
              <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
              <p>${movie.overview}</p>
              <p>Release Date: ${movie.release_date}</p>
              <p>Rating: ${movie.vote_average}</p>
          `;
      })
      .catch(error => {
          console.error('Error fetching movie details:', error);
      });
  }
})
.catch(error => {
  console.error('Error fetching data:', error);
});
