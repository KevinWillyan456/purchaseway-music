const audioGlobal = document.querySelector('#audio-global');
let indexAudio = 0;
let indexAudioId = "";

const audioControllerPrev = document.querySelector('#audio-prev');
const audioControllerPlay = document.querySelector('#audio-play');
const audioControllerNext = document.querySelector('#audio-next');

const coverCurrentMusic = document.querySelector('.cover-current-music img');
const titleCurrentMusic = document.querySelector('.title-info-current-music');
const genderCurrentMusic = document.querySelector('.gender-info-current-music');
const currentCover = document.querySelector('.current-cover img');
const backgroundCover = document.querySelector('.main-display .background-cover');

const musicAnimationStatus = document.querySelector('.music-animation-status');

const containerPlaylist = document.querySelector('.container-playlist');
const body = document.body;

const currentDuration = document.querySelector('.container-duration-status .current-duration');
const sliderMusicDuration = document.querySelector('.slider-music-duration .slider-music-duration-wrapper input');
const sliderMusicDurationDot = document.querySelector('.slider-music-duration-wrapper .slider-music-duration-dot');
const totalDuration = document.querySelector('.container-duration-status .total-duration');

const sliderMusicVolume = document.querySelector('.slider-music-volume .slider-music-volume-wrapper input');
const sliderMusicVolumeDot = document.querySelector('.slider-music-volume-wrapper .slider-music-volume-dot');

const repeatIcon = document.querySelector('.container-funcions .repeat-icon ion-icon')
const shuffleIcon = document.querySelector('.container-funcions .shuffle-icon ion-icon')

const searchButton = document.querySelector('.container-search .search-icon');

const containerItemsSearch = document.querySelector('.container-items')
const searchBarInput = document.querySelector('#search-bar-input');

const userSettings = document.querySelector('.user-settings');

const containerItemsFavorite = document.querySelector('.container-favorite');
const containerItemsHistoric = document.querySelector('.container-historic');

const userName = document.querySelector('.user-name');
const registrationDate = document.querySelector('.registration-date');

const containerFrameVideo = document.querySelector(".container-frame");

const logout = document.querySelector(".logout");

const musicFavoriteIcon = document.querySelector(".current-music-favorite ion-icon")

const clearHistoricIcon = document.querySelector(".trash-icon")

let musicData = [];
let musicDataShuffled = [];
let musicDataFiltered = [];

let userData;


let audioControllerPlayToggle = true;
audioControllerPlay.addEventListener("click", audioControllerPlayFunction)
audioControllerNext.addEventListener("click", audioControllerNextFunction)
audioControllerPrev.addEventListener("click", audioControllerPrevFunction)

window.addEventListener("resize", videoResizingFunction);

let canKeyboardEvents = true;
document.addEventListener("keyup", function(event){
    if(canKeyboardEvents){
        switch(event.key){
            case " ":
                if(!musicDataShuffled[indexAudio].isVideo){
                    audioControllerPlayFunction();
                }
                break;
            case "ArrowRight":
                audioControllerNextFunction();
                break;
            case "ArrowLeft":
                audioControllerPrevFunction()
                break;
            case "p":
                toggleTemplateUser();
                break;
        }
    }
})

logout.addEventListener("click", logoutService);
clearHistoricIcon.addEventListener("click", manageHistoricClear);
musicFavoriteIcon.addEventListener("click", manageFavorite);

document.querySelector('.service-logo').addEventListener("click", () => {
    window.location = '/'
})

function inicia(){
    allSongValueSetters();
    setUserSettings();
    generatorContainerPlaylistData();
    generatorContainerPlaylistDataPlay();
    musicStateControllers();
    durationSliderEventGenerator();
    volumeSliderEventGenerator();
    searchEvents();

    generatorContainerSearchData()
    generatorContainerSearchDataPlay()
    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
    generatorContainerHistoricData()
    generatorContainerHistoricDataPlay()

    themeChanger(musicDataShuffled[indexAudio].theme);
    indexAudioId = musicDataShuffled[indexAudio]._id;
    setMusicPlayTag();
    refreshFavorite();
    manageHistoric();
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
    if(musicDataShuffled[indexAudio].isVideo){
        audioGlobal.pause()
        containerFrameVideo.style.display = "block"
        currentCover.style.display = "none"
        document.querySelector(".container-side-2").style.display = "none"
        musicAnimationStatus.classList.remove('run');

        return;
    }

    audioGlobal.play();
    audioControllerPlayToggle = false;
    audioControllerPlay.name = 'pause-circle';
    musicAnimationStatus.classList.add('run');

    containerFrameVideo.style.display = "none"
    currentCover.style.display = "block"
    document.querySelector(".container-side-1").style.display = "flex"
    document.querySelector(".container-side-2").style.display = "flex"
}

