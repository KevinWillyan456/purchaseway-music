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

const conteinerPlaylist = document.querySelector('.conteiner-playlist');
const body = document.body;

const currentDuration = document.querySelector('.conteiner-duration-status .current-duration');
const sliderMusicDuration = document.querySelector('.slider-music-duration .slider-music-duration-wrapper input');
const sliderMusicDurationDot = document.querySelector('.slider-music-duration-wrapper .slider-music-duration-dot');
const totalDuration = document.querySelector('.conteiner-duration-status .total-duration');

const sliderMusicVolume = document.querySelector('.slider-music-volume .slider-music-volume-wrapper input');
const sliderMusicVolumeDot = document.querySelector('.slider-music-volume-wrapper .slider-music-volume-dot');

console.log(sliderMusicVolume)

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
    allSongValueSetters();
    generatorConteinerPlaylistData();
    generatorConteinerPlaylistDataPlay();
    musicStateControllers();
    durationSliderEventGenerator();
    volumeSliderEventGenerator();
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

function allSongValueSetters(){
    audioGlobal.src = musicData[indexAudio].audioUrl;
    coverCurrentMusic.src = musicData[indexAudio].coverUrl;
    currentCover.src = musicData[indexAudio].coverUrl;
    backgroundCover.style.setProperty("background-image", `url('${musicData[indexAudio].coverUrl}')`);
    titleCurrentMusic.innerHTML = musicData[indexAudio].title;
    genderCurrentMusic.innerHTML = musicData[indexAudio].gender;
}

function audioControllerNextFunction(){
    indexAudio++;
    if(indexAudio >= musicData.length){
        indexAudio = 0;
    }
    let selectedTheme = musicData[indexAudio].theme

    allSongValueSetters();
    audioControllerPlayFunctionNoPause()
    themeChanger(selectedTheme);
}
function audioControllerPrevFunction(){
    indexAudio--;
    if(indexAudio < 0){
        indexAudio = musicData.length - 1;
    }
    let selectedTheme = musicData[indexAudio].theme

    allSongValueSetters();
    audioControllerPlayFunctionNoPause()
    themeChanger(selectedTheme);
}

function generatorConteinerPlaylistData(){
    musicData.forEach((element) => {

        conteinerPlaylist.innerHTML += `
            <div class="item-playlist">
                <div class="box-wrapper">
                    <div class="cover-item" data-id="${element.id}" data-theme="${element.theme}">
                        <img src="${element.coverUrl}">
                    </div>
                    <div class="info-item">
                        <div class="title-info">
                            ${element.title}
                        </div>
                        <div class="gender-info">
                            ${element.gender}
                        </div>
                    </div>
                </div>

                <div class="play-button-item" data-id="${element.id}" data-theme="${element.theme}">
                    <ion-icon name="play-circle"></ion-icon>
                </div>
            </div>
        `
    })
}

function generatorConteinerPlaylistDataPlay(){
    const itemsPlaylist = document.querySelectorAll('.conteiner-playlist .item-playlist .play-button-item, .cover-item');

    itemsPlaylist.forEach((element)=> {
        element.addEventListener('click', function(){
            indexAudio = musicData.indexOf(musicData.find(element => element.id == $(this).data('id')))
            let selectedTheme = $(this).data('theme')

            allSongValueSetters();
            audioControllerPlayFunctionNoPause();
            themeChanger(selectedTheme);
        });
    })
}

function themeChanger(selectedTheme){
    let allElementsChangeableByTheme = document.querySelectorAll(".main-playlist, .conteiner-playlist, .search-bar, .conteiner-settings .user-settings, .main-display .clock-settings, .conteiner-side-1 .current-music-rating, .conteiner-side-1 .current-music-favorite, .slider-music-duration, .slider-music-duration-wrapper .slider-music-duration-dot, .slider-music-volume-wrapper .slider-music-volume-dot, .conteiner-volume .slider-music-volume, .conteiner-volume .slider-music-volume, .conteiner-playlist .item-playlist, .main-controls");
    let serviceLogo = document.querySelector('.service-logo img');

    initVolumeSlider();
    
    if(selectedTheme == "Original"){
        allElementsChangeableByTheme.forEach(element => element.classList.remove("rock-version"));
        serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo.png";
        return;
    }
    if(selectedTheme == "Rock Version"){
        allElementsChangeableByTheme.forEach(element => element.classList.add("rock-version"));
        serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo-rock-version.png";
        return;
    }
}

