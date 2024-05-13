const audioGlobal = document.querySelector('#audio-global');
let indexAudio = 0;
let indexAudioId = "";
let indexAudioGender = "";
let indexMyPlaylistId = "";
let indexMyPlaylistAudioId = "";

let screenWidth = 0;
let screenHeight = 0;

let initialDevice = "";
let emptyPlaylist = false;
let titlePlaylist = "";

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

const musicFavoriteIcon = document.querySelector(".current-music-add-favorite-container")
const musicAddIcon = document.querySelector(".current-music-add ion-icon")
const musicAddIconMobile = document.querySelector(".current-music-add-mobile ion-icon")

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

const musicFavoriteIconMobile = document.querySelector(".current-music-add-favorite-container-mobile")

const logoutMobile = document.querySelector(".logout-mobile");

const clearHistoricIconMobile = document.querySelector(".content-profile-mobile .title-2-wrapper-mobile .trash-icon-mobile")

const containerItemsSearchMobile = document.querySelector('.container-search-mobile')

const searchBarInputMobile = document.querySelector('#search-bar-input-mobile');

const btnDeleteAccount = document.querySelector('#btnDeleteAccount');
const btnDeleteAccountMobile = document.querySelector('#btnDeleteAccountMobile');
const formDeleteAccount = document.querySelector('#formDeleteAccount');
const formDeleteAccountMobile = document.querySelector('#formDeleteAccountMobile');
const formDeleteAccountCancel = document.querySelector('#formDeleteAccountCancel');
const formDeleteAccountCancelMobile = document.querySelector('#formDeleteAccountCancelMobile');
const deleteAccountInputToConfirm = document.querySelector('#deleteAccountInputToConfirm');
const deleteAccountInputToConfirmMobile = document.querySelector('#deleteAccountInputToConfirmMobile');
const warning = document.querySelector('#warning');
const warningMobile = document.querySelector('#warningMobile');

const profilePictureEdit = document.querySelector('#profilePictureEdit');
const layerProfilePicture = document.querySelector('#layerProfilePicture');
const profilePictureInput = document.querySelector('#profilePictureInput');
const profilePictureEditMobile = document.querySelector('#profilePictureEditMobile');
const layerProfilePictureMobile = document.querySelector('#layerProfilePictureMobile');
const profilePictureInputMobile = document.querySelector('#profilePictureInputMobile');

const backMyPlaylist = document.querySelector('.minhas-playlists-back');
const backMyPlaylistMobile = document.querySelector('.minhas-playlists-back-mobile');
const backContainerMinhaPlaylist = document.querySelector('.container-minha-playlist-back');
const backContainerMinhaPlaylistMobile = document.querySelector('.container-minha-playlist-back-mobile');
const selectMyPlaylist = document.querySelector('#selectMyPlaylist');
const selectMyPlaylistMobile = document.querySelector('#selectMyPlaylistMobile');

const containerMinhaPlaylist = document.querySelector('#containerMinhaPlaylist');
const btnSelectMyPlaylist = document.querySelector('#btnSelectMyPlaylist');
const btnSelectMyPlaylistMobile = document.querySelector('#btnSelectMyPlaylistMobile');
const btnEditSelectMyPlaylist = document.querySelector('#btnEditSelectMyPlaylist');
const btnEditSelectMyPlaylistMobile = document.querySelector('#btnEditSelectMyPlaylistMobile');
const btnDeleteSelectMyPlaylist = document.querySelector('#btnDeleteSelectMyPlaylist');
const btnDeleteSelectMyPlaylistMobile = document.querySelector('#btnDeleteSelectMyPlaylistMobile');

let allMusicData = []
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
                if(musicDataShuffled[indexAudio].isVideo){
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

logout.addEventListener("click", toggleLogout);
logoutMobile.addEventListener("click", toggleLogout);
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
selectMyPlaylist.addEventListener("click", () => {
    canKeyboardEventsProfile = false;
    toggleMenu()
    toggleMyPlaylists()
});
selectMyPlaylistMobile.addEventListener("click", () => {
    toggleMenu()
    toggleMyPlaylists()
});


morePlaylist.addEventListener("click", toggleMenu);
backMenu.addEventListener("click", toggleMenu);
backMenuMobile.addEventListener("click", toggleMenu);
backPlaylist.addEventListener("click", toggleMorePlaylists);
backDisplayMobile.addEventListener("click", toggleDisplayMobile)
morePlaylistMobile.addEventListener("click", toggleMenu);
backPlaylistMobile.addEventListener("click", toggleMorePlaylists);
backMyPlaylist.addEventListener("click", () => {
    canKeyboardEventsProfile = true;
    toggleMyPlaylists()
});
backMyPlaylistMobile.addEventListener("click", toggleMyPlaylists)
backContainerMinhaPlaylist.addEventListener("click", toggleContainerMinhaPlaylist);
backContainerMinhaPlaylistMobile.addEventListener("click", toggleContainerMinhaPlaylist);
controlsMobile.addEventListener("click", () => {
    toggleDisplayMobile()
    $(".menu-options-mobile").hide(200)
})
btnDeleteAccount.addEventListener("click", () => {
    formDeleteAccount.classList.remove("hidden")
    canKeyboardEvents = false;
    canKeyboardEventsProfile = false;
})
btnDeleteAccountMobile.addEventListener("click", () => {
    formDeleteAccountMobile.classList.remove("hidden")
})
formDeleteAccountCancel.addEventListener("click", () => {
    formDeleteAccount.classList.add("hidden")
    deleteAccountInputToConfirm.value = ""
    canKeyboardEventsProfile = true;
})
formDeleteAccountCancelMobile.addEventListener("click", () => {
    formDeleteAccountMobile.classList.add("hidden")
    deleteAccountInputToConfirmMobile.value = ""
})
formDeleteAccount.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-delete-account-overflow') {
        formDeleteAccount.classList.add("hidden")
        deleteAccountInputToConfirm.value = ""
        canKeyboardEventsProfile = true;
    }
})
formDeleteAccountMobile.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-delete-account-overflow-mobile') {
        formDeleteAccountMobile.classList.add("hidden")
        deleteAccountInputToConfirmMobile.value = ""
    }
})
deleteAccountInputToConfirm.addEventListener("paste", (e) => {
    e.preventDefault()
})
deleteAccountInputToConfirmMobile.addEventListener("paste", (e) => {
    e.preventDefault()
})
document.querySelector('.form-delete-account').addEventListener("submit", (e) => {
    e.preventDefault()
    manageUserAccountDeletion()
})
document.querySelector('.form-delete-account-mobile').addEventListener("submit", (e) => {
    e.preventDefault()
    manageUserAccountDeletion()
})

profilePictureEdit.addEventListener("click", () => {
  layerProfilePicture.classList.remove("hidden")
  canKeyboardEvents = false;
  canKeyboardEventsProfile = false;
})
layerProfilePicture.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'layer-profile-picture') {
        layerProfilePicture.classList.add("hidden")
        profilePictureInput.value = userData.profilePicture
        canKeyboardEventsProfile = true;
    }
})
profilePictureEditMobile.addEventListener("click", () => {
    layerProfilePictureMobile.classList.remove("hidden")
})
layerProfilePictureMobile.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'layer-profile-picture-mobile') {
        layerProfilePictureMobile.classList.add("hidden")
        profilePictureInputMobile.value = userData.profilePicture
    }
})
document.querySelector('.container-profile-picture').addEventListener("submit", (e) => {
    e.preventDefault()
    manageUserProfilePicture()
})
document.querySelector('.container-profile-picture-mobile').addEventListener("submit", (e) => {
    e.preventDefault()
    manageUserProfilePicture()
})
btnSelectMyPlaylist.addEventListener("click", () => {
    canKeyboardEventsProfile = true;
    toggleContainerMinhaPlaylist()
    toggleMyPlaylists()
    selectUserMyPlaylist()
})
btnSelectMyPlaylistMobile.addEventListener("click", () => {
    toggleContainerMinhaPlaylist()
    toggleMyPlaylists()
    selectUserMyPlaylist()
})
btnEditSelectMyPlaylist.addEventListener("click", toggleEditMinhaPlaylist)
btnEditSelectMyPlaylistMobile.addEventListener("click", toggleEditMinhaPlaylist)
btnDeleteSelectMyPlaylist.addEventListener("click", toggleDeleteMinhaPlaylist)
btnDeleteSelectMyPlaylistMobile.addEventListener("click", toggleDeleteMinhaPlaylist)

