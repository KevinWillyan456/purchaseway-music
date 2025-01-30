let data = {
    playlists: [],
    songs: [],
}
let changedData = {
    playlistName: null,
    songId: null,
    playlistId: null,
    previousThumbnail: null,
}
let userData

let timerAlertMessage = null

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

const MAX_LENGTH_TITLE_PLAYLIST = 50

const containerPlaylistToManage = document.querySelector(
    '#containerPlaylistToManage',
)
const focusSong = document.querySelector('#focusSong')

const playlistItems = document.querySelectorAll(
    '.content-playlist .playlist-item',
)
const songItems = document.querySelectorAll(
    '.container-playlist-to-manage-overflow .container-playlist-to-manage .content-songs .songs-item',
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

const formSongDeleteBtn = document.querySelector('#formSongDeleteBtn')
const formDeletePlaylistContent = document.querySelector(
    '#formDeletePlaylistContent',
)

const totalPlaylists = document.querySelector('#totalPlaylists')
const totalMusics = document.querySelector('#totalMusics')
const contentPlaylist = document.querySelector('#contentPlaylist')
const contentSongs = document.querySelector('#contentSongs')

const playlistDeleteNameInputToConfirm = document.querySelector(
    '#playlistDeleteNameInputToConfirm',
)

const warning = document.querySelector('#warning')

const scrollTop = document.querySelector('#scrollTop')
const HEIGHT_TO_SHOW_SCROLL_TOP = 300

const searchPlaylist = document.querySelector('#searchPlaylist')
const clearSearchPlaylist = document.querySelector('#clearSearchPlaylist')
const blankPlaylist = document.querySelector('#blankPlaylist')

const searchSong = document.querySelector('#searchSong')
const clearSearchSong = document.querySelector('#clearSearchSong')
const blankSong = document.querySelector('#blankSong')

searchPlaylist.addEventListener('input', () => {
    if (searchPlaylist.value.trim() === '') {
        clearSearchPlaylist.classList.add('hidden')
    } else {
        clearSearchPlaylist.classList.remove('hidden')
    }

    const playlists = document.querySelectorAll('.playlist-item')

    playlists.forEach((playlist) => {
        if (
            playlist
                .querySelector('.item-title')
                .textContent.toLowerCase()
                .includes(searchPlaylist.value.trim().toLowerCase())
        ) {
            playlist.classList.remove('hidden')
        } else {
            playlist.classList.add('hidden')
        }
    })

    const hiddenPlaylists = document.querySelectorAll('.playlist-item.hidden')

    if (playlists.length === hiddenPlaylists.length && playlists.length > 0) {
        blankPlaylist.classList.remove('hidden')
    } else {
        blankPlaylist.classList.add('hidden')
    }
})

clearSearchPlaylist.addEventListener('click', () => {
    searchPlaylist.value = ''
    clearSearchPlaylist.classList.add('hidden')

    const playlists = document.querySelectorAll('.playlist-item')

    playlists.forEach((playlist) => {
        playlist.classList.remove('hidden')
    })

    blankPlaylist.classList.add('hidden')
})

searchSong.addEventListener('input', () => {
    if (searchSong.value.trim() === '') {
        clearSearchSong.classList.add('hidden')
    } else {
        clearSearchSong.classList.remove('hidden')
    }

    const songs = document.querySelectorAll('.songs-item')

    songs.forEach((song) => {
        if (
            song
                .querySelector('.item-title')
                .textContent.toLowerCase()
                .includes(searchSong.value.trim().toLowerCase())
        ) {
            song.classList.remove('hidden')
        } else {
            song.classList.add('hidden')
        }
    })

    const hiddenSongs = document.querySelectorAll('.songs-item.hidden')

    if (songs.length === hiddenSongs.length && songs.length > 0) {
        blankSong.classList.remove('hidden')
    } else {
        blankSong.classList.add('hidden')
    }
})

clearSearchSong.addEventListener('click', () => {
    searchSong.value = ''
    clearSearchSong.classList.add('hidden')

    const songs = document.querySelectorAll('.songs-item')

    songs.forEach((song) => {
        song.classList.remove('hidden')
    })

    blankSong.classList.add('hidden')
})

scrollTop.addEventListener('click', () => {
    if (
        document
            .querySelector('.container-playlist-to-manage-overflow')
            .classList.contains('hidden')
    ) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
        document
            .querySelector('.container-playlist-to-manage-overflow')
            .scrollTo({
                top: 0,
                behavior: 'smooth',
            })
    }
})

window.addEventListener('scroll', manageScrollTop)
document
    .querySelector('.container-playlist-to-manage-overflow')
    .addEventListener('scroll', manageScrollTop)

function manageScrollTop() {
    if (
        document
            .querySelector('.container-playlist-to-manage-overflow')
            .classList.contains('hidden')
    ) {
        if (window.scrollY > HEIGHT_TO_SHOW_SCROLL_TOP) {
            scrollTop.classList.remove('hidden')
        } else {
            scrollTop.classList.add('hidden')
        }
    } else {
        if (
            document.querySelector('.container-playlist-to-manage-overflow')
                .scrollTop > HEIGHT_TO_SHOW_SCROLL_TOP
        ) {
            scrollTop.classList.remove('hidden')
        } else {
            scrollTop.classList.add('hidden')
        }
    }
}

