
    fetch("http://Localhost:3000/movies")
    .then(response => response.json())
        .then((movies) => {
            const html = movies.map((movie) => {
                return `
                    <article data-id="${movie.id}">
                    <h2>${movie.title}</h2>
                    <img src="${movie.poster}">
                    <p>${movie.director}</p>
                    </article>
                `
            }).join('')
            
            document.querySelector('#movies').innerHTML = html
    })
    .catch(error => console.error(error))