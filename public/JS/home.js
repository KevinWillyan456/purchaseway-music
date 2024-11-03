let indexAudio = 0
let indexAudioId = ''
let indexAudioGender = ''
let indexMyPlaylistId = ''
let indexMyPlaylistIdCurrent = ''
let indexMyPlaylistAudioId = ''

let itensPerPage = 10
let indexPage = 0

let screenWidth = 0
let screenHeight = 0

let initialDevice = ''
let emptyPlaylist = true

let player
let playerReady = false

let playerMobile
let playerReadyMobile = false

let timerAlertMessage = null

let isMyPlaylist = false

const audioControllerPrev = document.querySelector('#audio-prev')
const audioControllerPlay = document.querySelector('#audio-play')
const audioControllerNext = document.querySelector('#audio-next')

const coverCurrentMusic = document.querySelector('.cover-current-music img')
const titleCurrentMusic = document.querySelector('.title-info-current-music')
const genderCurrentMusic = document.querySelector('.gender-info-current-music')
const backgroundCover = document.querySelector(
    '.main-display .background-cover'
)

const musicAnimationStatus = document.querySelector('.music-animation-status')

const containerPlaylist = document.querySelector('.container-playlist')
const body = document.body

const currentDuration = document.querySelector(
    '.container-duration-status .current-duration'
)
const sliderMusicDuration = document.querySelector(
    '.slider-music-duration .slider-music-duration-wrapper input'
)
const sliderMusicDurationDot = document.querySelector(
    '.slider-music-duration-wrapper .slider-music-duration-dot'
)
const totalDuration = document.querySelector(
    '.container-duration-status .total-duration'
)

const sliderMusicVolume = document.querySelector(
    '.slider-music-volume .slider-music-volume-wrapper input'
)
const sliderMusicVolumeDot = document.querySelector(
    '.slider-music-volume-wrapper .slider-music-volume-dot'
)
const volumeIcon = document.querySelector('.volume-icon ion-icon')

const repeatIcon = document.querySelector(
    '.container-funcions .repeat-icon ion-icon'
)
const shuffleIcon = document.querySelector(
    '.container-funcions .shuffle-icon ion-icon'
)

const searchButton = document.querySelector('.container-search .search-icon')

const containerItemsSearch = document.querySelector('.container-items')
const searchBarInput = document.querySelector('#search-bar-input')

const containerItemsFavorite = document.querySelector('.container-favorite')
const containerItemsHistoric = document.querySelector('.container-historic')

const userName = document.querySelector('.user-name')
const registrationDate = document.querySelector('.registration-date')

const containerFrameVideo = document.querySelector('.container-frame')

const logout = document.querySelector('.logout')

const musicFavoriteIcon = document.querySelector(
    '.current-music-add-favorite-container'
)
const musicAddIcon = document.querySelector('.current-music-add ion-icon')
const musicAddIconMobile = document.querySelector(
    '.current-music-add-mobile ion-icon'
)

const clearHistoricIcon = document.querySelector('.trash-icon')

const morePlaylist = document.querySelector('.more-playlist')
const selectPlaylist = document.querySelector('#selectPlaylist')
const selectPlaylistMobile = document.querySelector('#selectPlaylistMobile')
const selectManagementSystem = document.querySelector('#selectManagementSystem')
const selectManagementSystemMobile = document.querySelector(
    '#selectManagementSystemMobile'
)
const selectFavorites = document.querySelector('#selectFavorites')
const selectFavoritesMobile = document.querySelector('#selectFavoritesMobile')
const backMenu = document.querySelector('#backMenu')
const backMenuMobile = document.querySelector('#backMenuMobile')
const backPlaylist = document.querySelector('.select-playlist-back')

const containerPlaylistSelect = document.querySelector(
    '.container-select-playlists'
)

const containerPlaylistMobile = document.querySelector(
    '.container-playlist-mobile'
)

const coverCurrentMusicMobile = document.querySelector(
    '.main-controls-mobile .box-wrapper .cover-item img'
)
const titleCurrentMusicMobile = document.querySelector(
    '.main-controls-mobile .box-wrapper .info-item .title-info'
)
const genderCurrentMusicMobile = document.querySelector(
    '.main-controls-mobile .box-wrapper .info-item .gender-info'
)
const titleCurrentMusicDisplayMobile = document.querySelector(
    '.main-display-mobile .info-current-music-mobile .title-info-current-music-mobile'
)
const genderCurrentMusicDisplayMobile = document.querySelector(
    '.main-display-mobile .info-current-music-mobile .gender-info-current-music-mobile'
)

const controlsMobile = document.querySelector('.main-controls-mobile')
const displayMobile = document.querySelector('.main-display-mobile')
const backgroundCoverMobile = document.querySelector(
    '.main-display-mobile .background-cover-mobile'
)
const backDisplayMobile = document.querySelector(
    '.main-display-mobile .display-back'
)

const audioControllerPrevMobile = document.querySelector('#audio-prev-mobile')
const audioControllerPlayMobile = document.querySelector('#audio-play-mobile')
const audioControllerNextMobile = document.querySelector('#audio-next-mobile')

const repeatIconMobile = document.querySelector(
    '.main-display-mobile .repeat-icon-mobile ion-icon'
)
const shuffleIconMobile = document.querySelector(
    '.main-display-mobile .shuffle-icon-mobile ion-icon'
)

const sliderMusicDurationMobile = document.querySelector(
    '.slider-music-duration-mobile .slider-music-duration-wrapper-mobile input'
)
const sliderMusicDurationDotMobile = document.querySelector(
    '.slider-music-duration-mobile .slider-music-duration-wrapper-mobile .slider-music-duration-dot-mobile'
)

const currentDurationMobile = document.querySelector(
    '.main-display-mobile .current-duration-mobile'
)
const totalDurationMobile = document.querySelector(
    '.main-display-mobile .total-duration-mobile'
)

const morePlaylistMobile = document.querySelector('.more-playlist-mobile')
const backPlaylistMobile = document.querySelector(
    '.select-playlist-back-mobile'
)

const containerPlaylistSelectMobile = document.querySelector(
    '.container-select-playlists-mobile'
)

const displayMusicDurationMobile = document.querySelector(
    '.main-controls-mobile .display-music-duration-mobile'
)

const userNameMobile = document.querySelector('.user-name-mobile')
const registrationDateMobile = document.querySelector(
    '.registration-date-mobile'
)

const containerItemsFavoriteMobile = document.querySelector(
    '.container-favorite-mobile'
)
const containerItemsHistoricMobile = document.querySelector(
    '.container-historic-mobile'
)

const musicFavoriteIconMobile = document.querySelector(
    '.current-music-add-favorite-container-mobile'
)

const logoutMobile = document.querySelector('.logout-mobile')

const clearHistoricIconMobile = document.querySelector(
    '.content-profile-mobile .title-2-wrapper-mobile .trash-icon-mobile'
)

const containerItemsSearchMobile = document.querySelector(
    '.container-search-mobile'
)

const searchBarInputMobile = document.querySelector('#search-bar-input-mobile')

const btnChangeName = document.querySelector('#btnChangeName')
const btnChangeNameMobile = document.querySelector('#btnChangeNameMobile')
const btnDeleteAccount = document.querySelector('#btnDeleteAccount')
const btnDeleteAccountMobile = document.querySelector('#btnDeleteAccountMobile')

const formDeleteAccount = document.querySelector('#formDeleteAccount')
const formDeleteAccountMobile = document.querySelector(
    '#formDeleteAccountMobile'
)
const formChangeNameAccount = document.querySelector('#formChangeNameAccount')
const formChangeNameAccountMobile = document.querySelector(
    '#formChangeNameAccountMobile'
)
const formDeleteAccountCancel = document.querySelector(
    '#formDeleteAccountCancel'
)
const formDeleteAccountCancelMobile = document.querySelector(
    '#formDeleteAccountCancelMobile'
)
const changeNameInput = document.querySelector('#changeNameInput')
const changeNameInputMobile = document.querySelector('#changeNameInputMobile')
const deleteAccountInputToConfirm = document.querySelector(
    '#deleteAccountInputToConfirm'
)
const deleteAccountInputToConfirmMobile = document.querySelector(
    '#deleteAccountInputToConfirmMobile'
)
const warning = document.querySelector('#warning')
const warningMobile = document.querySelector('#warningMobile')

const profilePictureEdit = document.querySelector('#profilePictureEdit')
const layerProfilePicture = document.querySelector('#layerProfilePicture')
const profilePictureInput = document.querySelector('#profilePictureInput')
const profilePictureEditMobile = document.querySelector(
    '#profilePictureEditMobile'
)
const layerProfilePictureMobile = document.querySelector(
    '#layerProfilePictureMobile'
)
const profilePictureInputMobile = document.querySelector(
    '#profilePictureInputMobile'
)

const backMyPlaylist = document.querySelector('.minhas-playlists-back')
const backMyPlaylistMobile = document.querySelector(
    '.minhas-playlists-back-mobile'
)
const backContainerMinhaPlaylist = document.querySelector(
    '.container-minha-playlist-back'
)
const backContainerMinhaPlaylistMobile = document.querySelector(
    '.container-minha-playlist-back-mobile'
)
const selectMyPlaylist = document.querySelector('#selectMyPlaylist')
const selectMyPlaylistMobile = document.querySelector('#selectMyPlaylistMobile')

const containerMinhaPlaylist = document.querySelector('#containerMinhaPlaylist')
const btnSelectMyPlaylist = document.querySelector('#btnSelectMyPlaylist')
const btnSelectMyPlaylistMobile = document.querySelector(
    '#btnSelectMyPlaylistMobile'
)
const btnEditSelectMyPlaylist = document.querySelector(
    '#btnEditSelectMyPlaylist'
)
const btnEditSelectMyPlaylistMobile = document.querySelector(
    '#btnEditSelectMyPlaylistMobile'
)
const btnDeleteSelectMyPlaylist = document.querySelector(
    '#btnDeleteSelectMyPlaylist'
)
const btnDeleteSelectMyPlaylistMobile = document.querySelector(
    '#btnDeleteSelectMyPlaylistMobile'
)
const favoriteEmpty = document.querySelector('#favoriteEmpty')
const favoriteEmptyMobile = document.querySelector('#favoriteEmptyMobile')
const historicEmpty = document.querySelector('#historicEmpty')
const historicEmptyMobile = document.querySelector('#historicEmptyMobile')

const setFullscreen = document.querySelector('#setFullscreen')
const setFullscreenMobile = document.querySelector('#setFullscreenMobile')

const loadingRoller = document.querySelector('#loadingRoller')
const loadingRollerMobile = document.querySelector('#loadingRollerMobile')
const loadMore = document.querySelector('#loadMore')
const loadMoreMobile = document.querySelector('#loadMoreMobile')

let allMusicData = []
let musicData = []
let musicDataShuffled = []
let musicDataFiltered = []

let userData

let playlistData = []

let audioControllerPlayToggle = true

const themes = [
    'original',
    'rock-version',
    'hatsune-miku-version',
    'amv-brasileiro-version',
    'dark-mode-version',
]

const colorsThemes = {
    original: {
        base1: '#081b39',
        base2: '#3c93cf',
        base3: '#3e5162',
        base4: '#0c264e',
        base5: '#3decff',
    },
    'rock-version': {
        base1: '#260101',
        base2: '#bf1f1f',
        base3: '#40060b',
        base4: '#731010',
        base5: '#f53636',
    },
    'hatsune-miku-version': {
        base1: '#12211c',
        base2: '#229e89',
        base3: '#3f5d5b',
        base4: '#0b5c54',
        base5: '#3dffe8',
    },
    'amv-brasileiro-version': {
        base1: '#211e12',
        base2: '#9e5a22',
        base3: '#5d523f',
        base4: '#5c2e0b',
        base5: '#fcff3d',
    },
    'dark-mode-version': {
        base1: '#0b0b0b',
        base2: '#6E6E6E',
        base3: '#2F2F2F',
        base4: '#4B4B4B',
        base5: '#cecece',
    },
}

const HEIGHT_TO_SHOW_SCROLL_TOP = 300

const scrollTopPlaylists = document.querySelector('#scrollTopPlaylists')
const scrollTopPlaylistsMobile = document.querySelector(
    '#scrollTopPlaylistsMobile'
)

scrollTopPlaylists.addEventListener('click', () => {
    document.querySelector('.main-select-playlists').scrollTo({
        top: 0,
        behavior: 'smooth',
    })
})
scrollTopPlaylistsMobile.addEventListener('click', () => {
    document.querySelector('.main-select-playlists-mobile').scrollTo({
        top: 0,
        behavior: 'smooth',
    })
})

document
    .querySelector('.main-select-playlists')
    .addEventListener('scroll', manageScrollTop)
document
    .querySelector('.main-select-playlists-mobile')
    .addEventListener('scroll', manageScrollTop)

function manageScrollTop() {
    if (screenWidth >= 1360) {
        if (
            document.querySelector('.main-select-playlists').scrollTop >
            HEIGHT_TO_SHOW_SCROLL_TOP
        ) {
            scrollTopPlaylists.classList.remove('hidden')
        } else {
            scrollTopPlaylists.classList.add('hidden')
        }
    } else {
        if (
            document.querySelector('.main-select-playlists-mobile').scrollTop >
            HEIGHT_TO_SHOW_SCROLL_TOP
        ) {
            scrollTopPlaylistsMobile.classList.remove('hidden')
        } else {
            scrollTopPlaylistsMobile.classList.add('hidden')
        }
    }
}

const serviceLogo = document.querySelector('.service-logo img')
const serviceLogoMobile = document.querySelector(
    '.header-mobile .service-logo-mobile img'
)

const allThemeTriggers = document.querySelectorAll(
    '.container-themes .theme, .container-themes-mobile .theme-mobile'
)

allThemeTriggers.forEach((element) => {
    element.addEventListener('click', () => {
        const selectedTheme = element.dataset.theme
        if (userData.theme == selectedTheme) return

        themeChanger(selectedTheme)
    })
})

audioControllerPlay.addEventListener('click', audioControllerPlayFunction)
audioControllerNext.addEventListener('click', audioControllerNextFunction)
audioControllerPrev.addEventListener('click', audioControllerPrevFunction)

audioControllerPlayMobile.addEventListener('click', audioControllerPlayFunction)
audioControllerNextMobile.addEventListener('click', audioControllerNextFunction)
audioControllerPrevMobile.addEventListener('click', audioControllerPrevFunction)

window.addEventListener('load', setFullHeight)
window.addEventListener('orientationchange', setFullHeight)
window.addEventListener('resize', () => {
    allFunctionResizing()
    setFullHeight()
})

let canKeyboardEvents = true
let canKeyboardEventsProfile = true
document.addEventListener('keyup', function (event) {
    if (canKeyboardEvents) {
        switch (event.key) {
            case ' ':
                audioControllerPlayFunction()
                break
            case 'ArrowRight':
                audioControllerNextFunction()
                break
            case 'ArrowLeft':
                audioControllerPrevFunction()
                break
            case 'ArrowUp':
                volumeUp()
                break
            case 'ArrowDown':
                volumeDown()
                break
        }
    }
    if (canKeyboardEventsProfile && (event.key == 'p' || event.key == 'P')) {
        toggleTemplateUser()
    }
})

logout.addEventListener('click', toggleLogout)
logoutMobile.addEventListener('click', toggleLogout)
clearHistoricIcon.addEventListener('click', manageHistoricClear)
clearHistoricIconMobile.addEventListener('click', manageHistoricClear)
musicFavoriteIcon.addEventListener('click', manageFavorite)
musicFavoriteIconMobile.addEventListener('click', manageFavorite)
selectPlaylist.addEventListener('click', () => {
    canKeyboardEventsProfile = false
    canKeyboardEvents = false
    toggleMenu()
    toggleMorePlaylists()
})
selectPlaylistMobile.addEventListener('click', () => {
    toggleMenu()
    toggleMorePlaylists()
})
selectFavorites.addEventListener('click', () => {
    toggleMenu()
    selectNewPlaylist('Favorite', 'Músicas Favoritas')
})
selectFavoritesMobile.addEventListener('click', () => {
    toggleMenu()
    selectNewPlaylist('Favorite', 'Músicas Favoritas')
})
selectMyPlaylist.addEventListener('click', () => {
    canKeyboardEventsProfile = false
    canKeyboardEvents = false
    toggleMenu()
    toggleMyPlaylists()
})
selectMyPlaylistMobile.addEventListener('click', () => {
    toggleMenu()
    toggleMyPlaylists()
})

morePlaylist.addEventListener('click', toggleMenu)
backMenu.addEventListener('click', toggleMenu)
backMenuMobile.addEventListener('click', toggleMenu)
backPlaylist.addEventListener('click', () => {
    canKeyboardEventsProfile = true
    canKeyboardEvents = true
    toggleMorePlaylists()
})
backDisplayMobile.addEventListener('click', toggleDisplayMobile)
morePlaylistMobile.addEventListener('click', toggleMenu)
backPlaylistMobile.addEventListener('click', toggleMorePlaylists)
backMyPlaylist.addEventListener('click', () => {
    canKeyboardEventsProfile = true
    canKeyboardEvents = true
    toggleMyPlaylists()
})
backMyPlaylistMobile.addEventListener('click', toggleMyPlaylists)
backContainerMinhaPlaylist.addEventListener(
    'click',
    toggleContainerMinhaPlaylist
)
backContainerMinhaPlaylistMobile.addEventListener(
    'click',
    toggleContainerMinhaPlaylist
)
controlsMobile.addEventListener('click', () => {
    if (emptyPlaylist) return
    toggleDisplayMobile()
    $('.menu-options-mobile').hide(200)
})
btnChangeName.addEventListener('click', () => {
    formChangeNameAccount.classList.remove('hidden')
    changeNameInput.value = userData.name
    changeNameInput.focus()
    canKeyboardEvents = false
    canKeyboardEventsProfile = false
})
btnChangeNameMobile.addEventListener('click', () => {
    formChangeNameAccountMobile.classList.remove('hidden')
    changeNameInputMobile.value = userData.name
    changeNameInputMobile.focus()
})
btnDeleteAccount.addEventListener('click', () => {
    formDeleteAccount.classList.remove('hidden')
    deleteAccountInputToConfirm.focus()
    canKeyboardEvents = false
    canKeyboardEventsProfile = false
})
btnDeleteAccountMobile.addEventListener('click', () => {
    formDeleteAccountMobile.classList.remove('hidden')
    deleteAccountInputToConfirmMobile.focus()
})
formDeleteAccountCancel.addEventListener('click', () => {
    formDeleteAccount.classList.add('hidden')
    deleteAccountInputToConfirm.value = ''
    canKeyboardEventsProfile = true
})
formDeleteAccountCancelMobile.addEventListener('click', () => {
    formDeleteAccountMobile.classList.add('hidden')
    deleteAccountInputToConfirmMobile.value = ''
})
formDeleteAccount.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-delete-account-overflow') {
        formDeleteAccount.classList.add('hidden')
        deleteAccountInputToConfirm.value = ''
        canKeyboardEventsProfile = true
    }
})
formChangeNameAccountMobile.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-change-name-account-mobile-overflow') {
        formChangeNameAccountMobile.classList.add('hidden')
        changeNameInputMobile.value = ''
    }
})
formChangeNameAccount.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-change-name-account-overflow') {
        formChangeNameAccount.classList.add('hidden')
        changeNameInput.value = ''
        canKeyboardEventsProfile = true
    }
})
formDeleteAccountMobile.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-delete-account-overflow-mobile') {
        formDeleteAccountMobile.classList.add('hidden')
        deleteAccountInputToConfirmMobile.value = ''
    }
})
deleteAccountInputToConfirm.addEventListener('paste', (e) => {
    e.preventDefault()
})
deleteAccountInputToConfirmMobile.addEventListener('paste', (e) => {
    e.preventDefault()
})
document
    .querySelector('.form-change-name-account')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageUserAccountChangeName()
    })
