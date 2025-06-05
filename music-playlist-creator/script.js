fetch('data/data.json')
.then(response => response.json())
.then(data=> {
playlistCards(data);
})

.catch(error => {
    console.error('An error occurred', error)
});


function playlistCards(data) {
    const parentContainer = document.querySelector(".playlist_cards");
    parentContainer.innerHTML="";

    if (!data) {
        parentContainer.innerHTML = `<p>The playlist is empty</p>`;
    }

    data.forEach((element) => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src=${element.playlist_art} height="300px" width="300px>
            <div class="playlist">
            <h4>${element.playlist_name}</h4>
            <p1>By: ${element.playlist_author}</p1>
            <p class="playlist"></p>
            <button
                onclick="clickLike(this)"
                data-id="${data.id}"
                data-liked=false>
                &#128151(0)

            </button>
            </div>
            `;
            
        parentContainer.appendChild(card)

        
    });

}

    const modal = document.getElementByClassName("modal-overlay");
    const span = document.getElementsByClassName("close")[0];

    function openModal(playlist) {
        document.getElementById('banner').innerText = playlist.name;
        document.getElementById('song_image').src = playlist.imageUrl;
        document.getElementById('festivalDates').innerText = `Dates: ${festival.dates}`;
        document.getElementById('festivalLocation').innerText = `Location: ${festival.location}`;
        document.getElementById('artistLineup').innerHTML = `<strong>Lineup:</strong> ${festival.lineup.join(', ')}`;
        modal.style.display = "block";
    }

    span.onclick = function() {
    modal.style.display = "none";
    }
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

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
