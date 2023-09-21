const audioGlobal = document.querySelector('#audio-global');
let indexAudio = 0;
let indexAudioId = "";
let indexAudioGender = "";

let screenWidth = 0;
let screenHeight = 0;

let initialDevice = "";

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

const morePlaylist = document.querySelector(".more-playlist");
const selectPlaylist = document.querySelector('#selectPlaylist');
const selectPlaylistMobile = document.querySelector('#selectPlaylistMobile');
const selectManagementSystem = document.querySelector('#selectManagementSystem');
const selectManagementSystemMobile = document.querySelector('#selectManagementSystemMobile');
const selectFavorites = document.querySelector('#selectFavorites');
const selectFavoritesMobile = document.querySelector('#selectFavoritesMobile');
const backMenu = document.querySelector('#backMenu');
const backMenuMobile = document.querySelector('#backMenuMobile');
const backPlaylist = document.querySelector(".select-playlist-back");

const containerPlaylistSelect = document.querySelector('.container-select-playlists');

const containerPlaylistMobile = document.querySelector('.container-playlist-mobile')

const coverCurrentMusicMobile = document.querySelector('.main-controls-mobile .box-wrapper .cover-item img');
const titleCurrentMusicMobile = document.querySelector('.main-controls-mobile .box-wrapper .info-item .title-info');
const genderCurrentMusicMobile = document.querySelector('.main-controls-mobile .box-wrapper .info-item .gender-info');
const titleCurrentMusicDisplayMobile = document.querySelector('.main-display-mobile .info-current-music-mobile .title-info-current-music-mobile');
const genderCurrentMusicDisplayMobile = document.querySelector('.main-display-mobile .info-current-music-mobile .gender-info-current-music-mobile');

const controlsMobile = document.querySelector('.main-controls-mobile');
const displayMobile = document.querySelector('.main-display-mobile');
const backgroundCoverMobile = document.querySelector('.main-display-mobile .background-cover-mobile');
const backDisplayMobile = document.querySelector(".main-display-mobile .display-back")
const currentCoverMobile = document.querySelector('.main-display-mobile .current-cover-mobile img');
const containerFrameVideoMobile = document.querySelector(".container-frame-mobile");

const audioControllerPrevMobile = document.querySelector('#audio-prev-mobile');
const audioControllerPlayMobile = document.querySelector('#audio-play-mobile');
const audioControllerNextMobile = document.querySelector('#audio-next-mobile');

const repeatIconMobile = document.querySelector('.main-display-mobile .repeat-icon-mobile ion-icon')
const shuffleIconMobile = document.querySelector('.main-display-mobile .shuffle-icon-mobile ion-icon')

const sliderMusicDurationMobile = document.querySelector('.slider-music-duration-mobile .slider-music-duration-wrapper-mobile input');
const sliderMusicDurationDotMobile = document.querySelector('.slider-music-duration-mobile .slider-music-duration-wrapper-mobile .slider-music-duration-dot-mobile');

const currentDurationMobile = document.querySelector('.main-display-mobile .current-duration-mobile');
const totalDurationMobile = document.querySelector('.main-display-mobile .total-duration-mobile');

const morePlaylistMobile = document.querySelector(".more-playlist-mobile");
const backPlaylistMobile = document.querySelector(".select-playlist-back-mobile");

const containerPlaylistSelectMobile = document.querySelector('.container-select-playlists-mobile');

const displayMusicDurationMobile = document.querySelector(".main-controls-mobile .display-music-duration-mobile")

const userNameMobile = document.querySelector('.user-name-mobile');
const registrationDateMobile = document.querySelector('.registration-date-mobile');

const containerItemsFavoriteMobile = document.querySelector('.container-favorite-mobile');
const containerItemsHistoricMobile = document.querySelector('.container-historic-mobile');

const musicFavoriteIconMobile = document.querySelector(".main-display-mobile .current-music-favorite-mobile ion-icon")

const logoutMobile = document.querySelector(".logout-mobile");

const clearHistoricIconMobile = document.querySelector(".content-profile-mobile .title-2-wrapper-mobile .trash-icon-mobile")

const containerItemsSearchMobile = document.querySelector('.container-search-mobile')

const searchBarInputMobile = document.querySelector('#search-bar-input-mobile');

let musicData = [];
let musicDataShuffled = [];
let musicDataFiltered = [];

let userData;

let playlistData = [];


let audioControllerPlayToggle = true;

audioControllerPlay.addEventListener("click", audioControllerPlayFunction)
audioControllerNext.addEventListener("click", audioControllerNextFunction)
audioControllerPrev.addEventListener("click", audioControllerPrevFunction)

audioControllerPlayMobile.addEventListener("click", audioControllerPlayFunction)
audioControllerNextMobile.addEventListener("click", audioControllerNextFunction)
audioControllerPrevMobile.addEventListener("click", audioControllerPrevFunction)

window.addEventListener("resize", allFunctionResizing);

let canKeyboardEvents = true;
let canKeyboardEventsProfile = true;
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
            }
        }
    if(canKeyboardEventsProfile && event.key == "p"){
        toggleTemplateUser();
    }
})

logout.addEventListener("click", logoutService);
logoutMobile.addEventListener("click", logoutService);
clearHistoricIcon.addEventListener("click", manageHistoricClear);
clearHistoricIconMobile.addEventListener("click", manageHistoricClear);
musicFavoriteIcon.addEventListener("click", manageFavorite);
musicFavoriteIconMobile.addEventListener("click", manageFavorite);
selectPlaylist.addEventListener("click", () => {
    toggleMenu()
    toggleMorePlaylists()
});
selectPlaylistMobile.addEventListener("click", () => {
    toggleMenu()
    toggleMorePlaylists()
});
selectFavorites.addEventListener('click' , () => {
    toggleMenu()
    selectNewPlaylist("Favorite", "Músicas Favoritas")
})
selectFavoritesMobile.addEventListener('click' , () => {
    toggleMenu()
    selectNewPlaylist("Favorite", "Músicas Favoritas")
})

morePlaylist.addEventListener("click", toggleMenu);
backMenu.addEventListener("click", toggleMenu);
backMenuMobile.addEventListener("click", toggleMenu);
backPlaylist.addEventListener("click", toggleMorePlaylists);
backDisplayMobile.addEventListener("click", toggleDisplayMobile)
morePlaylistMobile.addEventListener("click", toggleMenu);
backPlaylistMobile.addEventListener("click", toggleMorePlaylists);
controlsMobile.addEventListener("click", () => {
    toggleDisplayMobile()
    $(".menu-options-mobile").hide(200)
})

document.querySelector('.service-logo').addEventListener("click", () => {
    window.location = '/'
})

