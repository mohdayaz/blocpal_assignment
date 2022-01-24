export const _getToken = async (clientId, clientSecret) => {
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data
}

export const _getGenres = async () => {
    const token = localStorage.getItem("auth_token")
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.categories.items.filter((e,i) => i < 6);
}

export const _getPlaylistByGenre = async (genreId) => {
    const token = localStorage.getItem("auth_token")
    const limit = 5;
    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

    const data = await result.json();
    return data.playlists.items;
}


export const _setMyPlayList = (data) => {
    localStorage.setItem("my_playlist", JSON.stringify(data));
}

export const _getMyPlayList = (data) => {
    const presentList = JSON.parse(localStorage.getItem("my_playlist")) || []
    return presentList
}