playlistDeleteNameInputToConfirm.addEventListener('paste', (e) => {
    e.preventDefault()
})

async function dataFetch() {
    const response = await fetch(`/songs-playlists/${getCookie('user')}`)

    const jsonResponse = await response.json()

    data.playlists = jsonResponse.playlists
    data.songs = jsonResponse.songs
}

function defineTotalNumbers() {
    totalPlaylists.textContent = data.playlists.length
    totalMusics.textContent = data.songs.length
}

const formEditPlaylistIn = document.querySelector('#formEditPlaylistIn')

const formPlaylistEditInputNome = document.querySelector(
    '#formPlaylistEditInputNome',
)
const formPlaylistEditInputGender = document.querySelector(
    '#formPlaylistEditInputGender',
)
const formPlaylistEditInputThumbnail = document.querySelector(
    '#formPlaylistEditInputThumbnail',
)
const formPlaylistEditPreviewThumbnail = document.querySelector(
    '#formPlaylistEditPreviewThumbnail',
)
const formPlaylistEditDescription = document.querySelector(
    '#formPlaylistEditDescription',
)

function listPlaylists() {
    contentPlaylist.innerHTML = ''

    data.playlists.forEach((playlist, index) => {
        let contador = 0
        let musicsByPlaylist = []

        for (let playlist_music of data.songs) {
            if (playlist_music.gender === playlist.gender) {
                musicsByPlaylist.push(playlist_music)
                contador++
            }
        }

        let divPlaylistItem = document.createElement('div')
        divPlaylistItem.classList.add('playlist-item')
        divPlaylistItem.style.animationDelay = `${index * 0.05}s`
        divPlaylistItem.addEventListener('click', () => {
            containerPlaylistToManage.classList.remove('hidden')
            document.body.style.overflow = 'hidden'
            listMusic(musicsByPlaylist, playlist)
            changedData.playlistName = playlist.gender
            changedData.playlistId = playlist._id

            formPlaylistEditInputNome.value = playlist.title
            formPlaylistEditInputGender.value = playlist.gender
            formPlaylistEditInputThumbnail.value = playlist.coverUrl
            formPlaylistEditPreviewThumbnail.src = playlist.coverUrl
            formPlaylistEditDescription.value = playlist.description

            document.querySelector('#playlistDeleteName').textContent =
                playlist.title
            searchSong.value = ''
            blankSong.classList.add('hidden')
            generateChartSongs(playlist.gender)
        })

        let divItemCover = document.createElement('div')
        divItemCover.classList.add('item-cover')

        let imgCover = document.createElement('img')
        imgCover.src = playlist.coverUrl

        let divItemTitle = document.createElement('div')
        divItemTitle.classList.add('item-title')
        divItemTitle.textContent = playlist.title

        let divPart = document.createElement('div')
        divPart.classList.add('part')

        let divTotalDeMusicasText = document.createElement('div')
        divTotalDeMusicasText.classList.add('item-total-de-musicas-text')
        divTotalDeMusicasText.textContent = 'Total de Músicas'

        let divTotalDeMusicasTextM = document.createElement('div')
        divTotalDeMusicasTextM.classList.add('item-total-de-musicas-text-m')
        divTotalDeMusicasTextM.textContent = 'TM'

        let divTotalDeMusicas = document.createElement('div')
        divTotalDeMusicas.classList.add('item-total-de-musicas')
        divTotalDeMusicas.textContent = contador

        divItemCover.appendChild(imgCover)
        divPart.appendChild(divTotalDeMusicasText)
        divPart.appendChild(divTotalDeMusicasTextM)
        divPart.appendChild(divTotalDeMusicas)

        divPlaylistItem.appendChild(divItemCover)
        divPlaylistItem.appendChild(divItemTitle)
        divPlaylistItem.appendChild(divPart)

        contentPlaylist.appendChild(divPlaylistItem)
    })

    if (data.playlists.length <= 0) {
        contentPlaylist.innerHTML =
            '<div class="no-playlist">Sem Playlists<div>'
    }
}

const formEditSongIn = document.querySelector('#formEditSongIn')

const formSongEditInputID = document.querySelector('#formSongEditInputID')

function formatarData(dataUTC) {
    const data = new Date(dataUTC)

    const opcoes = {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    }

    return data.toLocaleDateString('pt-BR', opcoes)
}

