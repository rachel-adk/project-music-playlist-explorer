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
            <img src="$(card.playlist_art)">
            <div class="playlist">
            <h4>${element.playlist_name}</h4>
            <p1>By: ${element.playlist_author}</p1>
            <p class="playlist"></p>
            <button> &#128151; </button>
            </div>
            `;
            
        parentContainer.appendChild(card)

        
    });

}