document.addEventListener('DOMContentLoaded', () => {
  axios({
      method: 'GET',

     //url: 'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=948b1cb609c3a4f19c721b623cc07716',
      url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=948b1cb609c3a4f19c721b623cc07716',
  })
  .then(response => {
      const movies = response.data.results;
      const movieList = document.getElementById('movieList');

      movies.forEach(movie => {
          const title = movie.title;
          const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

          const movieElement = document.createElement('div');
          movieElement.classList.add('movie');
          movieElement.innerHTML = `<h2>${title}</h2><img src="${posterPath}" alt="${title}">`;

          movieList.appendChild(movieElement);
      });
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
}); 
