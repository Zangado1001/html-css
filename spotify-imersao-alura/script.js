const searchInput = document.getElementById('search-input');
const resulsArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

function displayResults(result) {
    resultPlaylist.classList.add('hidden');

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = ''; 

    result.forEach(element => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        const cardImg = document.createElement('div');
        cardImg.classList.add('card-img');

        const artistImg = document.createElement('img');
        artistImg.classList.add('artist-img');
        artistImg.src = element.urlImg;

        const playIcon = document.createElement('div');
        playIcon.classList.add('play');
        playIcon.innerHTML = '<span class="fa fa-solid fa-play"></span>';

        const cardText = document.createElement('div');
        cardText.classList.add('card-text');

        const artistName = document.createElement('span');
        artistName.classList.add('artist-name');
        artistName.innerText = element.name;

        const artistCategory = document.createElement('span');
        artistCategory.classList.add('artist-categorie');
        artistCategory.innerText = 'Artista';

        cardImg.appendChild(artistImg);
        cardImg.appendChild(playIcon);
        cardText.appendChild(artistName);
        cardText.appendChild(artistCategory);
        artistCard.appendChild(cardImg);
        artistCard.appendChild(cardText);
        gridContainer.appendChild(artistCard);
    });

    resulsArtist.classList.remove('hidden');
}




document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
         resultPlaylist.classList.add('hidden');
         resulsArtist.classList.remove('hidden');
         return;
    }

    requestApi(searchTerm);
})