function inicia(){
    setScreenWidthAndHeight();
    allSongValueSetters();
    setUserSettings();
    generatorContainerPlaylistData();
    generatorContainerPlaylistDataPlay();
    generatorContainerPlaylistSelectData();
    generatorContainerPlaylistSelectDataPlay();
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
    indexAudioGender = musicDataShuffled[indexAudio].gender;
    $(".title-playlist").html(userData.lastAccessedPlaylistName);
    $(".title-playlist-mobile").html(userData.lastAccessedPlaylistName);
    setMusicPlayTag();
    refreshFavorite();
    manageHistoric();
    audioControllerPlayAudioAndVideo();
    initialDeviceDefinition();
    setManagementSystem()
}

function audioControllerPlayFunction(){
    if (screenWidth >= 1360) {
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
    } else {
        if(audioControllerPlayToggle){
            audioGlobal.play();
            audioControllerPlayToggle = false;
            audioControllerPlayMobile.name = 'pause-circle';
        }
        else {
            audioGlobal.pause();
            audioControllerPlayToggle = true;
            audioControllerPlayMobile.name = 'play-circle';
        }
    }
}
function audioControllerPlayFunctionNoPause(){
    if (screenWidth >= 1360) {
        if(musicDataShuffled[indexAudio].isVideo){
            audioGlobal.pause()
            document.querySelector(".container-side-2").style.display = "none"
            musicAnimationStatus.classList.remove('run');

            return;
        }

        audioGlobal.play();
        audioControllerPlayToggle = false;
        audioControllerPlay.name = 'pause-circle';
        musicAnimationStatus.classList.add('run');

        document.querySelector(".container-side-2").style.display = "flex"
    } else {
        if(musicDataShuffled[indexAudio].isVideo){
            audioGlobal.pause()
            document.querySelector(".main-display-mobile").classList.add("video-mode")

            return;
        }

        audioGlobal.play();
        audioControllerPlayToggle = false;
        audioControllerPlayMobile.name = 'pause-circle';
        document.querySelector(".main-display-mobile").classList.remove("video-mode")
    }
}

function allSongValueSetters(){
    if(musicData.length <= 0){
        alert("A PlayList atual não tem conteúdo");
        return
    }
    if (screenWidth >= 1360) {
        if(musicDataShuffled[indexAudio].isVideo){
            indexAudioId = musicDataShuffled[indexAudio]._id;
            indexAudioGender = musicDataShuffled[indexAudio].gender;
            coverCurrentMusic.src = musicDataShuffled[indexAudio].coverUrl;
            containerFrameVideo.style.display = "block"
            currentCover.style.display = "none"
            backgroundCover.style.setProperty("background-image", `url("${musicDataShuffled[indexAudio].coverUrl}")`);
            titleCurrentMusic.innerHTML = musicDataShuffled[indexAudio].title;
            genderCurrentMusic.innerHTML = musicDataShuffled[indexAudio].gender;

            containerFrameVideo.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${musicDataShuffled[indexAudio].audioUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

            videoResizingFunction();

            return;
        }

        audioGlobal.src = musicDataShuffled[indexAudio].audioUrl;
        indexAudioId = musicDataShuffled[indexAudio]._id;
        indexAudioGender = musicDataShuffled[indexAudio].gender;
        coverCurrentMusic.src = musicDataShuffled[indexAudio].coverUrl;
        containerFrameVideo.style.display = "none"
        currentCover.style.display = "block"
        currentCover.src = musicDataShuffled[indexAudio].coverUrl;
        backgroundCover.style.setProperty("background-image", `url("${musicDataShuffled[indexAudio].coverUrl}")`);
        titleCurrentMusic.innerHTML = musicDataShuffled[indexAudio].title;
        genderCurrentMusic.innerHTML = musicDataShuffled[indexAudio].gender;
        containerFrameVideo.innerHTML = "";
    } else {
        if(musicDataShuffled[indexAudio].isVideo){
            indexAudioId = musicDataShuffled[indexAudio]._id;
            indexAudioGender = musicDataShuffled[indexAudio].gender;
            coverCurrentMusicMobile.src = musicDataShuffled[indexAudio].coverUrl;
            containerFrameVideoMobile.style.display = "block"
            currentCoverMobile.style.display = "none"
            backgroundCoverMobile.style.setProperty("background-image", `url("${musicDataShuffled[indexAudio].coverUrl}")`);
            titleCurrentMusicMobile.innerHTML = musicDataShuffled[indexAudio].title;
            genderCurrentMusicMobile.innerHTML = musicDataShuffled[indexAudio].gender;
            titleCurrentMusicDisplayMobile.innerHTML = musicDataShuffled[indexAudio].title;
            genderCurrentMusicDisplayMobile.innerHTML = musicDataShuffled[indexAudio].gender;
            $(displayMusicDurationMobile).hide()

            containerFrameVideoMobile.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${musicDataShuffled[indexAudio].audioUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

            videoResizingFunction();

            return;
        }

        audioGlobal.src = musicDataShuffled[indexAudio].audioUrl;
        audioGlobal.volume = 1
        indexAudioId = musicDataShuffled[indexAudio]._id;
        indexAudioGender = musicDataShuffled[indexAudio].gender;
        coverCurrentMusicMobile.src = musicDataShuffled[indexAudio].coverUrl;
        containerFrameVideoMobile.style.display = "none"
        currentCoverMobile.style.display = "block"
        currentCoverMobile.src = musicDataShuffled[indexAudio].coverUrl;
        backgroundCoverMobile.style.setProperty("background-image", `url("${musicDataShuffled[indexAudio].coverUrl}")`);
        titleCurrentMusicMobile.innerHTML = musicDataShuffled[indexAudio].title;
        genderCurrentMusicMobile.innerHTML = musicDataShuffled[indexAudio].gender;
        titleCurrentMusicDisplayMobile.innerHTML = musicDataShuffled[indexAudio].title;
        genderCurrentMusicDisplayMobile.innerHTML = musicDataShuffled[indexAudio].gender;
        containerFrameVideoMobile.innerHTML = "";
        $(displayMusicDurationMobile).show()
    }
}

function setUserSettings(){
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

    if (screenWidth >= 1360) {
        registrationDate.innerHTML = `Registrou-se em: ${day} de ${month} ${year}`;
        userName.innerHTML = userData.name;
    } else {
        registrationDateMobile.innerHTML = `Registrou-se em: ${day} de ${month} ${year}`;
        userNameMobile.innerHTML = userData.name;
    }
}

function audioControllerNextFunction(){
    indexAudio++;
    if(indexAudio >= musicDataShuffled.length){
        indexAudio = 0;
    }
    
    let selectedTheme = musicDataShuffled[indexAudio].theme
    indexAudioId = musicDataShuffled[indexAudio]._id;
    indexAudioGender = musicDataShuffled[indexAudio].gender;
    
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
    indexAudioGender = musicDataShuffled[indexAudio].gender;

    allSongValueSetters();
    audioControllerPlayFunctionNoPause()
    setMusicPlayTag();
    manageHistoric();
    refreshFavorite();
    themeChanger(selectedTheme);
}

function generatorContainerPlaylistData(){
    if (screenWidth >= 1360) {
        musicDataShuffled.forEach((element) => {

            containerPlaylist.innerHTML += `
                <div class="item-playlist" data-id="${element._id}" data-theme="${element.theme}">
                    <div class="box-wrapper">
                        <div class="cover-item">
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

                    <div class="play-button-item">
                        <ion-icon name="play-circle"></ion-icon>
                    </div>
                </div>
            `
        })
    } else {
        musicDataShuffled.forEach((element) => {

            containerPlaylistMobile.innerHTML += `
                <div class="item-playlist-mobile" data-id="${element._id}" data-theme="${element.theme}">
                    <div class="box-wrapper">
                        <div class="cover-item">
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

                    <div class="play-button-item">
                        <ion-icon name="play-circle"></ion-icon>
                    </div>
                </div>
            `
        })
    }
}

function generatorContainerPlaylistDataPlay(){
    if (screenWidth >= 1360) {
        const itemsPlaylist = document.querySelectorAll('.container-playlist .item-playlist');

        itemsPlaylist.forEach((element)=> {
            element.addEventListener('click', function(){
                let cannotPlayTheMusic = false;
                if (indexAudio == musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))) {
                    cannotPlayTheMusic = true;
                }

                indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
                let selectedTheme = $(this).data('theme')
                indexAudioId = musicDataShuffled[indexAudio]._id;
                indexAudioGender = musicDataShuffled[indexAudio].gender;
                
                if (!cannotPlayTheMusic) {
                    allSongValueSetters();
                    audioControllerPlayFunctionNoPause();
                    setMusicPlayTag();
                    manageHistoric();
                    refreshFavorite();
                    themeChanger(selectedTheme);
                }
            });
        })
    } else {
        const itemsPlaylistMobile = document.querySelectorAll('.container-playlist-mobile .item-playlist-mobile');

        itemsPlaylistMobile.forEach((element)=> {
            element.addEventListener('click', function(){
                let cannotPlayTheMusic = false;
                if (indexAudio == musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))) {
                    cannotPlayTheMusic = true;
                }

                indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
                let selectedTheme = $(this).data('theme')
                indexAudioId = musicDataShuffled[indexAudio]._id;
                indexAudioGender = musicDataShuffled[indexAudio].gender;
                
                toggleDisplayMobile();

                if (!cannotPlayTheMusic) {
                    allSongValueSetters();
                    audioControllerPlayFunctionNoPause();
                    setMusicPlayTag();
                    manageHistoric();
                    refreshFavorite();
                    themeChanger(selectedTheme);
                }
            });
        })
    }
}

