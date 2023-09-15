const containerPlaylistToManage = document.querySelector(
    '#containerPlaylistToManage'
)
const focusSong = document.querySelector('#focusSong')

const playlistItems = document.querySelectorAll(
    '.content-playlist .playlist-item'
)
const songItems = document.querySelectorAll(
    '.container-playlist-to-manage-overflow .container-playlist-to-manage .content-songs .songs-item'
)

const playlistToManageBack = document.querySelector('#playlistToManageBack')

const btnAddSong = document.querySelector('#btnAddSong')
const btnAddSongMobile = document.querySelector('#btnAddSongMobile')
const btnAddPlaylist = document.querySelector('#btnAddPlaylist')
const btnEditPlaylist = document.querySelector('#btnEditPlaylist')
const btnEditSong = document.querySelector('#btnEditSong')
const btnDeletePlaylist = document.querySelector('#btnDeletePlaylist')
const btnDeleteSong = document.querySelector('#btnDeleteSong')

const formAddPlaylist = document.querySelector('#formAddPlaylist')
const formEditPlaylist = document.querySelector('#formEditPlaylist')
const formEditSong = document.querySelector('#formEditSong')
const formDeletePlaylist = document.querySelector('#formDeletePlaylist')
const formDeleteSong = document.querySelector('#formDeleteSong')

const formAddSong = document.querySelector('#formAddSong')

const formSongCancel = document.querySelector('#formSongCancel')
const formPlaylistCancel = document.querySelector('#formPlaylistCancel')

playlistItems.forEach((item) => {
    item.addEventListener('click', () => {
        containerPlaylistToManage.classList.remove('hidden')
    })
})
songItems.forEach((item) => {
    item.addEventListener('click', () => {
        focusSong.classList.remove('hidden')
    })
})

playlistToManageBack.addEventListener('click', () => {
    containerPlaylistToManage.classList.add('hidden')
})
btnAddSong.addEventListener('click', () => {
    formAddSong.classList.remove('hidden')
})
btnAddSongMobile.addEventListener('click', () => {
    formAddSong.classList.remove('hidden')
})
btnAddPlaylist.addEventListener('click', () => {
    formAddPlaylist.classList.remove('hidden')
    console.log('object')
})
btnEditPlaylist.addEventListener('click', () => {
    formEditPlaylist.classList.remove('hidden')
})
btnEditSong.addEventListener('click', () => {
    formEditSong.classList.remove('hidden')
})
btnDeletePlaylist.addEventListener('click', () => {
    formDeletePlaylist.classList.remove('hidden')
})
btnDeleteSong.addEventListener('click', () => {
    formDeleteSong.classList.remove('hidden')
})

formAddPlaylist.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-playlist-overflow') {
        formAddPlaylist.classList.add('hidden')
    }
})
formAddSong.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-song-overflow') {
        formAddSong.classList.add('hidden')
    }
})
formEditPlaylist.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-playlist-overflow') {
        formEditPlaylist.classList.add('hidden')
    }
})
formEditSong.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-song-overflow') {
        formEditSong.classList.add('hidden')
    }
})
formDeletePlaylist.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-playlist-delete-overflow') {
        formDeletePlaylist.classList.add('hidden')
    }
})
formPlaylistCancel.addEventListener('click', () => {
    formDeletePlaylist.classList.add('hidden')
})
formDeleteSong.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'form-song-delete-overflow') {
        formDeleteSong.classList.add('hidden')
    }
})
formSongCancel.addEventListener('click', () => {
    formDeleteSong.classList.add('hidden')
})

focusSong.addEventListener('click', (e) => {
    if (e.target.classList[0] == 'focus') {
        focusSong.classList.add('hidden')
    }
})
