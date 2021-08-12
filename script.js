const horrorSearchForm = document.querySelector(".form");
const inpHorrorTitle = document.getElementById("inp-horror-title");
const btnHorrorTitle = document.getElementById("btn-horror-title");
const horrorTitleResults = document.getElementById("horror-title-results");
btnHorrorTitle.addEventListener("click", getHorrorMoviesByTitle);

const inpHorrorDatabase = document.getElementById("inp-horror-database");
const btnHorrorDatabase = document.getElementById("btn-horror-database");
const horrorDatabaseResults = document.getElementById(
  "horror-database-results"
);
btnHorrorDatabase.addEventListener("click", horrorMovieDatabase);
const nextBtn = document.querySelector("#next-button");
nextBtn.addEventListener("click", nextPage);

function getHorrorMoviesByTitle(e) {
  e.preventDefault();
  const searchWordsTitle = inpHorrorTitle.value.trim().replace(/\s/, "+");
  fetch(`http://www.omdbapi.com/?apikey=dde3f76d&t=${searchWordsTitle}`)
    .then((result) => result.json())
    .then((json) => displayFetch(json));
}

function displayFetch(movies) {
  while (horrorTitleResults.firstChild) {
    horrorTitleResults.removeChild(horrorTitleResults.firstChild);
  }
  genre = movies.Genre;
  console.log(movies);
  console.log(genre);
  if (genre.includes("Horror")) {
    let poster = document.createElement("img");
    let title = document.createElement("h1");
    let value = document.createElement("h4");
    let year = document.createElement("p");
    // let source = document.createElement("p");
    let rated = document.createElement("p");
    let runtime = document.createElement("p");
    let director = document.createElement("p");
    let actors = document.createElement("p");
    let plot = document.createElement("p");

    poster.src = movies.Poster;
    console.log(poster.src);
    title.innerText = movies.Title;
    value.innerText = movies.Ratings[0].Value;
    year.innerText = movies.Year;
    rated.innerText = movies.Rated;
    runtime.innerText = movies.Runtime;
    director.innerText = movies.Director;
    actors.innerText = movies.Actors;
    // title.href = `https://imdb.com/title/${imdbID}`;
    // source.innerText = movies.Ratings[0].Value;
    plot.innerText = movies.Plot;

    horrorTitleResults.appendChild(poster);
    horrorTitleResults.appendChild(title);
    horrorTitleResults.appendChild(value);
    horrorTitleResults.appendChild(year);
    horrorTitleResults.appendChild(rated);
    horrorTitleResults.appendChild(runtime);
    horrorTitleResults.appendChild(director);
    // horrorResults.appendChild(source);
    horrorTitleResults.appendChild(actors);
    horrorTitleResults.appendChild(plot);
    horrorTitleResults.style.cursor = "pointer";

    // horrorResults.setAttribute("class", "card");
    // card.setAttribute("class", "body")
    // body.setAttribute("class", "title")

    poster.addEventListener("click", (movie) => {
      fetch(
        `https://api.themoviedb.org/3/movie/${movies.imdbID}?api_key=f6c2597101b3b0f8d6fcff87b23eaea3&language=en-US`
      )
        .then((result) => result.json())
        .then((json) => {
          console.log(json);
          window.open(`https://www.imdb.com/title/${json.imdb_id}`);
        });
    });
  } else {
    alert("This is not a horror movie!");
  }
}

let currentHorrorMoviePage = 1;
function nextPage(e) {
  currentHorrorMoviePage++;
  horrorMovieDatabase(e);
}
function horrorMovieDatabase() {
  // const searchWordsDatabase = inpHorrorTitle.value.trim().replace(/\s/, "+");
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=f6c2597101b3b0f8d6fcff87b23eaea3&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_original_language=en&page=${currentHorrorMoviePage}`
  )
    .then((result) => result.json())
    .then((json) => {
      console.log(json);
      let htmlString = "";
      json.results.forEach((result) => {
        // htmlString += `<li>${result.title}</li>`
        let movieItem = document.createElement("li");
        let title = document.createElement("h1");
        let vote_average = document.createElement("h4");
        let overview = document.createElement("p");

        // movieItem.innerText = result.title;
        movieItem.className = "movieItem";
        title.innerText = result.title;
        vote_average.innerText = result.vote_average;
        overview.innerText = result.overview;

        movieItem.appendChild(title);
        movieItem.appendChild(vote_average);
        movieItem.appendChild(overview);
        movieItem.style.cursor = "pointer";

        movieItem.addEventListener("click", (movie) => {
          fetch(
            `https://api.themoviedb.org/3/movie/${result.id}?api_key=f6c2597101b3b0f8d6fcff87b23eaea3&language=en-US`
          )
            .then((result) => result.json())
            .then((json) => {
              console.log(json);
              window.location = `https://www.imdb.com/title/${json.imdb_id}`;
            });
        });
        fetch(
          `https://api.themoviedb.org/3/movie/${result.id}/images?api_key=f6c2597101b3b0f8d6fcff87b23eaea3&language=en-US`
        )
          .then((result) => result.json())
          .then((json) => {
            console.log(json);
          });
        horrorDatabaseResults.appendChild(movieItem);
      });
      // horrorResults.innerHTML = htmlString;
    });
}