document
    .querySelector('.form-change-name-account-mobile')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageUserAccountChangeName()
    })
document
    .querySelector('.form-delete-account')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageUserAccountDeletion()
    })
document
    .querySelector('.form-delete-account-mobile')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageUserAccountDeletion()
    })

profilePictureEdit.addEventListener('click', () => {
    layerProfilePicture.classList.remove('hidden')
    profilePictureInput.focus()
    canKeyboardEvents = false
    canKeyboardEventsProfile = false
})
layerProfilePicture.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'layer-profile-picture') {
        layerProfilePicture.classList.add('hidden')
        profilePictureInput.value = userData.profilePicture
        canKeyboardEventsProfile = true
    }
})
profilePictureEditMobile.addEventListener('click', () => {
    layerProfilePictureMobile.classList.remove('hidden')
    profilePictureInputMobile.focus()
})
layerProfilePictureMobile.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'layer-profile-picture-mobile') {
        layerProfilePictureMobile.classList.add('hidden')
        profilePictureInputMobile.value = userData.profilePicture
    }
})
document
    .querySelector('.container-profile-picture')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageUserProfilePicture()
    })
document
    .querySelector('.container-profile-picture-mobile')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageUserProfilePicture()
    })
btnSelectMyPlaylist.addEventListener('click', () => {
    isMyPlaylist = true
    canKeyboardEventsProfile = true
    canKeyboardEvents = true
    toggleContainerMinhaPlaylist()
    toggleMyPlaylists()
    selectUserMyPlaylist()
})
btnSelectMyPlaylistMobile.addEventListener('click', () => {
    isMyPlaylist = true
    toggleContainerMinhaPlaylist()
    toggleMyPlaylists()
    selectUserMyPlaylist()
})
btnEditSelectMyPlaylist.addEventListener('click', () => {
    toggleEditMinhaPlaylist()
    document.querySelector('.edit-my-new-playlist-name').focus()
})
btnEditSelectMyPlaylistMobile.addEventListener('click', () => {
    toggleEditMinhaPlaylist()
    document.querySelector('.edit-my-new-playlist-name-mobile').focus()
})
btnDeleteSelectMyPlaylist.addEventListener('click', () => {
    toggleDeleteMinhaPlaylist()
    document.querySelector('.delete-my-new-playlist-name').focus()
})
btnDeleteSelectMyPlaylistMobile.addEventListener('click', () => {
    toggleDeleteMinhaPlaylist()
    document.querySelector('.delete-my-new-playlist-name-mobile').focus()
})

document
    .querySelector('.add-my-new-playlist-overflow')
    .addEventListener('click', (event) => {
        if (event.target.classList.contains('add-my-new-playlist-overflow')) {
            event.target.classList.add('hidden')
            canKeyboardEvents = true
        }
    })
document
    .querySelector('.add-my-new-playlist-overflow-mobile')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains(
                'add-my-new-playlist-overflow-mobile'
            )
        ) {
            event.target.classList.add('hidden')
        }
    })
document
    .querySelector('.edit-my-new-playlist-overflow')
    .addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-my-new-playlist-overflow')) {
            event.target.classList.add('hidden')
            canKeyboardEvents = true
        }
    })
document
    .querySelector('.edit-my-new-playlist-overflow-mobile')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains(
                'edit-my-new-playlist-overflow-mobile'
            )
        ) {
            event.target.classList.add('hidden')
        }
    })
document
    .querySelector('.delete-my-new-playlist-overflow')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains('delete-my-new-playlist-overflow')
        ) {
            event.target.classList.add('hidden')
            document.querySelector('.delete-my-new-playlist-name').value = ''
        }
    })
document
    .querySelector('.delete-my-new-playlist-overflow-mobile')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains(
                'delete-my-new-playlist-overflow-mobile'
            )
        ) {
            event.target.classList.add('hidden')
            document.querySelector(
                '.delete-my-new-playlist-name-mobile'
            ).value = ''
        }
    })
document
    .querySelector('.delete-my-new-playlist-btn-cancel')
    .addEventListener('click', (event) => {
        event.target.parentElement.parentElement.parentElement.classList.add(
            'hidden'
        )
    })
document
    .querySelector('.delete-my-new-playlist-btn-cancel-mobile')
    .addEventListener('click', (event) => {
        event.target.parentElement.parentElement.parentElement.classList.add(
            'hidden'
        )
    })
document
    .querySelector('.music-my-new-playlist-overflow')
    .addEventListener('click', (event) => {
        if (event.target.classList.contains('music-my-new-playlist-overflow')) {
            event.target.classList.add('hidden')
        }
    })
document
    .querySelector('.music-my-new-playlist-overflow-mobile')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains(
                'music-my-new-playlist-overflow-mobile'
            )
        ) {
            event.target.classList.add('hidden')
        }
    })
document
    .querySelector('.music-my-new-playlist-delete-btn')
    .addEventListener('click', () => {
        document
            .querySelector('.music-delete-my-new-playlist-overflow')
            .classList.remove('hidden')
    })
document
    .querySelector('.music-my-new-playlist-delete-btn-mobile')
    .addEventListener('click', () => {
        document
            .querySelector('.music-delete-my-new-playlist-overflow-mobile')
            .classList.remove('hidden')
    })
document
    .querySelector('.music-delete-my-new-playlist-overflow')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains(
                'music-delete-my-new-playlist-overflow'
            )
        ) {
            event.target.classList.add('hidden')
        }
    })
document
    .querySelector('.music-delete-my-new-playlist-overflow-mobile')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains(
                'music-delete-my-new-playlist-overflow-mobile'
            )
        ) {
            event.target.classList.add('hidden')
        }
    })
document
    .querySelector('.music-delete-my-new-playlist-btn-cancel')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains(
                'music-delete-my-new-playlist-btn-cancel'
            )
        ) {
            event.target.parentElement.parentElement.parentElement.classList.add(
                'hidden'
            )
        }
    })
document
    .querySelector('.music-delete-my-new-playlist-btn-cancel-mobile')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains(
                'music-delete-my-new-playlist-btn-cancel-mobile'
            )
        ) {
            event.target.parentElement.parentElement.parentElement.classList.add(
                'hidden'
            )
        }
    })
musicAddIcon.addEventListener('click', toggleAddOptions)
musicAddIconMobile.addEventListener('click', toggleAddOptions)
document
    .querySelector('.current-music-add-overflow')
    .addEventListener('click', (event) => {
        if (event.target.classList.contains('current-music-add-overflow')) {
            event.target.classList.add('hidden')
            canKeyboardEventsProfile = true
        }
    })
document
    .querySelector('.current-music-add-overflow-mobile')
    .addEventListener('click', (event) => {
        if (
            event.target.classList.contains('current-music-add-overflow-mobile')
        ) {
            event.target.classList.add('hidden')
        }
    })
document
    .querySelector('.current-music-add-create-new-playlist')
    .addEventListener('click', () => {
        toggleAddMinhaPlaylist()
        document.querySelector('.add-my-new-playlist-name').focus()
    })
document
    .querySelector('.current-music-add-create-new-playlist-mobile')
    .addEventListener('click', () => {
        toggleAddMinhaPlaylist()
        document.querySelector('.add-my-new-playlist-name-mobile').focus()
    })
document
    .querySelector('.current-music-add-confirm')
    .addEventListener('click', toggleAddOptions)
document
    .querySelector('.current-music-add-confirm-mobile')
    .addEventListener('click', toggleAddOptions)
document
    .querySelector('.add-my-new-playlist-container')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageUserCreatePlaylist()
    })
document
    .querySelector('.add-my-new-playlist-container-mobile')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageUserCreatePlaylist()
    })
document
    .querySelector('.music-delete-my-new-playlist-btn-delete')
    .addEventListener('click', manageMyPlaylistMusicDeletion)
document
    .querySelector('.music-delete-my-new-playlist-btn-delete-mobile')
    .addEventListener('click', manageMyPlaylistMusicDeletion)
document
    .querySelector('.delete-my-new-playlist-container')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageMyPlaylistDeletion()
    })
document
    .querySelector('.delete-my-new-playlist-container-mobile')
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageMyPlaylistDeletion()
    })
document
    .querySelector(
        '.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-name'
    )
    .addEventListener('paste', (e) => {
        e.preventDefault()
    })
document
    .querySelector(
        '.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-name-mobile'
    )
    .addEventListener('paste', (e) => {
        e.preventDefault()
    })
document
    .querySelector(
        '.edit-my-new-playlist-overflow .edit-my-new-playlist-container'
    )
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageMyPlaylistEdition()
    })
document
    .querySelector(
        '.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile'
    )
    .addEventListener('submit', (e) => {
        e.preventDefault()
        manageMyPlaylistEdition()
    })
document
    .querySelector('.confirm-logout-overflow')
    .addEventListener('click', (event) => {
        if (event.target.classList.contains('confirm-logout-overflow')) {
            event.target.classList.add('hidden')
            canKeyboardEventsProfile = true
        }
    })
document
    .querySelector('.confirm-logout-overflow-mobile')
    .addEventListener('click', (event) => {
        if (event.target.classList.contains('confirm-logout-overflow-mobile')) {
            event.target.classList.add('hidden')
        }
    })
document
    .querySelector('.confirm-logout-container')
    .addEventListener('submit', async (e) => {
        e.preventDefault()
        await logoutService()
    })
document
    .querySelector('.confirm-logout-container-mobile')
    .addEventListener('submit', async (e) => {
        e.preventDefault()
        await logoutService()
    })
document
    .querySelector('.minhas-playlists-search-bar-close')
    .addEventListener('click', () => {
        document.querySelector('.minhas-playlists-search-bar-input').value = ''
        generatorContainerMusicAddPlaylist()

        if (
            document
                .querySelector('.minhas-playlists-search-bar-input')
                .value.trim() === ''
        ) {
            document
                .querySelector('.minhas-playlists-search-bar-close')
                .classList.add('hidden')
        } else {
            document
                .querySelector('.minhas-playlists-search-bar-close')
                .classList.remove('hidden')
        }
    })
if (
    document
        .querySelector('.minhas-playlists-search-bar-input')
        .value.trim() === ''
) {
    document
        .querySelector('.minhas-playlists-search-bar-close')
        .classList.add('hidden')
} else {
    document
        .querySelector('.minhas-playlists-search-bar-close')
        .classList.remove('hidden')
}
document
    .querySelector('.minhas-playlists-search-bar-input')
    .addEventListener('input', () => {
        if (
            document
                .querySelector('.minhas-playlists-search-bar-input')
                .value.trim() === ''
        ) {
            document
                .querySelector('.minhas-playlists-search-bar-close')
                .classList.add('hidden')
        } else {
            document
                .querySelector('.minhas-playlists-search-bar-close')
                .classList.remove('hidden')
        }

        generatorContainerMusicAddPlaylist()
    })
document
    .querySelector('.playlists-search-bar-close')
    .addEventListener('click', () => {
        document.querySelector('.playlists-search-bar-input').value = ''
        generatorContainerPlaylistSelectData()
        generatorContainerPlaylistSelectDataPlay()

        if (
            document
                .querySelector('.playlists-search-bar-input')
                .value.trim() === ''
        ) {
            document
                .querySelector('.playlists-search-bar-close')
                .classList.add('hidden')
        } else {
            document
                .querySelector('.playlists-search-bar-close')
                .classList.remove('hidden')
        }
    })
if (document.querySelector('.playlists-search-bar-input').value.trim() === '') {
    document
        .querySelector('.playlists-search-bar-close')
        .classList.add('hidden')
} else {
    document
        .querySelector('.playlists-search-bar-close')
        .classList.remove('hidden')
}
document
    .querySelector('.playlists-search-bar-input')
    .addEventListener('input', () => {
        generatorContainerPlaylistSelectData()
        generatorContainerPlaylistSelectDataPlay()

        if (
            document
                .querySelector('.playlists-search-bar-input')
                .value.trim() === ''
        ) {
            document
                .querySelector('.playlists-search-bar-close')
                .classList.add('hidden')
        } else {
            document
                .querySelector('.playlists-search-bar-close')
                .classList.remove('hidden')
        }
    })
document
    .querySelector('.playlists-search-bar-close-mobile')
    .addEventListener('click', () => {
        document.querySelector('.playlists-search-bar-input-mobile').value = ''
        generatorContainerPlaylistSelectData()
        generatorContainerPlaylistSelectDataPlay()

        if (
            document
                .querySelector('.playlists-search-bar-input-mobile')
                .value.trim() === ''
        ) {
            document
                .querySelector('.playlists-search-bar-close-mobile')
                .classList.add('hidden')
        } else {
            document
                .querySelector('.playlists-search-bar-close-mobile')
                .classList.remove('hidden')
        }
    })
if (
    document
        .querySelector('.playlists-search-bar-input-mobile')
        .value.trim() === ''
) {
    document
        .querySelector('.playlists-search-bar-close-mobile')
        .classList.add('hidden')
} else {
    document
        .querySelector('.playlists-search-bar-close-mobile')
        .classList.remove('hidden')
}
document
    .querySelector('.playlists-search-bar-input-mobile')
    .addEventListener('input', () => {
        generatorContainerPlaylistSelectData()
        generatorContainerPlaylistSelectDataPlay()

        if (
            document
                .querySelector('.playlists-search-bar-input-mobile')
                .value.trim() === ''
        ) {
            document
                .querySelector('.playlists-search-bar-close-mobile')
                .classList.add('hidden')
        } else {
            document
                .querySelector('.playlists-search-bar-close-mobile')
                .classList.remove('hidden')
        }
    })
document
    .querySelector('.minhas-playlists-search-bar-close-mobile')
    .addEventListener('click', () => {
        document.querySelector(
            '.minhas-playlists-search-bar-input-mobile'
        ).value = ''
        generatorContainerMusicAddPlaylist()

        if (
            document
                .querySelector('.minhas-playlists-search-bar-input-mobile')
                .value.trim() === ''
        ) {
            document
                .querySelector('.minhas-playlists-search-bar-close-mobile')
                .classList.add('hidden')
        } else {
            document
                .querySelector('.minhas-playlists-search-bar-close-mobile')
                .classList.remove('hidden')
        }
    })
if (
    document
        .querySelector('.minhas-playlists-search-bar-input-mobile')
        .value.trim() === ''
) {
    document
        .querySelector('.minhas-playlists-search-bar-close-mobile')
        .classList.add('hidden')
} else {
    document
        .querySelector('.minhas-playlists-search-bar-close-mobile')
        .classList.remove('hidden')
}
document
    .querySelector('.minhas-playlists-search-bar-input-mobile')
    .addEventListener('input', () => {
        if (
            document
                .querySelector('.minhas-playlists-search-bar-input-mobile')
                .value.trim() === ''
        ) {
            document
                .querySelector('.minhas-playlists-search-bar-close-mobile')
                .classList.add('hidden')
        } else {
            document
                .querySelector('.minhas-playlists-search-bar-close-mobile')
                .classList.remove('hidden')
        }

        generatorContainerMusicAddPlaylist()
    })
loadMore.addEventListener('click', () => {
    loadMoreContainerPlaylistData()
})
loadMoreMobile.addEventListener('click', () => {
    loadMoreContainerPlaylistData()
})
setFullscreen.checked = getFullScreenStorage()
setFullscreenMobile.checked = getFullScreenStorage()
setFullscreen.addEventListener('change', () => {
    if (setFullscreen.checked) {
        setFullScreenStorage(true)
        setFullscreenMobile.checked = true
    } else {
        setFullScreenStorage(false)
        setFullscreenMobile.checked = false
    }
})
setFullscreenMobile.addEventListener('change', () => {
    if (setFullscreenMobile.checked) {
        setFullScreenStorage(true)
        setFullscreen.checked = true
    } else {
        setFullScreenStorage(false)
        setFullscreen.checked = false
    }
})

function setFullHeight() {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
}

setFullHeight()

function inicia() {
    setScreenWidthAndHeight()
    allSongValueSetters()
    setUserSettings()
    generatorContainerPlaylistData()
    generatorContainerPlaylistDataPlay()
    generatorContainerPlaylistSelectData()
    generatorContainerPlaylistSelectDataPlay()
    manageEmptyPlaylist()
    setManagementSystem()
    setUserProfilePicture()
    manageHistoric()
    searchEvents()
    generatorContainerCurrentMusicAddPlaylist()
    generatorContainerMusicAddPlaylist()
    musicStateControllers()
    durationSliderEventGenerator()
    volumeSliderEventGenerator()
    generatorContainerSearchData()
    generatorContainerSearchDataPlay()
    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
    generatorContainerHistoricData()
    generatorContainerHistoricDataPlay()

    indexAudioId = musicDataShuffled[indexAudio]?._id
    indexAudioGender = musicDataShuffled[indexAudio]?.gender
    $('.title-playlist').html(
        emptyPlaylist && userData.lastAccessedPlaylist !== 'Favorite'
            ? 'Sem Playlist'
            : userData.lastAccessedPlaylistName
    )
    $('.title-playlist-mobile').html(
        emptyPlaylist && userData.lastAccessedPlaylist !== 'Favorite'
            ? 'Sem Playlist'
            : userData.lastAccessedPlaylistName
    )

    setMusicPlayTag()
    refreshFavorite()
    initialDeviceDefinition()
    initDurationSlider()
    initVolumeSlider()
    initThemeChanger(userData.theme)
}

function audioControllerPlayFunction() {
    if (emptyPlaylist) return

    if (screenWidth >= 1360) {
        if (audioControllerPlayToggle) {
            playVideo()
        } else {
            pauseVideo()
        }
    } else {
        if (audioControllerPlayToggle) {
            playVideo()
        } else {
            pauseVideo()
        }
    }
}

function audioControllerPlayFunctionNoPause() {
    if (screenWidth >= 1360) {
        playVideo()
    } else {
        playVideo()
    }
}

function startAnimationAudioControllerPlay() {
    if (screenWidth >= 1360) {
        audioControllerPlayToggle = false
        audioControllerPlay.name = 'pause-circle'
        musicAnimationStatus.classList.add('run')
    } else {
        audioControllerPlayToggle = false
        audioControllerPlayMobile.name = 'pause-circle'
    }
}

function stopAnimationAudioControllerPlay() {
    if (screenWidth >= 1360) {
        audioControllerPlayToggle = true
        audioControllerPlay.name = 'play-circle'
        musicAnimationStatus.classList.remove('run')
    } else {
        audioControllerPlayToggle = true
        audioControllerPlayMobile.name = 'play-circle'
    }
}