document.querySelector('.add-my-new-playlist-overflow').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-my-new-playlist-overflow')) {
        event.target.classList.add('hidden');
        canKeyboardEvents = true;
    }
});
document.querySelector('.add-my-new-playlist-overflow-mobile').addEventListener('click', (event) => {
    if (event.target.classList.contains('add-my-new-playlist-overflow-mobile')) {
        event.target.classList.add('hidden');
    }
});
document.querySelector('.edit-my-new-playlist-overflow').addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-my-new-playlist-overflow')) {
        event.target.classList.add('hidden');
        canKeyboardEvents = true;
    }
});
document.querySelector('.edit-my-new-playlist-overflow-mobile').addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-my-new-playlist-overflow-mobile')) {
        event.target.classList.add('hidden');
    }
});
document.querySelector('.delete-my-new-playlist-overflow').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-my-new-playlist-overflow')) {
        event.target.classList.add('hidden');
        canKeyboardEvents = true;
    }
});
document.querySelector('.delete-my-new-playlist-overflow-mobile').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-my-new-playlist-overflow-mobile')) {
        event.target.classList.add('hidden');
    }
});
document.querySelector('.delete-my-new-playlist-btn-cancel').addEventListener('click', (event) => {
    canKeyboardEvents = true;
    event.target.parentElement.parentElement.parentElement.classList.add('hidden');
});
document.querySelector('.delete-my-new-playlist-btn-cancel-mobile').addEventListener('click', (event) => {
    event.target.parentElement.parentElement.parentElement.classList.add('hidden');
});
document.querySelector('.music-my-new-playlist-overflow').addEventListener('click', (event) => {
    if (event.target.classList.contains('music-my-new-playlist-overflow')) {
        event.target.classList.add('hidden');
    }
});
document.querySelector('.music-my-new-playlist-overflow-mobile').addEventListener('click', (event) => {
    if (event.target.classList.contains('music-my-new-playlist-overflow-mobile')) {
        event.target.classList.add('hidden');
    }
});
document.querySelector('.music-my-new-playlist-delete-btn').addEventListener('click', () => {
    document.querySelector('.music-delete-my-new-playlist-overflow').classList.remove('hidden');
});
document.querySelector('.music-my-new-playlist-delete-btn-mobile').addEventListener('click', () => {
    document.querySelector('.music-delete-my-new-playlist-overflow-mobile').classList.remove('hidden');
});
document.querySelector('.music-delete-my-new-playlist-overflow').addEventListener('click', (event) => {
    if (event.target.classList.contains('music-delete-my-new-playlist-overflow')) {
        event.target.classList.add('hidden');
    }
});
document.querySelector('.music-delete-my-new-playlist-overflow-mobile').addEventListener('click', (event) => {
    if (event.target.classList.contains('music-delete-my-new-playlist-overflow-mobile')) {
        event.target.classList.add('hidden');
    }
});
document.querySelector('.music-delete-my-new-playlist-btn-cancel').addEventListener('click', (event) => {
    if (event.target.classList.contains('music-delete-my-new-playlist-btn-cancel')) {
        event.target.parentElement.parentElement.parentElement.classList.add('hidden');
    }
});
document.querySelector('.music-delete-my-new-playlist-btn-cancel-mobile').addEventListener('click', (event) => {
    if (event.target.classList.contains('music-delete-my-new-playlist-btn-cancel-mobile')) {
        event.target.parentElement.parentElement.parentElement.classList.add('hidden');
    }
});
musicAddIcon.addEventListener("click", toggleAddOptions)
musicAddIconMobile.addEventListener("click", toggleAddOptions)
document.querySelector('.current-music-add-overflow').addEventListener('click', (event) => {
    if (event.target.classList.contains('current-music-add-overflow')) {
        event.target.classList.add('hidden');
        canKeyboardEventsProfile = true;
    }
});
document.querySelector('.current-music-add-overflow-mobile').addEventListener('click', (event) => {
    if (event.target.classList.contains('current-music-add-overflow-mobile')) {
        event.target.classList.add('hidden');
    }
});
document.querySelector('.current-music-add-create-new-playlist').addEventListener('click', toggleAddMinhaPlaylist)
document.querySelector('.current-music-add-create-new-playlist-mobile').addEventListener('click', toggleAddMinhaPlaylist)
document.querySelector('.current-music-add-confirm').addEventListener('click', toggleAddOptions)
document.querySelector('.current-music-add-confirm-mobile').addEventListener('click', toggleAddOptions)
document.querySelector('.add-my-new-playlist-container').addEventListener("submit", (e) => {
    e.preventDefault()
    manageUserCreatePlaylist()
})
document.querySelector('.add-my-new-playlist-container-mobile').addEventListener("submit", (e) => {
    e.preventDefault()
    manageUserCreatePlaylist()
})
document.querySelector('.music-delete-my-new-playlist-btn-delete').addEventListener("click", manageMyPlaylistMusicDeletion)
document.querySelector('.music-delete-my-new-playlist-btn-delete-mobile').addEventListener("click", manageMyPlaylistMusicDeletion)
document.querySelector('.delete-my-new-playlist-container').addEventListener("submit", (e) => {
    e.preventDefault()
    manageMyPlaylistDeletion()
})
document.querySelector('.delete-my-new-playlist-container-mobile').addEventListener("submit", (e) => {
    e.preventDefault()
    manageMyPlaylistDeletion()
})
document.querySelector('.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-name').addEventListener("paste", (e) => {
    e.preventDefault()
})
document.querySelector('.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-name-mobile').addEventListener("paste", (e) => {
    e.preventDefault()
})
document.querySelector('.edit-my-new-playlist-overflow .edit-my-new-playlist-container').addEventListener("submit", (e) => {
    e.preventDefault()
    manageMyPlaylistEdition()
})
document.querySelector('.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile').addEventListener("submit", (e) => {
    e.preventDefault()
    manageMyPlaylistEdition()
})
document.querySelector('.confirm-logout-overflow').addEventListener('click', (event) => {
    if (event.target.classList.contains('confirm-logout-overflow')) {
        event.target.classList.add('hidden');
        canKeyboardEventsProfile = true;
    }
});
document.querySelector('.confirm-logout-overflow-mobile').addEventListener('click', (event) => {
    if (event.target.classList.contains('confirm-logout-overflow-mobile')) {
        event.target.classList.add('hidden');
    }
});
document.querySelector('.confirm-logout-container').addEventListener("submit", (e) => {
    e.preventDefault()
    logoutService()
})
document.querySelector('.confirm-logout-container-mobile').addEventListener("submit", (e) => {
    e.preventDefault()
    logoutService()
})
document.querySelector('.minhas-playlists-search-bar-close').addEventListener('click', () => {
    document.querySelector('.minhas-playlists-search-bar-input').value = '';
    generatorContainerMusicAddPlaylist()
})
document.querySelector('.minhas-playlists-search-bar-input').addEventListener('input', () => {
    generatorContainerMusicAddPlaylist()
})
document.querySelector('.playlists-search-bar-close').addEventListener('click', () => {
    document.querySelector('.playlists-search-bar-input').value = '';
    generatorContainerPlaylistSelectData()
    generatorContainerPlaylistSelectDataPlay()
})
document.querySelector('.playlists-search-bar-input').addEventListener('input', () => {
    generatorContainerPlaylistSelectData()
    generatorContainerPlaylistSelectDataPlay()
})
document.querySelector('.playlists-search-bar-close-mobile').addEventListener('click', () => {
    document.querySelector('.playlists-search-bar-input-mobile').value = '';
    generatorContainerPlaylistSelectData()
    generatorContainerPlaylistSelectDataPlay()
})
document.querySelector('.playlists-search-bar-input-mobile').addEventListener('input', () => {
    generatorContainerPlaylistSelectData()
    generatorContainerPlaylistSelectDataPlay()
})
document.querySelector('.minhas-playlists-search-bar-close-mobile').addEventListener('click', () => {
    document.querySelector('.minhas-playlists-search-bar-input-mobile').value = '';
    generatorContainerMusicAddPlaylist()
})
document.querySelector('.minhas-playlists-search-bar-input-mobile').addEventListener('input', () => {
    generatorContainerMusicAddPlaylist()
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
    manageEmptyPlaylist();
    setManagementSystem()
    setUserProfilePicture()
    manageHistoric();
    searchEvents();
    generatorContainerCurrentMusicAddPlaylist()
    generatorContainerMusicAddPlaylist()
    if (emptyPlaylist) return
    musicStateControllers();
    durationSliderEventGenerator();
    volumeSliderEventGenerator();
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
    audioControllerPlayAudioAndVideo();
    initialDeviceDefinition();
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
        if(!musicDataShuffled[indexAudio].isVideo){
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
        if(!musicDataShuffled[indexAudio].isVideo){
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
    emptyPlaylist = false;
    if(musicData.length <= 0){
        emptyPlaylist = true;
        if(screenWidth >= 1360){
            warning.classList.remove('hidden')
            warning.textContent = 'A PlayList atual não tem conteúdo'
            setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'A PlayList atual não tem conteúdo'
            setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }

        return
    }
    if (screenWidth >= 1360) {
        if(!musicDataShuffled[indexAudio].isVideo){
            indexAudioId = musicDataShuffled[indexAudio]._id;
            indexAudioGender = musicDataShuffled[indexAudio].gender;
            coverCurrentMusic.src = musicDataShuffled[indexAudio].coverUrl;
            containerFrameVideo.style.display = "block"
            currentCover.style.display = "none"
            backgroundCover.style.setProperty("background-image", `url("${musicDataShuffled[indexAudio].coverUrl}")`);
            titleCurrentMusic.innerHTML = musicDataShuffled[indexAudio].title;
            genderCurrentMusic.innerHTML = musicDataShuffled[indexAudio].gender;

            containerFrameVideo.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${musicDataShuffled[indexAudio].videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

            return;
        }

        audioGlobal.src = musicDataShuffled[indexAudio].videoId;
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
        if(!musicDataShuffled[indexAudio].isVideo){
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

            containerFrameVideoMobile.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${musicDataShuffled[indexAudio].videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`

            return;
        }

        audioGlobal.src = musicDataShuffled[indexAudio].videoId;
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
    generatorContainerCurrentMusicAddPlaylist()
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
    generatorContainerCurrentMusicAddPlaylist()
    themeChanger(selectedTheme);
}

function generatorContainerPlaylistData(){
    if (screenWidth >= 1360) {
        musicDataShuffled.forEach((element) => {

            containerPlaylist.innerHTML += `
                <div class="item-playlist" data-id="${element._id}" data-theme="${element.theme}">
                    <div class="box-wrapper">
                        <div class="cover-item">
                            <img src="${element.coverUrl}" alt="${element.title}">
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
                    generatorContainerCurrentMusicAddPlaylist()
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
                    generatorContainerCurrentMusicAddPlaylist()
                    themeChanger(selectedTheme);
                }
            });
        })
    }
}

function generatorContainerPlaylistSelectData(){
    const playlistDataFiltered = playlistData.filter((playlist) => playlist.title.toLowerCase().includes(document.querySelector('.playlists-search-bar-input').value.trim().toLowerCase()))
    const playlistDataFilteredMobile = playlistData.filter((playlist) => playlist.title.toLowerCase().includes(document.querySelector('.playlists-search-bar-input-mobile').value.trim().toLowerCase()))

    if (screenWidth >= 1360) {
        containerPlaylistSelect.innerHTML = "";

        playlistDataFiltered.forEach((element) => {

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

        if (containerPlaylistSelect.innerHTML === "") {
            if(document.querySelector('.playlists-search-bar-input').value.trim() !== ""){
                containerPlaylistSelect.innerHTML = `
                    <div class="no-playlist-found">
                        Sua pesquisa não encontrou nenhuma playlist
                    </div>
                `
            } else {
                containerPlaylistSelect.innerHTML = `
                    <div class="no-playlist-found">
                        Nenhuma playlist encontrada
                    </div>
                `
            }
        }
        if (emptyPlaylist) return
        themeChanger(musicDataShuffled[indexAudio].theme);
    } else {
        containerPlaylistSelectMobile.innerHTML = "";

        playlistDataFilteredMobile.forEach((element) => {

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

        if (containerPlaylistSelectMobile.innerHTML === "") {
            if(document.querySelector('.playlists-search-bar-input-mobile').value.trim() !== ""){
                containerPlaylistSelectMobile.innerHTML = `
                    <div class="no-playlist-found-mobile">
                        Sua pesquisa não encontrou nenhuma playlist
                    </div>
                `
            } else {
                containerPlaylistSelectMobile.innerHTML = `
                    <div class="no-playlist-found-mobile">
                        Nenhuma playlist encontrada
                    </div>
                `
            }
        }
        if (emptyPlaylist) return
        themeChanger(musicDataShuffled[indexAudio].theme);
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
                    generatorContainerCurrentMusicAddPlaylist()
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
                    generatorContainerCurrentMusicAddPlaylist()
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
                    generatorContainerCurrentMusicAddPlaylist()
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
                    generatorContainerCurrentMusicAddPlaylist()
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
                    generatorContainerCurrentMusicAddPlaylist()
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
                    generatorContainerCurrentMusicAddPlaylist()
                    themeChanger(selectedTheme);
                    
                    profileWasClicked = true;
                    canKeyboardEvents = true;
                    canKeyboardEventsProfile = true;
                }
            });
        })
    }
}
function generatorContainerMusicAddPlaylist() {
    function converterData(dataString) {
        const meses = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];
    
        const data = new Date(dataString);
        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        const ano = data.getFullYear();
    
        return `Criada em: ${dia} de ${mes} de ${ano}`;
    }

    if (screenWidth >= 1360) {
        const container = document.querySelector('.container-minhas-playlists');
        const containerMusic = document.querySelector('.container-minhas-musicas')

        container.innerHTML = "";

        const myPlaylistsFiltered = userData.myPlaylists.filter(
            (playlist) =>
            playlist.title.toLowerCase().includes(document.querySelector('.minhas-playlists-search-bar-input').value.trim().toLowerCase())
        )
        
        myPlaylistsFiltered.forEach((element) => {
            let divItemMinhasPlaylists = document.createElement("div");
            divItemMinhasPlaylists.classList.add("item-minhas-playlists");
            divItemMinhasPlaylists.addEventListener('click', () => {
                document.querySelector('.main-minhas-playlists .main-playlist .content .title').textContent = element.title;
                document.querySelector('.main-minhas-playlists .main-playlist .content .details .created').textContent = converterData(element.additionDate);
                document.querySelector('.main-minhas-playlists .main-playlist .content .details .total-song').textContent = `Total de ${element.totalSongs} ${element.totalSongs <= 1 ? 'música' : 'músicas'}`;
                document.querySelector('.main-minhas-playlists .main-playlist .cover img').src = element.currentCoverUrl
                indexMyPlaylistId = element._id;
                document.querySelector('.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name').value = element.title;
                document.querySelector('.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-current').textContent = element.title;
                toggleContainerMinhaPlaylist()

                containerMusic.innerHTML = ""

                element.songs.reverse().forEach((ele) => {
                    let musicaEncontrada = allMusicData.find(element => element._id === ele.musicId)

                    let divItemMinhasMusicas = document.createElement("div");
                    divItemMinhasMusicas.classList.add("item-minhas-musicas");
                    divItemMinhasMusicas.addEventListener('click', () => {
                        document.querySelector('.music-my-new-playlist-overflow .music-my-new-playlist-container .music-my-new-playlist-title').textContent = musicaEncontrada.title;
                        document.querySelector('.music-my-new-playlist-overflow .music-my-new-playlist-container .music-my-new-playlist-cover img').src = musicaEncontrada.coverUrl;
                        document.querySelector('.music-delete-my-new-playlist-overflow .music-delete-my-new-playlist-container .music-delete-my-new-playlist-current').textContent = musicaEncontrada.title;
                        indexMyPlaylistAudioId = ele._id;
                        toggleMusicMinhaPlaylist()
                    })

                    let divCoverItemMinhasMusicas = document.createElement("div");
                    divCoverItemMinhasMusicas.classList.add("cover-item-minhas-musicas");

                    let imgCover = document.createElement("img");
                    imgCover.src = musicaEncontrada.coverUrl;

                    let divTitleItemMinhasMusicas = document.createElement("div");
                    divTitleItemMinhasMusicas.classList.add("title-item-minhas-musicas");
                    divTitleItemMinhasMusicas.textContent = musicaEncontrada.title;

                    divCoverItemMinhasMusicas.appendChild(imgCover);
                    divItemMinhasMusicas.appendChild(divCoverItemMinhasMusicas);
                    divItemMinhasMusicas.appendChild(divTitleItemMinhasMusicas);

                    containerMusic.appendChild(divItemMinhasMusicas)
                })
            })

            let divCoverItemMinhasPlaylists = document.createElement("div");
            divCoverItemMinhasPlaylists.classList.add("cover-item-minhas-playlists");

            let imgCover = document.createElement("img");
            imgCover.src = element.currentCoverUrl;

            let divTitleItemMinhasPlaylists = document.createElement("div");
            divTitleItemMinhasPlaylists.classList.add("title-item-minhas-playlists");
            divTitleItemMinhasPlaylists.textContent = element.title;

            let divTotalDeMusicas = document.createElement("div");
            divTotalDeMusicas.classList.add("total-de-musicas");
            divTotalDeMusicas.textContent = "Total de Músicas";

            let divTotalDeMusicasQuantidade = document.createElement("div");
            divTotalDeMusicasQuantidade.classList.add("total-de-musicas-quantidade");
            divTotalDeMusicasQuantidade.textContent = element.totalSongs;

            divCoverItemMinhasPlaylists.appendChild(imgCover);
            divItemMinhasPlaylists.appendChild(divCoverItemMinhasPlaylists);
            divItemMinhasPlaylists.appendChild(divTitleItemMinhasPlaylists);
            divItemMinhasPlaylists.appendChild(divTotalDeMusicas);
            divItemMinhasPlaylists.appendChild(divTotalDeMusicasQuantidade);

            container.appendChild(divItemMinhasPlaylists);
        })
        if (container.innerHTML === "") {
            if(document.querySelector('.minhas-playlists-search-bar-input').value.trim() !== ""){
                container.innerHTML = `
                <div class="no-playlist">
                    Sua pesquisa não encontrou nenhuma playlist
                </div>
                `
            } else {
                container.innerHTML = `
                <div class="no-playlist">
                    Você não possui nenhuma playlist
                </div>
                `
            }
        }
    } else {
        const container = document.querySelector('.container-minhas-playlists-mobile');
        const containerMusic = document.querySelector('.container-minhas-musicas-mobile')

        container.innerHTML = "";

        const myPlaylistsFiltered = userData.myPlaylists.filter(
            (playlist) =>
            playlist.title.toLowerCase().includes(document.querySelector('.minhas-playlists-search-bar-input-mobile').value.trim().toLowerCase())
        )

        myPlaylistsFiltered.forEach((element) => {
            let divItemMinhasPlaylists = document.createElement("div");
            divItemMinhasPlaylists.classList.add("item-minhas-playlists-mobile");
            divItemMinhasPlaylists.addEventListener('click', () => {
                document.querySelector('.main-minhas-playlists-mobile .main-playlist-mobile .content-mobile .title-mobile').textContent = element.title;
                document.querySelector('.main-minhas-playlists-mobile .main-playlist-mobile .content-mobile .details-mobile .created-mobile').textContent = converterData(element.additionDate);
                document.querySelector('.main-minhas-playlists-mobile .main-playlist-mobile .content-mobile .details-mobile .total-song-mobile').textContent = `Total de ${element.totalSongs} ${element.totalSongs <= 1 ? 'música' : 'músicas'}`;
                document.querySelector('.main-minhas-playlists-mobile .main-playlist-mobile .cover-mobile img').src = element.currentCoverUrl
                indexMyPlaylistId = element._id;
                document.querySelector('.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile .edit-my-new-playlist-name-mobile').value = element.title;
                document.querySelector('.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-current-mobile').textContent = element.title;
                toggleContainerMinhaPlaylist()

                containerMusic.innerHTML = ""

                element.songs.reverse().forEach((ele) => {
                    let musicaEncontrada = allMusicData.find(element => element._id === ele.musicId)

                    let divItemMinhasMusicas = document.createElement("div");
                    divItemMinhasMusicas.classList.add("item-minhas-musicas-mobile");
                    divItemMinhasMusicas.addEventListener('click', () => {
                        document.querySelector('.music-my-new-playlist-overflow-mobile .music-my-new-playlist-container-mobile .music-my-new-playlist-title-mobile').textContent = musicaEncontrada.title;
                        document.querySelector('.music-my-new-playlist-overflow-mobile .music-my-new-playlist-container-mobile .music-my-new-playlist-cover-mobile img').src = musicaEncontrada.coverUrl;
                        document.querySelector('.music-delete-my-new-playlist-overflow-mobile .music-delete-my-new-playlist-container-mobile .music-delete-my-new-playlist-current-mobile').textContent = musicaEncontrada.title;
                        indexMyPlaylistAudioId = ele._id;
                        toggleMusicMinhaPlaylist()
                    })

                    let divCoverItemMinhasMusicas = document.createElement("div");
                    divCoverItemMinhasMusicas.classList.add("cover-item-minhas-musicas-mobile");

                    let imgCover = document.createElement("img");
                    imgCover.src = musicaEncontrada.coverUrl;

                    let divTitleItemMinhasMusicas = document.createElement("div");
                    divTitleItemMinhasMusicas.classList.add("title-item-minhas-musicas-mobile");
                    divTitleItemMinhasMusicas.textContent = musicaEncontrada.title;

                    divCoverItemMinhasMusicas.appendChild(imgCover);
                    divItemMinhasMusicas.appendChild(divCoverItemMinhasMusicas);
                    divItemMinhasMusicas.appendChild(divTitleItemMinhasMusicas);

                    containerMusic.appendChild(divItemMinhasMusicas)
                })
            })

            let divCoverItemMinhasPlaylists = document.createElement("div");
            divCoverItemMinhasPlaylists.classList.add("cover-item-minhas-playlists-mobile");

            let imgCover = document.createElement("img");
            imgCover.src = element.currentCoverUrl;

            let divTitleItemMinhasPlaylists = document.createElement("div");
            divTitleItemMinhasPlaylists.classList.add("title-item-minhas-playlists-mobile");
            divTitleItemMinhasPlaylists.textContent = element.title;

            let divTotalDeMusicas = document.createElement("div");
            divTotalDeMusicas.classList.add("total-de-musicas-mobile");
            divTotalDeMusicas.textContent = "TM";

            let divTotalDeMusicasQuantidade = document.createElement("div");
            divTotalDeMusicasQuantidade.classList.add("total-de-musicas-quantidade-mobile");
            divTotalDeMusicasQuantidade.textContent = element.totalSongs;

            divCoverItemMinhasPlaylists.appendChild(imgCover);
            divItemMinhasPlaylists.appendChild(divCoverItemMinhasPlaylists);
            divItemMinhasPlaylists.appendChild(divTitleItemMinhasPlaylists);
            divItemMinhasPlaylists.appendChild(divTotalDeMusicas);
            divItemMinhasPlaylists.appendChild(divTotalDeMusicasQuantidade);

            container.appendChild(divItemMinhasPlaylists);
        })
        if (container.innerHTML === "") {
            if(document.querySelector('.minhas-playlists-search-bar-input-mobile').value.trim() !== ""){
                container.innerHTML = `
                <div class="no-playlist-mobile">
                    Sua pesquisa não encontrou nenhuma playlist
                </div>
                `
            } else {
                container.innerHTML = `
                <div class="no-playlist-mobile">
                    Você não possui nenhuma playlist
                </div>
                `
            }
        }
    }
}
function generatorContainerCurrentMusicAddPlaylist() {
    if (screenWidth >= 1360) {
        const currentMusicAddPlaylistContainer = document.querySelector('.current-music-add-playlist-container');

        currentMusicAddPlaylistContainer.innerHTML = "";
    
        userData.myPlaylists.forEach((element) => {
            const song = element.songs.find(song => song.musicId === indexAudioId);
    
            const divItem = document.createElement('div');
            divItem.classList.add('current-music-add-playlist-item');
            divItem.addEventListener('click', () => {
                divItem.style.pointerEvents = 'none';
                if (song) {
                    fetch(`/users-playlist-song/${userData._id}/${element._id}/${song._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(response => {
                        if (response.status === 200) return
                        else {
                            if(screenWidth >= 1360){
                                warning.classList.remove('hidden')
                                warning.textContent = 'Internal Error!'
                                setTimeout(() => {
                                    warning.classList.add('hidden')
                                }, 3000)
                            } else {
                                warningMobile.classList.remove('hidden')
                                warningMobile.textContent = 'Internal Error!'
                                setTimeout(() => {
                                    warningMobile.classList.add('hidden')
                                }, 3000)
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => {
                        refreshUserWithNewPlaylist()
                        divStatus.style.pointerEvents = 'auto';
                    });
                } else {
                    fetch(`/users-playlist-song/${userData._id}/${element._id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            musicIds: [indexAudioId]
                        })
                    })
                    .then(response => {
                        if (response.status === 201) return
                        else {
                            if(screenWidth >= 1360){
                                warning.classList.remove('hidden')
                                warning.textContent = 'Internal Error!'
                                setTimeout(() => {
                                    warning.classList.add('hidden')
                                }, 3000)
                            } else {
                                warningMobile.classList.remove('hidden')
                                warningMobile.textContent = 'Internal Error!'
                                setTimeout(() => {
                                    warningMobile.classList.add('hidden')
                                }, 3000)
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => {
                        refreshUserWithNewPlaylist()
                        divItem.style.pointerEvents = 'auto';
                    });
                }
            });
    
            const divStatus = document.createElement('div');
            divStatus.classList.add('current-music-add-playlist-status');
    
            const ionIcon = document.createElement('ion-icon');
            if (song) {
                ionIcon.setAttribute('name', 'checkbox');
            } else {
                ionIcon.setAttribute('name', 'square-outline');
            }
    
            divStatus.appendChild(ionIcon);
    
            const divTitle = document.createElement('div');
            divTitle.classList.add('current-music-add-playlist-title');
            divTitle.textContent = element.title;
    
            divItem.appendChild(divStatus);
            divItem.appendChild(divTitle);
    
            currentMusicAddPlaylistContainer.appendChild(divItem);
        })
    } else {
        const currentMusicAddPlaylistContainerMobile = document.querySelector('.current-music-add-playlist-container-mobile');

        currentMusicAddPlaylistContainerMobile.innerHTML = "";
    
        userData.myPlaylists.forEach((element) => {
            const song = element.songs.find(song => song.musicId === indexAudioId);
    
            const divItem = document.createElement('div');
            divItem.classList.add('current-music-add-playlist-item-mobile');
            divItem.addEventListener('click', () => {
                divItem.style.pointerEvents = 'none';
                if (song) {
                    fetch(`/users-playlist-song/${userData._id}/${element._id}/${song._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    .then(response => {
                        if (response.status === 200) return
                        else {
                            if(screenWidth >= 1360){
                                warning.classList.remove('hidden')
                                warning.textContent = 'Internal Error!'
                                setTimeout(() => {
                                    warning.classList.add('hidden')
                                }, 3000)
                            } else {
                                warningMobile.classList.remove('hidden')
                                warningMobile.textContent = 'Internal Error!'
                                setTimeout(() => {
                                    warningMobile.classList.add('hidden')
                                }, 3000)
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => {
                        refreshUserWithNewPlaylist()
                        divStatus.style.pointerEvents = 'auto';
                    });
                } else {
                    fetch(`/users-playlist-song/${userData._id}/${element._id}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            musicIds: [indexAudioId]
                        })
                    })
                    .then(response => {
                        if (response.status === 201) return
                        else {
                            if(screenWidth >= 1360){
                                warning.classList.remove('hidden')
                                warning.textContent = 'Internal Error!'
                                setTimeout(() => {
                                    warning.classList.add('hidden')
                                }, 3000)
                            } else {
                                warningMobile.classList.remove('hidden')
                                warningMobile.textContent = 'Internal Error!'
                                setTimeout(() => {
                                    warningMobile.classList.add('hidden')
                                }, 3000)
                            }
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    })
                    .finally(() => {
                        refreshUserWithNewPlaylist()
                        divItem.style.pointerEvents = 'auto';
                    });
                }
            });
    
            const divStatus = document.createElement('div');
            divStatus.classList.add('current-music-add-playlist-status-mobile');
    
            const ionIcon = document.createElement('ion-icon');
            if (song) {
                ionIcon.setAttribute('name', 'checkbox');
            } else {
                ionIcon.setAttribute('name', 'square-outline');
            }
    
            divStatus.appendChild(ionIcon);
    
            const divTitle = document.createElement('div');
            divTitle.classList.add('current-music-add-playlist-title-mobile');
            divTitle.textContent = element.title;
    
            divItem.appendChild(divStatus);
            divItem.appendChild(divTitle);
    
            currentMusicAddPlaylistContainerMobile.appendChild(divItem);
        })
    }
}

