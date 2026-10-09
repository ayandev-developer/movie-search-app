const movie = document.querySelector("#movie");
const button = document.querySelector("#btn");
const loading = document.querySelector("#loading");
const movieContainer = document.querySelector(".movie-container");
const message = document.querySelector("#message");
async function searchMovies(movieName) {
    if (movieName.trim() === "") {
        message.textContent = "Please Enter a Movie Name";
        return;
    }
    loading.textContent = "Loading...";
    movieContainer.innerHTML = "";
    message.textContent = "";
    try {

        const searchQuery = encodeURIComponent(movieName);
        const url = `https://www.omdbapi.com/?apikey=445e6474&s=${searchQuery}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (data.Response === "False") {
            message.textContent = "Movie not found";

            return;
        }
        data.Search.forEach((movie) => {
            const card = document.createElement("div");
            card.classList.add("movie-card");
            let poster;

            if (!movie.Poster || movie.Poster === "N/A") {
                poster = `<div class="no-poster">No Poster Available</div>`;
            } else {
                poster = `<img src="${movie.Poster}" alt="${movie.Title}">`;
            }
            card.innerHTML = `
${poster}
    <div class="movie-info">
        <h2>${movie.Title}</h2>
        <p>Year: ${movie.Year}</p>
        <p>Type: ${movie.Type}</p>
    </div>
`;

            movieContainer.appendChild(card);

        });
        movie.value = "";
    }
    catch (error) {

        message.textContent = "Something went wrong";
    }
    finally {
        loading.textContent = "";
    }
}
button.addEventListener("click", () => {
    searchMovies(movie.value);
});
movie.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchMovies(movie.value)
    }
});