function listMusic(musics, playlistInfo) {
    document.querySelector('#containerPlaylistToManageCover').src =
        playlistInfo.coverUrl
    document.querySelector('#containerPlaylistToManageTitle').textContent =
        playlistInfo.title

    document.querySelector(
        '#containerPlaylistToManageDescription',
    ).textContent = playlistInfo.description

    document.querySelector('#containerPlaylistToManageCreated').textContent =
        `Criada em: ${formatarData(playlistInfo.additionDate)}`

    document.querySelector(
        '#containerPlaylistToManageTotalMusics',
    ).textContent = `Total de ${musics.length} ${
        musics.length === 1 || musics.length === 0 ? 'música' : 'músicas'
    }`

    document.querySelector('#containerPlaylistToManageGender').textContent =
        `Gênero: ${playlistInfo.gender}`

    const totalViewCountPlaylist = data.songs.reduce((acc, music) => {
        if (music.gender === playlistInfo.gender) {
            return acc + music.viewCount.length
        }
        return acc
    }, 0)

    document.querySelector('#containerPlaylistToManageViewCount').textContent =
        `${
            totalViewCountPlaylist === 1 ? 'Visualização' : 'Visualizações'
        }: ${formatViewCount(totalViewCountPlaylist)}`

    contentSongs.innerHTML = ''

    musics.forEach((music, index) => {
        const songsItem = document.createElement('div')
        songsItem.classList.add('songs-item')
        songsItem.style.animationDelay = `${index * 0.05 + 0.3}s`
        songsItem.addEventListener('click', () => {
            focusSong.classList.remove('hidden')
            listFocusMusic(music)
        })

        const itemCover = document.createElement('div')
        itemCover.classList.add('item-cover')

        const coverImage = document.createElement('img')
        coverImage.src = music.coverUrl

        const itemTitle = document.createElement('div')
        itemTitle.classList.add('item-title')
        itemTitle.innerText = music.title

        itemCover.appendChild(coverImage)
        songsItem.appendChild(itemCover)
        songsItem.appendChild(itemTitle)

        contentSongs.appendChild(songsItem)
    })

    if (musics.length <= 0) {
        contentSongs.innerHTML = '<div class="no-songs">Sem Músicas<div>'
    }
}

function listFocusMusic(music) {
    document.querySelector('#focusSongCover').src = music.coverUrl
    document.querySelector('#focusSongTitle').textContent = music.title
    document.querySelector('#focusSongCreated').textContent =
        `Criada em: ${formatarData(music.additionDate)}`

    document.querySelector('#focusSongURL').href =
        `https://youtu.be/${music.videoId}`

    document.querySelector('#focusSongURL').textContent =
        `https://youtu.be/${music.videoId}`

    document.querySelector('#focusSongGender').textContent =
        `Gênero: ${music.gender}`

    document.querySelector('#focusSongViewCount').textContent = `${
        music.viewCount.length === 1 ? 'Visualização' : 'Visualizações'
    }: ${formatViewCount(music.viewCount.length)}`

    changedData.songId = music._id
    changedData.previousThumbnail = music.coverUrl

    function gerarLinkDoVideo(id) {
        if (id.endsWith('.mp3')) {
            return id
        } else {
            return `https://youtu.be/${id}`
        }
    }

    formSongEditInputID.value = gerarLinkDoVideo(music.videoId)

    document.querySelector('#songDeleteName').textContent = music.title
}

function formatViewCount(count) {
    if (count < 1000) return count.toString()
    if (count < 100000)
        return (
            (count % 1000 === 0
                ? (count / 1000).toString()
                : (Math.floor(count / 100) / 10).toFixed(1).replace('.', ',')) +
            'k'
        )
    if (count < 1000000) return Math.floor(count / 1000).toString() + 'k'
    if (count < 1000000000)
        return (
            (count % 1000000 === 0
                ? (count / 1000000).toString()
                : (Math.floor(count / 100000) / 10)
                      .toFixed(1)
                      .replace('.', ',')) + 'M'
        )
    if (count < 1000000000000)
        return (
            (count % 1000000000 === 0
                ? (count / 1000000000).toString()
                : (Math.floor(count / 100000000) / 10)
                      .toFixed(1)
                      .replace('.', ',')) + 'B'
        )
    return (
        (count % 1000000000000 === 0
            ? (count / 1000000000000).toString()
            : (Math.floor(count / 100000000000) / 10)
                  .toFixed(1)
                  .replace('.', ',')) + 'T'
    )
}

const formAddPlaylistInputNome = document.querySelector(
    '#formAddPlaylistInName',
)
const formAddPlaylistInputGenero = document.querySelector(
    '#formAddPlaylistInGender',
)
const formAddPlaylistInputThumbnail = document.querySelector(
    '#formAddPlaylistInThumbnail',
)
const formAddPlaylistPreviewThumbnail = document.querySelector(
    '#formAddPlaylistInPreviewThumbnail',
)
const textareaDescricao = document.querySelector(
    '#formAddPlaylistInDescription',
)

const formPlaylist = document.querySelector('#formAddPlaylistIn')

formAddPlaylistInputThumbnail.addEventListener('input', () => {
    formAddPlaylistPreviewThumbnail.src = formAddPlaylistInputThumbnail.value
})
formPlaylistEditInputThumbnail.addEventListener('input', () => {
    formPlaylistEditPreviewThumbnail.src = formPlaylistEditInputThumbnail.value
        ? formPlaylistEditInputThumbnail.value
        : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
})

