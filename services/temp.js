//write a function to retrive a blob of json
// make an ajax request! Use the 'fetch' function .
//https://ralllycoding.herokuapp.com/api/music_albums

function fetchAlbums() {
    fetch ('https://media.mongodb.org/zips.json')
        .then(res => res.json())
        .then(json=>console.log(json));
}

async function fetchAlbums() {
    const res = await fetch ('https://media.mongodb.org/zips.json');
    const json = await res.json();

    console.log(json);
}

const fetchAlbums = async() => {
    const res = await fetch ('https://media.mongodb.org/zips.json');
    const json = await res.json();

    console.log(json);
}

fetchAlbums() ;