function allSongValueSetters(){
    if(musicDataShuffled[indexAudio].isVideo){
        indexAudioId = musicDataShuffled[indexAudio]._id;
        coverCurrentMusic.src = musicDataShuffled[indexAudio].coverUrl;
        currentCover.src = musicDataShuffled[indexAudio].coverUrl;
        backgroundCover.style.setProperty("background-image", `url("${musicDataShuffled[indexAudio].coverUrl}")`);
        titleCurrentMusic.innerHTML = musicDataShuffled[indexAudio].title;
        genderCurrentMusic.innerHTML = musicDataShuffled[indexAudio].gender;

        containerFrameVideo.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${musicDataShuffled[indexAudio].audioUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

        videoResizingFunction();

        return;
    }

    audioGlobal.src = musicDataShuffled[indexAudio].audioUrl;
    indexAudioId = musicDataShuffled[indexAudio]._id;
    coverCurrentMusic.src = musicDataShuffled[indexAudio].coverUrl;
    currentCover.src = musicDataShuffled[indexAudio].coverUrl;
    backgroundCover.style.setProperty("background-image", `url("${musicDataShuffled[indexAudio].coverUrl}")`);
    titleCurrentMusic.innerHTML = musicDataShuffled[indexAudio].title;
    genderCurrentMusic.innerHTML = musicDataShuffled[indexAudio].gender;
    containerFrameVideo.innerHTML = "";
}

function setUserSettings(){
    userName.innerHTML = userData.name;

    let day = parseInt(userData.additionDate.substring(8,10))
    let month = parseInt(userData.additionDate.substring(5,7))
    let year = parseInt(userData.additionDate.substring(0,4))

    switch (month) {
        case 1:
            month = "janeiro";
            break;
        case 2:
            month = "fevereiro";
            break;
        case 3:
            month = "março";
            break;
        case 4:
            month = "abril";
            break;
        case 5:
            month = "maio";
            break;
        case 6:
            month = "junho";
            break;
        case 7:
            month = "julho";
            break;
        case 8:
            month = "agosto";
            break;
        case 9:
            month = "setembro";
            break;
        case 10:
            month = "outubro";
            break;
        case 11:
            month = "novembro";
            break;
        case 12:
            month = "dezembro";
            break;
      }

    registrationDate.innerHTML = `Registrou-se em: ${day} de ${month} ${year}`;


}

function audioControllerNextFunction(){
    indexAudio++;
    if(indexAudio >= musicDataShuffled.length){
        indexAudio = 0;
    }
    
    let selectedTheme = musicDataShuffled[indexAudio].theme
    indexAudioId = musicDataShuffled[indexAudio]._id;
    
    allSongValueSetters();
    audioControllerPlayFunctionNoPause()
    setMusicPlayTag();
    manageHistoric();
    refreshFavorite();
    themeChanger(selectedTheme);
}
function audioControllerPrevFunction(){
    indexAudio--;
    if(indexAudio < 0){
        indexAudio = musicDataShuffled.length - 1;
    }

    let selectedTheme = musicDataShuffled[indexAudio].theme
    indexAudioId = musicDataShuffled[indexAudio]._id;

    allSongValueSetters();
    audioControllerPlayFunctionNoPause()
    setMusicPlayTag();
    manageHistoric();
    refreshFavorite();
    themeChanger(selectedTheme);
}

function generatorContainerPlaylistData(){
    musicDataShuffled.forEach((element) => {

        containerPlaylist.innerHTML += `
            <div class="item-playlist">
                <div class="box-wrapper">
                    <div class="cover-item" data-id="${element._id}" data-theme="${element.theme}">
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

                <div class="play-button-item" data-id="${element._id}" data-theme="${element.theme}">
                    <ion-icon name="play-circle"></ion-icon>
                </div>
            </div>
        `
    })
}

function generatorContainerPlaylistDataPlay(){
    const itemsPlaylist = document.querySelectorAll('.container-playlist .item-playlist .play-button-item, .cover-item');

    itemsPlaylist.forEach((element)=> {
        element.addEventListener('click', function(){
            indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
            let selectedTheme = $(this).data('theme')
            indexAudioId = musicDataShuffled[indexAudio]._id;
            
            allSongValueSetters();
            audioControllerPlayFunctionNoPause();
            setMusicPlayTag();
            manageHistoric();
            refreshFavorite();
            themeChanger(selectedTheme);
        });
    })
}

function generatorContainerSearchData(){
    musicDataFiltered.forEach((element) => {

        containerItemsSearch.innerHTML += `
            <div class="item-playlist-search">
                <div class="box-wrapper-search">
                    <div class="cover-item-search" data-id="${element._id}" data-theme="${element.theme}">
                        <img src="${element.coverUrl}">
                    </div>
                    <div class="info-item-search">
                        <div class="title-info-search">
                            ${element.title}
                        </div>
                        <div class="gender-info-search">
                            ${element.gender}
                        </div>
                    </div>
                </div>
                <div class="play-button-item" data-id="${element._id}" data-theme="${element.theme}">
                    <ion-icon name="play-circle"></ion-icon>
                </div>
            </div>
        `
    })
}

function generatorContainerSearchDataPlay(){
    const itemsPlaylistSearch = document.querySelectorAll('.container-items .item-playlist-search .play-button-item, .cover-item-search');

    itemsPlaylistSearch.forEach((element)=> {
        element.addEventListener('click', function(){
            indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
            let selectedTheme = $(this).data('theme')
            indexAudioId = musicDataShuffled[indexAudio]._id;

            allSongValueSetters();
            audioControllerPlayFunctionNoPause();
            setMusicPlayTag();
            manageHistoric();
            refreshFavorite();
            themeChanger(selectedTheme);
            
            $('.focus-shadow').hide(200);
            $('.container-search-result').hide(200);
            profileWasClicked = true;
            canKeyboardEvents = true;
        });
    })
}

function generatorContainerFavoriteData(){
    let favoriteSongs = [];

    for (let i = 0; i < userData.favoriteSongs.length; i++) {
        let song = musicDataShuffled.find(element => element._id == userData.favoriteSongs[i].musicId)
        if(song){
            if(!favoriteSongs.find(element => element._id == userData.favoriteSongs[i].musicId)){
                favoriteSongs.push(song);
            }
        }
    }

    favoriteSongs.reverse();


    favoriteSongs.forEach((element) => {

        containerItemsFavorite.innerHTML += `
            <div class="item-playlist-favorite">
                <div class="box-wrapper-favorite">
                    <div class="cover-item-favorite" data-id="${element._id}" data-theme="${element.theme}">
                        <img src="${element.coverUrl}">
                    </div>
                    <div class="info-item-favorite">
                        <div class="title-info-favorite">
                            ${element.title}
                        </div>
                        <div class="gender-info-favorite">
                            ${element.gender}
                        </div>
                    </div>
                </div>
                <div class="play-button-item" data-id="${element._id}" data-theme="${element.theme}">
                    <ion-icon name="play-circle"></ion-icon>
                </div>
            </div>
        `
    })
}

function generatorContainerFavoriteDataPlay(){
    const itemsPlaylistFavorite = document.querySelectorAll('.container-favorite .item-playlist-favorite .play-button-item, .cover-item-favorite');

    itemsPlaylistFavorite.forEach((element)=> {
        element.addEventListener('click', function(){
            indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
            let selectedTheme = $(this).data('theme')
            indexAudioId = musicDataShuffled[indexAudio]._id;

            allSongValueSetters();
            audioControllerPlayFunctionNoPause();
            setMusicPlayTag();
            manageHistoric();
            refreshFavorite();
            themeChanger(selectedTheme);
            
            $('.focus-shadow').hide(200);
            $('.container-user-settings').hide(200);
            profileWasClicked = true;
            canKeyboardEvents = true;
        });
    })
}


function generatorContainerHistoricData(){
    let historicSongs = [];

    for (let i = 0; i < userData.musicHistory.length; i++) {
        let song = musicDataShuffled.find(element => element._id == userData.musicHistory[i].musicId)

        if(song){
            if(!historicSongs.find(element => element._id == userData.musicHistory[i].musicId)){
                historicSongs.push(song);
            }
        }
    }

    historicSongs.reverse()
    
    historicSongs.forEach((element) => {

        containerItemsHistoric.innerHTML += `
            <div class="item-playlist-historic">
                <div class="box-wrapper-historic">
                    <div class="cover-item-historic" data-id="${element._id}" data-theme="${element.theme}">
                        <img src="${element.coverUrl}">
                    </div>
                    <div class="info-item-historic">
                        <div class="title-info-historic">
                            ${element.title}
                        </div>
                        <div class="gender-info-historic">
                            ${element.gender}
                        </div>
                    </div>
                </div>
                <div class="play-button-item" data-id="${element._id}" data-theme="${element.theme}">
                    <ion-icon name="play-circle"></ion-icon>
                </div>
            </div>
        `
    })
}

function generatorContainerHistoricDataPlay(){
    const itemsPlaylistHistoric = document.querySelectorAll('.container-historic .item-playlist-historic .play-button-item, .cover-item-historic');

    itemsPlaylistHistoric.forEach((element)=> {
        element.addEventListener('click', function(){
            indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
            let selectedTheme = $(this).data('theme')
            indexAudioId = musicDataShuffled[indexAudio]._id;

            allSongValueSetters();
            audioControllerPlayFunctionNoPause();
            setMusicPlayTag();
            manageHistoric();
            refreshFavorite();
            themeChanger(selectedTheme);
            
            $('.focus-shadow').hide(200);
            $('.container-user-settings').hide(200);
            profileWasClicked = true;
            canKeyboardEvents = true;
        });
    })
}

function themeChanger(selectedTheme){
    let allElementsChangeableByTheme = document.querySelectorAll(".main-playlist, .container-playlist, .search-bar, .container-settings .user-settings, .main-display .clock-settings, .container-side-1 .current-music-rating, .container-side-1 .current-music-favorite, .slider-music-duration, .slider-music-duration-wrapper .slider-music-duration-dot, .slider-music-volume-wrapper .slider-music-volume-dot, .container-volume .slider-music-volume, .container-volume .slider-music-volume, .container-playlist .item-playlist, .main-controls, .container-funcions .repeat-icon, .container-funcions .shuffle-icon, .layer-search-result, .box-search-result, .item-playlist-search, .layer-user-settings, .box-user-settings, .box-profile .user-settings, .item-playlist-favorite, .item-playlist-historic, .main-playlist .box-wrapper-info .more-playlist");
    let serviceLogo = document.querySelector('.service-logo img');

    initDurationSlider();
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

function musicStateControllers(){
    audioGlobal.addEventListener('timeupdate', () => {

        if(canMoveTheSliderDuration){
            sliderMusicDuration.value = parseInt(audioGlobal.currentTime / audioGlobal.duration * 100);
            if(musicDataShuffled[indexAudio].theme == 'Original'){
                sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%`);
                sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
            }
            if(musicDataShuffled[indexAudio].theme == 'Rock Version'){
                sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%)`);
                sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
            }

            let minCurrent = Math.floor(audioGlobal.currentTime / 60);
            let segCurrent = Math.floor(audioGlobal.currentTime % 60);

            if(segCurrent < 10){
                segCurrent = `0${segCurrent}`
            }

            currentDuration.innerHTML = `${minCurrent}:${segCurrent}`
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

    repeatIcon.addEventListener("click", repeatToggle);
    shuffleIcon.addEventListener("click", shuffleToggle);
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
        if(musicDataShuffled[indexAudio].theme == 'Original'){
            sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%`);
            sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
        }
        if(musicDataShuffled[indexAudio].theme == 'Rock Version'){
            sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%)`);
            sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
        }
        sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)

        let interactionWithTheSlider = ((sliderMusicDuration.value) / 100) * (audioGlobal.duration)

        let minCurrent = Math.floor(interactionWithTheSlider / 60);
        let segCurrent = Math.floor(interactionWithTheSlider % 60);

        if(segCurrent < 10){
            segCurrent = `0${segCurrent}`
        }
        currentDuration.innerHTML = `${minCurrent}:${segCurrent}`
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
        if(musicDataShuffled[indexAudio].theme == 'Original'){
            sliderMusicVolume.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicVolume.value}%, var(--color-white-1) ${sliderMusicVolume.value}%, var(--color-white-1) 100%`);
            sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
        }
        if(musicDataShuffled[indexAudio].theme == 'Rock Version'){
            sliderMusicVolume.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicVolume.value}%, var(--color-white-1) ${sliderMusicVolume.value}%, var(--color-white-1) 100%)`);
            sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
        }
        sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)

        audioGlobal.volume = sliderMusicVolume.value / 100;
    }

    audioGlobal.volume = sliderMusicVolume.value / 100;
}

