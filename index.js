const inpHorrorTitle = document.getElementById('inp-horror-title');
const btnHorrorTitle = document.getElementById('btn-horror-title');
const horrorResults = document.getElementById('horror-results');
btnHorrorTitle.addEventListener('click', getHorrorMoviesByTitle);

function getHorrorMoviesByTitle() {
    const searchWords = inpHorrorTitle.value.trim().replace(/\s/, '+');

    fetch(`http://www.omdbapi.com/?apikey=dde3f76&t=${searchWords}`)
    .then((result) => result.json())
    .then((json) => displayFetch(json));

    function displayFetch(movies) {

        genre = movies.Genre
        console.log(movies);
        console.log(genre);
        if(genre.includes("Horror")){
            let poster = document.createElement('img');
            let title = document.createElement('h1');
            let value = document.createElement('h4');
            let year = document.createElement('p');
            let rated = document.createElement('p');
            let runtime = document.createElement('p');
            let director = document.createElement('p');
            let plot = document.createElement('p')

            poster.src = movies.Poster;
            console.log(poster.src);
            title.innerText = movies.Title;
            value.innerTest = movies.Ratings[0].Value;
            plot.innerText = movies.Plot;
            director.innerText = movies.Director;
            year.innerText = movies.Year;
            rated.innerText = movies.Rated;
            runtime.innerText = movies.Runtime;

            horrorResults.appendChild(poster);
            horrorResults.appendChild(title);
            horrorResults.appendChild(value);
            horrorResults.appendChild(plot);
            horrorResults.appendChild(director);
            horrorResults.appendChild(year);
            horrorResults.appendChild(runtime);

            title.addEventListener('click', movie => {
                fetch(`https://api.themoviedb.org/3/movie/${movies.imdbID}?api_key=10290d885eaw485489931ec4bd8364b33&language=en-US`)
                .then((result) => result.json())
                .then((json) => {
                    console.log(json);
                    window.open(`https://www.imdb.com/${json.imdb_id}`)
                })
            })
        } else {
            alert("This is not a horror movie!")
        }
    };
}