function themeChanger(selectedTheme){
    if (screenWidth >= 1360) {
        let allElementsChangeableByTheme = document.querySelectorAll(".main-playlist, .container-playlist, .search-bar, .container-settings .user-settings, .main-display, .container-side-1 .current-music-rating, .container-side-1 .current-music-add, .slider-music-duration, .slider-music-duration-wrapper .slider-music-duration-dot, .slider-music-volume-wrapper .slider-music-volume-dot, .container-volume .slider-music-volume, .container-volume .slider-music-volume, .container-playlist .item-playlist, .main-controls, .container-funcions .repeat-icon, .container-funcions .shuffle-icon, .layer-search-result, .box-search-result, .item-playlist-search, .layer-user-settings, .box-user-settings, .box-profile .user-settings, .item-playlist-favorite, .item-playlist-historic, .main-playlist .box-wrapper-info .more-playlist, .main-select-playlists, .main-select-playlists .select-playlist-back, .container-select-playlists .item-select-playlist, .main-playlist .menu-options, .main-playlist .menu-options .box-wrapper-info .back-menu-options, .main-playlist .menu-options .option, .info-item-select-playlist .description-item-select-playlist, .form-delete-account-overflow .form-delete-account .field, .form-delete-account-overflow .form-delete-account, .form-delete-account-overflow .form-delete-account .interactions-delete .cancel, .layer-profile-picture .container-profile-picture, .layer-profile-picture .container-profile-picture .field, .layer-profile-picture .container-profile-picture .save");
        let serviceLogo = document.querySelector('.service-logo img');

        initDurationSlider();
        initVolumeSlider();
        
        if(selectedTheme == "Original"){
            allElementsChangeableByTheme.forEach(element => element.classList.remove("rock-version", "hatsune-miku-version", "amv-brasileiro-version"));
            serviceLogo.src = "https://i.ibb.co/fdBXmh2/logo.png";
            return;
        }
        if(selectedTheme == "Rock Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("hatsune-miku-version", "amv-brasileiro-version")
                element.classList.add("rock-version")
            });
            serviceLogo.src = "https://i.ibb.co/Mh46LMN/logo-rock-version.png";
            return;
        }
        if(selectedTheme == "Hatsune Miku Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("rock-version", "amv-brasileiro-version")
                element.classList.add("hatsune-miku-version")
            });
            serviceLogo.src = "https://i.ibb.co/YysSGkz/logo-hatsune-miku-version.png";
            return;
        }
        if(selectedTheme == "AMV Brasileiro Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("rock-version", "hatsune-miku-version")
                element.classList.add("amv-brasileiro-version")
            });
            serviceLogo.src = "https://i.ibb.co/StK28mr/logo-amv-brasileiro-version.png";
            return;
        }
    } else {
        let allElementsChangeableByTheme = document.querySelectorAll(".super-main-mobile, .header-mobile .user-settings, .main-playlist-mobile, .box-wrapper-info-mobile .more-playlist-mobile, .container-playlist-mobile, .container-playlist-mobile .item-playlist-mobile, .main-controls-mobile, .main-controls-mobile .display-music-duration-mobile, .main-display-mobile .info-current-music-mobile .title-info-current-music-mobile, .main-display-mobile .info-current-music-mobile .gender-info-current-music-mobile, .main-display-mobile, .main-display-mobile .repeat-icon-mobile, .main-display-mobile .shuffle-icon-mobile, .slider-music-duration-mobile .slider-music-duration-wrapper-mobile, .slider-music-duration-mobile .slider-music-duration-wrapper-mobile .slider-music-duration-dot-mobile, .main-select-playlists-mobile, .main-select-playlists-mobile .select-playlist-back-mobile, .main-select-playlists-mobile .container-select-playlists-wrapper .container-select-playlists-mobile, .container-select-playlists-mobile .item-select-playlist-mobile, .main-user-settings-mobile, .main-user-settings-mobile .box-profile-mobile .user-settings-mobile, .main-user-settings-mobile .content-profile-mobile, .container-favorite-mobile .item-favorite-mobile, .container-historic-mobile .item-historic-mobile, .main-search-mobile, .main-search-mobile .search-bar-mobile, .main-search-mobile .content-search-mobile, .container-search-mobile .item-search-mobile, .main-playlist-mobile .menu-options-mobile, .main-playlist-mobile .menu-options-mobile .box-wrapper-info-mobile .back-menu-options-mobile, .main-playlist-mobile .menu-options-mobile .option-mobile, .info-item-select-playlist-mobile .description-item-select-playlist-mobile, .form-delete-account-overflow-mobile .form-delete-account-mobile .field, .form-delete-account-overflow-mobile .form-delete-account-mobile, .form-delete-account-overflow-mobile .form-delete-account-mobile .interactions-delete .cancel, .layer-profile-picture-mobile .container-profile-picture-mobile, .layer-profile-picture-mobile .container-profile-picture-mobile .field, .layer-profile-picture-mobile .container-profile-picture-mobile .save");
        let serviceLogo = document.querySelector('.header-mobile .service-logo-mobile img');

        initDurationSlider();

        if(selectedTheme == "Original"){
            allElementsChangeableByTheme.forEach(element => element.classList.remove("rock-version", "hatsune-miku-version", "amv-brasileiro-version"));
            serviceLogo.src = "https://i.ibb.co/fdBXmh2/logo.png";
            return;
        }
        if(selectedTheme == "Rock Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("hatsune-miku-version", "amv-brasileiro-version")
                element.classList.add("rock-version")
            });
            serviceLogo.src = "https://i.ibb.co/Mh46LMN/logo-rock-version.png";
            return;
        }
        if(selectedTheme == "Hatsune Miku Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("rock-version", "amv-brasileiro-version")
                element.classList.add("hatsune-miku-version")
            });
            serviceLogo.src = "https://i.ibb.co/YysSGkz/logo-hatsune-miku-version.png";
            return;
        }
        if(selectedTheme == "AMV Brasileiro Version"){
            allElementsChangeableByTheme.forEach(element => {
                element.classList.remove("rock-version", "hatsune-miku-version")
                element.classList.add("amv-brasileiro-version")
            });
            serviceLogo.src = "https://i.ibb.co/StK28mr/logo-amv-brasileiro-version.png";
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
        if (!emptyPlaylist) {
            themeChanger(musicDataShuffled[indexAudio].theme);
        }
        
        if (containerItemsSearch.innerHTML == ''){
            $('.song-not-found').show();
        }
    } else {
        containerItemsSearchMobile.innerHTML = "";

        $('.song-not-found-mobile').hide();
        
        generatorContainerSearchData()
        generatorContainerSearchDataPlay()
        if (!emptyPlaylist) {
            themeChanger(musicDataShuffled[indexAudio].theme);
        }
        
        if (containerItemsSearchMobile.innerHTML == ''){
            $('.song-not-found-mobile').show();
        }
    }
}

