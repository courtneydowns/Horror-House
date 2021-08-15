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

// btnHorrorDatabase.addEventListener("click", horrorMovieDatabase);
// const paginationBtn = document.querySelector(".pagination");
// paginationBtn.addEventListener("click", nextPage);

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
    let title = document.createElement("h4");
    let plot = document.createElement("h6");
    let valueZero = document.createElement("h6");
    let valueOne = document.createElement("h6");
    let valueTwo = document.createElement("h6");
    let year = document.createElement("h6");
    // let source = document.createElement("p");
    let rated = document.createElement("h6");
    let runtime = document.createElement("h6");
    let director = document.createElement("h6");
    let actors = document.createElement("h6");

    poster.src = movies.Poster;
    console.log(poster.src);
    title.innerHTML = movies.Title;
    plot.innerHTML = movies.Plot;
    valueZero.innerHTML = `IMDB: ${movies.Ratings[0].Value}`;
    valueOne.innerHTML = `Rotten Tomatoes ${movies.Ratings[1].Value}`;
    valueTwo.innerHTML = `Metacritic ${movies.Ratings[2].Value}`;
    year.innerHTML = `Year Released: ${movies.Year}`;
    rated.innerHTML = `Rating: ${movies.Rated}`;
    runtime.innerHTML = `Runtime: ${movies.Runtime}`;
    director.innerHTML = `Director: ${movies.Director}`;
    actors.innerHTML = `Actors: ${movies.Actors}`;
    // title.href = `https://imdb.com/title/${imdbID}`;

    // horrorTitleResults.appendChild(poster);
    // horrorTitleResults.appendChild(title);
    // horrorTitleResults.appendChild(valueZero);
    // horrorTitleResults.appendChild(valueOne);
    // horrorTitleResults.appendChild(valueTwo);
    // horrorTitleResults.appendChild(plot);
    // horrorTitleResults.appendChild(year);
    // horrorTitleResults.appendChild(rated);
    // horrorTitleResults.appendChild(runtime);
    // horrorTitleResults.appendChild(director);
    // horrorTitleResults.appendChild(actors);
    horrorTitleResults.style.cursor = "pointer";

    let card = document.createElement("div");
    card.setAttribute("class", "card bg-dark text-danger");

    let cardImgTop = document.createElement("img");
    cardImgTop.setAttribute("class", "card-img-top");
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    let cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    let list = document.createElement("ul");
    list.setAttribute("class", "list-group list-group-flush");
    let listGroupItemOne = document.createElement("li");
    listGroupItemOne.setAttribute("class", "list-group-item-one");
    let listGroupItemTwo = document.createElement("li");
    listGroupItemTwo.setAttribute("class", "list-group-item-two");
    let listGroupItemThree = document.createElement("li");
    listGroupItemThree.setAttribute("class", "list-group-item-three");
    let listGroupItemFour = document.createElement("li");
    listGroupItemFour.setAttribute("class", "list-group-item-four");
    let listGroupItemFive = document.createElement("li");
    listGroupItemFive.setAttribute("class", "list-group-item-five");
    let listGroupItemSix = document.createElement("li");
    listGroupItemSix.setAttribute("class", "list-group-item-six");
    let listGroupItemSeven = document.createElement("li");
    listGroupItemSeven.setAttribute("class", "list-group-item-seven");
    let listGroupItemEight = document.createElement("li");
    listGroupItemEight.setAttribute("class", "list-group-item-eight");

    cardTitle.innerText = movies.Title;
    cardImgTop.src = movies.Poster;
    cardText.innerText = movies.Plot;
    listGroupItemOne.innerText = `IMDB: ${movies.Ratings[0].Value}`;
    listGroupItemTwo.innerText = `Rotten Tomatoes ${movies.Ratings[1].Value}`;
    listGroupItemThree.innerText = `Metacritic ${movies.Ratings[2].Value}`;
    listGroupItemFour.innerText = `Year Released: ${movies.Year}`;
    listGroupItemFive.innerText = `Rating: ${movies.Rated}`;
    listGroupItemSix.innerText = `Runtime: ${movies.Runtime}`;
    listGroupItemSeven.innerText = `Director: ${movies.Director}`;
    listGroupItemEight.innerText = `Actors: ${movies.Actors}`;

    list.appendChild(listGroupItemOne);
    list.appendChild(listGroupItemTwo);
    list.appendChild(listGroupItemThree);
    list.appendChild(listGroupItemFour);
    list.appendChild(listGroupItemFive);
    list.appendChild(listGroupItemSix);
    list.appendChild(listGroupItemSeven);
    list.appendChild(listGroupItemEight);

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    card.appendChild(cardImgTop);
    card.appendChild(cardBody);
    card.appendChild(list);

    horrorTitleResults.appendChild(card);

    title.addEventListener("click", (movie) => {
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
  console.log(currentHorrorMoviePage);
  // const searchWordsDatabase = inpHorrorTitle.value.trim().replace(/\s/, "+");
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=f6c2597101b3b0f8d6fcff87b23eaea3&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=27&with_original_language=en&page=${currentHorrorMoviePage}`
  )
    .then((result) => result.json())
    .then((json) => {
      console.log(json);
      let htmlString = "";
      json.results.forEach((result) => {
        let movieItem = document.createElement("li");
        let poster_path = document.createElement("img");
        let title = document.createElement("h4");
        let overview = document.createElement("h6");
        let vote_average = document.createElement("h6");
        let release_date = document.createElement("h6");
        let runtime = document.createElement("h6");

        movieItem.className = "movieItem";
        poster_path.src = result.poster_path;
        title.innerHTML = result.title;
        overview.innerHTML = result.overview;
        vote_average.innerHTML = `IMDB: ${result.vote_average}`;
        release_date.innerHTML = `Release Date: ${result.release_date}`;
        runtime.innerHTML = `Runtime: ${result.runtime} minutes`;

        // movieItem.appendChild(title);
        // movieItem.appendChild(poster_path);
        // movieItem.appendChild(overview);
        // movieItem.appendChild(vote_average);
        // movieItem.appendChild(release_date);
        // movieItem.appendChild(runtime);
        movieItem.style.cursor = "pointer";

        let card = document.createElement("div");
        card.setAttribute("class", "card bg-dark text-danger");
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");
        let cardImgTop = document.createElement("img");
        cardImgTop.setAttribute("class", "card-img-top");
        let cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");
        let list = document.createElement("ul");
        list.setAttribute("class", "list-group list-group-flush");
        let cardText = document.createElement("p");
        cardText.setAttribute("class", "card-text");
        let listGroupItemOne = document.createElement("h6");
        listGroupItemOne.setAttribute("class", "list-group-item-one");
        let listGroupItemTwo = document.createElement("h6");
        listGroupItemTwo.setAttribute("class", "list-group-item-two");
        let listGroupItemThree = document.createElement("h6");
        listGroupItemThree.setAttribute("class", "list-group-item-three");

        cardTitle.innerText = result.title;
        cardImgTop.src = result.poster_path;
        cardText.innerText = result.overview;
        listGroupItemOne.innerText = `IMDB: ${result.vote_average}`;
        listGroupItemTwo.innerText = `Release Date: ${result.release_date}`;
        listGroupItemThree.innerText = `Runtime: ${result.runtime} minutes`;

        list.appendChild(listGroupItemOne);
        list.appendChild(listGroupItemTwo);
        list.appendChild(listGroupItemThree);

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);

        card.appendChild(cardImgTop);
        card.appendChild(cardBody);
        card.appendChild(list);

        movieItem.appendChild(card);

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
    });
}