formPlaylist.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (formAddPlaylistInputNome.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Nome.'
        formAddPlaylistInputNome.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (
        formAddPlaylistInputNome.value.trim().length > MAX_LENGTH_TITLE_PLAYLIST
    ) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = `O nome da playlist deve ter no máximo ${MAX_LENGTH_TITLE_PLAYLIST} caracteres.`
        formAddPlaylistInputNome.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    const NomeExiste = data.playlists.some(
        (playlist) =>
            playlist.title.toLowerCase() ===
            formAddPlaylistInputNome.value.trim().toLowerCase(),
    )
    if (NomeExiste) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'O Nome já existe, escolha outro.'
        formAddPlaylistInputNome.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (formAddPlaylistInputGenero.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Gênero.'
        formAddPlaylistInputGenero.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    const generoExiste = data.playlists.some(
        (playlist) =>
            playlist.gender.toLowerCase() ===
            formAddPlaylistInputGenero.value.trim().toLowerCase(),
    )
    if (generoExiste) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'O gênero já existe, escolha outro.'
        formAddPlaylistInputGenero.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (textareaDescricao.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Descrição.'
        textareaDescricao.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    const dataResponse = {
        title: formAddPlaylistInputNome.value.trim(),
        coverUrl: formAddPlaylistInputThumbnail.value.trim(),
        description: textareaDescricao.value.trim(),
        gender: formAddPlaylistInputGenero.value.trim(),
    }

    const response = await fetch(`/playlists?userId=${userData._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataResponse),
    })

    const result = await response.json()

    if (result.message != 'Playlist added successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Erro ao adicionar a playlist.'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Playlist added successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Playlist adicionada com sucesso!'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        formAddPlaylistInputNome.value = ''
        formAddPlaylistInputThumbnail.value = ''
        textareaDescricao.value = ''
        formAddPlaylistInputGenero.value = ''
        formAddPlaylistPreviewThumbnail.src =
            'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
        formAddPlaylist.classList.add('hidden')
        document.body.style.overflow = 'auto'
        searchPlaylist.value = ''
        clearSearchPlaylist.classList.add('hidden')
        blankPlaylist.classList.add('hidden')

        await dataFetch()
        defineTotalNumbers()
        listPlaylists()
    }
})

const formSong = document.querySelector('#formAddSongIn')

const formSongAddInputID = document.querySelector('#formSongAddInputID')

let timerFormsong = null

function extrairIdDoVideo(url) {
    return url.length === 11
        ? url
        : url.split('https://youtu.be/')[1]
          ? url.split('https://youtu.be/')[1].slice(0, 11)
          : url.split('https://youtube.com/watch?v=')[1]
            ? url.split('https://youtube.com/watch?v=')[1].slice(0, 11)
            : url.split('https://www.youtube.com/watch?v=')[1]
              ? url.split('https://www.youtube.com/watch?v=')[1].slice(0, 11)
              : url.split('https://m.youtube.com/watch?v=')[1]
                ? url.split('https://m.youtube.com/watch?v=')[1].slice(0, 11)
                : null
}

formSong.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (timerFormsong) clearTimeout(timerFormsong)

    if (formSongAddInputID.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo ID do YouTube.'
        formSongAddInputID.focus()

        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerFormsong = timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (extrairIdDoVideo(formSongAddInputID.value.trim()) === null) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'ID do YouTube inválido.'
        formSongAddInputID.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerFormsong = timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    const dataResponse = {
        videoId: extrairIdDoVideo(formSongAddInputID.value.trim()),
        gender: data.playlists.find(
            (playlist) => playlist._id == changedData.playlistId,
        ).gender,
    }

    const response = await fetch(`/songs?userId=${userData._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataResponse),
    })

    const result = await response.json()

    if (result.message != 'Music added successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Música já adicionada.'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerFormsong = timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Music added successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Música adicionada com sucesso!'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerFormsong = timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        formSongAddInputID.value = ''
        formAddSong.classList.add('hidden')
        searchSong.value = ''
        clearSearchSong.classList.add('hidden')
        blankSong.classList.add('hidden')
        await dataFetch()
        generateChartSongs(
            data.playlists.find(
                (playlist) => playlist._id == changedData.playlistId,
            ).gender,
        )

        let musicsByPlaylist = []
        for (let playlist_music of data.songs) {
            if (
                playlist_music.gender ===
                data.playlists.find(
                    (playlist) => playlist._id == changedData.playlistId,
                ).gender
            ) {
                musicsByPlaylist.push(playlist_music)
            }
        }

        listMusic(
            musicsByPlaylist,
            data.playlists.find(
                (playlist) => playlist._id == changedData.playlistId,
            ),
        )

        defineTotalNumbers()
        listPlaylists()
    }
})

let timerFormEditSong = null