function generatorContainerPlaylistSelectData(){
    if (screenWidth >= 1360) {
        playlistData.forEach((element) => {

            containerPlaylistSelect.innerHTML += `
                <div class="item-select-playlist">
                    <div class="cover-item-select-playlist" data-gender="${element.gender}" data-title="${element.title}">
                        <img src="${element.coverUrl}">
                    </div>
                    <div class="info-item-select-playlist">
                        <div class="title-item-select-playlist">
                            ${element.title}
                        </div>
                        <div class="description-item-select-playlist">
                            ${element.description}
                        </div>
                        <div class="total-music-item-select-playlist">
                            Total de ${element.totalSongs} músicas
                        </div>
                    </div>
                </div>
            `
        })
    } else {
        playlistData.forEach((element) => {

            containerPlaylistSelectMobile.innerHTML += `
                <div class="item-select-playlist-mobile">
                    <div class="cover-item-select-playlist-mobile" data-gender="${element.gender}" data-title="${element.title}">
                        <img src="${element.coverUrl}">
                    </div>
                    <div class="info-item-select-playlist-mobile">
                        <div class="title-item-select-playlist-mobile">
                            ${element.title}
                        </div>
                        <div class="description-item-select-playlist-mobile">
                            ${element.description}
                        </div>
                        <div class="total-music-item-select-playlist-mobile">
                            Total de ${element.totalSongs} músicas
                        </div>
                    </div>
                </div>
            `
        })
    }
}

function generatorContainerPlaylistSelectDataPlay(){
    if (screenWidth >= 1360) {
        const itemsSelectPlaylist = document.querySelectorAll('.container-select-playlists .item-select-playlist .cover-item-select-playlist');

        itemsSelectPlaylist.forEach((element)=> {
            element.addEventListener('click', function(){
                const playlistValue = $(this).data('gender')
                const playlistName = $(this).data('title')
                toggleMorePlaylists();
                selectNewPlaylist(playlistValue, playlistName);

            });
        })
    } else {
        const itemsSelectPlaylistMobile = document.querySelectorAll('.item-select-playlist-mobile .cover-item-select-playlist-mobile');

        itemsSelectPlaylistMobile.forEach((element)=> {
            element.addEventListener('click', function(){
                const playlistValue = $(this).data('gender')
                const playlistName = $(this).data('title')
                toggleMorePlaylists();
                selectNewPlaylist(playlistValue, playlistName);
            });
        })
    }
}

function generatorContainerSearchData(){
    if (screenWidth >= 1360) {
        musicDataFiltered = musicData.filter(
            (music) =>
            music.title.toLowerCase().includes(searchBarInput.value.toLowerCase())
        )
        
        while (musicDataFiltered.length > 10) {
            musicDataFiltered.pop();
        }

        musicDataFiltered.forEach((element) => {

            containerItemsSearch.innerHTML += `
                <div class="item-playlist-search" data-id="${element._id}" data-theme="${element.theme}">
                    <div class="box-wrapper-search">
                        <div class="cover-item-search">
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
                    <div class="play-button-item">
                        <ion-icon name="play-circle"></ion-icon>
                    </div>
                </div>
            `
        })
    } else {
        musicDataFiltered = musicData.filter(
            (music) =>
            music.title.toLowerCase().includes(searchBarInputMobile.value.toLowerCase())
        )
        
        while (musicDataFiltered.length > 10) {
            musicDataFiltered.pop();
        }
        
        musicDataFiltered.forEach((element) => {

            containerItemsSearchMobile.innerHTML += `
                <div class="item-search-mobile" data-id="${element._id}" data-theme="${element.theme}">
                    <div class="box-wrapper-search">
                        <div class="cover-item-search">
                            <img src="${element.coverUrl}"">
                        </div>
                        <div class="info-item-search">
                            <div class="title-info">
                                ${element.title}
                            </div>
                            <div class="gender-info">
                                ${element.gender}
                            </div>
                        </div>
                    </div>
                    <div class="play-button-item">
                        <ion-icon name="play-circle"></ion-icon>
                    </div>
                </div>
            `
        })
    }
}

