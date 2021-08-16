const horrorSearchForm = document.querySelector(".form");
const inpHorrorTitle = document.getElementById("inp-horror-title");
const btnHorrorTitle = document.getElementById("btn-horror-title");
const horrorTitleResults = document.getElementById("horror-title-results");
btnHorrorTitle.addEventListener("click", getHorrorMoviesByTitle);

function getHorrorMoviesByTitle(e) {
  e.preventDefault();
  const searchWordsTitle = inpHorrorTitle.value.trim().replace(/\s/, "+");
  fetch(
    `http://www.omdbapi.com/?apikey=dde3f76d&t=${searchWordsTitle}&plot=full`
  )
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
    let imdbRating = document.createElement("h6");
    let rottenTomatoesRating = document.createElement("h6");
    let metacriticRating = document.createElement("h6");
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
    if (movies.Ratings[0].Value) {
      imdbRating.innerHTML = `IMDB: ${movies.Ratings[0].Value}`;
    }
    if (movies.Ratings[1].Value) {
      rottenTomatoesRating.innerHTML = `Rotten Tomatoes: ${movies.Ratings[1].Value}`;
    }
    if (movies.Ratings[2]) {
      metacriticRating.innerHTML = `Metacritic: ${movies.Ratings[2].Value}`;
    }
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
    card.setAttribute("class", "card bg-dark text-danger text-center");
    card.setAttribute("style", "width:25rem; height:75rem; margin: 0 auto;");

    let cardImgTop = document.createElement("img");
    cardImgTop.setAttribute("class", "card-img-top");
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    let cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.setAttribute("style", "font-size:30px;");
    let cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.setAttribute("style", "font-size:16px; padding-top: 1rem;");
    let list = document.createElement("ul");
    list.setAttribute("class", "list-group list-group-flush");
    list.setAttribute(
      "style",
      "list-style:none; font-size:16px; padding-bottom:2.5rem;"
    );
    let listGroupItemOne = document.createElement("li");
    listGroupItemOne.setAttribute("class", "list-group-item-one");
    // listGroupItemOne.setAttribute("style", "font-weight:bold;");
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
    if (movies.Ratings[0].Value) {
      listGroupItemOne.innerText = `IMDB: ${movies.Ratings[0].Value}`;
      if (movies.Ratings[1].Value) {
        listGroupItemTwo.innerText = `Rotten Tomatoes: ${movies.Ratings[1].Value}`;
        if (movies.Ratings[2]) {
          listGroupItemThree.innerText = `Metacritic ${movies.Ratings[2].Value}`;
        }
        // listGroupItemThree.innerText = `Metacritic ${movies.Ratings[2].Value}`;
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
  }
}
