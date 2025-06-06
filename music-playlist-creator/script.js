function playlistCards() {

    fetch('data/data.json')
    .then(response => response.json())
    .then(data=> {
    
        const mainPlaylists = data.playlists
        const cards = document.querySelector(".playlist_cards");
        cards.innerHTML='';

        if (!mainPlaylists || mainPlaylists.length === 0) {
            cards.innerHTML = `<p>The playlist is empty</p>`;
        }

        mainPlaylists.forEach((playlist) => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <div class="playlist">
                    <img src=${playlist.playlist_art} height="300px" width="300px">
                    <h4>${playlist.playlist_name}</h4>
                    <p1>By: ${playlist.playlist_author}</p1>
                    <p class="playlist"></p>
                    <button
                        onclick="clickLike(this)"
                        data-id=${playlist.playlistID}
                        data-liked=false>
                        &#128151(0)

                    </button>
                </div>
                `;
            
            cards.appendChild(card);

            });


            cardEventListener(mainPlaylists);
                
            })}


function cardEventListener(playlists){
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) =>{
        card.onclick = function(e) {
        //if (e.target.classList.contains('like-btn')) return;
            
            openModal(playlists[index]);
        };
    });
}

    
function openModal(playlist) {
        const modal = document.getElementById("modal-overlay");


        const modalContent = document.createElement('div');
        modal.classList.add('modal-content');

        modalContent.innerHTML = `
            <span class="close>&times;</span>
            <div class="modal-content">
                <div id="banner">
                    <div class="header">
                        <img src=${playlist.playlist_art} height="150px" width="200px"> 
                        <h2>${playlist.playlist_name}</h2>
                        <h3>by: ${playlist.playlist_author}</h3>
                        <button class="like-btn" data-id=${playlist.song_id} data-liked="false" onclick="clickLike(this)">&#128151 (0)</button>
                        <button id="shuffle-btn">Shuffle </button>
                    </div>
                    
                <div class="songs">
                    <div id = "songs_list">
                    ${playlist.songs.map(song => `
                        <div class="info">
                            <img src="${song.song_art}" height="200px" width="200px"
                            <p>Title: ${song.song_title}</p>
                            <p>Artist: ${song.song_artist}</p>
                            <p>Duration: ${song.song_duration}</p>
                        </div>
                        `).join('')}
                </div>
                `;
                    

            modal.appendChild(modalContent);

            modalContent.querySelector('.close').addEventListener('click', () => {
                modal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.add("hidden")
                    document.body.classList.remove('modal-open');
                }
            });
                
            const songs = playlist.songs;
            function shuffleSongs(array) {
                for (let i = array.length - 1; i > 0 ; i--) {
                    const j = Math.floor(Math.random() * (i+1));
                    [array[i], array[j]] = [array[j], array[i]]
                }
                return array;
            }
                    document.getElementById("shuffle-btn").addEventListener("click", () => {
                    const shuffledSongs = shuffleSongs(songs);
                    const songList = modal.querySelector("#songs_list");
                    songList.innerHTML = shuffledSongs.map(song => `
                        <div class = "info">
                            <img src="${song.song_art}" height="200px" width="200px">
                            <p>Title: ${song.song_title}</p>
                            <p>Artist: ${song.song_artist}</p>
                            <p>Duration: ${song.song_duration}</p>
                        </div>
                        `).join('');
                }); 
    

            
            
        }

let lastLikeId = 0;
function clickLike(button) {
const reviewId = button.getAttribute("data-id");
const isLiked = button.getAttribute("data-liked") === "true";
let likesCount = parseInt(button.textContent.match(/\d+/)[0], 10);

if (isLiked) {
    likesCount -= 1;
    button.textContent = `💗 (${likesCount})`;
    button.setAttribute("data-liked", "false");
} else {
    likesCount += 1;
    button.textContent =  `💗(${likesCount})`;
    button.setAttribute("data-liked", "true")
}
}




document.addEventListener('DOMContentLoaded', () => {
    playlistCards();
});