let canMoveTheSliderDuration = true;
// let canMoveTheSliderVolume = true;
function musicStateControllers(){
    audioGlobal.addEventListener('timeupdate', () => {
        let minCurrent = Math.floor(audioGlobal.currentTime / 60);
        let segCurrent = Math.floor(audioGlobal.currentTime % 60);

        if(segCurrent < 10){
            segCurrent = `0${segCurrent}`
        }
        // audioGlobal.playbackRate = 16 // TESTE
        currentDuration.innerHTML = `${minCurrent}:${segCurrent}`

        if(canMoveTheSliderDuration){
            sliderMusicDuration.value = parseInt(audioGlobal.currentTime / audioGlobal.duration * 100);
            if(musicData[indexAudio].theme == 'Original'){
                sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%`);
                sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
            }
            if(musicData[indexAudio].theme == 'Rock Version'){
                sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%)`);
                sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
            }
        }
    })
    audioGlobal.oncanplaythrough = () => {
        let minTotal = Math.floor(audioGlobal.duration / 60);
        let segTotal = Math.floor(audioGlobal.duration % 60);
        
        if(segTotal < 10){
            segTotal = `0${segTotal}`
        }
        totalDuration.innerHTML = `${minTotal}:${segTotal}`
    };

    audioGlobal.addEventListener("ended", audioControllerNextFunction);

}


function durationSliderEventGenerator(){
    sliderMusicDuration.addEventListener("mousedown", () => {
        canMoveTheSliderDuration = false
    })
    sliderMusicDuration.addEventListener("touchstart", () => {
        canMoveTheSliderDuration = false
    })
    sliderMusicDuration.addEventListener("mouseup", () => {
        audioGlobal.currentTime = ((sliderMusicDuration.value) / 100) * audioGlobal.duration;
        audioGlobal.play();
        audioControllerPlayToggle = false;
        audioControllerPlay.name = 'pause-circle';
        musicAnimationStatus.classList.add('run');
        canMoveTheSliderDuration = true
    })
    sliderMusicDuration.addEventListener("touchend", () => {
        audioGlobal.currentTime = ((sliderMusicDuration.value) / 100) * audioGlobal.duration;
        audioGlobal.play();
        audioControllerPlayToggle = false;
        audioControllerPlay.name = 'pause-circle';
        musicAnimationStatus.classList.add('run');
        canMoveTheSliderDuration = true
    })


    sliderMusicDuration.oninput = () => {
        if(musicData[indexAudio].theme == 'Original'){
            sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%`);
            sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
        }
        if(musicData[indexAudio].theme == 'Rock Version'){
            sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%)`);
            sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
        }
        sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
    }
}

function volumeSliderEventGenerator(){
    sliderMusicVolume.addEventListener("mousedown", () => {
        canMoveTheSliderVolume = false
    })
    sliderMusicVolume.addEventListener("touchstart", () => {
        canMoveTheSliderVolume = false
    })
    sliderMusicVolume.addEventListener("mouseup", () => {
        canMoveTheSliderVolume = true
    })
    sliderMusicVolume.addEventListener("touchend", () => {
        canMoveTheSliderVolume = true
    })


    sliderMusicVolume.oninput = () => {
        if(musicData[indexAudio].theme == 'Original'){
            sliderMusicVolume.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicVolume.value}%, var(--color-white-1) ${sliderMusicVolume.value}%, var(--color-white-1) 100%`);
            sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
        }
        if(musicData[indexAudio].theme == 'Rock Version'){
            sliderMusicVolume.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicVolume.value}%, var(--color-white-1) ${sliderMusicVolume.value}%, var(--color-white-1) 100%)`);
            sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
        }
        sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)

        audioGlobal.volume = sliderMusicVolume.value / 100;
    }
}

function initVolumeSlider(){
    if(musicData[indexAudio].theme == 'Original'){
        sliderMusicVolume.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicVolume.value}%, var(--color-white-1) ${sliderMusicVolume.value}%, var(--color-white-1) 100%`);
        sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
    }
    if(musicData[indexAudio].theme == 'Rock Version'){
        sliderMusicVolume.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicVolume.value}%, var(--color-white-1) ${sliderMusicVolume.value}%, var(--color-white-1) 100%)`);
        sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
    }
    sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
}


inicia();
themeChanger()