formEditSongIn.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (timerFormEditSong) clearTimeout(timerFormEditSong)

    if (formSongEditInputID.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo ID do YouTube.'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerFormEditSong = timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        return
    }

    if (extrairIdDoVideo(formSongEditInputID.value.trim()) === null) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'ID do YouTube inválido.'
        formSongEditInputID.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerFormsong = timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    const dataResponse = {
        videoId: extrairIdDoVideo(formSongEditInputID.value.trim()),
    }

    const response = await fetch(
        `/songs/${changedData.songId}?userId=${userData._id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataResponse),
        },
    )

    const result = await response.json()

    if (result.message != 'Music updated successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'ID do YouTube inválido.'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerFormEditSong = timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Music updated successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Música atualizada com sucesso!'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerFormEditSong = timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        formSongEditInputID.value = ''
        formEditSong.classList.add('hidden')
        focusSong.classList.add('hidden')
        await dataFetch()
        generateChartSongs(
            data.playlists.find(
                (playlist) => playlist._id == changedData.playlistId,
            ).gender,
        )

        let musicsByPlaylist = []
        for (let playlist_music of data.songs) {
            if (
                playlist_music.gender ===
                data.playlists.find(
                    (playlist) => playlist._id == changedData.playlistId,
                ).gender
            ) {
                musicsByPlaylist.push(playlist_music)
            }
        }

        listMusic(
            musicsByPlaylist,
            data.playlists.find(
                (playlist) => playlist._id == changedData.playlistId,
            ),
        )

        defineTotalNumbers()
        listPlaylists()
    }
})

formSongDeleteBtn.addEventListener('click', async () => {
    const response = await fetch(
        `/songs/${changedData.songId}?userId=${userData._id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )

    const result = await response.json()

    if (result.message != 'Music removed successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Algo deu errado.'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Music removed successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Música deletada com sucesso!'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        formDeleteSong.classList.add('hidden')
        focusSong.classList.add('hidden')
        searchSong.value = ''
        clearSearchSong.classList.add('hidden')
        blankSong.classList.add('hidden')

        await dataFetch()
        generateChartSongs(
            data.playlists.find(
                (playlist) => playlist._id == changedData.playlistId,
            ).gender,
        )

        let musicsByPlaylist = []
        for (let playlist_music of data.songs) {
            if (
                playlist_music.gender ===
                data.playlists.find(
                    (playlist) => playlist._id == changedData.playlistId,
                ).gender
            ) {
                musicsByPlaylist.push(playlist_music)
            }
        }

        listMusic(
            musicsByPlaylist,
            data.playlists.find(
                (playlist) => playlist._id == changedData.playlistId,
            ),
        )

        defineTotalNumbers()
        listPlaylists()
    }
})

formDeletePlaylistContent.addEventListener('submit', async (e) => {
    e.preventDefault()

    if (
        playlistDeleteNameInputToConfirm.value !=
        document.querySelector('#playlistDeleteName').textContent
    ) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent =
            'Por favor, escreva o nome da playlist corretamente.'
        playlistDeleteNameInputToConfirm.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    const response = await fetch(
        `/songs-playlists/${changedData.playlistId}?userId=${userData._id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )

    const result = await response.json()

    if (result.message != 'Playlist and songs removed successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Algo deu errado.'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Playlist and songs removed successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Playlist deletada com sucesso!'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        playlistDeleteNameInputToConfirm.value = ''
        formDeletePlaylist.classList.add('hidden')
        containerPlaylistToManage.classList.add('hidden')
        document.body.style.overflow = 'auto'
        searchPlaylist.value = ''
        clearSearchPlaylist.classList.add('hidden')
        blankPlaylist.classList.add('hidden')
        await dataFetch()
        defineTotalNumbers()
        listPlaylists()
        generateChartPlaylists()
    }
})

formEditPlaylistIn.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (formPlaylistEditInputNome.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Nome.'
        formPlaylistEditInputNome.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        return
    }

    if (
        formPlaylistEditInputNome.value.trim().length >
        MAX_LENGTH_TITLE_PLAYLIST
    ) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = `O nome da playlist deve ter no máximo ${MAX_LENGTH_TITLE_PLAYLIST} caracteres.`
        formPlaylistEditInputNome.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        return
    }

    if (formPlaylistEditInputGender.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Gênero.'
        formPlaylistEditInputGender.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        return
    }

    if (formPlaylistEditDescription.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo descrição.'
        formPlaylistEditDescription.focus()
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        return
    }

    const dataResponse = {
        title: formPlaylistEditInputNome.value.trim(),
        coverUrl: formPlaylistEditInputThumbnail.value.trim(),
        gender: formPlaylistEditInputGender.value.trim(),
        description: formPlaylistEditDescription.value.trim(),
    }

    const response = await fetch(
        `/playlists/${changedData.playlistId}?userId=${userData._id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataResponse),
        },
    )

    const result = await response.json()

    if (result.message != 'Playlist updated successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Atualização falhou.'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Playlist updated successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Playlist atualizada com sucesso!'
        if (timerAlertMessage != null) {
            clearTimeout(timerAlertMessage)
            timerAlertMessage = null
        }
        timerAlertMessage = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        formEditPlaylist.classList.add('hidden')
        await dataFetch()
        generateChartSongs(
            data.playlists.find(
                (playlist) => playlist._id == changedData.playlistId,
            ).gender,
        )

        formPlaylistEditInputNome.value = data.playlists.find(
            (playlist) => playlist._id == changedData.playlistId,
        ).title
        formPlaylistEditInputThumbnail.value = data.playlists.find(
            (playlist) => playlist._id == changedData.playlistId,
        ).coverUrl
        formPlaylistEditInputGender.value = data.playlists.find(
            (playlist) => playlist._id == changedData.playlistId,
        ).gender
        formPlaylistEditDescription.value = data.playlists.find(
            (playlist) => playlist._id == changedData.playlistId,
        ).description
        formPlaylistEditPreviewThumbnail.src = data.playlists.find(
            (playlist) => playlist._id == changedData.playlistId,
        ).coverUrl

        let musicsByPlaylist = []
        for (let playlist_music of data.songs) {
            if (
                playlist_music.gender ===
                data.playlists.find(
                    (playlist) => playlist._id == changedData.playlistId,
                ).gender
            ) {
                musicsByPlaylist.push(playlist_music)
            }
        }

        listMusic(
            musicsByPlaylist,
            data.playlists.find(
                (playlist) => playlist._id == changedData.playlistId,
            ),
        )

        defineTotalNumbers()
        listPlaylists()
    }
})

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

