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
                    <p>By: ${playlist.playlist_author}</p>
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
        modal.innerHTML = '';


        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        modalContent.innerHTML = `
            <span class="close>&times;</span>
                <div id="modal_banner">
                    <div class="header">
                        <img src="${playlist.playlist_art}" height="150px" width="200px"> 
                        <h2>${playlist.playlist_name}</h2>
                        <h3>by: ${playlist.playlist_author}</h3>
                        <button class="like-btn" data-id=${playlist.song_id} data-liked="false" onclick="clickLike(this)">&#128151 (0)</button>
                        <button id="shuffle-btn">Shuffle </button>
                    </div>
                    
                    <div class="songs">
                        <div id = "songs_list">
                            ${playlist.songs.map(song => `
                                <div class="info">
                                    <img src="${song.song_art}" height="200px" width="200px">
                                    <p>Title: ${song.song_title}</p>
                                    <p>Artist: ${song.song_artist}</p>
                                    <p>Duration: ${song.song_duration}</p>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
                    

            modal.appendChild(modalContent);
            modal.classList.add('show');
            document.body.classList.add('modal-open');

            document.getElementById("banner").style.filter = 'blur(10px)';
            document.getElementById("bottom").style.filter = 'blur(10px)';

            modalContent.querySelector('.close').addEventListener('click', () => {
                closeModal();
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
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
function newPlaylist(){
    document.getElementById("add-song").addEventListener("click", () => {
        const songs_container = document.getElementById("songs_container");
        const song = document.createElement("div");
        song.classList.add("song");
        song.innerHTML= `
            label>Title: <input type="text" id="song_title" required></label>
            <label>Artist : <input type="text" id="artist_name" required></label>
            <label>Duration: <input type="text" id="duration" required></label>
        `;
        songs_container.appendChild(song);
    });
};

    document.getElementById("newPlaylist").addEventListener("submit", (e) => {
        e.preventDefault();

    const name = document.getElementById("playlist-name").value;
    const author = document.getElementById("playlist-author").value;
    const art = document.getElementById("playlist-art").value;

    const songs = [];
    document.querySelectorAll(".song-input").forEach(input => {
    songs.push({
        song_title: input.querySelector(".song-title").value,
        song_artist: input.querySelector(".song-artist").value,
        song_duration: input.querySelector(".song-duration").value,
        song_art: input.querySelector(".song-art").value
    });
});

    const newPlaylist = {
    playlist_name: name,
    playlist_author: author,
    playlist_art: art,
    songs: songs
    };

displayNewPlaylist(newPlaylist);
});

function displayNewPlaylist(playlist) {
    const container = document.querySelector(".playlist_cards");
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
    <div class="playlist">
        <img src="${playlist.playlist_art}" height="300px" width="300px">
        <h4>${playlist.playlist_name}</h4>
        <p class="p1">By: ${playlist.playlist_author}</p>
        <button onclick="clickLike(this)" data-id="user-added" data-liked="false">💗 (0)</button>
    </div>
    `;
  
    container.appendChild(card);
}

function displayPlaylists() {
    const container = document.getElementById("playlistContainer");
    container.innerHTML = "";
    playlists.forEach((playlist, index) => {
    const div = document.createElement("div");
    div.className = "playlist";
    div.innerHTML = `
        <img src="${playlist.playlist_art}" alt="${playlist.playlist_name}">
        <h3>${playlist.playlist_name}</h3>
        <p>By: <span class="author">${playlist.playlist_author}</span></p>
        <div class="songs">
        ${playlist.songs.map(song => `
        <div>
            <strong>${song.song_title}</strong> - ${song.song_artist} (${song.song_duration})
        </div>
        `).join("")}
        </div>
        <button onclick="toggleEdit(${index})">Edit</button>
        <button onclick="deletePlaylist(${index})">Delete</button>
        <form class="edit-form" id="edit-form-${index}" onsubmit="submitEdit(event, ${index})">
        <input type="text" name="author" placeholder="Author" value="${playlist.playlist_author}" required>
        <textarea name="songs" rows="4" placeholder="JSON song array">${JSON.stringify(playlist.songs, null, 2)}</textarea>
        <button type="submit">Save</button>
        </form>
    `;
    container.appendChild(div);
    });
}

function toggleEdit(index) {
    const form = document.getElementById(`edit-form-${index}`);
    form.style.display = form.style.display === 'flex' ? 'none' : 'flex';
  }

  function deletePlaylist(index) {
    if (confirm("Are you sure you want to delete this playlist?")) {
      playlists.splice(index, 1);
      displayPlaylists();
    }
  }

  function submitEdit(event, index) {
    event.preventDefault();
    const form = event.target;
    const newAuthor = form.author.value;
    let newSongs;
    try {
      newSongs = JSON.parse(form.songs.value);
      playlists[index].playlist_author = newAuthor;
      playlists[index].songs = newSongs;
      displayPlaylists();
    } catch (e) {
      alert("Invalid song JSON format.");
    }
  }

  document.addEventListener("DOMContentLoaded", displayPlaylists);

function closeModal(){
    const modal = document.getElementById("modal-overlay")
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');

    document.querySelector('main').style.filter = 'none';
    document.querySelector('header').style.filter = 'none';
    document.querySelector('#bottom').style.filter = 'none';

    modal.innerHTML='';

}

document.getElementById('all-btn').addEventListener('click', () =>  {
    window.location.href = "index.html";

});

document.getElementById('featured-btn').addEventListener('click', () => {
    window.location.href = "featured.html";

});
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