function initDurationSlider(){
    if(musicDataShuffled[indexAudio].theme == 'Original'){
        sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%`);
        sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
    }
    if(musicDataShuffled[indexAudio].theme == 'Rock Version'){
        sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%)`);
        sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
    }
    sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
}

function initVolumeSlider(){
    if(musicDataShuffled[indexAudio].theme == 'Original'){
        sliderMusicVolume.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicVolume.value}%, var(--color-white-1) ${sliderMusicVolume.value}%, var(--color-white-1) 100%`);
        sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
    }
    if(musicDataShuffled[indexAudio].theme == 'Rock Version'){
        sliderMusicVolume.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicVolume.value}%, var(--color-white-1) ${sliderMusicVolume.value}%, var(--color-white-1) 100%)`);
        sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
    }
    sliderMusicVolumeDot.style.setProperty("left", `${(sliderMusicVolume.value)}%`)
}

let repeatToggleControl = true;
function repeatToggle(){
    if(repeatToggleControl){
        audioGlobal.loop = true;
        repeatToggleControl = false
        repeatIcon.classList.add('active');

        if(!shuffleToggleControl){
            shuffleToggle();
        }
    }
    else {
        audioGlobal.loop = false;
        repeatToggleControl = true
        repeatIcon.classList.remove('active');
    }
}

