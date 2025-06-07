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
                        &#128151 ${playlist.likesCount}
                    </button>
                </div>
                `;
            
                cards.appendChild(card);

            });
            cardEventListener(mainPlaylists);
        })


    function cardEventListener(playlists){
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) =>{
            card.onclick = function(e) {
            if (e.target.classList.contains('like-btn')) return;
                openModal(playlists[index]);
            };
        });
    }
}

    
function openModal(playlist) {
    const modal = document.querySelector(".modal-overlay");
    modal.innerHTML = '';


    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    modalContent.innerHTML = `
    <span id="close_btn">&times;</span>
    <div id="modal_banner">
    <div id="header">
        <img src="${playlist.playlist_art}" height="150px" width="200px"> 
        <h2>${playlist.playlist_name}</h2>
        <h3>by: ${playlist.playlist_author}</h3>
    </div>
    <div class="button">
        <button class="like-btn" data-id=${playlist.song_id} data-liked="false" onclick="clickLike(this)">&#128151 ${playlist.likesCount}</button>
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
    //document.body.classList.add('modal-open');

    document.getElementById("banner").style.filter = 'blur(10px)';
    document.getElementById("bottom").style.filter = 'blur(10px)';

    document.getElementById('close_btn').addEventListener('click', () => {
        console.log("close");
        closeModal();
    });

    document.getElementById('header').addEventListener('click', () => {
        closeModal();
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


function displayPlaylists() {
    const container = document.getElementById("playlistContainer");
    container.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const div = document.createElement("div");
        div.className = "playlist";
        div.innerHTML = `
            <img src="${playlist.playlist_art}" alt="playlist_card">
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
    })
    
}

function closeModal(){
    const modal = document.querySelector(".modal-overlay")
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');

    document.querySelector('main').style.filter = 'none';
    document.querySelector('header').style.filter = 'none';
    document.querySelector('#bottom').style.filter = 'none';

    modal.innerHTML='';

}

document.getElementById("add_song")
document.getElementById('all-btn').addEventListener('click', () =>  {
    window.location.href = "index.html";

});

document.getElementById('newPlaylist').addEventListener("submit", function(e){
    e.preventDefault();

    const name = document.getElementById("playlist_name").value;
    const author = document.getElementById("playlist_author").value;

    const songs = Array.from(document.querySelectorAll(".list_of_songs")).map(song => {
        return{
            title: song.querySelector(".song_title").value,
            artist: song.querySelector(".song-artist").value,
            duration:song.querySelector("duration").value,
        };
    });

    if (editPlaylist) {
        editPlaylist.playlist_name = name;
        editPlaylist.playlist_author = author;
        editPlaylist.songs = songs;
        editPlaylist = null;
    }
    else {
        const newPlaylist = {
            playlist_author:author,
            playlist_name:name,
            playlist_art: "assets/img/song.png",
            likesCount:0,
            songs:songs
        
        };
        mainPlaylists.push(newPlaylist);
        localStorage.setItem("thisPlaylist", JSON.stringify(mainPlaylists));

        e.target.reset();
        document.getElementById("list_of_songs").innerHTML=`
            <div class="song">
                <input type="text" placeholder="Title" class="song_title" required/>
                <input type="text" placeholder="Artist" class="song_artist" required/>
                <input type="text" placeholder="Duration" class="duration" required/>
            </div>   
        `;
    }
});

    let lastLikeId = 0;
    function clickLike(button) {
        button.addEventListener("click", (e) => {
            e.stopPropagation();
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
    )}


function newPlaylistSet(modalContent, playlist) {
    modalContent.querySelector(".index-header img").src = playlist.playlist_art;
    modalContent.querySelector(".index-header h2").textContent = playlist.playlist_name;
    modalContent.querySelector(".index-header p").textContent = "By: ${playlist.playlist_author}";

    const song_list = modal.querySelector(".list_of_songs");
    song_list.innerHTML = '';
    playlist.songs.forEach(song => {
        const element = document.createElement("div");
        element.classList.add("song");
        element.innerHTML=`
            <img src = "${song.song_art || assets/img/song.png}", alt = "song_art", width = "50px">
                <div class="info">
                    <p class = "title">${song.song_title}</p>
                    <p>${song_artist}</p>
                </div>
                <p>${song.duration}</p>
                `;
            list_of_songs.appendChild(element);
    });
    modal.classList.remove("hidden");

}
// document.getElementById('featured-btn').addEventListener('click', () => {
//     window.location.href = "featured.html";


document.addEventListener('DOMContentLoaded', () => {
    playlistCards()
})