let profileWasClicked = true;

function searchEvents(){
    searchButton.addEventListener("click", () => {
        $('.search-bar').show(400)
        $(searchBarInput).focus()
        $('.container-search-result').show(200)
        $('.focus-shadow').show(200)
        $('.container-user-settings').hide(200)
        $(".menu-options").hide(200)
        profileWasClicked = true;
        canKeyboardEvents = false;
        canKeyboardEventsProfile = false;
        musicFilteringFunction();
    })
    $('.search-bar-close').click(() => {
        $('.search-bar input').val("");
        musicFilteringFunction();
    })
    $('.main-search-mobile .search-bar-mobile .search-bar-close-mobile').click(() => {
        $('.main-search-mobile .search-bar-mobile input').val("");
        musicFilteringFunction();
    })
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
        $(".search-bar").hide(200)
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
        $('.main-search-mobile .search-bar-mobile input').focus()
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
    setScreenWidthAndHeight();
    deviceDefinition();
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
        if(screenWidth >= 1360){
            warning.classList.remove('hidden')
            warning.textContent = 'Internal Error!'
            setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Internal Error!'
            setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
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
        if(screenWidth >= 1360){
            warning.classList.remove('hidden')
            warning.textContent = 'Internal Error!'
            setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Internal Error!'
            setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
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
        if(screenWidth >= 1360){
            warning.classList.remove('hidden')
            warning.textContent = 'Limite de músicas favoritas atingido!'
            setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Limite de músicas favoritas atingido!'
            setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
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
            warning.classList.remove('hidden')
            warning.textContent = 'Internal Error!'
            setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            musicFavoriteIconMobile.style.pointerEvents = "auto"
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Internal Error!'
            setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
    }
}

async function refreshUserWithNewPlaylist() {
    const idUserConnected = getCookie("user")
    const responseUser = await fetch(`/users/${idUserConnected}`);
    const user = await responseUser.json();

    userData = user.user;
    userData.myPlaylists.reverse()

    generatorContainerCurrentMusicAddPlaylist()
    generatorContainerMusicAddPlaylist()
}

async function refreshUser() {
    const idUserConnected = getCookie("user")
    const responseUser = await fetch(`/users/${idUserConnected}`);
    const user = await responseUser.json();

    userData = user.user;
    userData.myPlaylists.reverse()
    
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
            document.querySelector(".current-music-add-favorite-icon ion-icon").name = "heart"
            isFound = true;
        }
        
        if (!isFound) {
            document.querySelector(".current-music-add-favorite-icon ion-icon").name = "heart-outline"
        }

        containerItemsFavorite.innerHTML = ""
    } else {
        if(songFavorite){
            musicFavoriteIconMobile.name = "heart"
            document.querySelector(".current-music-add-favorite-icon-mobile ion-icon").name = "heart"

            isFound = true;
        }
        
        if (!isFound) {
            musicFavoriteIconMobile.name = "heart-outline"
            document.querySelector(".current-music-add-favorite-icon-mobile ion-icon").name = "heart-outline"
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
function toggleMyPlaylists() {
    if (screenWidth >= 1360) {
        $(".main-minhas-playlists").toggle(200);
    } else {
        $(".main-minhas-playlists-mobile").toggle(200);
    }
}
function toggleContainerMinhaPlaylist() {
    if (screenWidth >= 1360) {
        $(".container-minha-playlist").toggle(200);
    } else {
        $(".container-minha-playlist-mobile").toggle(200);
    }
}
function toggleAddMinhaPlaylist() {
    if (screenWidth >= 1360) {
        const addMyNewPlaylistOverflow = document.querySelector(".add-my-new-playlist-overflow");
        if (addMyNewPlaylistOverflow.classList.contains("hidden")) {
            addMyNewPlaylistOverflow.classList.remove("hidden");
            canKeyboardEvents = false;
        } else {
            addMyNewPlaylistOverflow.classList.add("hidden");
            canKeyboardEvents = true;
        }
    } else {
        const addMyNewPlaylistOverflow = document.querySelector(".add-my-new-playlist-overflow-mobile");
        if (addMyNewPlaylistOverflow.classList.contains("hidden")) {
            addMyNewPlaylistOverflow.classList.remove("hidden");
        } else {
            addMyNewPlaylistOverflow.classList.add("hidden");
        }
    }
}
function toggleEditMinhaPlaylist() {
    if (screenWidth >= 1360) {
        const editOverflow = document.querySelector(".edit-my-new-playlist-overflow");
        if (editOverflow.classList.contains("hidden")) {
            editOverflow.classList.remove("hidden");
            canKeyboardEvents = false;
        } else {
            editOverflow.classList.add("hidden");
            canKeyboardEvents = true;
        }
    } else {
        const editOverflow = document.querySelector(".edit-my-new-playlist-overflow-mobile");
        if (editOverflow.classList.contains("hidden")) {
            editOverflow.classList.remove("hidden");
        } else {
            editOverflow.classList.add("hidden");
        }
    }
}
function toggleDeleteMinhaPlaylist() {
    if (screenWidth >= 1360) {
        const deleteOverflow = document.querySelector(".delete-my-new-playlist-overflow");
        if (deleteOverflow.classList.contains("hidden")) {
            deleteOverflow.classList.remove("hidden");
            canKeyboardEvents = false;
        } else {
            deleteOverflow.classList.add("hidden");
            canKeyboardEvents = true;
        }
    } else {
        const deleteOverflow = document.querySelector(".delete-my-new-playlist-overflow-mobile");
        if (deleteOverflow.classList.contains("hidden")) {
            deleteOverflow.classList.remove("hidden");
        } else {
            deleteOverflow.classList.add("hidden");
        }
    }
}
function toggleMusicMinhaPlaylist() {
    if (screenWidth >= 1360) {
        const musicOverflow = document.querySelector(".music-my-new-playlist-overflow");
        if (musicOverflow.classList.contains("hidden")) {
            musicOverflow.classList.remove("hidden");
        } else {
            musicOverflow.classList.add("hidden");
        }
    } else {
        const musicOverflow = document.querySelector(".music-my-new-playlist-overflow-mobile");
        if (musicOverflow.classList.contains("hidden")) {
            musicOverflow.classList.remove("hidden");
        } else {
            musicOverflow.classList.add("hidden");
        }
    }
}
function toggleDeleteMusicMinhaPlaylist() {
    if (screenWidth >= 1360) {
        $(".music-delete-my-new-playlist-overflow").toggle(200);
    } else {
        $(".music-delete-my-new-playlist-overflow-mobile").toggle(200);
    }
}

function toggleDisplayMobile() {
    if (!displayMobile.classList.contains("show")){
        displayMobile.classList.remove("exit");
        displayMobile.classList.add("show");

        if (musicDataShuffled[indexAudio].isVideo) {
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

function toggleAddOptions() {
    if (screenWidth >= 1360) {
        const addOptionsOverflow = document.querySelector(".current-music-add-overflow");
        if (addOptionsOverflow.classList.contains("hidden")) {
            addOptionsOverflow.classList.remove("hidden");
            canKeyboardEventsProfile = false;
        } else {
            addOptionsOverflow.classList.add("hidden");
            canKeyboardEventsProfile = true;
        }
    } else {
        const addOptionsOverflow = document.querySelector(".current-music-add-overflow-mobile");
        if (addOptionsOverflow.classList.contains("hidden")) {
            addOptionsOverflow.classList.remove("hidden");
        } else {
            addOptionsOverflow.classList.add("hidden");
        }
    }
}

function toggleLogout() {
    if (screenWidth >= 1360) {
        const logoutOverflow = document.querySelector(".confirm-logout-overflow");
        if (logoutOverflow.classList.contains("hidden")) {
            logoutOverflow.classList.remove("hidden");
            canKeyboardEventsProfile = false;
        } else {
            logoutOverflow.classList.add("hidden");
            canKeyboardEventsProfile = true;
        }
    } else {
        const logoutOverflow = document.querySelector(".confirm-logout-overflow-mobile");
        if (logoutOverflow.classList.contains("hidden")) {
            logoutOverflow.classList.remove("hidden");
        } else {
            logoutOverflow.classList.add("hidden");
        }
    }
}

function audioControllerPlayAudioAndVideo() {
    if (screenWidth >= 1360) {
        if(!musicDataShuffled[indexAudio].isVideo){
            document.querySelector(".container-side-2").style.display = "none"
            musicAnimationStatus.classList.remove('run');
        } else {
            document.querySelector(".container-side-2").style.display = "flex"
        }
    } else {
        if(!musicDataShuffled[indexAudio].isVideo){
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
        $(".title-playlist").html(titlePlaylist ? titlePlaylist : userData.lastAccessedPlaylistName);
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
        $(".title-playlist-mobile").html(titlePlaylist ? titlePlaylist : userData.lastAccessedPlaylistName);
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
    manageEmptyPlaylist()
    manageHistoric();
    setUserProfilePicture()
    setUserSettings()
    generatorContainerCurrentMusicAddPlaylist()
    generatorContainerMusicAddPlaylist()
    if (emptyPlaylist) return
    themeChanger(musicDataShuffled[indexAudio].theme);
    indexAudioId = musicDataShuffled[indexAudio]._id;
    indexAudioGender = musicDataShuffled[indexAudio].gender;
    refreshFavorite();
    setMusicPlayTag();
    audioControllerPlayAudioAndVideo();
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

async function manageUserAccountDeletion() {
    if (screenWidth >= 1360) {
        if (deleteAccountInputToConfirm.value !== "Quero deletar minha conta e aceito as condições") {
            warning.classList.remove('hidden')
            warning.textContent = 'Por favor, escreva a frase corretamente.'
            setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
            return
        }

        const userToDelete = await fetch(`/users/${userData._id}`, {
            method: "DELETE"
        })
        const response = await userToDelete.json()

        if (response.message === "User removed successfully!") {
            logoutService();
        }
    } else {
        if (deleteAccountInputToConfirmMobile.value !== "Quero deletar minha conta e aceito as condições") {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Por favor, escreva a frase corretamente.'
            setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
            return
        }

        const userToDelete = await fetch(`/users/${userData._id}`, {
            method: "DELETE"
        })
        const response = await userToDelete.json()

        if (response.message === "User removed successfully!") {
            logoutService();
        }
    }
}

function manageMyPlaylistEdition() {
    if (screenWidth >= 1360) {
        const playlistTitle = document.querySelector('.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name').value.trim();
        if (playlistTitle === "") {
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Por favor, escreva o nome da playlist corretamente.'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Por favor, escreva o nome da playlist corretamente.'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }
    
        const playlistExists = userData.myPlaylists.filter(playlist => playlist.title === playlistTitle);
    
        if (userData.myPlaylists.find(playlist => playlist.title === playlistTitle && playlist._id === indexMyPlaylistId)) {
            toggleContainerMinhaPlaylist()
            toggleEditMinhaPlaylist()
            return
        }
    
        if (playlistExists.length >= 1) {
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Já existe uma playlist com esse nome.'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Já existe uma playlist com esse nome.'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }
    
        fetch(`/users-playlist/${userData._id}/${indexMyPlaylistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: document.querySelector('.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name').value.trim()})
        })
        .then(response => {
            if (response.status === 200) {
                if (screenWidth >= 1360) {
                    document.querySelector(".title-playlist").textContent = document.querySelector('.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name').value.trim();
                } else {
                    document.querySelector(".title-playlist-mobile").textContent = document.querySelector('.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name').value.trim();
                }
                toggleContainerMinhaPlaylist()
                toggleEditMinhaPlaylist()
                refreshUserWithNewPlaylist()
            } else {
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.textContent = 'Internal Error!'
    
                    setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Internal Error!'
    
                    setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        })
    } else {
        const playlistTitle = document.querySelector('.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile .edit-my-new-playlist-name-mobile').value.trim();
        if (playlistTitle === "") {
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Por favor, escreva o nome da playlist corretamente.'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Por favor, escreva o nome da playlist corretamente.'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }
    
        const playlistExists = userData.myPlaylists.filter(playlist => playlist.title === playlistTitle);
    
        if (userData.myPlaylists.find(playlist => playlist.title === playlistTitle && playlist._id === indexMyPlaylistId)) {
            toggleContainerMinhaPlaylist()
            toggleEditMinhaPlaylist()
            return
        }
    
        if (playlistExists.length >= 1) {
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Já existe uma playlist com esse nome.'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Já existe uma playlist com esse nome.'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }
    
        fetch(`/users-playlist/${userData._id}/${indexMyPlaylistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: document.querySelector('.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile .edit-my-new-playlist-name-mobile').value.trim()})
        })
        .then(response => {
            if (response.status === 200) {
                if (screenWidth >= 1360) {
                    document.querySelector(".title-playlist").textContent = document.querySelector('.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name').value.trim();
                } else {
                    document.querySelector(".title-playlist-mobile").textContent = document.querySelector('.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name').value.trim();
                }
                toggleContainerMinhaPlaylist()
                toggleEditMinhaPlaylist()
                refreshUserWithNewPlaylist()
            } else {
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.textContent = 'Internal Error!'
    
                    setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Internal Error!'
    
                    setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        })
    }
}

function manageMyPlaylistDeletion() {
    if (screenWidth >= 1360) {
        if (document.querySelector('.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-name').value !== document.querySelector('.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-current').textContent) {
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Por favor, escreva o nome da playlist corretamente.'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Por favor, escreva o nome da playlist corretamente.'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }
    
        fetch(`/users-playlist/${userData._id}/${indexMyPlaylistId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.status === 200) {
                document.querySelector('.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-name').value = ""
                toggleContainerMinhaPlaylist()
                toggleDeleteMinhaPlaylist()
                refreshUserWithNewPlaylist()
            } else {
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.textContent = 'Internal Error!'
    
                    setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Internal Error!'
    
                    setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        })
    } else {
        if (document.querySelector('.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-name-mobile').value !== document.querySelector('.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-current-mobile').textContent) {
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Por favor, escreva o nome da playlist corretamente.'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Por favor, escreva o nome da playlist corretamente.'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }
    
        fetch(`/users-playlist/${userData._id}/${indexMyPlaylistId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (response.status === 200) {
                document.querySelector('.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-name-mobile').value = ""
                toggleContainerMinhaPlaylist()
                toggleDeleteMinhaPlaylist()
                refreshUserWithNewPlaylist()
            } else {
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.textContent = 'Internal Error!'
    
                    setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Internal Error!'
    
                    setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        })
    }
}

function manageEmptyPlaylist() {
    if (!emptyPlaylist) return

    if (screenWidth >= 1360) {
        containerPlaylist.innerHTML = `
        <div class="empty-playlist">
            <h1>Ops, isso não deveria acontecer</h1>
            <p>Por algum motivo, não foi possível carregar esta playlist</p>
            <p>Por favor, selecione outra playlist clicando no botão "Mais" e depois em "Selecionar Playlist"</p>
        </div>
    `
    } else {
        containerPlaylistMobile.innerHTML = `
        <div class="empty-playlist-mobile">
            <h1>Ops, isso não deveria acontecer</h1>
            <p>Por algum motivo, não foi possível carregar esta playlist</p>
            <p>Por favor, selecione outra playlist clicando no botão "Mais" e depois em "Selecionar Playlist"</p>
        </div>
    `
    }
    
}

function manageMyPlaylistMusicDeletion() {
    fetch(`/users-playlist-song/${userData._id}/${indexMyPlaylistId}/${indexMyPlaylistAudioId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.status === 200) {
            toggleContainerMinhaPlaylist()
            toggleMusicMinhaPlaylist()
            if (screenWidth >= 1360) {
                if (document.querySelector('.music-delete-my-new-playlist-overflow').classList.contains('music-delete-my-new-playlist-overflow')) {
                    document.querySelector('.music-delete-my-new-playlist-overflow').classList.add('hidden');
                }
            } else {
                if (document.querySelector('.music-delete-my-new-playlist-overflow-mobile').classList.contains('music-delete-my-new-playlist-overflow-mobile')) {
                    document.querySelector('.music-delete-my-new-playlist-overflow-mobile').classList.add('hidden');
                }
            }
            
            refreshUserWithNewPlaylist()
        } else {
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Internal Error!'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Internal Error!'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
        }
    })
}

async function manageUserProfilePicture() {
    if (screenWidth >= 1360) {
        if (userData.profilePicture === "" && profilePictureInput.value.trim() === ""){
            layerProfilePicture.classList.add("hidden")
            canKeyboardEventsProfile = true;
            return
        } 
        
        const resposta = await fetch(`/users-profile-picture/${userData._id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({profilePicture: profilePictureInput.value.trim()})
        })
        
        if(resposta.status != 200){
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Internal Error!'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Internal Error!'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }

        layerProfilePicture.classList.add("hidden")
        await refreshFavorite()
        await refreshUser()
        profilePictureInput.value = userData.profilePicture
        canKeyboardEventsProfile = true;
        setUserProfilePicture()
    } else {
        if (userData.profilePicture === "" && profilePictureInputMobile.value.trim() === ""){
            layerProfilePictureMobile.classList.add("hidden")
            return
        }
        
        const resposta = await fetch(`/users-profile-picture/${userData._id}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({profilePicture: profilePictureInputMobile.value.trim()})
        })
        
        if(resposta.status != 200){
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Internal Error!'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Internal Error!'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }

        layerProfilePictureMobile.classList.add("hidden")
        await refreshFavorite()
        await refreshUser()
        profilePictureInputMobile.value = userData.profilePicture
        setUserProfilePicture()
    }
}

function setUserProfilePicture() {
    if (screenWidth >= 1360) {
        if (userData.profilePicture == "") {
            document.querySelector('#userSettingsPersonIcon').classList.remove("hidden")
            document.querySelector('#userSettingsPersonContainer').classList.add("hidden")
            document.querySelector('#userPersonIcon').classList.remove("hidden")
            document.querySelector('#userPersonContainer').classList.add("hidden")
        } else {
            document.querySelector('#userSettingsPersonIcon').classList.add("hidden")
            document.querySelector('#userSettingsPersonContainer').classList.remove("hidden")
            document.querySelector('#userSettingsPersonImg').src = userData.profilePicture
            document.querySelector('#userPersonIcon').classList.add("hidden")
            document.querySelector('#userPersonContainer').classList.remove("hidden")
            document.querySelector('#userPersonImg').src = userData.profilePicture
            profilePictureInput.value = userData.profilePicture
        }
    } else {
        if (userData.profilePicture == "") {
            document.querySelector('#userSettingsPersonIconMobile').classList.remove("hidden")
            document.querySelector('#userSettingsPersonContainerMobile').classList.add("hidden")
            document.querySelector('#userPersonIconMobile').classList.remove("hidden")
            document.querySelector('#userPersonContainerMobile').classList.add("hidden")
        } else {
            document.querySelector('#userSettingsPersonIconMobile').classList.add("hidden")
            document.querySelector('#userSettingsPersonContainerMobile').classList.remove("hidden")
            document.querySelector('#userSettingsPersonImgMobile').src = userData.profilePicture
            document.querySelector('#userPersonIconMobile').classList.add("hidden")
            document.querySelector('#userPersonContainerMobile').classList.remove("hidden")
            document.querySelector('#userPersonImgMobile').src = userData.profilePicture
            profilePictureInputMobile.value = userData.profilePicture
        }
    }
}

async function manageUserCreatePlaylist() {
    if (screenWidth >= 1360) {
        const newPlaylistName = document.querySelector('.add-my-new-playlist-name').value.trim()

        if (newPlaylistName === "") {
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Por favor, digite um nome para a playlist.'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Por favor, digite um nome para a playlist.'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }
        
        for (let i = 0; i < userData.myPlaylists.length; i++) {
            if (userData.myPlaylists[i].title === newPlaylistName) {
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.textContent = 'Já existe uma playlist com esse nome.'
                    setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Já existe uma playlist com esse nome.'
                    setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
                return
            }
        }
    
        try {
            const response = await fetch(`/users-playlist/${userData._id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: newPlaylistName })
            });
    
            if (response.status === 201) {
                canKeyboardEvents = true;
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.classList.add('success')
                    warning.textContent = 'Playlist criada com sucesso!'
                    setTimeout(() => {
                        warning.classList.remove('success')
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.classList.add('success')
                    warningMobile.textContent = 'Playlist criada com sucesso!'
                    setTimeout(() => {
                        warningMobile.classList.remove('success')
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
    
                await refreshUserWithNewPlaylist()
                document.querySelector('.add-my-new-playlist-name').value = ""
                toggleAddMinhaPlaylist()
            } else {
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.textContent = 'Erro ao criar a playlist.'
                    setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Erro ao criar a playlist.'
                    setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        const newPlaylistName = document.querySelector('.add-my-new-playlist-name-mobile').value.trim()

        if (newPlaylistName === "") {
            if(screenWidth >= 1360){
                warning.classList.remove('hidden')
                warning.textContent = 'Por favor, digite um nome para a playlist.'
                setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Por favor, digite um nome para a playlist.'
                setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }
        
        for (let i = 0; i < userData.myPlaylists.length; i++) {
            if (userData.myPlaylists[i].title === newPlaylistName) {
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.textContent = 'Já existe uma playlist com esse nome.'
                    setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Já existe uma playlist com esse nome.'
                    setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
                return
            }
        }
    
        try {
            const response = await fetch(`/users-playlist/${userData._id}`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: newPlaylistName })
            });
    
            if (response.status === 201) {
                canKeyboardEvents = true;
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.classList.add('success')
                    warning.textContent = 'Playlist criada com sucesso!'
                    setTimeout(() => {
                        warning.classList.remove('success')
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.classList.add('success')
                    warningMobile.textContent = 'Playlist criada com sucesso!'
                    setTimeout(() => {
                        warningMobile.classList.remove('success')
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
    
                await refreshUserWithNewPlaylist()
                document.querySelector('.add-my-new-playlist-name-mobile').value = ""
                toggleAddMinhaPlaylist()
            } else {
                if(screenWidth >= 1360){
                    warning.classList.remove('hidden')
                    warning.textContent = 'Erro ao criar a playlist.'
                    setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Erro ao criar a playlist.'
                    setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
}

function selectUserMyPlaylist() {
    const playlist = userData.myPlaylists.find(item => item._id === indexMyPlaylistId);
    const matchingSongs = allMusicData.filter(song => playlist.songs.map(item => item.musicId).includes(song._id)).sort((a, b) => a.title.localeCompare(b.title));

    titlePlaylist = playlist.title;

    if (screenWidth >= 1360) {
        $(".title-playlist").html(playlist.title);
    } else {
        $(".title-playlist-mobile").html(playlist.title);
    }

    musicData = matchingSongs;
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
    manageEmptyPlaylist();
    if (emptyPlaylist) return
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
    refreshUserWithNewPlaylist()
    setManagementSystem()
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
        if(screenWidth >= 1360){
            warning.classList.remove('hidden')
            warning.textContent = 'Internal Error!'
            setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Internal Error!'
            setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
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
    titlePlaylist = "";

    allSongValueSetters()
    generatorContainerPlaylistData();
    generatorContainerPlaylistDataPlay();
    manageEmptyPlaylist()
    if (emptyPlaylist) return
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
    refreshUserWithNewPlaylist()
    setManagementSystem()
}

async function musicListingService() {
    const idUserConnected = getCookie("user")

    const responseUser = await fetch(`/users/${idUserConnected}`);
    const user = await responseUser.json();

    userData = user.user;
    userData.myPlaylists.reverse()

    const responsePlaylists = await fetch(`/playlists/${idUserConnected}`);
    const playlists = await responsePlaylists.json();

    const responseSongs = await fetch(`/playlists-select/${idUserConnected}/?playlist=${userData.lastAccessedPlaylist}`);
    const songs = await responseSongs.json();

    const responseAllSongs = await fetch("/songs");
    const allSongs = await responseAllSongs.json();

    allMusicData = allSongs.songs
    musicData = songs.songs;
    playlistData = playlists.playlists;

    musicDataShuffled = [...musicData];

    inicia();
}

musicListingService();