function shuffleArray(preShuffleArray) {
    
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let ramdomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[ramdomIndex];
        preShuffleArray[ramdomIndex] = aux
        currentIndex -= 1;
    }
    audioControllerPrevFunction()
}

let shuffleToggleControl = true;

function shuffleToggle(){
    if(shuffleToggleControl){
        shuffleIcon.classList.add('active');
        shuffleToggleControl = false

        shuffleArray(musicDataShuffled)
        
        if(!repeatToggleControl){
            repeatToggle();
        }
    }
    else {
        shuffleIcon.classList.remove('active');
        shuffleToggleControl = true
        musicDataShuffled = [...musicData];
        indexAudio = 1
        audioControllerPrevFunction()
    }
}

function musicFilteringFunction(){
    containerItemsSearch.innerHTML = "";

    $('.song-not-found').hide();
    
    musicDataFiltered = musicData.filter(
        (music) =>
        music.title.toLowerCase().includes(searchBarInput.value.toLowerCase())
        )
    
        while (musicDataFiltered.length > 5) {
            musicDataFiltered.pop();
        }
    
    generatorContainerSearchData()
    generatorContainerSearchDataPlay()
    themeChanger(musicDataShuffled[indexAudio].theme);
    
    if (containerItemsSearch.innerHTML == ''){
        $('.song-not-found').show();
    }
}

