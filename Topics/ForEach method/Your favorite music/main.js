const music = ["rock", "pop", "hip-hop", "electronic"];

function myFavoriteMusic(music) {
    music.forEach((item, index, array) =>
        console.log(`My favorite music is ${item} choosing from ${array}`));
}