function allSongValueSetters() {
    emptyPlaylist = false
    if (musicData.length <= 0) {
        emptyPlaylist = true

        if (screenWidth >= 1360) {
            titleCurrentMusic.innerHTML = 'Nenhuma música encontrada'
            genderCurrentMusic.innerHTML = 'Nenhuma música encontrada'
            coverCurrentMusic.src =
                'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
            backgroundCover.style.backgroundImage = `url('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')`
            currentDuration.innerHTML = '0:00'
            totalDuration.innerHTML = '0:00'
            clearInterval(timerCurretDurationSetter)
            sliderMusicDuration.style.setProperty(
                'background-image',
                'linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) 0%, var(--color-white-1) 0%, var(--color-white-1) 100%'
            )
            sliderMusicDurationDot.style.setProperty('left', '0%')

            if (player) {
                destroyPlayer()
                stopAnimationAudioControllerPlay()

                clearInterval(timerSyncSliderVolume)
                timerSyncSliderVolume = null
            }
        } else {
            titleCurrentMusicMobile.innerHTML = 'Nenhuma música encontrada'
            genderCurrentMusicMobile.innerHTML = 'Nenhuma música encontrada'
            coverCurrentMusicMobile.src =
                'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
            backgroundCoverMobile.style.backgroundImage = `url('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')`
            clearInterval(timerCurretDurationSetter)
            displayMusicDurationMobile.style.setProperty(
                'background-image',
                'linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) 0%, var(--color-white-1) 0%, var(--color-white-1) 100%'
            )

            if (playerMobile) {
                destroyPlayer()
                stopAnimationAudioControllerPlay()
            }
        }
        return
    }
    if (screenWidth >= 1360) {
        playerReady = false
        onYouTubeIframeAPIReady(musicDataShuffled[indexAudio].videoId)
        indexAudioId = musicDataShuffled[indexAudio]._id
        indexAudioGender = musicDataShuffled[indexAudio].gender
        coverCurrentMusic.src = musicDataShuffled[indexAudio].coverUrl
        coverCurrentMusic.alt = musicDataShuffled[indexAudio].title
        backgroundCover.style.setProperty(
            'background-image',
            `url("${musicDataShuffled[indexAudio].coverUrl}")`
        )
        titleCurrentMusic.innerHTML = musicDataShuffled[indexAudio].title
        genderCurrentMusic.innerHTML = musicDataShuffled[indexAudio].gender
    } else {
        playerReadyMobile = false
        onYouTubeIframeAPIReady(musicDataShuffled[indexAudio].videoId)
        indexAudioId = musicDataShuffled[indexAudio]._id
        indexAudioGender = musicDataShuffled[indexAudio].gender
        coverCurrentMusicMobile.src = musicDataShuffled[indexAudio].coverUrl
        coverCurrentMusicMobile.alt = musicDataShuffled[indexAudio].title
        backgroundCoverMobile.style.setProperty(
            'background-image',
            `url("${musicDataShuffled[indexAudio].coverUrl}")`
        )
        titleCurrentMusicMobile.innerHTML = musicDataShuffled[indexAudio].title
        genderCurrentMusicMobile.innerHTML =
            musicDataShuffled[indexAudio].gender
        titleCurrentMusicDisplayMobile.innerHTML =
            musicDataShuffled[indexAudio].title
        genderCurrentMusicDisplayMobile.innerHTML =
            musicDataShuffled[indexAudio].gender
    }
}

function formatarData(dataISO) {
    try {
        const data = new Date(dataISO)

        if (isNaN(data.getTime())) {
            throw new Error('Data inválida')
        }

        const meses = [
            'janeiro',
            'fevereiro',
            'março',
            'abril',
            'maio',
            'junho',
            'julho',
            'agosto',
            'setembro',
            'outubro',
            'novembro',
            'dezembro',
        ]

        const dia = data.getUTCDate()
        const mes = data.getUTCMonth()
        const ano = data.getUTCFullYear()

        return `${dia} de ${meses[mes]} de ${ano}`
    } catch (error) {
        return 'Formato de data inválido'
    }
}

function setUserSettings() {
    if (screenWidth >= 1360) {
        registrationDate.innerHTML = `Registrou-se em: ${formatarData(
            userData.additionDate
        )}`
        userName.innerHTML = userData.name
    } else {
        registrationDateMobile.innerHTML = `Registrou-se em: ${formatarData(
            userData.additionDate
        )}`
        userNameMobile.innerHTML = userData.name
    }
}

function audioControllerNextFunction() {
    if (emptyPlaylist) return

    indexAudio++
    if (indexAudio >= musicDataShuffled.length) {
        indexAudio = 0
    }

    indexAudioId = musicDataShuffled[indexAudio]._id
    indexAudioGender = musicDataShuffled[indexAudio].gender

    allSongValueSetters()
    audioControllerPlayFunctionNoPause()
    setMusicPlayTag()
    manageHistoric()
    refreshFavorite()
    generatorContainerCurrentMusicAddPlaylist()
}

function audioControllerPrevFunction() {
    if (emptyPlaylist) return

    indexAudio--
    if (indexAudio < 0) {
        indexAudio = musicDataShuffled.length - 1
    }

    indexAudioId = musicDataShuffled[indexAudio]._id
    indexAudioGender = musicDataShuffled[indexAudio].gender

    allSongValueSetters()
    audioControllerPlayFunctionNoPause()
    setMusicPlayTag()
    manageHistoric()
    refreshFavorite()
    generatorContainerCurrentMusicAddPlaylist()
}

function loadMoreContainerPlaylistData() {
    generatorContainerPlaylistData()
    generatorContainerPlaylistDataPlay()
    setMusicPlayTag()
}

function generatorContainerPlaylistData() {
    if (emptyPlaylist) return

    if (screenWidth >= 1360) {
        loadingRoller.classList.add('hidden')

        const nextPage = musicDataShuffled.slice(
            indexPage,
            indexPage + itensPerPage
        )

        nextPage.forEach((element, index) => {
            const itemPlaylist = document.createElement('div')
            itemPlaylist.className = 'item-playlist'
            itemPlaylist.setAttribute('data-id', element._id)
            itemPlaylist.style.animationDelay = `${index * 0.05}s`

            const boxWrapper = document.createElement('div')
            boxWrapper.className = 'box-wrapper'

            const coverItem = document.createElement('div')
            coverItem.className = 'cover-item'

            const coverImg = document.createElement('img')
            coverImg.src = element.coverUrl
            coverImg.alt = element.title

            coverItem.appendChild(coverImg)

            const infoItem = document.createElement('div')
            infoItem.className = 'info-item'

            const titleInfo = document.createElement('div')
            titleInfo.className = 'title-info'
            titleInfo.textContent = element.title

            const genderInfo = document.createElement('div')
            genderInfo.className = 'gender-info'
            genderInfo.textContent = element.gender

            infoItem.appendChild(titleInfo)
            infoItem.appendChild(genderInfo)

            boxWrapper.appendChild(coverItem)
            boxWrapper.appendChild(infoItem)

            const playButtonItem = document.createElement('div')
            playButtonItem.className = 'play-button-item'

            const playIcon = document.createElement('ion-icon')
            playIcon.setAttribute('name', 'play-circle')

            playButtonItem.appendChild(playIcon)

            itemPlaylist.appendChild(boxWrapper)
            itemPlaylist.appendChild(playButtonItem)

            const lastChild = containerPlaylist.lastElementChild

            if (lastChild) {
                containerPlaylist.insertBefore(itemPlaylist, lastChild)
            } else {
                containerPlaylist.appendChild(itemPlaylist)
            }
        })

        indexPage += itensPerPage

        if (indexPage >= musicDataShuffled.length) {
            loadMore.classList.add('hidden')
        } else {
            loadMore.classList.remove('hidden')
        }
    } else {
        loadingRollerMobile.classList.add('hidden')

        const nextPage = musicDataShuffled.slice(
            indexPage,
            indexPage + itensPerPage
        )

        nextPage.forEach((element, index) => {
            const itemPlaylistMobile = document.createElement('div')
            itemPlaylistMobile.className = 'item-playlist-mobile'
            itemPlaylistMobile.setAttribute('data-id', element._id)
            itemPlaylistMobile.style.animationDelay = `${index * 0.05}s`

            const boxWrapper = document.createElement('div')
            boxWrapper.className = 'box-wrapper'

            const coverItem = document.createElement('div')
            coverItem.className = 'cover-item'

            const coverImg = document.createElement('img')
            coverImg.src = element.coverUrl
            coverImg.alt = element.title

            coverItem.appendChild(coverImg)

            const infoItem = document.createElement('div')
            infoItem.className = 'info-item'

            const titleInfo = document.createElement('div')
            titleInfo.className = 'title-info'
            titleInfo.textContent = element.title

            const genderInfo = document.createElement('div')
            genderInfo.className = 'gender-info'
            genderInfo.textContent = element.gender

            infoItem.appendChild(titleInfo)
            infoItem.appendChild(genderInfo)

            boxWrapper.appendChild(coverItem)
            boxWrapper.appendChild(infoItem)

            const playButtonItem = document.createElement('div')
            playButtonItem.className = 'play-button-item'

            const playIcon = document.createElement('ion-icon')
            playIcon.setAttribute('name', 'play-circle')

            playButtonItem.appendChild(playIcon)

            itemPlaylistMobile.appendChild(boxWrapper)
            itemPlaylistMobile.appendChild(playButtonItem)

            const lastChild = containerPlaylistMobile.lastElementChild

            if (lastChild) {
                containerPlaylistMobile.insertBefore(
                    itemPlaylistMobile,
                    lastChild
                )
            } else {
                containerPlaylistMobile.appendChild(itemPlaylistMobile)
            }
        })

        indexPage += itensPerPage

        if (indexPage >= musicDataShuffled.length) {
            loadMoreMobile.classList.add('hidden')
        } else {
            loadMoreMobile.classList.remove('hidden')
        }
    }
}

function generatorContainerPlaylistDataPlay() {
    if (screenWidth >= 1360) {
        const itemsPlaylist = document.querySelectorAll(
            '.container-playlist .item-playlist'
        )

        itemsPlaylist.forEach((element) => {
            if (element.getAttribute('data-click') === 'true') return
            element.setAttribute('data-click', 'true')
            element.addEventListener('click', function () {
                let cannotPlayTheMusic = false
                if (
                    indexAudio ==
                    musicDataShuffled.indexOf(
                        musicDataShuffled.find(
                            (element) => element._id == $(this).data('id')
                        )
                    )
                ) {
                    cannotPlayTheMusic = true

                    audioControllerPlayFunctionNoPause()
                }

                indexAudio = musicDataShuffled.indexOf(
                    musicDataShuffled.find(
                        (element) => element._id == $(this).data('id')
                    )
                )
                indexAudioId = musicDataShuffled[indexAudio]._id
                indexAudioGender = musicDataShuffled[indexAudio].gender

                if (!cannotPlayTheMusic) {
                    allSongValueSetters()
                    audioControllerPlayFunctionNoPause()
                    setMusicPlayTag()
                    manageHistoric()
                    refreshFavorite()
                    generatorContainerCurrentMusicAddPlaylist()
                }
            })
        })
    } else {
        const itemsPlaylistMobile = document.querySelectorAll(
            '.container-playlist-mobile .item-playlist-mobile'
        )

        itemsPlaylistMobile.forEach((element) => {
            if (element.getAttribute('data-click') === 'true') return
            element.setAttribute('data-click', 'true')
            element.addEventListener('click', function () {
                let cannotPlayTheMusic = false
                if (
                    indexAudio ==
                    musicDataShuffled.indexOf(
                        musicDataShuffled.find(
                            (element) => element._id == $(this).data('id')
                        )
                    )
                ) {
                    cannotPlayTheMusic = true
                }

                indexAudio = musicDataShuffled.indexOf(
                    musicDataShuffled.find(
                        (element) => element._id == $(this).data('id')
                    )
                )
                indexAudioId = musicDataShuffled[indexAudio]._id
                indexAudioGender = musicDataShuffled[indexAudio].gender

                toggleDisplayMobile()

                if (!cannotPlayTheMusic) {
                    allSongValueSetters()
                    audioControllerPlayFunctionNoPause()
                    setMusicPlayTag()
                    manageHistoric()
                    refreshFavorite()
                    generatorContainerCurrentMusicAddPlaylist()
                }
            })
        })
    }
}