let profileWasClicked = true;

function searchEvents(){
    searchButton.addEventListener("click", () => {
        $('.search-bar').toggle(400)
        $('.search-bar input').val("")
    })
    $('.search-bar-close').click(() => {
        $('.search-bar input').val("");
        musicFilteringFunction();
    })
    $('.search-bar input').click(function() {
        $('.container-search-result').show(200)
        $('.focus-shadow').show(200)
        $('.container-user-settings').hide(200)
        profileWasClicked = true;
        canKeyboardEvents = false;
    });
    $('.container-settings .user-settings').click(function() {
        toggleTemplateUser();
    });
    
    $('.focus-shadow').click(()=>{
        $('.focus-shadow').hide(200)
        $('.container-search-result').hide(200)
        $('.container-user-settings').hide(200)
        profileWasClicked = true;
        canKeyboardEvents = true;
    })

    searchBarInput.oninput = () => {
        musicFilteringFunction();
    };
}

function toggleTemplateUser() {
    if(profileWasClicked){
        $('.container-user-settings').show(200)
        $('.focus-shadow').show(200)
        $('.container-search-result').hide(200)
        profileWasClicked = false;
        canKeyboardEvents = false;
    }
    else {
        $('.focus-shadow').hide(200)
        $('.container-search-result').hide(200)
        $('.container-user-settings').hide(200)
        profileWasClicked = true;
        canKeyboardEvents = true;
    }
}