async function setUserInfo() {
    const idUserConnected = getCookie('user')

    const responseUser = await fetch(`/users/${idUserConnected}`)
    const user = await responseUser.json()

    userData = user.user

    document.querySelector('#userName').textContent = userData.name
    document.querySelector('#userNameMobile').textContent = userData.name

    initThemeChanger(userData.theme)
}

function getThemeStorage() {
    return localStorage.getItem('theme') || 'original'
}

function initThemeChanger(theme = 'original') {
    const themes = [
        'original',
        'rock-version',
        'hatsune-miku-version',
        'amv-brasileiro-version',
        'dark-mode-version',
    ]

    if (!themes.includes(theme)) {
        console.warn(
            `Tema "${theme}" não reconhecido. Utilizando tema padrão "original".`,
        )
        theme = 'original'
    }

    for (let i = 1; i <= 5; i++) {
        document.documentElement.style.setProperty(
            `--color-base-${i}`,
            colorsThemes[theme][`base${i}`],
        )
    }
}

initThemeChanger(getThemeStorage())

function setUserProfilePicture() {
    if (userData.profilePicture == '') {
        document.querySelector('#userPersonIcon').classList.remove('hidden')
        document
            .querySelector('#userPersonIconMobile')
            .classList.remove('hidden')
        document.querySelector('#userPersonIcon').classList.remove('hidden')
        document
            .querySelector('#userPersonIconMobile')
            .classList.remove('hidden')
        document.querySelector('#userPersonContainer').classList.add('hidden')
        document
            .querySelector('#userPersonContainerMobile')
            .classList.add('hidden')
    } else {
        document.querySelector('#userPersonIcon').classList.add('hidden')
        document.querySelector('#userPersonIconMobile').classList.add('hidden')
        document
            .querySelector('#userPersonContainer')
            .classList.remove('hidden')
        document
            .querySelector('#userPersonContainerMobile')
            .classList.remove('hidden')
        document.querySelector('#userPersonImg').src = userData.profilePicture
        document.querySelector('#userPersonImg').alt = userData.name
        document.querySelector('#userPersonImgMobile').src =
            userData.profilePicture
        document.querySelector('#userPersonImgMobile').alt = userData.name
        document.querySelectorAll('.icon-person-container').forEach((item) => {
            item.style.display = 'flex'
        })
    }
}

function defineTotalViewsPlaylists(maxlength) {
    let playlists = []
    let genreViewCount = {}

    data.songs.forEach((song) => {
        if (!genreViewCount[song.gender]) {
            genreViewCount[song.gender] = 0
        }
        genreViewCount[song.gender] += song.viewCount.length
    })

    data.playlists.forEach((playlist) => {
        let totalViewsPlaylists = genreViewCount[playlist.gender] || 0

        playlists.push({
            name:
                playlist.title.length > 20
                    ? playlist.title.slice(0, 20) + '...'
                    : playlist.title,
            views: totalViewsPlaylists,
        })
    })

    playlists.sort((a, b) => b.views - a.views)

    if (maxlength) {
        playlists = playlists.slice(0, maxlength)
    }

    return playlists
}

function defineTotalViewsSongs(maxlength, gender) {
    let songs = []

    data.songs.forEach((song) => {
        if (!gender || song.gender === gender) {
            songs.push({
                name:
                    song.title.length > 20
                        ? song.title.slice(0, 20) + '...'
                        : song.title,
                views: song.viewCount.length,
            })
        }
    })

    songs.sort((a, b) => b.views - a.views)

    if (maxlength) {
        songs = songs.slice(0, maxlength)
    }

    return songs
}