function generatorContainerSearchDataPlay(){
    if (screenWidth >= 1360) {
        const itemsPlaylistSearch = document.querySelectorAll('.container-items .item-playlist-search');

        itemsPlaylistSearch.forEach((element)=> {
            element.addEventListener('click', function(){
                let cannotPlayTheMusic = false;
                if (indexAudio == musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))) {
                    cannotPlayTheMusic = true;
                }

                indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
                let selectedTheme = $(this).data('theme')
                indexAudioId = musicDataShuffled[indexAudio]._id;
                indexAudioGender = musicDataShuffled[indexAudio].gender;

                if (!cannotPlayTheMusic) {
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
                    canKeyboardEventsProfile = true;
                }
            });
        })
    } else {
        const itemsPlaylistSearchMobile = document.querySelectorAll('.container-search-mobile .item-search-mobile');

        itemsPlaylistSearchMobile.forEach((element)=> {
            element.addEventListener('click', function(){
                let cannotPlayTheMusic = false;
                if (indexAudio == musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))) {
                    cannotPlayTheMusic = true;
                }

                indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
                let selectedTheme = $(this).data('theme')
                indexAudioId = musicDataShuffled[indexAudio]._id;
                indexAudioGender = musicDataShuffled[indexAudio].gender;

                $('.main-search-mobile').hide(200)
                toggleDisplayMobile()

                if (!cannotPlayTheMusic) {
                    allSongValueSetters();
                    audioControllerPlayFunctionNoPause();
                    setMusicPlayTag();
                    manageHistoric();
                    refreshFavorite();
                    themeChanger(selectedTheme);
                
                    profileWasClicked = true;
                    canKeyboardEvents = true;
                    canKeyboardEventsProfile = true;
                }
            });
        })
    }
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

    if (screenWidth >= 1360) {
        favoriteSongs.forEach((element) => {

            containerItemsFavorite.innerHTML += `
                <div class="item-playlist-favorite" data-id="${element._id}" data-theme="${element.theme}">
                    <div class="box-wrapper-favorite">
                        <div class="cover-item-favorite">
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
                    <div class="play-button-item">
                        <ion-icon name="play-circle"></ion-icon>
                    </div>
                </div>
            `
        })
    } else {
        favoriteSongs.forEach((element) => {

            containerItemsFavoriteMobile.innerHTML += `
                <div class="item-favorite-mobile" data-id="${element._id}" data-theme="${element.theme}">
                    <div class="box-wrapper-favorite">
                        <div class="cover-item-favorite">
                            <img src="${element.coverUrl}">
                        </div>
                        <div class="info-item-favorite">
                            <div class="title-info">
                                ${element.title}
                            </div>
                            <div class="gender-info">
                                ${element.gender}
                            </div>
                        </div>
                    </div>
                    <div class="play-button-item">
                        <ion-icon name="play-circle"></ion-icon>
                    </div>
                </div>
            `
        })
    }
}

function generatorContainerFavoriteDataPlay(){
    if (screenWidth >= 1360) {
        const itemsPlaylistFavorite = document.querySelectorAll('.container-favorite .item-playlist-favorite');

        itemsPlaylistFavorite.forEach((element)=> {
            element.addEventListener('click', function(){
                let cannotPlayTheMusic = false;
                if (indexAudio == musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))) {
                    cannotPlayTheMusic = true;
                }

                indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
                let selectedTheme = $(this).data('theme')
                indexAudioId = musicDataShuffled[indexAudio]._id;
                indexAudioGender = musicDataShuffled[indexAudio].gender;

                if (!cannotPlayTheMusic) {
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
                    canKeyboardEventsProfile = true;
                }
            });
        })
    } else {
        const itemsPlaylistFavoriteMobile = document.querySelectorAll('.container-favorite-mobile .item-favorite-mobile');

        itemsPlaylistFavoriteMobile.forEach((element)=> {
            element.addEventListener('click', function(){
                let cannotPlayTheMusic = false;
                if (indexAudio == musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))) {
                    cannotPlayTheMusic = true;
                }

                indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
                let selectedTheme = $(this).data('theme')
                indexAudioId = musicDataShuffled[indexAudio]._id;
                indexAudioGender = musicDataShuffled[indexAudio].gender;
                
                $('.main-user-settings-mobile').hide(200);
                toggleDisplayMobile()

                if (!cannotPlayTheMusic) {
                    allSongValueSetters();
                    audioControllerPlayFunctionNoPause();
                    setMusicPlayTag();
                    manageHistoric();
                    refreshFavorite();
                    themeChanger(selectedTheme);
                    
                    profileWasClicked = true;
                    canKeyboardEvents = true;
                    canKeyboardEventsProfile = true;
                }
            });
        })
    }
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
    
    if (screenWidth >= 1360) {
        historicSongs.forEach((element) => {

            containerItemsHistoric.innerHTML += `
                <div class="item-playlist-historic" data-id="${element._id}" data-theme="${element.theme}">
                    <div class="box-wrapper-historic">
                        <div class="cover-item-historic">
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
                    <div class="play-button-item">
                        <ion-icon name="play-circle"></ion-icon>
                    </div>
                </div>
            `
        })
    } else {
        historicSongs.forEach((element) => {

            containerItemsHistoricMobile.innerHTML += `
                <div class="item-historic-mobile" data-id="${element._id}" data-theme="${element.theme}">
                    <div class="box-wrapper-historic">
                        <div class="cover-item-historic">
                            <img src="${element.coverUrl}">
                        </div>
                        <div class="info-item-historic">
                            <div class="title-info">
                                ${element.title}
                            </div>
                            <div class="gender-info">
                                ${element.gender}
                            </div>
                        </div>
                    </div>
                    <div class="play-button-item">
                        <ion-icon name="play-circle"></ion-icon>
                    </div>
                </div>
            `
        })
    }
}

