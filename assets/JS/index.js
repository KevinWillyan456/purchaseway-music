const audioGlobal = document.querySelector('#audio-global');
let indexAudio = 0;

const audioControllerPrev = document.querySelector('#audio-prev');
const audioControllerPlay = document.querySelector('#audio-play');
const audioControllerNext = document.querySelector('#audio-next');

const coverCurrentMusic = document.querySelector('.cover-current-music img');
const titleCurrentMusic = document.querySelector('.title-info-current-music');
const genderCurrentMusic = document.querySelector('.gender-info-current-music');
const currentCover = document.querySelector('.current-cover img');
const backgroundCover = document.querySelector('.main-display .background-cover');

const musicAnimationStatus = document.querySelector('.music-animation-status');

let musicData = [
    {
        id: 1,
        audioUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Numb%20(Lyrics).mp3",
        coverUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Numb%20(Lyrics).jpg",
        title: "Nightcore - Numb (Lyrics)",
        gender: "Nightcore",
        theme: "Original"
    },
    {
        id: 2,
        audioUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20I%20Wanna%20Be%20Your%20Slave%20(Lyrics).mp3",
        coverUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20I%20Wanna%20Be%20Your%20Slave%20(Lyrics).jpg",
        title: "Nightcore - I Wanna Be Your Slave (Lyrics)",
        gender: "Nightcore",
        theme: "Original"
    },
    {
        id: 3,
        audioUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Last%20Friday%20Night%20(T.G.I.F.)%20(Rock%20Version)%20(Lyrics).mp3",
        coverUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Last%20Friday%20Night%20(Rock%20Version)%20(Lyrics).jpg",
        title: "Nightcore - Last Friday Night (T.G.I.F.) (Rock Version) (Lyrics)",
        gender: "Nightcore",
        theme: "Rock Version"
    },
    {
        id: 4,
        audioUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Bad%20Romance%20(Rock%20Version)%20(Lyrics).mp3",
        coverUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Bad%20Romance%20(Rock%20Version)%20(Lyrics).jpg",
        title: "Nightcore - Bad Romance (Rock Version) (Lyrics)",
        gender: "Nightcore",
        theme: "Rock Version"
    },
    {
        id: 5,
        audioUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Without%20Me%20(Rock%20Version)%20(Lyrics).mp3",
        coverUrl: "https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Without%20Me%20(Rock%20Version)%20(Lyrics).jpg",
        title: "Nightcore - Without Me (Rock Version) (Lyrics)",
        gender: "Nightcore",
        theme: "Rock Version"
    }
]

let audioControllerPlayToggle = true;
audioControllerPlay.addEventListener("click", audioControllerPlayFunction)
audioControllerNext.addEventListener("click", audioControllerNextFunction)
audioControllerPrev.addEventListener("click", audioControllerPrevFunction)

function inicia(){
    audioGlobal.src = musicData[0].audioUrl;
    coverCurrentMusic.src = musicData[0].coverUrl;
    currentCover.src = musicData[0].coverUrl;
    backgroundCover.style.setProperty("background-image", `url('${musicData[0].coverUrl}')`);
    titleCurrentMusic.innerHTML = musicData[0].title;
    genderCurrentMusic.innerHTML = musicData[0].gender;
}

function audioControllerPlayFunction(){
    if(audioControllerPlayToggle){
        audioGlobal.play();
        audioControllerPlayToggle = false;
        audioControllerPlay.name = 'pause-circle';
        musicAnimationStatus.classList.add('run');
    }
    else {
        audioGlobal.pause();
        audioControllerPlayToggle = true;
        audioControllerPlay.name = 'play-circle';
        musicAnimationStatus.classList.remove('run');
    }
}
function audioControllerPlayFunctionNoPause(){
    audioGlobal.play();
    audioControllerPlayToggle = false;
    audioControllerPlay.name = 'pause-circle';
    musicAnimationStatus.classList.add('run');
}

function audioControllerNextFunction(){
    indexAudio++;
    if(indexAudio >= musicData.length){
        indexAudio = 0;
    }

    audioGlobal.src = musicData[indexAudio].audioUrl;
    coverCurrentMusic.src = musicData[indexAudio].coverUrl;
    currentCover.src = musicData[indexAudio].coverUrl;
    backgroundCover.style.setProperty("background-image", `url('${musicData[indexAudio].coverUrl}')`);
    titleCurrentMusic.innerHTML = musicData[indexAudio].title;
    genderCurrentMusic.innerHTML = musicData[indexAudio].gender;

    audioControllerPlayFunctionNoPause()
}
function audioControllerPrevFunction(){
    indexAudio--;
    if(indexAudio < 0){
        indexAudio = musicData.length - 1;
    }

    audioGlobal.src = musicData[indexAudio].audioUrl;
    coverCurrentMusic.src = musicData[indexAudio].coverUrl;
    currentCover.src = musicData[indexAudio].coverUrl;
    backgroundCover.style.setProperty("background-image", `url('${musicData[indexAudio].coverUrl}')`);
    titleCurrentMusic.innerHTML = musicData[indexAudio].title;
    genderCurrentMusic.innerHTML = musicData[indexAudio].gender;

    audioControllerPlayFunctionNoPause()
}

inicia();