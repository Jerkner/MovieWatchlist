let watchlist = [];
if (localStorage.getItem('watchlist')) {
  watchlist = JSON.parse(localStorage.getItem('watchlist'));
}

function getWatchlist() {
  if (watchlist.length > 0) {
    movieList.innerHTML = ''
    for (let i = 0; i < watchlist.length; i++) {
      const movie = watchlist[i];
      fetch(`http://www.omdbapi.com/?apikey=7cb4bb87&i=${movie}`)
        .then(response => response.json())
        .then(data => {
          renderWatchlist(data);
        });
    }
  } else {
    movieList.innerHTML = `
      <div id="beforeAdd">
        <h3 class="empty">Your watchlist is looking a little empty...</h3>
        <a class="iconAndAdd" href="index.html">
          <img class="addIcon2" src="images/icon4.jpg">
          <h4 class="letsAdd">Let’s add some movies!</h4>
        </a>
      </div>`;
  }
}

function renderWatchlist(data) {
  movieList.innerHTML += `
    <div class="divider"></div>
    <div class="movieResult">
      <img class="movieResultImg" src="${data.Poster}" alt="Poster for ${data.Title}">
      <div class="movieResultData">
        <div class="movieTitleAndRating">
          ${data.Title}<img class="star" src="images/icon3.png">
          <span class="rating">${data.imdbRating}</span>
        </div>
        <div class="movieInfo">
          <div class="movieMisc">${data.Runtime}<span>${data.Genre}</span>
            <div class="add" data-remove="${data.imdbID}">
              <img class="removeIcon" src="images/icon5.jpg" data-remove="${data.imdbID}">
              <p class="watchlistText" data-remove="${data.imdbID}">Remove</p>
            </div>
          </div>
          <p class="moviePlot">${data.Plot}</p>
        </div>
      </div>
    </div>`;
}

document.addEventListener('click', function(e){
  if (e.target.dataset.remove) {
    removeFromWatchlist(e.target.dataset.remove);
  }
});

function removeFromWatchlist(removeId) {
  watchlist = watchlist.filter(item => item !== removeId);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  console.log(watchlist);
  getWatchlist();
}

getWatchlist();