function generatorContainerHistoricDataPlay(){
    if (screenWidth >= 1360) {
        const itemsPlaylistHistoric = document.querySelectorAll('.container-historic .item-playlist-historic');

        itemsPlaylistHistoric.forEach((element)=> {
            element.addEventListener('click', function(){
                let cannotPlayTheMusic = false;
                if (indexAudio == musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))) {
                    cannotPlayTheMusic = true;
                }

                indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
                let selectedTheme = $(this).data('theme')
                indexAudioId = musicDataShuffled[indexAudio]._id;
                indexAudioGender = musicDataShuffled[indexAudio].gender;

                if (!cannotPlayTheMusic) {
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
                    canKeyboardEventsProfile = true;
                }
            });
        })
    } else {
        const itemsPlaylistHistoricMobile = document.querySelectorAll('.container-historic-mobile .item-historic-mobile');

        itemsPlaylistHistoricMobile.forEach((element)=> {
            element.addEventListener('click', function(){
                let cannotPlayTheMusic = false;
                if (indexAudio == musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))) {
                    cannotPlayTheMusic = true;
                }

                indexAudio = musicDataShuffled.indexOf(musicDataShuffled.find(element => element._id == $(this).data('id')))
                let selectedTheme = $(this).data('theme')
                indexAudioId = musicDataShuffled[indexAudio]._id;
                indexAudioGender = musicDataShuffled[indexAudio].gender;

                $('.main-user-settings-mobile').hide(200);
                toggleDisplayMobile()

                if (!cannotPlayTheMusic) {
                    allSongValueSetters();
                    audioControllerPlayFunctionNoPause();
                    setMusicPlayTag();
                    manageHistoric();
                    refreshFavorite();
                    themeChanger(selectedTheme);
                    
                    profileWasClicked = true;
                    canKeyboardEvents = true;
                    canKeyboardEventsProfile = true;
                }
            });
        })
    }
}

function themeChanger(selectedTheme){
    if (screenWidth >= 1360) {
        let allElementsChangeableByTheme = document.querySelectorAll(".main-playlist, .container-playlist, .search-bar, .container-settings .user-settings, .main-display .clock-settings, .container-side-1 .current-music-rating, .container-side-1 .current-music-favorite, .slider-music-duration, .slider-music-duration-wrapper .slider-music-duration-dot, .slider-music-volume-wrapper .slider-music-volume-dot, .container-volume .slider-music-volume, .container-volume .slider-music-volume, .container-playlist .item-playlist, .main-controls, .container-funcions .repeat-icon, .container-funcions .shuffle-icon, .layer-search-result, .box-search-result, .item-playlist-search, .layer-user-settings, .box-user-settings, .box-profile .user-settings, .item-playlist-favorite, .item-playlist-historic, .main-playlist .box-wrapper-info .more-playlist, .main-select-playlists, .main-select-playlists .select-playlist-back, .container-select-playlists .item-select-playlist, .main-playlist .menu-options, .main-playlist .menu-options .box-wrapper-info .back-menu-options, .main-playlist .menu-options .option");
        let serviceLogo = document.querySelector('.service-logo img');

        initDurationSlider();
        initVolumeSlider();
        
        if(selectedTheme == "Original"){
            allElementsChangeableByTheme.forEach(element => element.classList.remove("rock-version", "hatsune-miku-version", "amv-brasileiro-version"));
            serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo.png";
            return;
        }
        if(selectedTheme == "Rock Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("hatsune-miku-version", "amv-brasileiro-version")
                element.classList.add("rock-version")
            });
            serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo-rock-version.png";
            return;
        }
        if(selectedTheme == "Hatsune Miku Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("rock-version", "amv-brasileiro-version")
                element.classList.add("hatsune-miku-version")
            });
            serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo-hatsune-miku-version.png";
            return;
        }
        if(selectedTheme == "AMV Brasileiro Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("rock-version", "hatsune-miku-version")
                element.classList.add("amv-brasileiro-version")
            });
            serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo-amv-brasileiro-version.png";
            return;
        }
    } else {
        let allElementsChangeableByTheme = document.querySelectorAll(".super-main-mobile, .header-mobile .user-settings, .main-playlist-mobile, .box-wrapper-info-mobile .more-playlist-mobile, .container-playlist-mobile, .container-playlist-mobile .item-playlist-mobile, .main-controls-mobile, .main-controls-mobile .display-music-duration-mobile, .main-display-mobile .info-current-music-mobile .title-info-current-music-mobile, .main-display-mobile .info-current-music-mobile .gender-info-current-music-mobile, .main-display-mobile .current-music-favorite-mobile, .main-display-mobile .repeat-icon-mobile, .main-display-mobile .shuffle-icon-mobile, .slider-music-duration-mobile .slider-music-duration-wrapper-mobile, .slider-music-duration-mobile .slider-music-duration-wrapper-mobile .slider-music-duration-dot-mobile, .main-select-playlists-mobile, .main-select-playlists-mobile .select-playlist-back-mobile, .main-select-playlists-mobile .container-select-playlists-wrapper .container-select-playlists-mobile, .container-select-playlists-mobile .item-select-playlist-mobile, .main-user-settings-mobile, .main-user-settings-mobile .box-profile-mobile .user-settings-mobile, .main-user-settings-mobile .content-profile-mobile, .container-favorite-mobile .item-favorite-mobile, .container-historic-mobile .item-historic-mobile, .main-search-mobile, .main-search-mobile .search-bar-mobile, .main-search-mobile .content-search-mobile, .container-search-mobile .item-search-mobile, .main-playlist-mobile .menu-options-mobile, .main-playlist-mobile .menu-options-mobile .box-wrapper-info-mobile .back-menu-options-mobile, .main-playlist-mobile .menu-options-mobile .option-mobile");
        let serviceLogo = document.querySelector('.header-mobile .service-logo-mobile img');

        initDurationSlider();

        if(selectedTheme == "Original"){
            allElementsChangeableByTheme.forEach(element => element.classList.remove("rock-version", "hatsune-miku-version", "amv-brasileiro-version"));
            serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo.png";
            return;
        }
        if(selectedTheme == "Rock Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("hatsune-miku-version", "amv-brasileiro-version")
                element.classList.add("rock-version")
            });
            serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo-rock-version.png";
            return;
        }
        if(selectedTheme == "Hatsune Miku Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("rock-version", "amv-brasileiro-version")
                element.classList.add("hatsune-miku-version")
            });
            serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo-hatsune-miku-version.png";
            return;
        }
        if(selectedTheme == "AMV Brasileiro Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("rock-version", "hatsune-miku-version")
                element.classList.add("amv-brasileiro-version")
            });
            serviceLogo.src = "https://pw-music-database.kevinsouza456.repl.co/pw-music-logo-amv-brasileiro-version.png";
            return;
        }
    }
}

let canMoveTheSliderDuration = true;

