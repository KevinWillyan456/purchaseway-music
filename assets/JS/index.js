const audioGlobal = document.querySelector('#audio-global');
let indexAudio = 0;

const audioControllerPrev = document.querySelector('#audio-prev');
const audioControllerPlay = document.querySelector('#audio-play');
const audioControllerNext = document.querySelector('#audio-next');

let musicData = [
    'https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Numb%20(Lyrics).mp3',
    'https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20I%20Wanna%20Be%20Your%20Slave%20(Lyrics).mp3',
    'https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Last%20Friday%20Night%20(T.G.I.F.)%20(Rock%20Version)%20(Lyrics).mp3',
    'https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Bad%20Romance%20(Rock%20Version)%20(Lyrics).mp3',
    'https://pw-music-database.kevinsouza456.repl.co/Nightcore%20-%20Without%20Me%20(Rock%20Version)%20(Lyrics).mp3'
]

let audioControllerPlayToggle = true;
audioControllerPlay.addEventListener("click", audioControllerPlayFunction)
audioControllerNext.addEventListener("click", audioControllerNextFunction)

function inicia(){
    audioGlobal.src = musicData[0];
}

function audioControllerPlayFunction(){
    if(audioControllerPlayToggle){
        audioGlobal.play();
        audioControllerPlayToggle = false;
    }
    else {
        audioGlobal.pause();
        audioControllerPlayToggle = true;
    }
}

function audioControllerNextFunction(){
    let next;
    next = indexAudio == 0 ? next = 0 : next = indexAudio + 1
    console.log(indexAudio)

    indexAudio++;
    if(indexAudio > musicData.length - 1){
        indexAudio = 0;
    }

    audioGlobal.src = musicData[next];
    audioControllerPlayToggle = true;

    audioControllerPlayFunction()
}

inicia();