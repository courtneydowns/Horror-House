const inpHorrorDatabase = document.getElementById("inp-horror-database");
const btnHorrorDatabase = document.getElementById("btn-horror-database");
const horrorDatabaseResults = document.getElementById(
  "horror-database-results"
);

btnHorrorDatabase.addEventListener("click", horrorMovieDatabase);
const paginationBtn = document.querySelector(".pagination");
paginationBtn.addEventListener("click", nextPage);

let currentHorrorMoviePage = 1;
function nextPage(e) {
  currentHorrorMoviePage++;
  horrorMovieDatabase(e);
}

function horrorMovieDatabase(e) {
  e.preventDefault();
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
        poster_path.src = `https://image.tmdb.org/t/p/original${result.poster_path}`;
        title.innerHTML = result.title;
        overview.innerHTML = result.overview;
        vote_average.innerHTML = `IMDB: ${result.vote_average}`;
        release_date.innerHTML = `Release Date: ${result.release_date}`;
        if (result.runtime) {
          runtime.innerHTML = `Runtime: ${result.runtime} minutes`;
        }

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
        cardImgTop.src = `https://image.tmdb.org/t/p/original${result.poster_path}`;
        cardText.innerText = result.overview;
        listGroupItemOne.innerText = `IMDB: ${result.vote_average}`;
        listGroupItemTwo.innerText = `Release Date: ${result.release_date}`;
        if (result.runtime) {
          listGroupItemThree.innerText = `Runtime: ${result.runtime} minutes`;
        }

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