function musicStateControllers(){
    audioGlobal.addEventListener('timeupdate', () => {

        if (screenWidth >= 1360) {
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
        } else {
            if(canMoveTheSliderDuration){
                sliderMusicDurationMobile.value = parseInt(audioGlobal.currentTime / audioGlobal.duration * 100);
                if(musicDataShuffled[indexAudio].theme == 'Original'){
                    sliderMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`);
                    displayMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`);
                    sliderMusicDurationDotMobile.style.setProperty("left", `${(sliderMusicDurationMobile.value)}%`)
                }
                if(musicDataShuffled[indexAudio].theme == 'Rock Version'){
                    sliderMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%)`);
                    displayMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%)`);
                    sliderMusicDurationDotMobile.style.setProperty("left", `${(sliderMusicDurationMobile.value)}%`)
                }

                let minCurrent = Math.floor(audioGlobal.currentTime / 60);
                let segCurrent = Math.floor(audioGlobal.currentTime % 60);

                if(segCurrent < 10){
                    segCurrent = `0${segCurrent}`
                }

                currentDurationMobile.innerHTML = `${minCurrent}:${segCurrent}`
            }
        }
    })
    audioGlobal.oncanplaythrough = () => {
        let minTotal = Math.floor(audioGlobal.duration / 60);
        let segTotal = Math.floor(audioGlobal.duration % 60);
        
        if(segTotal < 10){
            segTotal = `0${segTotal}`
        }

        if (screenWidth >= 1360) {
            totalDuration.innerHTML = `${minTotal}:${segTotal}`
        } else {
            totalDurationMobile.innerHTML = `${minTotal}:${segTotal}`
        }
    };

    audioGlobal.addEventListener("ended", audioControllerNextFunction);

    repeatIcon.addEventListener("click", repeatToggle);
    shuffleIcon.addEventListener("click", shuffleToggle);

    repeatIconMobile.addEventListener("click", repeatToggle);
    shuffleIconMobile.addEventListener("click", shuffleToggle);
}


function durationSliderEventGenerator(){
    if (screenWidth >= 1360) {
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
    } else {
        sliderMusicDurationMobile.addEventListener("mousedown", () => {
            canMoveTheSliderDuration = false
        })
        sliderMusicDurationMobile.addEventListener("touchstart", () => {
            canMoveTheSliderDuration = false
        })
        sliderMusicDurationMobile.addEventListener("mouseup", () => {
            audioGlobal.currentTime = ((sliderMusicDurationMobile.value) / 100) * audioGlobal.duration;
            audioGlobal.play();
            audioControllerPlayToggle = false;
            audioControllerPlayMobile.name = 'pause-circle';
            musicAnimationStatus.classList.add('run');
            canMoveTheSliderDuration = true
        })
        sliderMusicDurationMobile.addEventListener("touchend", () => {
            audioGlobal.currentTime = ((sliderMusicDurationMobile.value) / 100) * audioGlobal.duration;
            audioGlobal.play();
            audioControllerPlayToggle = false;
            audioControllerPlayMobile.name = 'pause-circle';
            musicAnimationStatus.classList.add('run');
            canMoveTheSliderDuration = true
        })
    
    
        sliderMusicDurationMobile.oninput = () => {
            if(musicDataShuffled[indexAudio].theme == 'Original'){
                sliderMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`);
                sliderMusicDurationDotMobile.style.setProperty("left", `${(sliderMusicDurationMobile.value)}%`)
            }
            if(musicDataShuffled[indexAudio].theme == 'Rock Version'){
                sliderMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%)`);
                sliderMusicDurationDotMobile.style.setProperty("left", `${(sliderMusicDurationMobile.value)}%`)
            }
            sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDurationMobile.value)}%`)
    
            let interactionWithTheSlider = ((sliderMusicDurationMobile.value) / 100) * (audioGlobal.duration)
    
            let minCurrent = Math.floor(interactionWithTheSlider / 60);
            let segCurrent = Math.floor(interactionWithTheSlider % 60);
    
            if(segCurrent < 10){
                segCurrent = `0${segCurrent}`
            }
            currentDurationMobile.innerHTML = `${minCurrent}:${segCurrent}`
        }
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
    if (screenWidth >= 1360) {
        if(musicDataShuffled[indexAudio].theme == 'Original'){
            sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%`);
            sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
        }
        if(musicDataShuffled[indexAudio].theme == 'Rock Version'){
            sliderMusicDuration.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%)`);
            sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
        }
        sliderMusicDurationDot.style.setProperty("left", `${(sliderMusicDuration.value)}%`)
    } else {
        if(musicDataShuffled[indexAudio].theme == 'Original'){
            sliderMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`);
            displayMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-blue-2) 0%, var(--color-blue-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`);
            sliderMusicDurationDotMobile.style.setProperty("left", `${(sliderMusicDurationMobile.value)}%`)
        }
        if(musicDataShuffled[indexAudio].theme == 'Rock Version'){
            sliderMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%)`);
            displayMusicDurationMobile.style.setProperty("background-image", `linear-gradient(to right, var(--color-red-2) 0%, var(--color-red-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%)`);
            sliderMusicDurationDotMobile.style.setProperty("left", `${(sliderMusicDurationMobile.value)}%`)
        }
        sliderMusicDurationDotMobile.style.setProperty("left", `${(sliderMusicDurationMobile.value)}%`)
    }
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
        repeatIconMobile.classList.add('active');

        if(!shuffleToggleControl){
            shuffleToggle();
        }
    }
    else {
        audioGlobal.loop = false;
        repeatToggleControl = true

        repeatIcon.classList.remove('active');
        repeatIconMobile.classList.remove('active');
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
        shuffleIconMobile.classList.add('active');
        
        shuffleToggleControl = false

        shuffleArray(musicDataShuffled)
        
        if(!repeatToggleControl){
            repeatToggle();
        }
    }
    else {
        shuffleIcon.classList.remove('active');
        shuffleIconMobile.classList.remove('active');

        shuffleToggleControl = true
        musicDataShuffled = [...musicData];
        indexAudio = 1
        audioControllerPrevFunction()
    }
}

