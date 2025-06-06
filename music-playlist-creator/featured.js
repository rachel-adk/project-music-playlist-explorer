document.addEventListener("DOMContentLoaded",() => {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data=> {
    
            const featured = data.playlists;
            const randomPlaylists = featured[Math.floor(Math.random() * featured.length)];
            

            const featuredContainer = document.getElementById("featuredContainer");
            const featuredImage = document.getElementById("image");
            const featuredSongs = document.getElementById("songs");

            featuredImage.innerHTML=`
                <img src="${randomPlaylists.playlist_art}" alt="Featured Playlist Art">
                <h2>${randomPlaylists.playlist_name}</h2>
                <h3>By: ${randomPlaylists.playlist_author}</h3>
            `;

            const songs = randomPlaylists.songs;
            featuredSongs.innerHTML = songs.map(song => `
                <div class="song"> 
                    <img src="${song.song_art}" height="200px" width="200px">
                    <p>Title: ${song.song_title}</p>
                    <p>Artist: ${song.song_artist}</p>
                    <p>Duration: ${song.song_duration}</p>
                </div>
            `).join('');

                });
    

});