function setMusicPlayTag() {
    $(".music-playing").removeClass("music-playing");
    $(`div[data-id="${indexAudioId}"]`).siblings("div.info-item").addClass("music-playing");
}


function videoResizingFunction() {
    document.querySelector(".container-frame iframe").style.width = 0 + "px";
    document.querySelector(".container-frame iframe").style.height = 0 + "px";

    var widthOfVideo = parseInt(getComputedStyle(document.querySelector('.ghost-frame')).width);
    var heightOfVideo;

    heightOfVideo = parseFloat(widthOfVideo) * (563 / 1000) + "px";
    widthOfVideo = widthOfVideo + "px";
    if (parseFloat(widthOfVideo) > 1000) {
        widthOfVideo = 1000 + "px";
    }
    if (parseFloat(heightOfVideo) > 566.5) {
        heightOfVideo = 566.5 + "px";
    }
    if(document.querySelector(".container-frame iframe")){
        document.querySelector(".container-frame iframe").style.width = widthOfVideo;
        document.querySelector(".container-frame iframe").style.height = heightOfVideo;
    }
}

function logoutService() {
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

    window.location = '/'
}

function getCookie(k) {
    var cookies = " " + document.cookie;
    var key = " " + k + "=";
    var start = cookies.indexOf(key);

    if (start === -1) return null;

    var pos = start + key.length;
    var last = cookies.indexOf(";", pos);

    if (last !== -1) return cookies.substring(pos, last);

    return cookies.substring(pos);
}

async function manageHistoric() {
    const idUserConnected = getCookie("user")
    let music = { musicId: indexAudioId }

    const resposta = await fetch(`/songs-historic/${idUserConnected}`, {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(music)
    });
    if(resposta.status == 200){
        refreshUser();
    }
    if(resposta.status != 200){
        alert("Internal Error!")
    }
}

async function manageHistoricClear() {
    const idUserConnected = getCookie("user")
    let music = { musicId: "clear" }

    const resposta = await fetch(`/songs-historic/${idUserConnected}`, {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(music)
    });
    if(resposta.status == 200){
        refreshUser();
    }
    if(resposta.status != 200){
        alert("Internal Error!")
    }
}

async function manageFavorite() {
    const idUserConnected = getCookie("user")
    let music = { musicId: indexAudioId }
    musicFavoriteIcon.style.pointerEvents = "none"
    
    const resposta = await fetch(`/songs-favorite/${idUserConnected}`, {
        method: "POST",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(music)
    });

    const respostaJson = await resposta.json()

    if(respostaJson.message == "limit reached"){
        alert("Limite de músicas favoritas atingido!")
    }
    if(resposta.status == 200){
        await refreshUser()
        refreshFavorite();
        musicFavoriteIcon.style.pointerEvents = "auto"
    }
    if(resposta.status != 200){
        musicFavoriteIcon.style.pointerEvents = "auto"
        alert("Internal Error!")
    }
}

async function refreshUser() {
    const idUserConnected = getCookie("user")
    const responseUser = await fetch(`/users/${idUserConnected}`);
    const user = await responseUser.json();

    userData = user.user;
    
    containerItemsHistoric.innerHTML = ""
    generatorContainerHistoricData();
    generatorContainerHistoricDataPlay();
    themeChanger(musicDataShuffled[indexAudio].theme);
}

async function refreshFavorite() {
    let isFound = false;
    
    let songFavorite = userData.favoriteSongs.find(element => element.musicId == musicDataShuffled[indexAudio]._id)

    if(songFavorite){
        musicFavoriteIcon.name = "heart"
        isFound = true;
    }
    
    if (!isFound) {
        musicFavoriteIcon.name = "heart-outline"
    }

    containerItemsFavorite.innerHTML = ""
    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
    themeChanger(musicDataShuffled[indexAudio].theme);
}

async function musicListingService() {
    const idUserConnected = getCookie("user")

    const responseSongs = await fetch('/songs');
    const songs = await responseSongs.json();

    const responseUser = await fetch(`/users/${idUserConnected}`);
    const user = await responseUser.json();

    musicData = songs.songs
    userData = user.user;

    musicDataShuffled = [...musicData];

    musicDataFiltered = musicData.filter(
        (music) =>
        music.title.toLowerCase().includes(searchBarInput.value.toLowerCase())
        )
    
        while (musicDataFiltered.length > 5) {
            musicDataFiltered.pop();
        }

    inicia();
}

musicListingService();