function generateChartPlaylists() {
    zingchart.exec('chartPlaylists', 'destroy')

    var chartData = {
        type: 'bar',
        title: {
            text: 'Popularidade das Playlists',
            fontColor: 'var(--color-white-1)',
            fontSize: window.innerWidth < 700 ? 20 : 32,
        },
        plotarea: {
            backgroundColor: 'var(--color-base-1)',
        },
        backgroundColor: 'var(--color-base-1)',
        plot: {
            animation: {
                effect: 4,
                sequence: 2,
                speed: 1000,
            },
        },
        scaleX: {
            values: defineTotalViewsPlaylists(calculateBarCount()).map(
                (playlist) => playlist.name,
            ),
            title: {
                text: 'Playlist',
                fontColor: 'var(--color-white-1)',
            },
            lineColor: 'var(--color-white-1)',
            tick: {
                lineColor: 'var(--color-white-1)',
            },
            item: {
                fontSize: 14,
                fontColor: 'var(--color-white-1)',
                fontWeight: 'bold',
                wrapText: true,
            },
        },
        scaleY: {
            title: {
                text: 'Visualizações',
                fontColor: 'var(--color-white-1)',
            },
            item: {
                formatter: function (v) {
                    return v.toLocaleString()
                },
                fontColor: 'var(--color-white-1)',
            },
            lineColor: 'var(--color-white-1)',
            tick: {
                lineColor: 'var(--color-white-1)',
            },
        },
        series: [
            {
                values: defineTotalViewsPlaylists(calculateBarCount()).map(
                    (playlist) => playlist.views,
                ),
                backgroundColor: 'var(--color-base-1)',
                gradientColors: 'var(--color-base-5) var(--color-base-1)',
                gradientStops: '0.3 0.8',
                cursor: 'pointer',
                hoverState: {
                    visible: false,
                },
            },
        ],
        gui: {
            contextMenu: {
                button: {
                    visible: false,
                },
            },
        },
    }

    zingchart.render({
        id: 'chartPlaylists',
        data: chartData,
        height: '100%',
        width: '100%',
        events: {
            click: function (e) {
                if (e.targetid == 'chart-img') return
                const index = Number(
                    e.targetid.split('-')[e.targetid.split('-').length - 1],
                )
                if (isNaN(index)) return

                if (
                    !Array.isArray(data.songs) ||
                    !Array.isArray(data.playlists)
                ) {
                    console.error('Data is not an array.')
                    return
                }

                let playlists = []
                let genreViewCount = {}

                data.songs.forEach((song) => {
                    if (!genreViewCount[song.gender]) {
                        genreViewCount[song.gender] = 0
                    }
                    genreViewCount[song.gender] += song.viewCount.length
                })

                data.playlists.forEach((playlist) => {
                    let totalViewsPlaylists =
                        genreViewCount[playlist.gender] || 0

                    playlists.push({
                        ...playlist,
                        views: totalViewsPlaylists,
                    })
                })

                playlists.sort((a, b) => b.views - a.views)

                const playlist = playlists[index]

                if (!playlist) return

                let musicsByPlaylist = []

                for (let playlist_music of data.songs) {
                    if (playlist_music.gender === playlist.gender) {
                        musicsByPlaylist.push(playlist_music)
                    }
                }

                containerPlaylistToManage.classList.remove('hidden')
                document.body.style.overflow = 'hidden'
                listMusic(musicsByPlaylist, playlist)
                changedData.playlistName = playlist.gender
                changedData.playlistId = playlist._id

                formPlaylistEditInputNome.value = playlist.title
                formPlaylistEditInputGender.value = playlist.gender
                formPlaylistEditInputThumbnail.value = playlist.coverUrl
                formPlaylistEditPreviewThumbnail.src = playlist.coverUrl
                formPlaylistEditDescription.value = playlist.description

                document.querySelector('#playlistDeleteName').textContent =
                    playlist.title
                searchSong.value = ''
                blankSong.classList.add('hidden')
                generateChartSongs(playlist.gender)
            },
        },
    })

    zingchart.bind('chartPlaylists', 'contextmenu', function () {
        return false
    })
}

