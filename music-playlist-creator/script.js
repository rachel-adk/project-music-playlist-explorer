function playlistCards() {

    fetch('data/data.json')
    .then(response => response.json())
    .then(data=> {
    
        const playlists = data.playlists
        const cards = document.querySelector(".playlist_cards");
        cards.innerHTML='';

        if (!data || data.length === 0) {
            cards.innerHTML = `<p>The playlist is empty</p>`;
        }

        playlists.forEach((playlist) => {
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
                        data-id=${data.id}
                        data-liked=false>
                        &#128151(0)

                    </button>
                </div>
                `;

            cards.appendChild(card);

            });


            cardEventListener(playlists);
                
            })}


function cardEventListener(playlists){
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) =>{
        card.onclick = function(e) {
           // if (e.target.classList.contains('like-btn')) return;
            
            openModal(playlists[index]);
        };
    });
}

    
function openModal(playlist) {
        const modal = document.getElementById("modal-overlay");


        const modalContent = document.createElement('div');
        modal.classList.add('modal-content');

        modalContent.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div id="banner">
                    <div class="header">
                        <img src=${playlist.playlist_art} height="100px";width="100px"> 
                        <h2>${playlist.playlist_name}</h2>
                        <h3>${playlist.playlist_author}</h3>
                        <button class="like-btn" data-id=${playlist.song_id} data-liked="false" onclick="clickLike(this)">&#128151 (0)</button>
                        <button id="shuffle-btn">Shuffle </button>
                    </div>
                    
                <div class="songs">
                    
                    <div class="info">
                        <img id="song_image" src=${playlist.song_art} height="200px" width="200px"> 
                        <p>${playlist.songs.song_title}</p>
                        <p>${playlist.songs.song_artist}</p>
                        <p>${playlist.songs.song_duration}</p>
                    </div>

                `;

            modal.appendChild(modalContent);
            //modal.remove("hidden");// remove hidden for modal to show 
            }
            
    function shuffleSongs(array) {
        for (let i = array.length - 1; i > 0 ; i--) {
            const j = Math.floor(Math.random() * (i+1));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array;
    }
    document.getElementById("shuttle-btn").addEventListener("click", () => {
        const shuffledSongs = shuffleSongs([playlists.songs]);

    });

    let lastLikeId = 0;
    function clickLike(button) {
    const reviewId = button.getAttribute("data-id");
    const isLiked = button.getAttribute("data-liked") === "true";
    let likesCount = parseInt(button.textContent.match(/\d+/)[0], 10);

    if (isLiked) {
        likesCount -= 1;
        button.textContent =`💗 (${likesCount})`;
        button.setAttribute(`data-liked`, "true");
    } else {
        likesCount += 1;
        button.textContent = ` 💗(${likesCount})`;
        button.setAttribute("data-liked", "true")
    }


}


document.addEventListener('DOMContentLoaded', () => {
    playlistCards();
})


// //modal
// const hiddenModal = document.querySelector(".modal-overlay");
// hiddenModal.addEventListener("click",(event) =>{
// if (event.target === hiddenModal) {
//         hiddenModal.classList.add("hidden");
//     }
// });