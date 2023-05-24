const searchBtn = document.getElementById("searchBtn");
const movieList = document.getElementById("movieList");
const searchField = document.getElementById("searchField");
let watchlist = []

if (localStorage.getItem("watchlist")) {
    watchlist = JSON.parse(localStorage.getItem("watchlist"));
  }

searchBtn.addEventListener("click", async function() {
if (searchField.value) {
    let watchlist = []
    movieList.innerHTML = '';
    const res = await fetch(`https://www.omdbapi.com/?apikey=7cb4bb87&s=${searchField.value}`);
    const data = await res.json();
    
    data.Search.forEach(movie => {
        watchlist.unshift(movie.imdbID);
    });
    
    for (let i = 0; i < watchlist.length; i++) {
        const movie = watchlist[i];
        
        fetch(`httsp://www.omdbapi.com/?apikey=7cb4bb87&i=${movie}`)
            .then(response => response.json())
            .then(data => {
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
                                <div class="add" data-add="${data.imdbID}">
                                    <img class="addIcon" src="images/icon4.jpg" data-add="${data.imdbID}">
                                    <p class="watchlistText" data-add="${data.imdbID}">Watchlist</p>
                                </div>
                            </div>
                            <p class="moviePlot">${data.Plot}</p>
                        </div>
                    </div>
                </div>`;
            });
    }
} else {
    alert("Please enter something in the search field!")
}
});

function addToWatchlist(addId) {
    if (watchlist.includes(addId)) {
        alert("This movie is already added to your watchlist!")
    } else {
        watchlist.unshift(addId)
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        console.log(watchlist);
    }
}
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("searchBtn").click();
    }
  });

document.addEventListener('click', function(e){
    if (e.target.dataset.add){addToWatchlist(e.target.dataset.add)}
})