function generateChartSongs(gender) {
    zingchart.exec('chartSongs', 'destroy')

    var chartData = {
        type: 'bar',
        title: {
            text: 'Popularidade das Músicas',
            fontColor: 'var(--color-white-1)',
            fontSize: window.innerWidth < 700 ? 20 : 32,
        },
        plotarea: {
            backgroundColor: 'var(--color-base-1)',
        },
        backgroundColor: 'var(--color-base-1)',
        plot: {
            animation: {
                effect: 4,
                sequence: 2,
                speed: 1000,
            },
        },
        scaleX: {
            values: defineTotalViewsSongs(calculateBarCount(), gender).map(
                (playlist) => playlist.name,
            ),
            title: {
                text: 'Música',
                fontColor: 'var(--color-white-1)',
            },
            lineColor: 'var(--color-white-1)',
            tick: {
                lineColor: 'var(--color-white-1)',
            },
            item: {
                fontSize: 14,
                fontColor: 'var(--color-white-1)',
                fontWeight: 'bold',
                wrapText: true,
            },
        },
        scaleY: {
            title: {
                text: 'Visualizações',
                fontColor: 'var(--color-white-1)',
            },
            item: {
                formatter: function (v) {
                    return v.toLocaleString()
                },
                fontColor: 'var(--color-white-1)',
            },
            lineColor: 'var(--color-white-1)',
            tick: {
                lineColor: 'var(--color-white-1)',
            },
        },
        series: [
            {
                values: defineTotalViewsSongs(calculateBarCount(), gender).map(
                    (playlist) => playlist.views,
                ),
                backgroundColor: 'var(--color-base-1)',
                gradientColors: 'var(--color-base-5) var(--color-base-1)',
                gradientStops: '0.3 0.8',
                cursor: 'pointer',
                hoverState: {
                    visible: false,
                },
            },
        ],
        gui: {
            contextMenu: {
                button: {
                    visible: false,
                },
            },
        },
    }

    zingchart.render({
        id: 'chartSongs',
        data: chartData,
        height: '100%',
        width: '100%',
        events: {
            click: function (e) {
                if (e.targetid == 'chart-img') return
                const index = Number(
                    e.targetid.split('-')[e.targetid.split('-').length - 1],
                )
                if (isNaN(index)) return

                if (
                    !Array.isArray(data.songs) ||
                    !Array.isArray(data.playlists)
                ) {
                    console.error('Data is not an array.')
                    return
                }

                let songs = []

                data.songs.forEach((song) => {
                    if (!gender || song.gender === gender) {
                        songs.push({
                            ...song,
                            views: song.viewCount.length,
                        })
                    }
                })

                songs.sort((a, b) => b.views - a.views)

                const music = songs[index]

                if (!music) return

                setTimeout(() => {
                    focusSong.classList.remove('hidden')
                    listFocusMusic(music)
                }, 100)
            },
        },
    })

    zingchart.bind('chartSongs', 'contextmenu', function () {
        return false
    })
}

let previousWidth = window.innerWidth

window.addEventListener('resize', () => {
    if (window.innerWidth !== previousWidth) {
        if (
            document
                .querySelector('.container-playlist-to-manage-overflow')
                .classList.contains('hidden')
        ) {
            generateChartPlaylists()
        } else {
            generateChartSongs(
                data.playlists.find(
                    (playlist) => playlist._id == changedData.playlistId,
                ).gender,
            )
        }

        previousWidth = window.innerWidth
    }
})

function calculateBarCount() {
    let barCount = 6

    if (window.innerWidth >= 1200) {
        return barCount
    } else if (window.innerWidth < 1200 && window.innerWidth >= 900) {
        barCount = 4
    } else if (window.innerWidth < 900 && window.innerWidth >= 630) {
        barCount = 3
    } else if (window.innerWidth < 630 && window.innerWidth >= 370) {
        barCount = 2
    } else {
        barCount = 1
    }

    return barCount
}

async function inicia() {
    document.querySelector('body').style.overflow = 'hidden'

    await dataFetch()
    defineTotalNumbers()
    listPlaylists()
    generateChartPlaylists()
    generateChartSongs()
    await setUserInfo()

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
        document.body.style.overflow = 'auto'
        generateChartPlaylists()
    })
    btnAddSong.addEventListener('click', () => {
        formAddSong.classList.remove('hidden')
        formSongAddInputID.focus()
    })
    btnAddSongMobile.addEventListener('click', () => {
        formAddSong.classList.remove('hidden')
        formSongAddInputID.focus()
    })
    btnAddPlaylist.addEventListener('click', () => {
        formAddPlaylist.classList.remove('hidden')
        formAddPlaylistInName.focus()
        document.body.style.overflow = 'hidden'
    })
    btnEditPlaylist.addEventListener('click', () => {
        formEditPlaylist.classList.remove('hidden')
    })
    btnEditSong.addEventListener('click', () => {
        formEditSong.classList.remove('hidden')
        formSongEditInputID.focus()
    })
    btnDeletePlaylist.addEventListener('click', () => {
        formDeletePlaylist.classList.remove('hidden')
        playlistDeleteNameInputToConfirm.focus()
    })
    btnDeleteSong.addEventListener('click', () => {
        formDeleteSong.classList.remove('hidden')
    })

    formAddPlaylist.addEventListener('click', (e) => {
        if (e.target.classList[0] == 'form-playlist-overflow') {
            formAddPlaylist.classList.add('hidden')
            document.body.style.overflow = 'auto'
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
            playlistDeleteNameInputToConfirm.value = ''
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
    setUserProfilePicture()

    document.querySelector('.loading-screen').classList.add('hidden')
    document.querySelector('body').style.overflow = 'auto'
}

inicia()