function musicFilteringFunction(){
    if (screenWidth >= 1360) {
        containerItemsSearch.innerHTML = "";

        $('.song-not-found').hide();
        
        generatorContainerSearchData()
        generatorContainerSearchDataPlay()
        themeChanger(musicDataShuffled[indexAudio].theme);
        
        if (containerItemsSearch.innerHTML == ''){
            $('.song-not-found').show();
        }
    } else {
        containerItemsSearchMobile.innerHTML = "";

        $('.song-not-found-mobile').hide();
        
        generatorContainerSearchData()
        generatorContainerSearchDataPlay()
        themeChanger(musicDataShuffled[indexAudio].theme);
        
        if (containerItemsSearchMobile.innerHTML == ''){
            $('.song-not-found-mobile').show();
        }
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
    $('.main-search-mobile .search-bar-mobile .search-bar-close-mobile').click(() => {
        $('.main-search-mobile .search-bar-mobile input').val("");
        musicFilteringFunction();
    })
    $('.search-bar input').click(function() {
        $('.container-search-result').show(200)
        $('.focus-shadow').show(200)
        $('.container-user-settings').hide(200)
        $(".menu-options").hide(200)
        profileWasClicked = true;
        canKeyboardEvents = false;
        canKeyboardEventsProfile = false;
    });
    $('.container-settings .user-settings').click(function() {
        toggleTemplateUser();
    });
    $('.header-mobile .box-wrapper-header-mobile .user-settings').click(function() {
        toggleTemplateUser();
    });
    
    $('.focus-shadow').click(()=>{
        $('.focus-shadow').hide(200)
        $('.container-search-result').hide(200)
        $('.container-user-settings').hide(200)
        profileWasClicked = true;
        canKeyboardEvents = true;
        canKeyboardEventsProfile = true;
    })

    searchBarInput.oninput = () => {
        musicFilteringFunction();
    };
    searchBarInputMobile.oninput = () => {
        musicFilteringFunction();
    };

    $('.header-mobile .user-settings').click(()=>{
        $('.main-user-settings-mobile').toggle(200)
        $(".menu-options-mobile").hide(200)
    })
    $('.main-user-settings-mobile .display-back').click(()=>{
        $('.main-user-settings-mobile').toggle(200)
    })
    $('.header-mobile .search-icon-mobile').click(()=>{
        $('.main-search-mobile').toggle(200)
        $(".menu-options-mobile").hide(200)
        $('.main-controls-mobile').addClass("fixed")
    })
    $('.main-search-mobile .display-back').click(()=>{
        $('.main-search-mobile').toggle(200)
        $('.main-controls-mobile').removeClass("fixed")
    })
}

function toggleTemplateUser() {
    if(profileWasClicked){
        $('.container-user-settings').show(200)
        $('.focus-shadow').show(200)
        $('.container-search-result').hide(200)
        $(".menu-options").hide(200)
        profileWasClicked = false;
        canKeyboardEvents = false;
        canKeyboardEventsProfile = true;
    }
    else {
        $('.focus-shadow').hide(200)
        $('.container-search-result').hide(200)
        $('.container-user-settings').hide(200)
        profileWasClicked = true;
        canKeyboardEvents = true;
        canKeyboardEventsProfile = true;
    }
}

function setMusicPlayTag() {
    $(".music-playing").removeClass("music-playing");
    $(`div[data-id="${indexAudioId}"] .box-wrapper .info-item`).addClass("music-playing");
}

function allFunctionResizing() {
    if (screenWidth >= 1360) {
        videoResizingFunction();
    }

    setScreenWidthAndHeight();
    deviceDefinition();
}

function videoResizingFunction() {
    if(document.querySelector(".container-frame iframe")){
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
        
        document.querySelector(".container-frame iframe").style.width = widthOfVideo;
        document.querySelector(".container-frame iframe").style.height = heightOfVideo;
    }
}

function setScreenWidthAndHeight() {
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
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
    let music = {
        musicId: indexAudioId,
        musicGender: indexAudioGender
    }

    const resposta = await fetch(`/songs-historic/${idUserConnected}`, {
        method: "PUT",
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
    let music = {
        musicId: "clear",
        musicGender: indexAudioGender
    }

    const resposta = await fetch(`/songs-historic/${idUserConnected}`, {
        method: "PUT",
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
    let music = {
        musicId: indexAudioId,
        musicGender: indexAudioGender
    }

    if (screenWidth >= 1360) {
        musicFavoriteIcon.style.pointerEvents = "none"
    } else {
        musicFavoriteIconMobile.style.pointerEvents = "none"
    }
    
    const resposta = await fetch(`/songs-favorite/${idUserConnected}`, {
        method: "PUT",
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
        if (screenWidth >= 1360) {
            musicFavoriteIcon.style.pointerEvents = "auto"
        } else {
            musicFavoriteIconMobile.style.pointerEvents = "auto"
        }
    }
    if(resposta.status != 200){
        if (screenWidth >= 1360) {
            musicFavoriteIcon.style.pointerEvents = "auto"
            alert("Internal Error!")
        } else {
            musicFavoriteIconMobile.style.pointerEvents = "auto"
            alert("Internal Error!")
        }
    }
}

async function refreshUser() {
    const idUserConnected = getCookie("user")
    const responseUser = await fetch(`/users/${idUserConnected}`);
    const user = await responseUser.json();

    userData = user.user;
    
    if (screenWidth >= 1360) {
        containerItemsHistoric.innerHTML = ""
    } else {
        containerItemsHistoricMobile.innerHTML = ""
    }
    generatorContainerHistoricData();
    generatorContainerHistoricDataPlay();
    themeChanger(musicDataShuffled[indexAudio].theme);
}

async function refreshFavorite() {
    let isFound = false;
    
    let songFavorite = userData.favoriteSongs.find(element => element.musicId == musicDataShuffled[indexAudio]._id)

    if (screenWidth >= 1360) {
        if(songFavorite){
            musicFavoriteIcon.name = "heart"
            isFound = true;
        }
        
        if (!isFound) {
            musicFavoriteIcon.name = "heart-outline"
        }

        containerItemsFavorite.innerHTML = ""
    } else {
        if(songFavorite){
            musicFavoriteIconMobile.name = "heart"
            isFound = true;
        }
        
        if (!isFound) {
            musicFavoriteIconMobile.name = "heart-outline"
        }

        containerItemsFavoriteMobile.innerHTML = ""
    }

    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
    themeChanger(musicDataShuffled[indexAudio].theme);
}

function toggleMenu() {
    if (screenWidth >= 1360) {
        $(".menu-options").toggle(200)
    } else {
        $(".menu-options-mobile").toggle(200)
    }
}

function toggleMorePlaylists() {
    if (screenWidth >= 1360) {
        $(".main-select-playlists").toggle(200);
    } else {
        $(".main-select-playlists-mobile").toggle(200);
    }
}
function toggleDisplayMobile() {
    if (!displayMobile.classList.contains("show")){
        displayMobile.classList.remove("exit");
        displayMobile.classList.add("show");

        if (!musicDataShuffled[indexAudio].isVideo) {
            audioControllerPlayFunctionNoPause()
        }
        $('.main-search-mobile').hide(200)
        $('.main-controls-mobile').removeClass("fixed")
    } else {
        displayMobile.classList.remove("show");
        displayMobile.classList.add("exit");
        displayMobile.addEventListener("animationend", (event) => {
            if (event.animationName == "down-display") {
                displayMobile.classList.remove("exit");
            }
        });
    }
}
function audioControllerPlayAudioAndVideo() {
    if (screenWidth >= 1360) {
        if(musicDataShuffled[indexAudio].isVideo){
            document.querySelector(".container-side-2").style.display = "none"
            musicAnimationStatus.classList.remove('run');
        } else {
            document.querySelector(".container-side-2").style.display = "flex"
        }
    } else {
        if(musicDataShuffled[indexAudio].isVideo){
            document.querySelector(".main-display-mobile").classList.add("video-mode")
        } else {
            document.querySelector(".main-display-mobile").classList.remove("video-mode")
        }
    }
}

function initialDeviceDefinition() {
    if (screenWidth >= 1360) {
        initialDevice = "Desktop"
    } else {
        initialDevice = "Mobile"
    }
}

function deviceDefinition() {
    let previousDevice, nextDevice;

    previousDevice = initialDevice;
    
    if (screenWidth >= 1360) {
        initialDevice = "Desktop"
    } else {
        initialDevice = "Mobile"
    }

    nextDevice = initialDevice;

    if (previousDevice != nextDevice) {
        changeMobileOrDesktop();
    }
}

function changeMobileOrDesktop() {
    if (screenWidth >= 1360) {
        containerPlaylist.innerHTML = "";
        containerItemsSearch.innerHTML = "";
        containerItemsFavorite.innerHTML = "";
        containerItemsHistoric.innerHTML = "";
        containerFrameVideoMobile.innerHTML = "";
        containerPlaylistSelect.innerHTML = "";
        $(".title-playlist").html(userData.lastAccessedPlaylistName);
        $('.search-bar input').val("");
        musicFilteringFunction();
        audioGlobal.volume = 0.6
        sliderMusicVolume.value = 60;
    } else {
        containerPlaylistMobile.innerHTML = "";
        containerItemsSearchMobile.innerHTML = "";
        containerItemsFavoriteMobile.innerHTML = "";
        containerItemsHistoricMobile.innerHTML = "";
        containerFrameVideo.innerHTML = "";
        containerPlaylistSelectMobile.innerHTML = "";
        $(".title-playlist-mobile").html(userData.lastAccessedPlaylistName);
        $('.main-search-mobile .search-bar-mobile input').val("");
        musicFilteringFunction();
    }

    audioGlobal.pause()

    if (screenWidth >= 1360) {
        audioControllerPlay.name = 'play-circle';
        musicAnimationStatus.classList.remove('run');
    } else {
        audioControllerPlayMobile.name = 'play-circle';
    }

    audioControllerPlayToggle = true;

    allSongValueSetters()
    generatorContainerPlaylistSelectData();
    generatorContainerPlaylistSelectDataPlay();
    generatorContainerPlaylistData();
    generatorContainerPlaylistDataPlay();
    generatorContainerSearchData()
    generatorContainerSearchDataPlay()
    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
    generatorContainerHistoricData()
    generatorContainerHistoricDataPlay()

    themeChanger(musicDataShuffled[indexAudio].theme);
    indexAudioId = musicDataShuffled[indexAudio]._id;
    indexAudioGender = musicDataShuffled[indexAudio].gender;
    setMusicPlayTag();
    refreshFavorite();
    manageHistoric();
    audioControllerPlayAudioAndVideo();
    setUserSettings()
}

function setManagementSystem(){
    if (userData.type == "admin") {
        selectManagementSystem.classList.remove("hidden");
        selectManagementSystemMobile.classList.remove("hidden")
    }
    selectManagementSystem.addEventListener("click", () => {
        window.location = '/config'
    })
    selectManagementSystemMobile.addEventListener("click", () => {
        window.location = '/config'
    })
}

async function selectNewPlaylist(playlistSelect, playlistName) {
    const idUserConnected = getCookie("user")
    let playlistSelectForSend = { 
        lastAccessedPlaylist: playlistSelect,
        lastAccessedPlaylistName: playlistName
    }

    if (screenWidth >= 1360) {
        $(".title-playlist").html(playlistName);
    } else {
        $(".title-playlist-mobile").html(playlistName);
    }

    const resposta = await fetch(`/playlists-historic/${idUserConnected}`, {
        method: "PUT",
        headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(playlistSelectForSend)
    });
    if(resposta.status != 200){
        alert("Internal Error!")
    }

    const responsePlaylist = await fetch(`/playlists-select/${idUserConnected}/?playlist=${playlistSelect}`);
    const playlist = await responsePlaylist.json();

    musicData = playlist.songs;
    musicDataShuffled = [...musicData];

    if (screenWidth >= 1360) {
        containerPlaylist.innerHTML = "";
        containerItemsSearch.innerHTML = "";
        containerItemsFavorite.innerHTML = "";
        containerItemsHistoric.innerHTML = "";
    } else {
        containerPlaylistMobile.innerHTML = "";
        containerItemsSearchMobile.innerHTML = "";
        containerItemsFavoriteMobile.innerHTML = "";
        containerItemsHistoricMobile.innerHTML = "";
    }

    indexAudio = 0;
    audioGlobal.pause()
    if (screenWidth >= 1360) {
        audioControllerPlay.name = 'play-circle';
        musicAnimationStatus.classList.remove('run');
    } else {
        audioControllerPlayMobile.name = 'play-circle';
    }
    audioControllerPlayToggle = true;

    if (screenWidth >= 1360) {
        shuffleIcon.classList.remove('active');
    } else {
        shuffleIconMobile.classList.remove('active');
    }
    shuffleToggleControl = true;

    allSongValueSetters()
    generatorContainerPlaylistData();
    generatorContainerPlaylistDataPlay();
    generatorContainerSearchData()
    generatorContainerSearchDataPlay()
    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
    generatorContainerHistoricData()
    generatorContainerHistoricDataPlay()

    themeChanger(musicDataShuffled[indexAudio].theme);
    indexAudioId = musicDataShuffled[indexAudio]._id;
    indexAudioGender = musicDataShuffled[indexAudio].gender;
    setMusicPlayTag();
    refreshFavorite();
    manageHistoric();
    audioControllerPlayAudioAndVideo();
}

async function musicListingService() {
    const idUserConnected = getCookie("user")

    const responseUser = await fetch(`/users/${idUserConnected}`);
    const user = await responseUser.json();

    userData = user.user;

    const responsePlaylists = await fetch(`/playlists/${idUserConnected}`);
    const playlists = await responsePlaylists.json();

    const responseSongs = await fetch(`/playlists-select/${idUserConnected}/?playlist=${userData.lastAccessedPlaylist}`);
    const songs = await responseSongs.json();

    musicData = songs.songs;
    playlistData = playlists.playlists;

    musicDataShuffled = [...musicData];

    inicia();
}

musicListingService();