function generatorContainerPlaylistSelectData() {
    const playlistDataFiltered = playlistData.filter((playlist) =>
        playlist.title
            .toLowerCase()
            .includes(
                document
                    .querySelector('.playlists-search-bar-input')
                    .value.trim()
                    .toLowerCase()
            )
    )
    const playlistDataFilteredMobile = playlistData.filter((playlist) =>
        playlist.title
            .toLowerCase()
            .includes(
                document
                    .querySelector('.playlists-search-bar-input-mobile')
                    .value.trim()
                    .toLowerCase()
            )
    )

    if (screenWidth >= 1360) {
        containerPlaylistSelect.innerHTML = ''

        playlistDataFiltered.forEach((element, index) => {
            containerPlaylistSelect.innerHTML += `
                <div class="item-select-playlist" style="animation-delay: ${
                    index * 0.05 + 0.1
                }s">
                    <div class="cover-item-select-playlist" data-gender="${
                        element.gender
                    }" data-title="${element.title}">
                        <img src="${element.coverUrl}" alt="${element.title}">
                    </div>
                    <div class="info-item-select-playlist">
                        <div class="title-item-select-playlist">
                            ${element.title}
                        </div>
                        <div class="description-item-select-playlist">
                            ${element.description}
                        </div>
                        <div class="total-music-item-select-playlist">
                            Total de ${
                                allMusicData.filter(
                                    (music) => music.gender == element.gender
                                ).length
                            } ${
                allMusicData.filter((music) => music.gender == element.gender)
                    .length > 1
                    ? 'músicas'
                    : 'música'
            }
                        </div>
                    </div>
                </div>
            `
        })

        if (containerPlaylistSelect.innerHTML === '') {
            if (
                document
                    .querySelector('.playlists-search-bar-input')
                    .value.trim() !== ''
            ) {
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
    } else {
        containerPlaylistSelectMobile.innerHTML = ''

        playlistDataFilteredMobile.forEach((element, index) => {
            containerPlaylistSelectMobile.innerHTML += `
                <div class="item-select-playlist-mobile" style="animation-delay: ${
                    index * 0.05 + 0.1
                }s">
                    <div class="cover-item-select-playlist-mobile" data-gender="${
                        element.gender
                    }" data-title="${element.title}">
                        <img src="${element.coverUrl}" alt="${element.title}">
                    </div>
                    <div class="info-item-select-playlist-mobile">
                        <div class="title-item-select-playlist-mobile">
                            ${element.title}
                        </div>
                        <div class="description-item-select-playlist-mobile">
                            ${element.description}
                        </div>
                        <div class="total-music-item-select-playlist-mobile">
                            Total de ${
                                allMusicData.filter(
                                    (music) => music.gender == element.gender
                                ).length
                            } ${
                allMusicData.filter((music) => music.gender == element.gender)
                    .length > 1
                    ? 'músicas'
                    : 'música'
            }
                        </div>
                    </div>
                </div>
            `
        })

        if (containerPlaylistSelectMobile.innerHTML === '') {
            if (
                document
                    .querySelector('.playlists-search-bar-input-mobile')
                    .value.trim() !== ''
            ) {
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
    }
}

function generatorContainerPlaylistSelectDataPlay() {
    if (screenWidth >= 1360) {
        const itemsSelectPlaylist = document.querySelectorAll(
            '.container-select-playlists .item-select-playlist .cover-item-select-playlist'
        )

        itemsSelectPlaylist.forEach((element) => {
            element.addEventListener('click', function () {
                isMyPlaylist = false
                const playlistValue = $(this).data('gender')
                const playlistName = $(this).data('title')
                toggleMorePlaylists()
                selectNewPlaylist(playlistValue, playlistName)
                canKeyboardEvents = true
                canKeyboardEventsProfile = true
            })
        })
    } else {
        const itemsSelectPlaylistMobile = document.querySelectorAll(
            '.item-select-playlist-mobile .cover-item-select-playlist-mobile'
        )

        itemsSelectPlaylistMobile.forEach((element) => {
            element.addEventListener('click', function () {
                isMyPlaylist = false
                const playlistValue = $(this).data('gender')
                const playlistName = $(this).data('title')
                toggleMorePlaylists()
                selectNewPlaylist(playlistValue, playlistName)
            })
        })
    }
}

function generatorContainerSearchData() {
    if (screenWidth >= 1360) {
        musicDataFiltered = musicData.filter((music) =>
            music.title
                .toLowerCase()
                .includes(searchBarInput.value.toLowerCase())
        )

        while (musicDataFiltered.length > 10) {
            musicDataFiltered.pop()
        }

        musicDataFiltered.forEach((element, index) => {
            containerItemsSearch.innerHTML += `
                <div class="item-playlist-search" data-id="${
                    element._id
                }" style="animation-delay: ${index * 0.05 + 0.1}s">
                    <div class="box-wrapper-search">
                        <div class="cover-item-search">
                            <img src="${element.coverUrl}" alt="${
                element.title
            }">
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
        musicDataFiltered = musicData.filter((music) =>
            music.title
                .toLowerCase()
                .includes(searchBarInputMobile.value.toLowerCase())
        )

        while (musicDataFiltered.length > 10) {
            musicDataFiltered.pop()
        }

        musicDataFiltered.forEach((element, index) => {
            containerItemsSearchMobile.innerHTML += `
                <div class="item-search-mobile" data-id="${
                    element._id
                }" style="animation-delay: ${index * 0.05}s">
                    <div class="box-wrapper-search">
                        <div class="cover-item-search">
                            <img src="${element.coverUrl}" alt="${
                element.title
            }">
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

function generatorContainerSearchDataPlay() {
    if (screenWidth >= 1360) {
        const itemsPlaylistSearch = document.querySelectorAll(
            '.container-items .item-playlist-search'
        )

        itemsPlaylistSearch.forEach((element) => {
            element.addEventListener('click', function () {
                let cannotPlayTheMusic = false
                if (
                    indexAudio ==
                    musicDataShuffled.indexOf(
                        musicDataShuffled.find(
                            (element) => element._id == $(this).data('id')
                        )
                    )
                ) {
                    cannotPlayTheMusic = true

                    audioControllerPlayFunctionNoPause()

                    $('.focus-shadow').hide(200)
                    $('.container-search-result').hide(200)
                    $('.search-bar').hide(200)
                    profileWasClicked = true
                    canKeyboardEvents = true
                    canKeyboardEventsProfile = true
                }

                indexAudio = musicDataShuffled.indexOf(
                    musicDataShuffled.find(
                        (element) => element._id == $(this).data('id')
                    )
                )
                indexAudioId = musicDataShuffled[indexAudio]._id
                indexAudioGender = musicDataShuffled[indexAudio].gender

                if (!cannotPlayTheMusic) {
                    allSongValueSetters()
                    audioControllerPlayFunctionNoPause()
                    setMusicPlayTag()
                    manageHistoric()
                    refreshFavorite()
                    generatorContainerCurrentMusicAddPlaylist()

                    $('.focus-shadow').hide(200)
                    $('.container-search-result').hide(200)
                    $('.search-bar').hide(200)
                    profileWasClicked = true
                    canKeyboardEvents = true
                    canKeyboardEventsProfile = true
                }
            })
        })
    } else {
        const itemsPlaylistSearchMobile = document.querySelectorAll(
            '.container-search-mobile .item-search-mobile'
        )

        itemsPlaylistSearchMobile.forEach((element) => {
            element.addEventListener('click', function () {
                let cannotPlayTheMusic = false
                if (
                    indexAudio ==
                    musicDataShuffled.indexOf(
                        musicDataShuffled.find(
                            (element) => element._id == $(this).data('id')
                        )
                    )
                ) {
                    cannotPlayTheMusic = true
                }

                indexAudio = musicDataShuffled.indexOf(
                    musicDataShuffled.find(
                        (element) => element._id == $(this).data('id')
                    )
                )
                indexAudioId = musicDataShuffled[indexAudio]._id
                indexAudioGender = musicDataShuffled[indexAudio].gender

                $('.main-search-mobile').hide(200)
                toggleDisplayMobile()

                if (!cannotPlayTheMusic) {
                    allSongValueSetters()
                    audioControllerPlayFunctionNoPause()
                    setMusicPlayTag()
                    manageHistoric()
                    refreshFavorite()
                    generatorContainerCurrentMusicAddPlaylist()

                    profileWasClicked = true
                    canKeyboardEvents = true
                    canKeyboardEventsProfile = true
                }
            })
        })
    }
}

function generatorContainerFavoriteData() {
    let favoriteSongs = []

    for (let i = 0; i < userData.favoriteSongs.length; i++) {
        let song = musicDataShuffled.find(
            (element) => element._id == userData.favoriteSongs[i].musicId
        )
        if (song) {
            if (
                !favoriteSongs.find(
                    (element) =>
                        element._id == userData.favoriteSongs[i].musicId
                )
            ) {
                favoriteSongs.push(song)
            }
        }
    }

    favoriteSongs.reverse()

    if (screenWidth >= 1360) {
        if (favoriteSongs.length <= 0) {
            favoriteEmpty.classList.remove('hidden')
        } else {
            favoriteEmpty.classList.add('hidden')
        }

        favoriteSongs.forEach((element) => {
            containerItemsFavorite.innerHTML += `
                <div class="item-playlist-favorite" data-id="${element._id}">
                    <div class="box-wrapper-favorite">
                        <div class="cover-item-favorite">
                            <img src="${element.coverUrl}" alt="${element.title}">
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
        if (favoriteSongs.length <= 0) {
            favoriteEmptyMobile.classList.remove('hidden')
        } else {
            favoriteEmptyMobile.classList.add('hidden')
        }

        favoriteSongs.forEach((element) => {
            containerItemsFavoriteMobile.innerHTML += `
                <div class="item-favorite-mobile" data-id="${element._id}">
                    <div class="box-wrapper-favorite">
                        <div class="cover-item-favorite">
                            <img src="${element.coverUrl}" alt="${element.title}">
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

function generatorContainerFavoriteDataPlay() {
    if (screenWidth >= 1360) {
        const itemsPlaylistFavorite = document.querySelectorAll(
            '.container-favorite .item-playlist-favorite'
        )

        itemsPlaylistFavorite.forEach((element) => {
            element.addEventListener('click', function () {
                let cannotPlayTheMusic = false
                if (
                    indexAudio ==
                    musicDataShuffled.indexOf(
                        musicDataShuffled.find(
                            (element) => element._id == $(this).data('id')
                        )
                    )
                ) {
                    cannotPlayTheMusic = true

                    audioControllerPlayFunctionNoPause()

                    $('.focus-shadow').hide(200)
                    $('.container-user-settings').hide(200)
                    profileWasClicked = true
                    canKeyboardEvents = true
                    canKeyboardEventsProfile = true
                }

                indexAudio = musicDataShuffled.indexOf(
                    musicDataShuffled.find(
                        (element) => element._id == $(this).data('id')
                    )
                )
                indexAudioId = musicDataShuffled[indexAudio]._id
                indexAudioGender = musicDataShuffled[indexAudio].gender

                if (!cannotPlayTheMusic) {
                    allSongValueSetters()
                    audioControllerPlayFunctionNoPause()
                    setMusicPlayTag()
                    manageHistoric()
                    refreshFavorite()
                    generatorContainerCurrentMusicAddPlaylist()

                    $('.focus-shadow').hide(200)
                    $('.container-user-settings').hide(200)
                    profileWasClicked = true
                    canKeyboardEvents = true
                    canKeyboardEventsProfile = true
                }
            })
        })
    } else {
        const itemsPlaylistFavoriteMobile = document.querySelectorAll(
            '.container-favorite-mobile .item-favorite-mobile'
        )

        itemsPlaylistFavoriteMobile.forEach((element) => {
            element.addEventListener('click', function () {
                let cannotPlayTheMusic = false
                if (
                    indexAudio ==
                    musicDataShuffled.indexOf(
                        musicDataShuffled.find(
                            (element) => element._id == $(this).data('id')
                        )
                    )
                ) {
                    cannotPlayTheMusic = true
                }

                indexAudio = musicDataShuffled.indexOf(
                    musicDataShuffled.find(
                        (element) => element._id == $(this).data('id')
                    )
                )
                indexAudioId = musicDataShuffled[indexAudio]._id
                indexAudioGender = musicDataShuffled[indexAudio].gender

                $('.main-user-settings-mobile').hide(200)
                toggleDisplayMobile()

                if (!cannotPlayTheMusic) {
                    allSongValueSetters()
                    audioControllerPlayFunctionNoPause()
                    setMusicPlayTag()
                    manageHistoric()
                    refreshFavorite()
                    generatorContainerCurrentMusicAddPlaylist()

                    profileWasClicked = true
                    canKeyboardEvents = true
                    canKeyboardEventsProfile = true
                }
            })
        })
    }
}

function generatorContainerHistoricData() {
    let historicSongs = []

    for (let i = 0; i < userData.musicHistory.length; i++) {
        let song = musicDataShuffled.find(
            (element) => element._id == userData.musicHistory[i].musicId
        )

        if (song) {
            if (
                !historicSongs.find(
                    (element) => element._id == userData.musicHistory[i].musicId
                )
            ) {
                historicSongs.push(song)
            }
        }
    }

    historicSongs.reverse()

    if (screenWidth >= 1360) {
        if (historicSongs.length <= 0) {
            historicEmpty.classList.remove('hidden')
        } else {
            historicEmpty.classList.add('hidden')
        }

        historicSongs.forEach((element) => {
            containerItemsHistoric.innerHTML += `
                <div class="item-playlist-historic" data-id="${element._id}">
                    <div class="box-wrapper-historic">
                        <div class="cover-item-historic">
                            <img src="${element.coverUrl}" alt="${element.title}">
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
        if (historicSongs.length <= 0) {
            historicEmptyMobile.classList.remove('hidden')
        } else {
            historicEmptyMobile.classList.add('hidden')
        }

        historicSongs.forEach((element) => {
            containerItemsHistoricMobile.innerHTML += `
                <div class="item-historic-mobile" data-id="${element._id}">
                    <div class="box-wrapper-historic">
                        <div class="cover-item-historic">
                            <img src="${element.coverUrl}" alt="${element.title}">
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

function generatorContainerHistoricDataPlay() {
    if (screenWidth >= 1360) {
        const itemsPlaylistHistoric = document.querySelectorAll(
            '.container-historic .item-playlist-historic'
        )

        itemsPlaylistHistoric.forEach((element) => {
            element.addEventListener('click', function () {
                let cannotPlayTheMusic = false
                if (
                    indexAudio ==
                    musicDataShuffled.indexOf(
                        musicDataShuffled.find(
                            (element) => element._id == $(this).data('id')
                        )
                    )
                ) {
                    cannotPlayTheMusic = true

                    audioControllerPlayFunctionNoPause()

                    $('.focus-shadow').hide(200)
                    $('.container-user-settings').hide(200)
                    profileWasClicked = true
                    canKeyboardEvents = true
                    canKeyboardEventsProfile = true
                }

                indexAudio = musicDataShuffled.indexOf(
                    musicDataShuffled.find(
                        (element) => element._id == $(this).data('id')
                    )
                )
                indexAudioId = musicDataShuffled[indexAudio]._id
                indexAudioGender = musicDataShuffled[indexAudio].gender

                if (!cannotPlayTheMusic) {
                    allSongValueSetters()
                    audioControllerPlayFunctionNoPause()
                    setMusicPlayTag()
                    manageHistoric()
                    refreshFavorite()
                    generatorContainerCurrentMusicAddPlaylist()

                    $('.focus-shadow').hide(200)
                    $('.container-user-settings').hide(200)
                    profileWasClicked = true
                    canKeyboardEvents = true
                    canKeyboardEventsProfile = true
                }
            })
        })
    } else {
        const itemsPlaylistHistoricMobile = document.querySelectorAll(
            '.container-historic-mobile .item-historic-mobile'
        )

        itemsPlaylistHistoricMobile.forEach((element) => {
            element.addEventListener('click', function () {
                let cannotPlayTheMusic = false
                if (
                    indexAudio ==
                    musicDataShuffled.indexOf(
                        musicDataShuffled.find(
                            (element) => element._id == $(this).data('id')
                        )
                    )
                ) {
                    cannotPlayTheMusic = true
                }

                indexAudio = musicDataShuffled.indexOf(
                    musicDataShuffled.find(
                        (element) => element._id == $(this).data('id')
                    )
                )
                indexAudioId = musicDataShuffled[indexAudio]._id
                indexAudioGender = musicDataShuffled[indexAudio].gender

                $('.main-user-settings-mobile').hide(200)
                toggleDisplayMobile()

                if (!cannotPlayTheMusic) {
                    allSongValueSetters()
                    audioControllerPlayFunctionNoPause()
                    setMusicPlayTag()
                    manageHistoric()
                    refreshFavorite()
                    generatorContainerCurrentMusicAddPlaylist()

                    profileWasClicked = true
                    canKeyboardEvents = true
                    canKeyboardEventsProfile = true
                }
            })
        })
    }
}

function generatorContainerMusicAddPlaylist() {
    if (screenWidth >= 1360) {
        const container = document.querySelector('.container-minhas-playlists')
        const containerMusic = document.querySelector(
            '.container-minhas-musicas'
        )

        container.innerHTML = ''

        const myPlaylistsFiltered = userData.myPlaylists.filter((playlist) =>
            playlist.title
                .toLowerCase()
                .includes(
                    document
                        .querySelector('.minhas-playlists-search-bar-input')
                        .value.trim()
                        .toLowerCase()
                )
        )

        myPlaylistsFiltered.forEach((element, index) => {
            let divItemMinhasPlaylists = document.createElement('div')
            divItemMinhasPlaylists.classList.add('item-minhas-playlists')
            divItemMinhasPlaylists.style.animationDelay = `${
                index * 0.05 + 0.1
            }s`
            divItemMinhasPlaylists.addEventListener('click', () => {
                document.querySelector(
                    '.main-minhas-playlists .main-playlist .content .title'
                ).textContent = element.title
                document.querySelector(
                    '.main-minhas-playlists .main-playlist .content .details .created'
                ).textContent = `Criada em: ${formatarData(
                    element.additionDate
                )}`
                document.querySelector(
                    '.main-minhas-playlists .main-playlist .content .details .total-song'
                ).textContent = `Total de ${element.totalSongs} ${
                    element.totalSongs <= 1 ? 'música' : 'músicas'
                }`
                document.querySelector(
                    '.main-minhas-playlists .main-playlist .cover img'
                ).src = element.currentCoverUrl
                document.querySelector(
                    '.main-minhas-playlists .main-playlist .cover img'
                ).alt = element.title
                indexMyPlaylistId = element._id
                document.querySelector(
                    '.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name'
                ).value = element.title
                document.querySelector(
                    '.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-current'
                ).textContent = element.title
                toggleContainerMinhaPlaylist()

                containerMusic.innerHTML = ''

                element.songs.reverse().forEach((ele, index) => {
                    let musicaEncontrada = allMusicData.find(
                        (element) => element._id === ele.musicId
                    )

                    let divItemMinhasMusicas = document.createElement('div')
                    divItemMinhasMusicas.classList.add('item-minhas-musicas')
                    divItemMinhasMusicas.style.animationDelay = `${
                        index * 0.05 + 0.2
                    }s`
                    divItemMinhasMusicas.addEventListener('click', () => {
                        document.querySelector(
                            '.music-my-new-playlist-overflow .music-my-new-playlist-container .music-my-new-playlist-title'
                        ).textContent = musicaEncontrada.title
                        document.querySelector(
                            '.music-my-new-playlist-overflow .music-my-new-playlist-container .music-my-new-playlist-cover img'
                        ).src = musicaEncontrada.coverUrl
                        document.querySelector(
                            '.music-my-new-playlist-overflow .music-my-new-playlist-container .music-my-new-playlist-cover img'
                        ).alt = musicaEncontrada.title
                        document.querySelector(
                            '.music-delete-my-new-playlist-overflow .music-delete-my-new-playlist-container .music-delete-my-new-playlist-current'
                        ).textContent = musicaEncontrada.title
                        indexMyPlaylistAudioId = ele._id
                        toggleMusicMinhaPlaylist()
                    })

                    let divCoverItemMinhasMusicas =
                        document.createElement('div')
                    divCoverItemMinhasMusicas.classList.add(
                        'cover-item-minhas-musicas'
                    )

                    let imgCover = document.createElement('img')
                    imgCover.src = musicaEncontrada.coverUrl
                    imgCover.alt = musicaEncontrada.title

                    let divTitleItemMinhasMusicas =
                        document.createElement('div')
                    divTitleItemMinhasMusicas.classList.add(
                        'title-item-minhas-musicas'
                    )
                    divTitleItemMinhasMusicas.textContent =
                        musicaEncontrada.title

                    divCoverItemMinhasMusicas.appendChild(imgCover)
                    divItemMinhasMusicas.appendChild(divCoverItemMinhasMusicas)
                    divItemMinhasMusicas.appendChild(divTitleItemMinhasMusicas)

                    containerMusic.appendChild(divItemMinhasMusicas)
                })
            })

            let divCoverItemMinhasPlaylists = document.createElement('div')
            divCoverItemMinhasPlaylists.classList.add(
                'cover-item-minhas-playlists'
            )

            let imgCover = document.createElement('img')
            imgCover.src = element.currentCoverUrl
            imgCover.alt = element.title

            let divTitleItemMinhasPlaylists = document.createElement('div')
            divTitleItemMinhasPlaylists.classList.add(
                'title-item-minhas-playlists'
            )
            divTitleItemMinhasPlaylists.textContent = element.title

            let divTotalDeMusicas = document.createElement('div')
            divTotalDeMusicas.classList.add('total-de-musicas')
            divTotalDeMusicas.textContent = 'Total de Músicas'

            let divTotalDeMusicasQuantidade = document.createElement('div')
            divTotalDeMusicasQuantidade.classList.add(
                'total-de-musicas-quantidade'
            )
            divTotalDeMusicasQuantidade.textContent = element.totalSongs

            divCoverItemMinhasPlaylists.appendChild(imgCover)
            divItemMinhasPlaylists.appendChild(divCoverItemMinhasPlaylists)
            divItemMinhasPlaylists.appendChild(divTitleItemMinhasPlaylists)
            divItemMinhasPlaylists.appendChild(divTotalDeMusicas)
            divItemMinhasPlaylists.appendChild(divTotalDeMusicasQuantidade)

            container.appendChild(divItemMinhasPlaylists)
        })
        if (container.innerHTML === '') {
            if (
                document
                    .querySelector('.minhas-playlists-search-bar-input')
                    .value.trim() !== ''
            ) {
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
        const container = document.querySelector(
            '.container-minhas-playlists-mobile'
        )
        const containerMusic = document.querySelector(
            '.container-minhas-musicas-mobile'
        )

        container.innerHTML = ''

        const myPlaylistsFiltered = userData.myPlaylists.filter((playlist) =>
            playlist.title
                .toLowerCase()
                .includes(
                    document
                        .querySelector(
                            '.minhas-playlists-search-bar-input-mobile'
                        )
                        .value.trim()
                        .toLowerCase()
                )
        )

        myPlaylistsFiltered.forEach((element, index) => {
            let divItemMinhasPlaylists = document.createElement('div')
            divItemMinhasPlaylists.classList.add('item-minhas-playlists-mobile')
            divItemMinhasPlaylists.style.animationDelay = `${
                index * 0.05 + 0.1
            }s`
            divItemMinhasPlaylists.addEventListener('click', () => {
                document.querySelector(
                    '.main-minhas-playlists-mobile .main-playlist-mobile .content-mobile .title-mobile'
                ).textContent = element.title
                document.querySelector(
                    '.main-minhas-playlists-mobile .main-playlist-mobile .content-mobile .details-mobile .created-mobile'
                ).textContent = `Criada em: ${formatarData(
                    element.additionDate
                )}`
                document.querySelector(
                    '.main-minhas-playlists-mobile .main-playlist-mobile .content-mobile .details-mobile .total-song-mobile'
                ).textContent = `Total de ${element.totalSongs} ${
                    element.totalSongs <= 1 ? 'música' : 'músicas'
                }`
                document.querySelector(
                    '.main-minhas-playlists-mobile .main-playlist-mobile .cover-mobile img'
                ).src = element.currentCoverUrl
                document.querySelector(
                    '.main-minhas-playlists-mobile .main-playlist-mobile .cover-mobile img'
                ).alt = element.title
                indexMyPlaylistId = element._id
                document.querySelector(
                    '.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile .edit-my-new-playlist-name-mobile'
                ).value = element.title
                document.querySelector(
                    '.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-current-mobile'
                ).textContent = element.title
                toggleContainerMinhaPlaylist()

                containerMusic.innerHTML = ''

                element.songs.reverse().forEach((ele, index) => {
                    let musicaEncontrada = allMusicData.find(
                        (element) => element._id === ele.musicId
                    )

                    let divItemMinhasMusicas = document.createElement('div')
                    divItemMinhasMusicas.classList.add(
                        'item-minhas-musicas-mobile'
                    )
                    divItemMinhasMusicas.style.animationDelay = `${
                        index * 0.05 + 0.1
                    }s`
                    divItemMinhasMusicas.addEventListener('click', () => {
                        document.querySelector(
                            '.music-my-new-playlist-overflow-mobile .music-my-new-playlist-container-mobile .music-my-new-playlist-title-mobile'
                        ).textContent = musicaEncontrada.title
                        document.querySelector(
                            '.music-my-new-playlist-overflow-mobile .music-my-new-playlist-container-mobile .music-my-new-playlist-cover-mobile img'
                        ).src = musicaEncontrada.coverUrl
                        document.querySelector(
                            '.music-my-new-playlist-overflow-mobile .music-my-new-playlist-container-mobile .music-my-new-playlist-cover-mobile img'
                        ).alt = musicaEncontrada.title
                        document.querySelector(
                            '.music-delete-my-new-playlist-overflow-mobile .music-delete-my-new-playlist-container-mobile .music-delete-my-new-playlist-current-mobile'
                        ).textContent = musicaEncontrada.title
                        indexMyPlaylistAudioId = ele._id
                        toggleMusicMinhaPlaylist()
                    })

                    let divCoverItemMinhasMusicas =
                        document.createElement('div')
                    divCoverItemMinhasMusicas.classList.add(
                        'cover-item-minhas-musicas-mobile'
                    )

                    let imgCover = document.createElement('img')
                    imgCover.src = musicaEncontrada.coverUrl
                    imgCover.alt = musicaEncontrada.title

                    let divTitleItemMinhasMusicas =
                        document.createElement('div')
                    divTitleItemMinhasMusicas.classList.add(
                        'title-item-minhas-musicas-mobile'
                    )
                    divTitleItemMinhasMusicas.textContent =
                        musicaEncontrada.title

                    divCoverItemMinhasMusicas.appendChild(imgCover)
                    divItemMinhasMusicas.appendChild(divCoverItemMinhasMusicas)
                    divItemMinhasMusicas.appendChild(divTitleItemMinhasMusicas)

                    containerMusic.appendChild(divItemMinhasMusicas)
                })
            })

            let divCoverItemMinhasPlaylists = document.createElement('div')
            divCoverItemMinhasPlaylists.classList.add(
                'cover-item-minhas-playlists-mobile'
            )

            let imgCover = document.createElement('img')
            imgCover.src = element.currentCoverUrl
            imgCover.alt = element.title

            let divTitleItemMinhasPlaylists = document.createElement('div')
            divTitleItemMinhasPlaylists.classList.add(
                'title-item-minhas-playlists-mobile'
            )
            divTitleItemMinhasPlaylists.textContent = element.title

            let divTotalDeMusicas = document.createElement('div')
            divTotalDeMusicas.classList.add('total-de-musicas-mobile')
            divTotalDeMusicas.textContent = 'TM'

            let divTotalDeMusicasQuantidade = document.createElement('div')
            divTotalDeMusicasQuantidade.classList.add(
                'total-de-musicas-quantidade-mobile'
            )
            divTotalDeMusicasQuantidade.textContent = element.totalSongs

            divCoverItemMinhasPlaylists.appendChild(imgCover)
            divItemMinhasPlaylists.appendChild(divCoverItemMinhasPlaylists)
            divItemMinhasPlaylists.appendChild(divTitleItemMinhasPlaylists)
            divItemMinhasPlaylists.appendChild(divTotalDeMusicas)
            divItemMinhasPlaylists.appendChild(divTotalDeMusicasQuantidade)

            container.appendChild(divItemMinhasPlaylists)
        })
        if (container.innerHTML === '') {
            if (
                document
                    .querySelector('.minhas-playlists-search-bar-input-mobile')
                    .value.trim() !== ''
            ) {
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
        const currentMusicAddPlaylistContainer = document.querySelector(
            '.current-music-add-playlist-container'
        )

        currentMusicAddPlaylistContainer.innerHTML = ''

        userData.myPlaylists.forEach((element) => {
            const song = element.songs.find(
                (song) => song.musicId === indexAudioId
            )

            const divItem = document.createElement('div')
            divItem.classList.add('current-music-add-playlist-item')
            divItem.addEventListener('click', () => {
                if (emptyPlaylist) return

                divItem.style.pointerEvents = 'none'
                if (song) {
                    fetch(
                        `/users-playlist-song/${userData._id}/${element._id}/${song._id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                        .then((response) => {
                            if (response.status === 200) return
                            else {
                                if (screenWidth >= 1360) {
                                    warning.classList.remove('hidden')
                                    warning.textContent = 'Internal Error!'
                                    if (timerAlertMessage != null) {
                                        clearTimeout(timerAlertMessage)
                                        timerAlertMessage = null
                                    }
                                    timerAlertMessage = setTimeout(() => {
                                        warning.classList.add('hidden')
                                    }, 3000)
                                } else {
                                    warningMobile.classList.remove('hidden')
                                    warningMobile.textContent =
                                        'Internal Error!'
                                    if (timerAlertMessage != null) {
                                        clearTimeout(timerAlertMessage)
                                        timerAlertMessage = null
                                    }
                                    timerAlertMessage = setTimeout(() => {
                                        warningMobile.classList.add('hidden')
                                    }, 3000)
                                }
                            }
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                        .finally(() => {
                            refreshUserWithNewPlaylist()
                            divStatus.style.pointerEvents = 'auto'
                        })
                } else {
                    fetch(
                        `/users-playlist-song/${userData._id}/${element._id}`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                musicIds: [indexAudioId],
                            }),
                        }
                    )
                        .then((response) => {
                            if (response.status === 201) return
                            else {
                                if (screenWidth >= 1360) {
                                    warning.classList.remove('hidden')
                                    warning.textContent = 'Internal Error!'
                                    if (timerAlertMessage != null) {
                                        clearTimeout(timerAlertMessage)
                                        timerAlertMessage = null
                                    }
                                    timerAlertMessage = setTimeout(() => {
                                        warning.classList.add('hidden')
                                    }, 3000)
                                } else {
                                    warningMobile.classList.remove('hidden')
                                    warningMobile.textContent =
                                        'Internal Error!'
                                    if (timerAlertMessage != null) {
                                        clearTimeout(timerAlertMessage)
                                        timerAlertMessage = null
                                    }
                                    timerAlertMessage = setTimeout(() => {
                                        warningMobile.classList.add('hidden')
                                    }, 3000)
                                }
                            }
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                        .finally(() => {
                            refreshUserWithNewPlaylist()
                            divItem.style.pointerEvents = 'auto'
                        })
                }
            })

            const divStatus = document.createElement('div')
            divStatus.classList.add('current-music-add-playlist-status')

            const ionIcon = document.createElement('ion-icon')
            if (song) {
                ionIcon.setAttribute('name', 'checkbox')
            } else {
                ionIcon.setAttribute('name', 'square-outline')
            }

            divStatus.appendChild(ionIcon)

            const divTitle = document.createElement('div')
            divTitle.classList.add('current-music-add-playlist-title')
            divTitle.textContent = element.title

            divItem.appendChild(divStatus)
            divItem.appendChild(divTitle)

            currentMusicAddPlaylistContainer.appendChild(divItem)
        })
    } else {
        const currentMusicAddPlaylistContainerMobile = document.querySelector(
            '.current-music-add-playlist-container-mobile'
        )

        currentMusicAddPlaylistContainerMobile.innerHTML = ''

        userData.myPlaylists.forEach((element) => {
            const song = element.songs.find(
                (song) => song.musicId === indexAudioId
            )

            const divItem = document.createElement('div')
            divItem.classList.add('current-music-add-playlist-item-mobile')
            divItem.addEventListener('click', () => {
                divItem.style.pointerEvents = 'none'
                if (song) {
                    fetch(
                        `/users-playlist-song/${userData._id}/${element._id}/${song._id}`,
                        {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    )
                        .then((response) => {
                            if (response.status === 200) return
                            else {
                                if (screenWidth >= 1360) {
                                    warning.classList.remove('hidden')
                                    warning.textContent = 'Internal Error!'
                                    if (timerAlertMessage != null) {
                                        clearTimeout(timerAlertMessage)
                                        timerAlertMessage = null
                                    }
                                    timerAlertMessage = setTimeout(() => {
                                        warning.classList.add('hidden')
                                    }, 3000)
                                } else {
                                    warningMobile.classList.remove('hidden')
                                    warningMobile.textContent =
                                        'Internal Error!'
                                    if (timerAlertMessage != null) {
                                        clearTimeout(timerAlertMessage)
                                        timerAlertMessage = null
                                    }
                                    timerAlertMessage = setTimeout(() => {
                                        warningMobile.classList.add('hidden')
                                    }, 3000)
                                }
                            }
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                        .finally(() => {
                            refreshUserWithNewPlaylist()
                            divStatus.style.pointerEvents = 'auto'
                        })
                } else {
                    fetch(
                        `/users-playlist-song/${userData._id}/${element._id}`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                musicIds: [indexAudioId],
                            }),
                        }
                    )
                        .then((response) => {
                            if (response.status === 201) return
                            else {
                                if (screenWidth >= 1360) {
                                    warning.classList.remove('hidden')
                                    warning.textContent = 'Internal Error!'
                                    if (timerAlertMessage != null) {
                                        clearTimeout(timerAlertMessage)
                                        timerAlertMessage = null
                                    }
                                    timerAlertMessage = setTimeout(() => {
                                        warning.classList.add('hidden')
                                    }, 3000)
                                } else {
                                    warningMobile.classList.remove('hidden')
                                    warningMobile.textContent =
                                        'Internal Error!'
                                    if (timerAlertMessage != null) {
                                        clearTimeout(timerAlertMessage)
                                        timerAlertMessage = null
                                    }
                                    timerAlertMessage = setTimeout(() => {
                                        warningMobile.classList.add('hidden')
                                    }, 3000)
                                }
                            }
                        })
                        .catch((error) => {
                            console.error(error)
                        })
                        .finally(() => {
                            refreshUserWithNewPlaylist()
                            divItem.style.pointerEvents = 'auto'
                        })
                }
            })

            const divStatus = document.createElement('div')
            divStatus.classList.add('current-music-add-playlist-status-mobile')

            const ionIcon = document.createElement('ion-icon')
            if (song) {
                ionIcon.setAttribute('name', 'checkbox')
            } else {
                ionIcon.setAttribute('name', 'square-outline')
            }

            divStatus.appendChild(ionIcon)

            const divTitle = document.createElement('div')
            divTitle.classList.add('current-music-add-playlist-title-mobile')
            divTitle.textContent = element.title

            divItem.appendChild(divStatus)
            divItem.appendChild(divTitle)

            currentMusicAddPlaylistContainerMobile.appendChild(divItem)
        })
    }
}

function getThemeStorage() {
    return localStorage.getItem('theme') || 'original'
}

function setThemeStorage(theme) {
    if (!themes.includes(theme)) {
        console.warn(
            `Tema "${theme}" não reconhecido. Utilizando tema padrão "original".`
        )
        theme = 'original'
    }

    localStorage.setItem('theme', theme)
}

function initThemeChanger(theme = 'original') {
    themes.forEach((theme) => {
        document
            .querySelectorAll(`[data-theme="${theme}"]`)
            .forEach((element) => {
                element.classList.remove('active')
            })
    })

    document.querySelectorAll(`[data-theme="${theme}"]`).forEach((element) => {
        element.classList.add('active')
    })

    if (!themes.includes(theme)) {
        console.warn(
            `Tema "${theme}" não reconhecido. Utilizando tema padrão "original".`
        )
        theme = 'original'
    }

    for (let i = 1; i <= 5; i++) {
        document.documentElement.style.setProperty(
            `--color-base-${i}`,
            colorsThemes[theme][`base${i}`]
        )
    }

    const logoUrls = {
        original: 'https://i.ibb.co/fdBXmh2/logo.png',
        'rock-version': 'https://i.ibb.co/Mh46LMN/logo-rock-version.png',
        'hatsune-miku-version':
            'https://i.ibb.co/YysSGkz/logo-hatsune-miku-version.png',
        'amv-brasileiro-version':
            'https://i.ibb.co/StK28mr/logo-amv-brasileiro-version.png',
        'dark-mode-version':
            'https://i.ibb.co/D56Ds5x/logo-dark-mode-version.png',
    }

    const logoSrc = logoUrls[theme]

    if (screenWidth >= 1360) {
        serviceLogo.src = logoSrc
    } else {
        serviceLogoMobile.src = logoSrc
    }

    if (userData?.theme) {
        setThemeStorage(theme)
    }
}

initThemeChanger(getThemeStorage())

async function themeChanger(theme = 'original') {
    themes.forEach((theme) => {
        document
            .querySelectorAll(`[data-theme="${theme}"]`)
            .forEach((element) => {
                element.classList.remove('active')
            })
    })

    document.querySelectorAll(`[data-theme="${theme}"]`).forEach((element) => {
        element.classList.add('active')
    })

    if (!themes.includes(theme)) {
        console.warn(
            `Tema "${theme}" não reconhecido. Utilizando tema padrão "original".`
        )
        theme = 'original'
    }

    for (let i = 1; i <= 5; i++) {
        document.documentElement.style.setProperty(
            `--color-base-${i}`,
            colorsThemes[theme][`base${i}`]
        )
    }

    const logoUrls = {
        original: 'https://i.ibb.co/fdBXmh2/logo.png',
        'rock-version': 'https://i.ibb.co/Mh46LMN/logo-rock-version.png',
        'hatsune-miku-version':
            'https://i.ibb.co/YysSGkz/logo-hatsune-miku-version.png',
        'amv-brasileiro-version':
            'https://i.ibb.co/StK28mr/logo-amv-brasileiro-version.png',
        'dark-mode-version':
            'https://i.ibb.co/D56Ds5x/logo-dark-mode-version.png',
    }

    const logoSrc = logoUrls[theme]

    if (screenWidth >= 1360) {
        serviceLogo.src = logoSrc
    } else {
        serviceLogoMobile.src = logoSrc
    }

    await fetch(`/users-theme/${userData._id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            theme,
        }),
    })
        .then((response) => {
            if (response.status === 200) {
                setThemeStorage(theme)
                return (userData.theme = theme)
            } else {
                if (screenWidth >= 1360) {
                    warning.classList.remove('hidden')
                    warning.textContent = 'Internal Error!'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Internal Error!'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        })
        .catch((error) => {
            console.error(error)
        })
}

let canMoveTheSliderDuration = true

function musicStateControllers() {
    repeatIcon.addEventListener('click', repeatToggle)
    shuffleIcon.addEventListener('click', shuffleToggle)

    repeatIconMobile.addEventListener('click', repeatToggle)
    shuffleIconMobile.addEventListener('click', shuffleToggle)
}

function durationSliderEventGenerator() {
    if (screenWidth >= 1360) {
        sliderMusicDuration.addEventListener('mousedown', () => {
            canMoveTheSliderDuration = false
        })
        sliderMusicDuration.addEventListener('touchstart', () => {
            canMoveTheSliderDuration = false
        })
        sliderMusicDuration.addEventListener('mouseup', () => {
            if (emptyPlaylist) return

            changeVideoCurrentTime(
                (sliderMusicDuration.value / 100) * getVideoDuration()
            )

            canMoveTheSliderDuration = true
        })
        sliderMusicDuration.addEventListener('touchend', () => {
            changeVideoCurrentTime(
                (sliderMusicDuration.value / 100) * getVideoDuration()
            )

            canMoveTheSliderDuration = true
        })

        sliderMusicDuration.oninput = () => {
            if (emptyPlaylist) return

            sliderMusicDuration.style.setProperty(
                'background-image',
                `linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%`
            )
            sliderMusicDurationDot.style.setProperty(
                'left',
                `${sliderMusicDuration.value}%`
            )

            let interactionWithTheSlider =
                (sliderMusicDuration.value / 100) * getVideoDuration()

            let minCurrent = Math.floor(interactionWithTheSlider / 60)
            let segCurrent = Math.floor(interactionWithTheSlider % 60)

            if (segCurrent < 10) {
                segCurrent = `0${segCurrent}`
            }

            if (isNaN(minCurrent) || isNaN(segCurrent)) {
                minCurrent = 0
                segCurrent = '00'
            }

            currentDuration.innerHTML = `${minCurrent}:${segCurrent}`
        }
    } else {
        sliderMusicDurationMobile.addEventListener('mousedown', () => {
            canMoveTheSliderDuration = false
        })
        sliderMusicDurationMobile.addEventListener('touchstart', () => {
            canMoveTheSliderDuration = false
        })
        sliderMusicDurationMobile.addEventListener('mouseup', () => {
            changeVideoCurrentTime(
                (sliderMusicDurationMobile.value / 100) * getVideoDuration()
            )

            canMoveTheSliderDuration = true
        })
        sliderMusicDurationMobile.addEventListener('touchend', () => {
            changeVideoCurrentTime(
                (sliderMusicDurationMobile.value / 100) * getVideoDuration()
            )

            canMoveTheSliderDuration = true
        })

        sliderMusicDurationMobile.oninput = () => {
            sliderMusicDurationMobile.style.setProperty(
                'background-image',
                `linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`
            )
            sliderMusicDurationDotMobile.style.setProperty(
                'left',
                `${sliderMusicDurationMobile.value}%`
            )

            let interactionWithTheSlider =
                (sliderMusicDurationMobile.value / 100) * getVideoDuration()

            let minCurrent = Math.floor(interactionWithTheSlider / 60)
            let segCurrent = Math.floor(interactionWithTheSlider % 60)

            if (segCurrent < 10) {
                segCurrent = `0${segCurrent}`
            }

            if (isNaN(minCurrent) || isNaN(segCurrent)) {
                minCurrent = 0
                segCurrent = '00'
            }

            currentDurationMobile.innerHTML = `${minCurrent}:${segCurrent}`
        }
    }
}

function volumeSliderEventGenerator() {
    sliderMusicVolume.addEventListener('mousedown', () => {
        canMoveTheSliderVolume = false
    })
    sliderMusicVolume.addEventListener('touchstart', () => {
        canMoveTheSliderVolume = false
    })
    sliderMusicVolume.addEventListener('mouseup', () => {
        canMoveTheSliderVolume = true
    })
    sliderMusicVolume.addEventListener('touchend', () => {
        canMoveTheSliderVolume = true
    })

    sliderMusicVolume.oninput = () => {
        setSliderMusicVolume()
        setVolumeStorage(sliderMusicVolume.value)
        setVolumeIcon()

        if (emptyPlaylist) return
        setVideoVolume(sliderMusicVolume.value)
    }
}

function setSliderMusicVolume() {
    sliderMusicVolume.style.setProperty(
        'background-image',
        `linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) ${sliderMusicVolume.value}%, var(--color-white-1) ${sliderMusicVolume.value}%, var(--color-white-1) 100%`
    )
    sliderMusicVolumeDot.style.setProperty(
        'left',
        `${sliderMusicVolume.value}%`
    )
}

function setVolumeIcon() {
    if (sliderMusicVolume.value == 0) {
        volumeIcon.name = 'volume-mute'
    } else if (sliderMusicVolume.value > 0 && sliderMusicVolume.value <= 33) {
        volumeIcon.name = 'volume-low'
    } else if (sliderMusicVolume.value > 20 && sliderMusicVolume.value <= 66) {
        volumeIcon.name = 'volume-medium'
    } else {
        volumeIcon.name = 'volume-high'
    }
}

const VOLUME_VARIATION_VALUE = 10

function volumeUp() {
    if (sliderMusicVolume.value < 100) {
        sliderMusicVolume.value =
            parseInt(sliderMusicVolume.value) + VOLUME_VARIATION_VALUE
        setSliderMusicVolume()
        setVolumeStorage(sliderMusicVolume.value)
        setVolumeIcon()

        if (emptyPlaylist) return
        setVideoVolume(sliderMusicVolume.value)
    } else {
        sliderMusicVolume.value = 100
        setSliderMusicVolume()
        setVolumeStorage(sliderMusicVolume.value)
        setVolumeIcon()

        if (emptyPlaylist) return
        setVideoVolume(sliderMusicVolume.value)
    }
}

function volumeDown() {
    if (sliderMusicVolume.value > 0) {
        sliderMusicVolume.value =
            parseInt(sliderMusicVolume.value) - VOLUME_VARIATION_VALUE
        setSliderMusicVolume()
        setVolumeStorage(sliderMusicVolume.value)
        setVolumeIcon()

        if (emptyPlaylist) return
        setVideoVolume(sliderMusicVolume.value)
    } else {
        sliderMusicVolume.value = 0
        setSliderMusicVolume()
        setVolumeStorage(sliderMusicVolume.value)
        setVolumeIcon()

        if (emptyPlaylist) return
        setVideoVolume(sliderMusicVolume.value)
    }
}

function initDurationSlider() {
    if (screenWidth >= 1360) {
        sliderMusicDuration.style.setProperty(
            'background-image',
            `linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%`
        )
        sliderMusicDurationDot.style.setProperty(
            'left',
            `${sliderMusicDuration.value}%`
        )
    } else {
        sliderMusicDurationMobile.style.setProperty(
            'background-image',
            `linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`
        )
        displayMusicDurationMobile.style.setProperty(
            'background-image',
            `linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`
        )
        sliderMusicDurationDotMobile.style.setProperty(
            'left',
            `${sliderMusicDurationMobile.value}%`
        )
    }
}

function initVolumeSlider() {
    if (screenWidth < 1360) return

    sliderMusicVolume.value = getVolumeStorage()
    setSliderMusicVolume()
    setVolumeIcon()
}

let repeatToggleControl = true

function repeatToggle() {
    if (repeatToggleControl) {
        repeatToggleControl = false
        repeatIcon.classList.add('active')
        repeatIconMobile.classList.add('active')
    } else {
        repeatToggleControl = true
        repeatIcon.classList.remove('active')
        repeatIconMobile.classList.remove('active')
    }
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length
    let currentIndex = size - 1

    while (currentIndex > 0) {
        let ramdomIndex = Math.floor(Math.random() * size)
        let aux = preShuffleArray[currentIndex]
        preShuffleArray[currentIndex] = preShuffleArray[ramdomIndex]
        preShuffleArray[ramdomIndex] = aux
        currentIndex -= 1
    }
    audioControllerPrevFunction()
}

let shuffleToggleControl = true

function shuffleToggle() {
    if (shuffleToggleControl) {
        shuffleIcon.classList.add('active')
        shuffleIconMobile.classList.add('active')

        shuffleToggleControl = false

        shuffleArray(musicDataShuffled)

        indexAudio = 1
        indexPage = 0
        clearPlaylistData()
        audioControllerPrevFunction()
        generatorContainerPlaylistData()
        generatorContainerPlaylistDataPlay()
        setMusicPlayTag()
        containerPlaylist.scrollTop = 0
        containerPlaylistMobile.scrollTop = 0
    } else {
        shuffleIcon.classList.remove('active')
        shuffleIconMobile.classList.remove('active')

        shuffleToggleControl = true
        musicDataShuffled = [...musicData]
        indexAudio = 1
        indexPage = 0
        clearPlaylistData()
        audioControllerPrevFunction()
        generatorContainerPlaylistData()
        generatorContainerPlaylistDataPlay()
        setMusicPlayTag()
        containerPlaylist.scrollTop = 0
        containerPlaylistMobile.scrollTop = 0
    }
}

function musicFilteringFunction() {
    if (screenWidth >= 1360) {
        containerItemsSearch.innerHTML = ''

        $('.song-not-found').hide()

        generatorContainerSearchData()
        generatorContainerSearchDataPlay()
        if (!emptyPlaylist) {
        }

        if (containerItemsSearch.innerHTML == '') {
            $('.song-not-found').show()
        }

        if (searchBarInput.value.trim() === '') {
            document.querySelector('.search-bar-close').classList.add('hidden')
        } else {
            document
                .querySelector('.search-bar-close')
                .classList.remove('hidden')
        }
    } else {
        containerItemsSearchMobile.innerHTML = ''

        $('.song-not-found-mobile').hide()

        generatorContainerSearchData()
        generatorContainerSearchDataPlay()
        if (!emptyPlaylist) {
        }

        if (containerItemsSearchMobile.innerHTML == '') {
            $('.song-not-found-mobile').show()
        }

        if (searchBarInputMobile.value.trim() === '') {
            document
                .querySelector('.search-bar-close-mobile')
                .classList.add('hidden')
        } else {
            document
                .querySelector('.search-bar-close-mobile')
                .classList.remove('hidden')
        }
    }
}

let profileWasClicked = true

function searchEvents() {
    searchButton.addEventListener('click', () => {
        $('.search-bar').show(400)
        $(searchBarInput).focus()
        $('.container-search-result').show(200)
        $('.focus-shadow').show(200)
        $('.container-user-settings').hide(200)
        $('.menu-options').hide(200)
        profileWasClicked = true
        canKeyboardEvents = false
        canKeyboardEventsProfile = false
        musicFilteringFunction()
    })
    $('.search-bar-close').click(() => {
        $('.search-bar input').val('')
        musicFilteringFunction()
    })
    $('.main-search-mobile .search-bar-mobile .search-bar-close-mobile').click(
        () => {
            $('.main-search-mobile .search-bar-mobile input').val('')
            musicFilteringFunction()
        }
    )
    $('.container-settings .user-settings').click(function () {
        toggleTemplateUser()
    })

    $('.focus-shadow').click(() => {
        $('.focus-shadow').hide(200)
        $('.container-search-result').hide(200)
        $('.container-user-settings').hide(200)
        $('.search-bar').hide(200)
        profileWasClicked = true
        canKeyboardEvents = true
        canKeyboardEventsProfile = true
    })

    searchBarInput.oninput = () => {
        musicFilteringFunction()
    }

    if (searchBarInput.value.trim() === '') {
        document.querySelector('.search-bar-close').classList.add('hidden')
    } else {
        document.querySelector('.search-bar-close').classList.remove('hidden')
    }

    searchBarInputMobile.oninput = () => {
        musicFilteringFunction()
    }

    if (searchBarInputMobile.value.trim() === '') {
        document
            .querySelector('.search-bar-close-mobile')
            .classList.add('hidden')
    } else {
        document
            .querySelector('.search-bar-close-mobile')
            .classList.remove('hidden')
    }

    $('.header-mobile .user-settings').click(() => {
        $('.main-user-settings-mobile').toggle(200)
        $('.menu-options-mobile').hide(200)
    })
    $('.main-user-settings-mobile .display-back').click(() => {
        $('.main-user-settings-mobile').toggle(200)
    })
    $('.header-mobile .search-icon-mobile').click(() => {
        $('.main-search-mobile').toggle(200)
        $('.menu-options-mobile').hide(200)
        $('.main-controls-mobile').addClass('fixed')
        $('.main-search-mobile .search-bar-mobile input').focus()
    })
    $('.main-search-mobile .display-back').click(() => {
        $('.main-search-mobile').toggle(200)
        $('.main-controls-mobile').removeClass('fixed')
    })
}

function toggleTemplateUser() {
    if (profileWasClicked) {
        $('.container-user-settings').show(200)
        $('.focus-shadow').show(200)
        $('.container-search-result').hide(200)
        $('.menu-options').hide(200)
        profileWasClicked = false
        canKeyboardEvents = false
        canKeyboardEventsProfile = true
    } else {
        $('.focus-shadow').hide(200)
        $('.container-search-result').hide(200)
        $('.container-user-settings').hide(200)
        profileWasClicked = true
        canKeyboardEvents = true
        canKeyboardEventsProfile = true
    }
}

function setMusicPlayTag() {
    $('.music-playing').removeClass('music-playing')
    $(`div[data-id="${indexAudioId}"] .box-wrapper .info-item`).addClass(
        'music-playing'
    )
}

function allFunctionResizing() {
    setScreenWidthAndHeight()
    deviceDefinition()
}

function setScreenWidthAndHeight() {
    screenWidth = window.innerWidth
    screenHeight = window.innerHeight
}

async function logoutService() {
    await fetch('/logout/' + userData._id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(() => {
            document.cookie.split(';').forEach(function (c) {
                document.cookie = c
                    .replace(/^ +/, '')
                    .replace(
                        /=.*/,
                        '=;expires=' + new Date().toUTCString() + ';path=/'
                    )
            })

            window.location = '/'
        })
        .catch((error) => {
            document.cookie.split(';').forEach(function (c) {
                document.cookie = c
                    .replace(/^ +/, '')
                    .replace(
                        /=.*/,
                        '=;expires=' + new Date().toUTCString() + ';path=/'
                    )
            })

            window.location = '/'
            console.error(error)
        })
}

function getCookie(k) {
    var cookies = ' ' + document.cookie
    var key = ' ' + k + '='
    var start = cookies.indexOf(key)

    if (start === -1) return null

    var pos = start + key.length
    var last = cookies.indexOf(';', pos)

    if (last !== -1) return cookies.substring(pos, last)

    return cookies.substring(pos)
}

async function manageHistoric() {
    if (emptyPlaylist) return

    const idUserConnected = getCookie('user')
    let music = {
        musicId: indexAudioId,
        musicGender: indexAudioGender,
    }

    const resposta = await fetch(`/songs-historic/${idUserConnected}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(music),
    })
    if (resposta.status == 200) {
        await refreshUser()
    }
    if (resposta.status != 200) {
        if (screenWidth >= 1360) {
            warning.classList.remove('hidden')
            warning.textContent = 'Internal Error!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Internal Error!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
    }
}

async function manageHistoricClear() {
    const idUserConnected = getCookie('user')
    let music = {
        musicId: 'clear',
        musicGender: indexAudioGender,
    }

    const resposta = await fetch(`/songs-historic/${idUserConnected}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(music),
    })
    if (resposta.status == 200) {
        await refreshUser()
    }
    if (resposta.status != 200) {
        if (screenWidth >= 1360) {
            warning.classList.remove('hidden')
            warning.textContent = 'Internal Error!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Internal Error!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
    }
}

async function manageFavorite() {
    if (emptyPlaylist) return

    const idUserConnected = getCookie('user')
    let music = {
        musicId: indexAudioId,
        musicGender: indexAudioGender,
    }

    if (screenWidth >= 1360) {
        musicFavoriteIcon.style.pointerEvents = 'none'
    } else {
        musicFavoriteIconMobile.style.pointerEvents = 'none'
    }

    const resposta = await fetch(`/songs-favorite/${idUserConnected}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(music),
    })

    const respostaJson = await resposta.json()

    if (respostaJson.message == 'limit reached') {
        if (screenWidth >= 1360) {
            warning.classList.remove('hidden')
            warning.textContent = 'Limite de músicas favoritas atingido!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Limite de músicas favoritas atingido!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
    }
    if (resposta.status == 200) {
        await refreshUser()
        refreshFavorite()
        if (screenWidth >= 1360) {
            musicFavoriteIcon.style.pointerEvents = 'auto'
        } else {
            musicFavoriteIconMobile.style.pointerEvents = 'auto'
        }
    }
    if (resposta.status != 200) {
        if (screenWidth >= 1360) {
            musicFavoriteIcon.style.pointerEvents = 'auto'
            warning.classList.remove('hidden')
            warning.textContent = 'Internal Error!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            musicFavoriteIconMobile.style.pointerEvents = 'auto'
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Internal Error!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
    }
}

async function refreshUserWithNewPlaylist() {
    const idUserConnected = getCookie('user')
    const responseUser = await fetch(`/users/${idUserConnected}`)
    const user = await responseUser.json()

    userData = user.user
    userData.myPlaylists.reverse()

    generatorContainerCurrentMusicAddPlaylist()
    generatorContainerMusicAddPlaylist()
}

async function refreshUser() {
    const idUserConnected = getCookie('user')
    const responseUser = await fetch(`/users/${idUserConnected}`)
    const user = await responseUser.json()

    userData = user.user
    userData.myPlaylists.reverse()

    if (screenWidth >= 1360) {
        containerItemsHistoric.innerHTML = ''
    } else {
        containerItemsHistoricMobile.innerHTML = ''
    }
    generatorContainerHistoricData()
    generatorContainerHistoricDataPlay()
}

async function refreshFavorite() {
    let isFound = false

    let songFavorite = userData.favoriteSongs.find(
        (element) => element.musicId == musicDataShuffled[indexAudio]?._id
    )

    if (screenWidth >= 1360) {
        if (songFavorite) {
            document.querySelector(
                '.current-music-add-favorite-icon ion-icon'
            ).name = 'heart'
            isFound = true
        }

        if (!isFound) {
            document.querySelector(
                '.current-music-add-favorite-icon ion-icon'
            ).name = 'heart-outline'
        }

        containerItemsFavorite.innerHTML = ''
    } else {
        if (songFavorite) {
            musicFavoriteIconMobile.name = 'heart'
            document.querySelector(
                '.current-music-add-favorite-icon-mobile ion-icon'
            ).name = 'heart'

            isFound = true
        }

        if (!isFound) {
            musicFavoriteIconMobile.name = 'heart-outline'
            document.querySelector(
                '.current-music-add-favorite-icon-mobile ion-icon'
            ).name = 'heart-outline'
        }

        containerItemsFavoriteMobile.innerHTML = ''
    }

    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
}

function toggleMenu() {
    if (screenWidth >= 1360) {
        $('.menu-options').toggle(200)
    } else {
        $('.menu-options-mobile').toggle(200)
    }
}

function toggleMorePlaylists() {
    if (screenWidth >= 1360) {
        $('.main-select-playlists').toggle(200)
    } else {
        $('.main-select-playlists-mobile').toggle(200)
    }
}

function toggleMyPlaylists() {
    if (screenWidth >= 1360) {
        $('.main-minhas-playlists').toggle(200)
    } else {
        $('.main-minhas-playlists-mobile').toggle(200)
    }
}

function toggleContainerMinhaPlaylist() {
    if (screenWidth >= 1360) {
        $('.container-minha-playlist').toggle(200)
    } else {
        $('.container-minha-playlist-mobile').toggle(200)
    }
}
function toggleAddMinhaPlaylist() {
    if (screenWidth >= 1360) {
        const addMyNewPlaylistOverflow = document.querySelector(
            '.add-my-new-playlist-overflow'
        )
        if (addMyNewPlaylistOverflow.classList.contains('hidden')) {
            addMyNewPlaylistOverflow.classList.remove('hidden')
            canKeyboardEvents = false
        } else {
            addMyNewPlaylistOverflow.classList.add('hidden')
            canKeyboardEvents = true
        }
    } else {
        const addMyNewPlaylistOverflow = document.querySelector(
            '.add-my-new-playlist-overflow-mobile'
        )
        if (addMyNewPlaylistOverflow.classList.contains('hidden')) {
            addMyNewPlaylistOverflow.classList.remove('hidden')
        } else {
            addMyNewPlaylistOverflow.classList.add('hidden')
        }
    }
}

function toggleEditMinhaPlaylist() {
    if (screenWidth >= 1360) {
        const editOverflow = document.querySelector(
            '.edit-my-new-playlist-overflow'
        )
        if (editOverflow.classList.contains('hidden')) {
            editOverflow.classList.remove('hidden')
        } else {
            editOverflow.classList.add('hidden')
        }
    } else {
        const editOverflow = document.querySelector(
            '.edit-my-new-playlist-overflow-mobile'
        )
        if (editOverflow.classList.contains('hidden')) {
            editOverflow.classList.remove('hidden')
        } else {
            editOverflow.classList.add('hidden')
        }
    }
}

function toggleDeleteMinhaPlaylist() {
    if (screenWidth >= 1360) {
        const deleteOverflow = document.querySelector(
            '.delete-my-new-playlist-overflow'
        )
        if (deleteOverflow.classList.contains('hidden')) {
            deleteOverflow.classList.remove('hidden')
        } else {
            deleteOverflow.classList.add('hidden')
        }
    } else {
        const deleteOverflow = document.querySelector(
            '.delete-my-new-playlist-overflow-mobile'
        )
        if (deleteOverflow.classList.contains('hidden')) {
            deleteOverflow.classList.remove('hidden')
        } else {
            deleteOverflow.classList.add('hidden')
        }
    }
}

function toggleMusicMinhaPlaylist() {
    if (screenWidth >= 1360) {
        const musicOverflow = document.querySelector(
            '.music-my-new-playlist-overflow'
        )
        if (musicOverflow.classList.contains('hidden')) {
            musicOverflow.classList.remove('hidden')
        } else {
            musicOverflow.classList.add('hidden')
        }
    } else {
        const musicOverflow = document.querySelector(
            '.music-my-new-playlist-overflow-mobile'
        )
        if (musicOverflow.classList.contains('hidden')) {
            musicOverflow.classList.remove('hidden')
        } else {
            musicOverflow.classList.add('hidden')
        }
    }
}

function toggleDeleteMusicMinhaPlaylist() {
    if (screenWidth >= 1360) {
        $('.music-delete-my-new-playlist-overflow').toggle(200)
    } else {
        $('.music-delete-my-new-playlist-overflow-mobile').toggle(200)
    }
}

function toggleDisplayMobile() {
    if (!displayMobile.classList.contains('show')) {
        displayMobile.classList.remove('exit')
        displayMobile.classList.add('show')
        audioControllerPlayFunctionNoPause()
        $('.main-search-mobile').hide(200)
        $('.main-controls-mobile').removeClass('fixed')
    } else {
        displayMobile.classList.remove('show')
        displayMobile.classList.add('exit')
        displayMobile.addEventListener('animationend', (event) => {
            if (event.animationName == 'down-display') {
                displayMobile.classList.remove('exit')
            }
        })
    }
}

function toggleAddOptions() {
    if (emptyPlaylist) return

    if (screenWidth >= 1360) {
        const addOptionsOverflow = document.querySelector(
            '.current-music-add-overflow'
        )
        if (addOptionsOverflow.classList.contains('hidden')) {
            addOptionsOverflow.classList.remove('hidden')
            canKeyboardEventsProfile = false
        } else {
            addOptionsOverflow.classList.add('hidden')
            canKeyboardEventsProfile = true
        }
    } else {
        const addOptionsOverflow = document.querySelector(
            '.current-music-add-overflow-mobile'
        )
        if (addOptionsOverflow.classList.contains('hidden')) {
            addOptionsOverflow.classList.remove('hidden')
        } else {
            addOptionsOverflow.classList.add('hidden')
        }
    }
}

function toggleLogout() {
    if (screenWidth >= 1360) {
        const logoutOverflow = document.querySelector(
            '.confirm-logout-overflow'
        )
        if (logoutOverflow.classList.contains('hidden')) {
            logoutOverflow.classList.remove('hidden')
            canKeyboardEventsProfile = false
        } else {
            logoutOverflow.classList.add('hidden')
            canKeyboardEventsProfile = true
        }
    } else {
        const logoutOverflow = document.querySelector(
            '.confirm-logout-overflow-mobile'
        )
        if (logoutOverflow.classList.contains('hidden')) {
            logoutOverflow.classList.remove('hidden')
        } else {
            logoutOverflow.classList.add('hidden')
        }
    }
}

function initialDeviceDefinition() {
    if (screenWidth >= 1360) {
        initialDevice = 'Desktop'
    } else {
        initialDevice = 'Mobile'
    }
}

let currentVideoTime = 0
let itsPlaying = false

function deviceDefinition() {
    let previousDevice, nextDevice

    previousDevice = initialDevice

    if (screenWidth >= 1360) {
        initialDevice = 'Desktop'
    } else {
        initialDevice = 'Mobile'
    }

    nextDevice = initialDevice

    if (previousDevice != nextDevice) {
        changeMobileOrDesktop()
    }
}

function changeMobileOrDesktop() {
    if (screenWidth >= 1360) {
        containerItemsSearch.innerHTML = ''
        containerItemsFavorite.innerHTML = ''
        containerItemsHistoric.innerHTML = ''
        containerPlaylistSelect.innerHTML = ''

        if (isMyPlaylist) {
            userData.myPlaylists.forEach((playlist) => {
                if (playlist._id === indexMyPlaylistId) {
                    document.querySelector('.title-playlist').textContent =
                        playlist.title
                }
            })
        } else {
            $('.title-playlist').html(
                emptyPlaylist && userData.lastAccessedPlaylist !== 'Favorite'
                    ? 'Sem Playlist'
                    : userData.lastAccessedPlaylistName
            )
        }

        $('.search-bar input').val('')
        musicFilteringFunction()
        sliderMusicVolume.value = getVideoVolume()

        itsPlaying = false

        if (playerMobile) {
            if (playerMobile.getPlayerState) {
                if (playerMobile.getPlayerState() == 1) {
                    itsPlaying = true
                }
            }

            if (playerMobile.getCurrentTime) {
                currentVideoTime = playerMobile.getCurrentTime()
            }

            stopAnimationAudioControllerPlay()

            playerMobile.destroy()
        }
    } else {
        containerItemsSearchMobile.innerHTML = ''
        containerItemsFavoriteMobile.innerHTML = ''
        containerItemsHistoricMobile.innerHTML = ''
        containerFrameVideo.innerHTML = ''
        containerPlaylistSelectMobile.innerHTML = ''

        if (isMyPlaylist) {
            userData.myPlaylists.forEach((playlist) => {
                if (playlist._id === indexMyPlaylistId) {
                    document.querySelector(
                        '.title-playlist-mobile'
                    ).textContent = playlist.title
                }
            })
        } else {
            $('.title-playlist-mobile').html(
                emptyPlaylist && userData.lastAccessedPlaylist !== 'Favorite'
                    ? 'Sem Playlist'
                    : userData.lastAccessedPlaylistName
            )
        }

        $('.main-search-mobile .search-bar-mobile input').val('')
        musicFilteringFunction()

        itsPlaying = false

        if (player) {
            if (player.getPlayerState) {
                if (player.getPlayerState() == 1) {
                    itsPlaying = true
                }
            }

            if (player.getCurrentTime) {
                currentVideoTime = player.getCurrentTime()
            }

            stopAnimationAudioControllerPlay()

            player.destroy()

            clearInterval(timerSyncSliderVolume)
            timerSyncSliderVolume = null
        }

        if (!emptyPlaylist) {
            if (!displayMobile.classList.contains('show') && itsPlaying) {
                displayMobile.classList.remove('exit')
                displayMobile.classList.add('show')
                $('.main-search-mobile').hide(200)
                $('.main-controls-mobile').removeClass('fixed')
                $('.main-user-settings-mobile').hide(200)
                $('.main-minhas-playlists-mobile').hide(200)
                $('.main-select-playlists-mobile').hide(200)
                $('.menu-options-mobile').hide(200)
            }
        }
    }

    indexPage = 0

    clearPlaylistData()
    allSongValueSetters()
    generatorContainerPlaylistSelectData()
    generatorContainerPlaylistSelectDataPlay()
    generatorContainerPlaylistData()
    generatorContainerPlaylistDataPlay()
    generatorContainerSearchData()
    generatorContainerSearchDataPlay()
    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
    generatorContainerHistoricData()
    generatorContainerHistoricDataPlay()
    manageEmptyPlaylist()
    manageHistoric()
    setUserProfilePicture()
    setUserSettings()
    generatorContainerCurrentMusicAddPlaylist()
    generatorContainerMusicAddPlaylist()
    if (emptyPlaylist) return
    indexAudioId = musicDataShuffled[indexAudio]._id
    indexAudioGender = musicDataShuffled[indexAudio].gender
    refreshFavorite()
    setMusicPlayTag()
    durationSliderEventGenerator()
    continueVideo()
}

let checkPlayerContinueInterval = null

function continueVideo() {
    if (!itsPlaying) return

    if (screenWidth >= 1360) {
        if (playerReady && itsPlaying) {
            player.seekTo(currentVideoTime)
            playVideo()
        } else {
            checkPlayerContinueInterval = setInterval(function () {
                if (playerReady && itsPlaying) {
                    clearInterval(checkPlayerContinueInterval)
                    continueVideo()
                }
                if (!itsPlaying) {
                    clearInterval(checkPlayerContinueInterval)
                }
            }, 200)
        }
    } else {
        if (playerReadyMobile && itsPlaying) {
            playerMobile.seekTo(currentVideoTime)
            playVideo()
        } else {
            checkPlayerContinueInterval = setInterval(function () {
                if (playerReadyMobile && itsPlaying) {
                    clearInterval(checkPlayerContinueInterval)
                    continueVideo()
                }
                if (!itsPlaying) {
                    clearInterval(checkPlayerContinueInterval)
                }
            }, 200)
        }
    }
}

function setManagementSystem() {
    if (userData.type == 'admin') {
        selectManagementSystem.classList.remove('hidden')
        selectManagementSystemMobile.classList.remove('hidden')
    }
    selectManagementSystem.addEventListener('click', () => {
        window.location = '/config'
    })
    selectManagementSystemMobile.addEventListener('click', () => {
        window.location = '/config'
    })
}

async function manageUserAccountChangeName() {
    if (screenWidth >= 1360) {
        if (changeNameInput.value.trim() === userData.name) {
            formChangeNameAccount.classList.add('hidden')
        }

        if (changeNameInput.value === '') {
            warning.classList.remove('hidden')
            warning.textContent = 'Por favor, escreva um nome válido.'
            changeNameInput.focus()
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            const userToChangeName = await fetch(`/users/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: changeNameInput.value.trim(),
                }),
            })
            const response = await userToChangeName.json()

            if (response.message === 'User updated successfully!') {
                await refreshUser()
                formChangeNameAccount.classList.add('hidden')
                setUserSettings()
            }
        }
    } else {
        if (changeNameInputMobile.value.trim() === userData.name) {
            formChangeNameAccountMobile.classList.add('hidden')
        }

        if (changeNameInputMobile.value.trim() === '') {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Por favor, escreva um nome válido.'
            changeNameInputMobile.focus()
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        } else {
            const userToChangeName = await fetch(`/users/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: changeNameInputMobile.value.trim(),
                }),
            })
            const response = await userToChangeName.json()

            if (response.message === 'User updated successfully!') {
                await refreshUser()
                formChangeNameAccountMobile.classList.add('hidden')
                setUserSettings()
            }
        }
    }
}

async function manageUserAccountDeletion() {
    if (screenWidth >= 1360) {
        if (
            deleteAccountInputToConfirm.value !==
            'Quero deletar minha conta e aceito as condições'
        ) {
            warning.classList.remove('hidden')
            warning.textContent = 'Por favor, escreva a frase corretamente.'
            deleteAccountInputToConfirm.focus()
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
            return
        }

        const userToDelete = await fetch(`/users/${userData._id}`, {
            method: 'DELETE',
        })
        const response = await userToDelete.json()

        if (response.message === 'User removed successfully!') {
            localStorage.clear()
            await logoutService()
        }
    } else {
        if (
            deleteAccountInputToConfirmMobile.value !==
            'Quero deletar minha conta e aceito as condições'
        ) {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent =
                'Por favor, escreva a frase corretamente.'
            deleteAccountInputToConfirmMobile.focus()
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
            return
        }

        const userToDelete = await fetch(`/users/${userData._id}`, {
            method: 'DELETE',
        })
        const response = await userToDelete.json()

        if (response.message === 'User removed successfully!') {
            localStorage.clear()
            await logoutService()
        }
    }
}

function manageMyPlaylistEdition() {
    if (screenWidth >= 1360) {
        const playlistTitle = document
            .querySelector(
                '.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name'
            )
            .value.trim()
        if (playlistTitle === '') {
            warning.classList.remove('hidden')
            warning.textContent =
                'Por favor, escreva o nome da playlist corretamente.'
            document
                .querySelector(
                    '.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name'
                )
                .focus()
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)

            return
        }

        const playlistExists = userData.myPlaylists.filter(
            (playlist) => playlist.title === playlistTitle
        )

        if (
            userData.myPlaylists.find(
                (playlist) =>
                    playlist.title === playlistTitle &&
                    playlist._id === indexMyPlaylistId
            )
        ) {
            toggleContainerMinhaPlaylist()
            toggleEditMinhaPlaylist()
            return
        }

        if (playlistExists.length >= 1) {
            warning.classList.remove('hidden')
            warning.textContent = 'Já existe uma playlist com esse nome.'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
            return
        }

        fetch(`/users-playlist/${userData._id}/${indexMyPlaylistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: document
                    .querySelector(
                        '.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name'
                    )
                    .value.trim(),
            }),
        }).then((response) => {
            if (response.status === 200) {
                if (indexMyPlaylistId === indexMyPlaylistIdCurrent) {
                    document.querySelector('.title-playlist').textContent =
                        document
                            .querySelector(
                                '.edit-my-new-playlist-overflow .edit-my-new-playlist-container .edit-my-new-playlist-name'
                            )
                            .value.trim()
                }

                toggleContainerMinhaPlaylist()
                toggleEditMinhaPlaylist()
                refreshUserWithNewPlaylist()
            } else {
                warning.classList.remove('hidden')
                warning.textContent = 'Internal Error!'

                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            }
        })
    } else {
        const playlistTitle = document
            .querySelector(
                '.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile .edit-my-new-playlist-name-mobile'
            )
            .value.trim()
        if (playlistTitle === '') {
            document
                .querySelector(
                    '.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile .edit-my-new-playlist-name-mobile'
                )
                .focus()
            warningMobile.classList.remove('hidden')
            warningMobile.textContent =
                'Por favor, escreva o nome da playlist corretamente.'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)

            return
        }

        const playlistExists = userData.myPlaylists.filter(
            (playlist) => playlist.title === playlistTitle
        )

        if (
            userData.myPlaylists.find(
                (playlist) =>
                    playlist.title === playlistTitle &&
                    playlist._id === indexMyPlaylistId
            )
        ) {
            toggleContainerMinhaPlaylist()
            toggleEditMinhaPlaylist()
            return
        }

        if (playlistExists.length >= 1) {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Já existe uma playlist com esse nome.'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)

            return
        }

        fetch(`/users-playlist/${userData._id}/${indexMyPlaylistId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: document
                    .querySelector(
                        '.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile .edit-my-new-playlist-name-mobile'
                    )
                    .value.trim(),
            }),
        }).then((response) => {
            if (response.status === 200) {
                if (indexMyPlaylistId === indexMyPlaylistIdCurrent) {
                    document.querySelector(
                        '.title-playlist-mobile'
                    ).textContent = document
                        .querySelector(
                            '.edit-my-new-playlist-overflow-mobile .edit-my-new-playlist-container-mobile .edit-my-new-playlist-name-mobile'
                        )
                        .value.trim()
                }

                toggleContainerMinhaPlaylist()
                toggleEditMinhaPlaylist()
                refreshUserWithNewPlaylist()
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Internal Error!'

                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
        })
    }
}

function manageMyPlaylistDeletion() {
    if (screenWidth >= 1360) {
        if (
            document.querySelector(
                '.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-name'
            ).value !==
            document.querySelector(
                '.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-current'
            ).textContent
        ) {
            document
                .querySelector(
                    '.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-name'
                )
                .focus()
            warning.classList.remove('hidden')
            warning.textContent =
                'Por favor, escreva o nome da playlist corretamente.'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)

            return
        }

        fetch(`/users-playlist/${userData._id}/${indexMyPlaylistId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                document.querySelector(
                    '.delete-my-new-playlist-overflow .delete-my-new-playlist-container .delete-my-new-playlist-name'
                ).value = ''
                toggleContainerMinhaPlaylist()
                toggleDeleteMinhaPlaylist()
                refreshUserWithNewPlaylist()
            } else {
                if (screenWidth >= 1360) {
                    warning.classList.remove('hidden')
                    warning.textContent = 'Internal Error!'

                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Internal Error!'

                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        })
    } else {
        if (
            document.querySelector(
                '.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-name-mobile'
            ).value !==
            document.querySelector(
                '.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-current-mobile'
            ).textContent
        ) {
            document
                .querySelector(
                    '.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-name-mobile'
                )
                .focus()
            warningMobile.classList.remove('hidden')
            warningMobile.textContent =
                'Por favor, escreva o nome da playlist corretamente.'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)

            return
        }

        fetch(`/users-playlist/${userData._id}/${indexMyPlaylistId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                document.querySelector(
                    '.delete-my-new-playlist-overflow-mobile .delete-my-new-playlist-container-mobile .delete-my-new-playlist-name-mobile'
                ).value = ''
                toggleContainerMinhaPlaylist()
                toggleDeleteMinhaPlaylist()
                refreshUserWithNewPlaylist()
            } else {
                if (screenWidth >= 1360) {
                    warning.classList.remove('hidden')
                    warning.textContent = 'Internal Error!'

                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Internal Error!'

                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        })
    }
}

function manageEmptyPlaylist(itsMyPlaylist = false) {
    if (!emptyPlaylist) return

    if (screenWidth >= 1360) {
        loadingRoller.classList.add('hidden')
        loadMore.classList.add('hidden')

        if (!document.querySelector('.empty-playlist')) {
            const emptyPlaylist = document.createElement('div')
            emptyPlaylist.className = 'empty-playlist'

            if (
                userData.lastAccessedPlaylist === 'Favorite' &&
                !itsMyPlaylist
            ) {
                emptyPlaylist.textContent = 'Sem músicas favoritas'
            } else {
                emptyPlaylist.textContent = 'Playlist vazia'
            }

            const lastChild = containerPlaylist.lastElementChild

            if (lastChild) {
                containerPlaylist.insertBefore(emptyPlaylist, lastChild)
            } else {
                containerPlaylist.appendChild(emptyPlaylist)
            }
        }
    } else {
        loadingRollerMobile.classList.add('hidden')
        loadMoreMobile.classList.add('hidden')

        if (!document.querySelector('.empty-playlist-mobile')) {
            const emptyPlaylistMobile = document.createElement('div')
            emptyPlaylistMobile.className = 'empty-playlist-mobile'

            if (
                userData.lastAccessedPlaylist === 'Favorite' &&
                !itsMyPlaylist
            ) {
                emptyPlaylistMobile.textContent = 'Sem músicas favoritas'
            } else {
                emptyPlaylistMobile.textContent = 'Playlist vazia'
            }

            const lastChild = containerPlaylistMobile.lastElementChild

            if (lastChild) {
                containerPlaylistMobile.insertBefore(
                    emptyPlaylistMobile,
                    lastChild
                )
            } else {
                containerPlaylistMobile.appendChild(emptyPlaylistMobile)
            }
        }
    }
}

function manageMyPlaylistMusicDeletion() {
    fetch(
        `/users-playlist-song/${userData._id}/${indexMyPlaylistId}/${indexMyPlaylistAudioId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    ).then((response) => {
        if (response.status === 200) {
            toggleContainerMinhaPlaylist()
            toggleMusicMinhaPlaylist()
            if (screenWidth >= 1360) {
                if (
                    document
                        .querySelector('.music-delete-my-new-playlist-overflow')
                        .classList.contains(
                            'music-delete-my-new-playlist-overflow'
                        )
                ) {
                    document
                        .querySelector('.music-delete-my-new-playlist-overflow')
                        .classList.add('hidden')
                }
            } else {
                if (
                    document
                        .querySelector(
                            '.music-delete-my-new-playlist-overflow-mobile'
                        )
                        .classList.contains(
                            'music-delete-my-new-playlist-overflow-mobile'
                        )
                ) {
                    document
                        .querySelector(
                            '.music-delete-my-new-playlist-overflow-mobile'
                        )
                        .classList.add('hidden')
                }
            }

            refreshUserWithNewPlaylist()
        } else {
            if (screenWidth >= 1360) {
                warning.classList.remove('hidden')
                warning.textContent = 'Internal Error!'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Internal Error!'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
        }
    })
}

async function manageUserProfilePicture() {
    if (screenWidth >= 1360) {
        if (
            userData.profilePicture === '' &&
            profilePictureInput.value.trim() === ''
        ) {
            layerProfilePicture.classList.add('hidden')
            canKeyboardEventsProfile = true
            return
        }

        const resposta = await fetch(`/users-profile-picture/${userData._id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profilePicture: profilePictureInput.value.trim(),
            }),
        })

        if (resposta.status != 200) {
            if (screenWidth >= 1360) {
                warning.classList.remove('hidden')
                warning.textContent = 'Internal Error!'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Internal Error!'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }

        layerProfilePicture.classList.add('hidden')
        await refreshFavorite()
        await refreshUser()
        profilePictureInput.value = userData.profilePicture
        canKeyboardEventsProfile = true
        setUserProfilePicture()
    } else {
        if (
            userData.profilePicture === '' &&
            profilePictureInputMobile.value.trim() === ''
        ) {
            layerProfilePictureMobile.classList.add('hidden')
            return
        }

        const resposta = await fetch(`/users-profile-picture/${userData._id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                profilePicture: profilePictureInputMobile.value.trim(),
            }),
        })

        if (resposta.status != 200) {
            if (screenWidth >= 1360) {
                warning.classList.remove('hidden')
                warning.textContent = 'Internal Error!'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent = 'Internal Error!'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }

        layerProfilePictureMobile.classList.add('hidden')
        await refreshFavorite()
        await refreshUser()
        profilePictureInputMobile.value = userData.profilePicture
        setUserProfilePicture()
    }
}

function setUserProfilePicture() {
    if (screenWidth >= 1360) {
        if (userData.profilePicture == '') {
            document
                .querySelector('#userSettingsPersonIcon')
                .classList.remove('hidden')
            document
                .querySelector('#userSettingsPersonContainer')
                .classList.add('hidden')
            document.querySelector('#userPersonIcon').classList.remove('hidden')
            document
                .querySelector('#userPersonContainer')
                .classList.add('hidden')
        } else {
            document
                .querySelector('#userSettingsPersonIcon')
                .classList.add('hidden')
            document
                .querySelector('#userSettingsPersonContainer')
                .classList.remove('hidden')
            document.querySelector('#userSettingsPersonImg').src =
                userData.profilePicture
            document.querySelector('#userSettingsPersonImg').alt =
                'Foto de perfil do usuário'
            document.querySelector('#userPersonIcon').classList.add('hidden')
            document
                .querySelector('#userPersonContainer')
                .classList.remove('hidden')
            document.querySelector('#userPersonImg').src =
                userData.profilePicture
            document.querySelector('#userPersonImg').alt =
                'Foto de perfil do usuário'
            profilePictureInput.value = userData.profilePicture
        }
    } else {
        if (userData.profilePicture == '') {
            document
                .querySelector('#userSettingsPersonIconMobile')
                .classList.remove('hidden')
            document
                .querySelector('#userSettingsPersonContainerMobile')
                .classList.add('hidden')
            document
                .querySelector('#userPersonIconMobile')
                .classList.remove('hidden')
            document
                .querySelector('#userPersonContainerMobile')
                .classList.add('hidden')
        } else {
            document
                .querySelector('#userSettingsPersonIconMobile')
                .classList.add('hidden')
            document
                .querySelector('#userSettingsPersonContainerMobile')
                .classList.remove('hidden')
            document.querySelector('#userSettingsPersonImgMobile').src =
                userData.profilePicture
            document.querySelector('#userSettingsPersonImgMobile').alt =
                'Foto de perfil do usuário'
            document
                .querySelector('#userPersonIconMobile')
                .classList.add('hidden')
            document
                .querySelector('#userPersonContainerMobile')
                .classList.remove('hidden')
            document.querySelector('#userPersonImgMobile').src =
                userData.profilePicture
            document.querySelector('#userPersonImgMobile').alt =
                'Foto de perfil do usuário'
            profilePictureInputMobile.value = userData.profilePicture
        }
    }
}

async function manageUserCreatePlaylist() {
    if (screenWidth >= 1360) {
        const newPlaylistName = document
            .querySelector('.add-my-new-playlist-name')
            .value.trim()

        if (newPlaylistName === '') {
            document.querySelector('.add-my-new-playlist-name').focus()

            if (screenWidth >= 1360) {
                warning.classList.remove('hidden')
                warning.textContent =
                    'Por favor, digite um nome para a playlist.'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent =
                    'Por favor, digite um nome para a playlist.'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }

        for (let i = 0; i < userData.myPlaylists.length; i++) {
            if (userData.myPlaylists[i].title === newPlaylistName) {
                document.querySelector('.add-my-new-playlist-name').focus()

                if (screenWidth >= 1360) {
                    warning.classList.remove('hidden')
                    warning.textContent =
                        'Já existe uma playlist com esse nome.'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent =
                        'Já existe uma playlist com esse nome.'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
                return
            }
        }

        try {
            const response = await fetch(`/users-playlist/${userData._id}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newPlaylistName }),
            })

            if (response.status === 201) {
                canKeyboardEvents = true
                if (screenWidth >= 1360) {
                    warning.classList.remove('hidden')
                    warning.classList.add('success')
                    warning.textContent = 'Playlist criada com sucesso!'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warning.classList.remove('success')
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.classList.add('success')
                    warningMobile.textContent = 'Playlist criada com sucesso!'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warningMobile.classList.remove('success')
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }

                await refreshUserWithNewPlaylist()
                document.querySelector('.add-my-new-playlist-name').value = ''
                toggleAddMinhaPlaylist()
            } else {
                if (screenWidth >= 1360) {
                    warning.classList.remove('hidden')
                    warning.textContent = 'Erro ao criar a playlist.'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Erro ao criar a playlist.'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        } catch (error) {
            console.error(error)
        }
    } else {
        const newPlaylistName = document
            .querySelector('.add-my-new-playlist-name-mobile')
            .value.trim()

        if (newPlaylistName === '') {
            document.querySelector('.add-my-new-playlist-name-mobile').focus()

            if (screenWidth >= 1360) {
                warning.classList.remove('hidden')
                warning.textContent =
                    'Por favor, digite um nome para a playlist.'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warning.classList.add('hidden')
                }, 3000)
            } else {
                warningMobile.classList.remove('hidden')
                warningMobile.textContent =
                    'Por favor, digite um nome para a playlist.'
                if (timerAlertMessage != null) {
                    clearTimeout(timerAlertMessage)
                    timerAlertMessage = null
                }
                timerAlertMessage = setTimeout(() => {
                    warningMobile.classList.add('hidden')
                }, 3000)
            }
            return
        }

        for (let i = 0; i < userData.myPlaylists.length; i++) {
            if (userData.myPlaylists[i].title === newPlaylistName) {
                document
                    .querySelector('.add-my-new-playlist-name-mobile')
                    .focus()

                if (screenWidth >= 1360) {
                    warning.classList.remove('hidden')
                    warning.textContent =
                        'Já existe uma playlist com esse nome.'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent =
                        'Já existe uma playlist com esse nome.'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
                return
            }
        }

        try {
            const response = await fetch(`/users-playlist/${userData._id}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newPlaylistName }),
            })

            if (response.status === 201) {
                canKeyboardEvents = true
                if (screenWidth >= 1360) {
                    warning.classList.remove('hidden')
                    warning.classList.add('success')
                    warning.textContent = 'Playlist criada com sucesso!'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warning.classList.remove('success')
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.classList.add('success')
                    warningMobile.textContent = 'Playlist criada com sucesso!'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warningMobile.classList.remove('success')
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }

                await refreshUserWithNewPlaylist()
                document.querySelector(
                    '.add-my-new-playlist-name-mobile'
                ).value = ''
                toggleAddMinhaPlaylist()
            } else {
                if (screenWidth >= 1360) {
                    warning.classList.remove('hidden')
                    warning.textContent = 'Erro ao criar a playlist.'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warning.classList.add('hidden')
                    }, 3000)
                } else {
                    warningMobile.classList.remove('hidden')
                    warningMobile.textContent = 'Erro ao criar a playlist.'
                    if (timerAlertMessage != null) {
                        clearTimeout(timerAlertMessage)
                        timerAlertMessage = null
                    }
                    timerAlertMessage = setTimeout(() => {
                        warningMobile.classList.add('hidden')
                    }, 3000)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
}

async function selectUserMyPlaylist() {
    indexMyPlaylistIdCurrent = indexMyPlaylistId

    const playlist = userData.myPlaylists.find(
        (item) => item._id === indexMyPlaylistId
    )
    const matchingSongs = allMusicData
        .filter((song) =>
            playlist.songs.map((item) => item.musicId).includes(song._id)
        )
        .sort((a, b) => a.title.localeCompare(b.title))

    if (screenWidth >= 1360) {
        $('.title-playlist').html(playlist.title)
    } else {
        $('.title-playlist-mobile').html(playlist.title)
    }

    musicData = matchingSongs
    musicDataShuffled = [...musicData]

    if (screenWidth >= 1360) {
        containerItemsSearch.innerHTML = ''
        containerItemsFavorite.innerHTML = ''
        containerItemsHistoric.innerHTML = ''
    } else {
        containerItemsSearchMobile.innerHTML = ''
        containerItemsFavoriteMobile.innerHTML = ''
        containerItemsHistoricMobile.innerHTML = ''
    }

    indexAudio = 0

    if (screenWidth >= 1360) {
        shuffleIcon.classList.remove('active')
    } else {
        shuffleIconMobile.classList.remove('active')
    }
    shuffleToggleControl = true

    allSongValueSetters()
    indexAudio = 0
    indexPage = 0
    clearPlaylistData()
    generatorContainerPlaylistData()
    generatorContainerPlaylistDataPlay()
    generatorContainerSearchData()
    generatorContainerSearchDataPlay()
    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
    generatorContainerHistoricData()
    generatorContainerHistoricDataPlay()

    indexAudioId = musicDataShuffled[indexAudio]?._id
    indexAudioGender = musicDataShuffled[indexAudio]?.gender
    setMusicPlayTag()
    refreshFavorite()
    manageHistoric()
    await refreshUserWithNewPlaylist()
    manageEmptyPlaylist(true)
    setManagementSystem()
}

async function selectNewPlaylist(playlistSelect, playlistName) {
    emptyPlaylist = true
    clearPlaylistData()

    const idUserConnected = getCookie('user')
    let playlistSelectForSend = {
        lastAccessedPlaylist: playlistSelect,
        lastAccessedPlaylistName: playlistName,
    }

    if (screenWidth >= 1360) {
        $('.title-playlist').html(playlistName)

        loadingRoller.classList.remove('hidden')
        loadMore.classList.add('hidden')
        document.querySelector('.empty-playlist')?.remove()

        stopAnimationAudioControllerPlay()

        if (player) {
            destroyPlayer()
            clearInterval(timerSyncSliderVolume)
            timerSyncSliderVolume = null
        }

        titleCurrentMusic.innerHTML = 'Carregando...'
        genderCurrentMusic.innerHTML = 'Carregando...'
        coverCurrentMusic.src =
            'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
        backgroundCover.style.backgroundImage = `url('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')`
        clearInterval(timerCurretDurationSetter)
    } else {
        $('.title-playlist-mobile').html(playlistName)

        loadingRollerMobile.classList.remove('hidden')
        loadMoreMobile.classList.add('hidden')
        document.querySelector('.empty-playlist-mobile')?.remove()

        stopAnimationAudioControllerPlay()

        if (playerMobile) {
            destroyPlayer()
        }

        titleCurrentMusicMobile.innerHTML = 'Carregando...'
        genderCurrentMusicMobile.innerHTML = 'Carregando...'
        coverCurrentMusicMobile.src =
            'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
        backgroundCoverMobile.style.backgroundImage = `url('https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg')`
    }

    const resposta = await fetch(`/playlists-historic/${idUserConnected}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playlistSelectForSend),
    })
    if (resposta.status != 200) {
        if (screenWidth >= 1360) {
            warning.classList.remove('hidden')
            warning.textContent = 'Internal Error!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warning.classList.add('hidden')
            }, 3000)
        } else {
            warningMobile.classList.remove('hidden')
            warningMobile.textContent = 'Internal Error!'
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                warningMobile.classList.add('hidden')
            }, 3000)
        }
    }

    const responsePlaylist = await fetch(
        `/playlists-select/${idUserConnected}/?playlist=${playlistSelect}`
    )
    const playlist = await responsePlaylist.json()

    musicData = playlist.songs
    musicDataShuffled = [...musicData]

    if (screenWidth >= 1360) {
        containerItemsSearch.innerHTML = ''
        containerItemsFavorite.innerHTML = ''
        containerItemsHistoric.innerHTML = ''
    } else {
        containerItemsSearchMobile.innerHTML = ''
        containerItemsFavoriteMobile.innerHTML = ''
        containerItemsHistoricMobile.innerHTML = ''
    }

    indexAudio = 0
    indexPage = 0

    if (screenWidth >= 1360) {
        shuffleIcon.classList.remove('active')
    } else {
        shuffleIconMobile.classList.remove('active')
    }
    shuffleToggleControl = true

    allSongValueSetters()
    generatorContainerPlaylistData()
    generatorContainerPlaylistDataPlay()
    generatorContainerSearchData()
    generatorContainerSearchDataPlay()
    generatorContainerFavoriteData()
    generatorContainerFavoriteDataPlay()
    generatorContainerHistoricData()
    generatorContainerHistoricDataPlay()

    indexAudioId = musicDataShuffled[indexAudio]?._id
    indexAudioGender = musicDataShuffled[indexAudio]?.gender
    setMusicPlayTag()
    refreshFavorite()
    manageHistoric()
    await refreshUserWithNewPlaylist()
    manageEmptyPlaylist()
    setManagementSystem()
}

function clearPlaylistData() {
    if (screenWidth >= 1360) {
        const itemPlaylist = document.querySelectorAll(
            '.container-playlist .item-playlist'
        )
        itemPlaylist.forEach((item) => {
            item.remove()
        })
    } else {
        const itemPlaylistMobile = document.querySelectorAll(
            '.container-playlist-mobile .item-playlist-mobile'
        )
        itemPlaylistMobile.forEach((item) => {
            item.remove()
        })
    }
}

function onYouTubeIframeAPIReady(videoId) {
    if (screenWidth >= 1360) {
        stopAnimationAudioControllerPlay()

        if (player) {
            destroyPlayer()
            clearInterval(timerSyncSliderVolume)
            timerSyncSliderVolume = null
        }

        player = new YT.Player('containerFrame', {
            height: '360',
            width: '640',
            videoId: videoId,
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        })
    } else {
        stopAnimationAudioControllerPlay()

        if (playerMobile) {
            destroyPlayer()
        }

        playerMobile = new YT.Player('containerFrameMobile', {
            height: '360',
            width: '640',
            videoId: videoId,
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        })
    }
}

function onPlayerReady(event) {
    if (screenWidth >= 1360) {
        playerReady = true
    } else {
        playerReadyMobile = true
    }
}

function playVideo() {
    if (screenWidth >= 1360) {
        if (playerReady) {
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                if (
                    playerReady &&
                    player.getPlayerState() !== YT.PlayerState.PLAYING
                ) {
                    player.playVideo()

                    if (getFullScreenStorage()) {
                        enterFullScreen(
                            document.querySelector('#containerFrame')
                        )
                    }

                    setVolumeStorage(sliderMusicVolume.value)
                }
            }, 200)
        } else {
            var checkPlayerInterval = setInterval(function () {
                if (playerReady) {
                    clearInterval(checkPlayerInterval)
                    playVideo()
                }
            }, 200)
        }
    } else {
        if (playerReadyMobile) {
            if (timerAlertMessage != null) {
                clearTimeout(timerAlertMessage)
                timerAlertMessage = null
            }
            timerAlertMessage = setTimeout(() => {
                if (
                    playerReadyMobile &&
                    playerMobile.getPlayerState() !== YT.PlayerState.PLAYING
                ) {
                    playerMobile.playVideo()

                    if (getFullScreenStorage()) {
                        enterFullScreen(
                            document.querySelector('#containerFrameMobile')
                        )
                    }
                }
            }, 200)
        } else {
            var checkPlayerInterval = setInterval(function () {
                if (playerReadyMobile) {
                    clearInterval(checkPlayerInterval)
                    playVideo()
                }
            }, 200)
        }
    }
}

function pauseVideo() {
    if (screenWidth >= 1360) {
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            if (
                playerReady &&
                player.getPlayerState() === YT.PlayerState.PLAYING
            ) {
                player.pauseVideo()
            }
        }, 200)
    } else {
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            if (
                playerReadyMobile &&
                playerMobile.getPlayerState() === YT.PlayerState.PLAYING
            ) {
                playerMobile.pauseVideo()
            }
        }, 200)
    }
}

let timerCurretDurationSetter = null

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        if (screenWidth >= 1360) {
            if (!repeatToggleControl) {
                musicAnimationStatus.classList.remove('run')
                audioControllerPlayFunctionNoPause()
            } else {
                audioControllerNextFunction()
            }
        } else {
            if (!repeatToggleControl) {
                audioControllerPlayFunctionNoPause()
            } else {
                audioControllerNextFunction()
            }
        }
    }

    if (event.data === YT.PlayerState.PLAYING) {
        setVideoVolume(getVolumeStorage())
        checkAndUnmute()
        totalDurationSetter()
        startAnimationAudioControllerPlay()
        clearInterval(timerSyncSliderVolume)
        timerSyncSliderVolume = null
        timerSyncSliderVolume = setInterval(syncSliderVolume, 1000)
        clearInterval(timerCurretDurationSetter)
        timerCurretDurationSetter = null
        timerCurretDurationSetter = setInterval(curretDurationSetter, 1000)
    }

    if (event.data === YT.PlayerState.PAUSED) {
        stopAnimationAudioControllerPlay()
        clearInterval(timerCurretDurationSetter)
        timerCurretDurationSetter = null
    }
}

function setVideoVolume(volume) {
    if (screenWidth >= 1360) {
        if (playerReady) {
            if (volume >= 0 && volume <= 100) {
                player.setVolume(volume)

                if (player.isMuted()) {
                    player.unMute()
                }
            }
        }
    } else {
        if (playerReadyMobile) {
            playerMobile.setVolume(100)
        }
    }
}

let timerSyncSliderVolume = null

function syncSliderVolume() {
    if (playerReady) {
        sliderMusicVolume.value = getVideoVolume()
        setSliderMusicVolume()
        setVolumeIcon()
        setVolumeStorage(sliderMusicVolume.value)
    }
}

function getVolumeStorage() {
    return localStorage.getItem('volume') || sliderMusicVolume.value || 60
}

function setVolumeStorage(volume) {
    localStorage.setItem('volume', volume)
}

function getFullScreenStorage() {
    const fullScreen =
        localStorage.getItem('fullScreen') == 'true' ? true : false

    return fullScreen
}

function setFullScreenStorage(fullScreen) {
    localStorage.setItem('fullScreen', fullScreen)
}

function getVideoVolume() {
    if (playerReady) {
        if (player?.getVolume) {
            return player.getVolume()
        }
    }
}

function getVideoDuration() {
    if (screenWidth >= 1360) {
        if (playerReady) {
            return player.getDuration()
        }
    } else {
        if (playerReadyMobile) {
            return playerMobile.getDuration()
        }
    }
}

function totalDurationSetter() {
    let minTotal = Math.floor(getVideoDuration() / 60)
    let segTotal = Math.floor(getVideoDuration() % 60)

    if (segTotal < 10) {
        segTotal = `0${segTotal}`
    }

    if (screenWidth >= 1360) {
        totalDuration.innerHTML = `${minTotal}:${segTotal}`
    } else {
        totalDurationMobile.innerHTML = `${minTotal}:${segTotal}`
    }
}

function getVideoCurrentTime() {
    if (screenWidth >= 1360) {
        if (playerReady) {
            return player.getCurrentTime()
        } else {
            return 0
        }
    } else {
        if (playerReadyMobile) {
            return playerMobile.getCurrentTime()
        } else {
            return 0
        }
    }
}

function curretDurationSetter() {
    if (screenWidth >= 1360) {
        if (canMoveTheSliderDuration) {
            sliderMusicDuration.value = parseInt(
                (getVideoCurrentTime() / getVideoDuration()) * 100
            )
            sliderMusicDuration.style.setProperty(
                'background-image',
                `linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) ${sliderMusicDuration.value}%, var(--color-white-1) ${sliderMusicDuration.value}%, var(--color-white-1) 100%`
            )
            sliderMusicDurationDot.style.setProperty(
                'left',
                `${sliderMusicDuration.value}%`
            )

            let minCurrent = Math.floor(getVideoCurrentTime() / 60)
            let segCurrent = Math.floor(getVideoCurrentTime() % 60)

            if (segCurrent < 10) {
                segCurrent = `0${segCurrent}`
            }

            if (isNaN(minCurrent) || isNaN(segCurrent)) {
                minCurrent = 0
                segCurrent = '00'
            }

            currentDuration.innerHTML = `${minCurrent}:${segCurrent}`
        }
    } else {
        if (canMoveTheSliderDuration) {
            sliderMusicDurationMobile.value = parseInt(
                (getVideoCurrentTime() / getVideoDuration()) * 100
            )
            sliderMusicDurationMobile.style.setProperty(
                'background-image',
                `linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`
            )
            displayMusicDurationMobile.style.setProperty(
                'background-image',
                `linear-gradient(to right, var(--color-base-2) 0%, var(--color-base-2) ${sliderMusicDurationMobile.value}%, var(--color-white-1) ${sliderMusicDurationMobile.value}%, var(--color-white-1) 100%`
            )
            sliderMusicDurationDotMobile.style.setProperty(
                'left',
                `${sliderMusicDurationMobile.value}%`
            )

            let minCurrent = Math.floor(getVideoCurrentTime() / 60)
            let segCurrent = Math.floor(getVideoCurrentTime() % 60)

            if (segCurrent < 10) {
                segCurrent = `0${segCurrent}`
            }

            if (isNaN(minCurrent) || isNaN(segCurrent)) {
                minCurrent = 0
                segCurrent = '00'
            }

            currentDurationMobile.innerHTML = `${minCurrent}:${segCurrent}`
        }
    }
}

function checkAndUnmute() {
    if (screenWidth >= 1360) {
        if (playerReady && player.isMuted()) {
            player.unMute()
        }
    } else {
        if (playerReadyMobile && playerMobile.isMuted()) {
            playerMobile.unMute()
        }
    }
}

function changeVideoCurrentTime(time) {
    if (screenWidth >= 1360) {
        if (playerReady) {
            player.seekTo(time, true)
            playVideo()
        }
    } else {
        if (playerReadyMobile) {
            playerMobile.seekTo(time, true)
            playVideo()
        }
    }
}

function enterFullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
    }
}

function destroyPlayer() {
    if (screenWidth >= 1360) {
        if (player) {
            player.destroy()
        }
    } else {
        if (playerMobile) {
            playerMobile.destroy()
        }
    }
}

async function musicListingService() {
    const idUserConnected = getCookie('user')

    const responseUser = await fetch(`/users/${idUserConnected}`)
    const user = await responseUser.json()

    userData = user.user
    userData.myPlaylists.reverse()

    const responsePlaylists = await fetch(`/playlists/${idUserConnected}`)
    const playlists = await responsePlaylists.json()

    const responseSongs = await fetch(
        `/playlists-select/${idUserConnected}/?playlist=${userData.lastAccessedPlaylist}`
    )
    const songs = await responseSongs.json()

    if (songs.songs.length > 0) emptyPlaylist = false

    const responseAllSongs = await fetch('/songs')
    const allSongs = await responseAllSongs.json()

    allMusicData = allSongs.songs
    musicData = songs.songs
    playlistData = playlists.playlists

    musicDataShuffled = [...musicData]

    inicia()
}

musicListingService()
