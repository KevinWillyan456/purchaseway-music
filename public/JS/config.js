let data = []

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

const totalPlaylists = document.querySelector('#totalPlaylists')
const totalMusics = document.querySelector('#totalMusics')
const contentPlaylist = document.querySelector('#contentPlaylist')
const contentSongs = document.querySelector('#contentSongs')

async function dataFetch() {
    data = []
    const response = await fetch('/songs-playlists')
    const jsonResponse = await response.json()

    data[0] = jsonResponse.playlists
    data[1] = jsonResponse.songs
}

function defineTotalNumbers() {
    totalPlaylists.textContent = data[0].length
    totalMusics.textContent = data[1].length
}

function listPlaylists() {
    contentPlaylist.innerHTML = ''

    data[0].forEach((playlist) => {
        let contador = 0
        let musicsByPlaylist = []

        for (let playlist_music of data[1]) {
            if (playlist_music.gender === playlist.gender) {
                musicsByPlaylist.push(playlist_music)
                contador++
            }
        }

        let divPlaylistItem = document.createElement('div')
        divPlaylistItem.classList.add('playlist-item')
        divPlaylistItem.addEventListener('click', () => {
            containerPlaylistToManage.classList.remove('hidden')
            document.body.style.overflow = 'hidden'
            listMusic(musicsByPlaylist, playlist)
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
}

function listMusic(musics, playlistInfo) {
    document.querySelector('#containerPlaylistToManageCover').src =
        playlistInfo.coverUrl
    document.querySelector('#containerPlaylistToManageTitle').textContent =
        playlistInfo.title
    document.querySelector(
        '#containerPlaylistToManageDescription'
    ).textContent = playlistInfo.description

    function converterData(dataString) {
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

        const data = new Date(dataString)
        const dia = data.getDate()
        const mes = meses[data.getMonth()]
        const ano = data.getFullYear()

        return `Criada em: ${dia} de ${mes} de ${ano}`
    }

    const dataOriginal = playlistInfo.additionDate
    const novaData = converterData(dataOriginal)

    document.querySelector('#containerPlaylistToManageCreated').textContent =
        novaData
    document.querySelector(
        '#containerPlaylistToManageTotalMusics'
    ).textContent = `Total de ${musics.length} ${
        musics.length === 1 || musics.length === 0 ? 'música' : 'músicas'
    }`
    document.querySelector(
        '#containerPlaylistToManageGender'
    ).textContent = `Gênero: ${playlistInfo.gender}`

    contentSongs.innerHTML = ''

    musics.forEach((music) => {
        const songsItem = document.createElement('div')
        songsItem.classList.add('songs-item')
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
    console.log(music)
    document.querySelector('#focusSongCover').src = music.coverUrl
    document.querySelector('#focusSongTitle').textContent = music.title

    function converterData(dataString) {
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

        const data = new Date(dataString)
        const dia = data.getDate()
        const mes = meses[data.getMonth()]
        const ano = data.getFullYear()

        return `Criada em: ${dia} de ${mes} de ${ano}`
    }

    const dataOriginal = music.additionDate
    const novaData = converterData(dataOriginal)

    document.querySelector('#focusSongCreated').textContent = novaData
    document.querySelector(
        '#focusSongURL'
    ).href = `https://youtu.be/${music.audioUrl}`
    document.querySelector(
        '#focusSongURL'
    ).textContent = `https://youtu.be/${music.audioUrl}`
    document.querySelector(
        '#focusSongGender'
    ).textContent = `Gênero: ${music.gender}`
}

const inputNome = document.querySelector('#formAddPlaylistInName')
const inputGenero = document.querySelector('#formAddPlaylistInGender')
const inputThumbnail = document.querySelector('#formAddPlaylistInThumbnail')
const formAddPlaylistpreviewThumbnail = document.querySelector(
    '#formAddPlaylistInPreviewThumbnail'
)
const textareaDescricao = document.querySelector(
    '#formAddPlaylistInDescription'
)
const btnAdicionar = document.querySelector('#formAddPlaylistInBtnAdd')

const formPlaylist = document.querySelector('#formAddPlaylistIn')

inputThumbnail.addEventListener('input', () => {
    formAddPlaylistpreviewThumbnail.src = inputThumbnail.value
})

formPlaylist.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (inputNome.value.trim() === '') {
        alert('Por favor, preencha o campo Nome.')
        return
    }
    const NomeExiste = data[0].some(
        (musica) =>
            musica.title.toLowerCase() === inputNome.value.trim().toLowerCase()
    )
    if (NomeExiste) {
        alert('O Nome já existe, escolha outro.')
        return
    }

    if (inputGenero.value.trim() === '') {
        alert('Por favor, preencha o campo Gênero.')
        return
    }

    const generoExiste = data[0].some(
        (musica) =>
            musica.gender.toLowerCase() ===
            inputGenero.value.trim().toLowerCase()
    )
    if (generoExiste) {
        alert('O gênero já existe, escolha outro.')
        return
    }

    if (inputThumbnail.value.trim() === '') {
        alert('Por favor, preencha o campo Thumbnail.')
        return
    }

    if (textareaDescricao.value.trim() === '') {
        alert('Por favor, preencha o campo Descrição.')
        return
    }

    const dataResponse = {
        title: inputNome.value.trim(),
        coverUrl: inputThumbnail.value.trim(),
        description: textareaDescricao.value.trim(),
        gender: inputGenero.value.trim(),
    }

    const response = await fetch('/playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataResponse),
    })

    const result = await response.json()

    if (result.message == 'Playlist added succesfully!') {
        alert('Playlist adicionada com sucesso!')
        inputNome.value = ''
        inputThumbnail.value = ''
        textareaDescricao.value = ''
        inputGenero.value = ''
        formAddPlaylistpreviewThumbnail.src = ''
        formAddPlaylist.classList.add('hidden')

        await dataFetch()
        defineTotalNumbers()
        listPlaylists()
    }
})

async function inicia() {
    await dataFetch()
    defineTotalNumbers()
    listPlaylists()

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
    })
    btnAddSong.addEventListener('click', () => {
        formAddSong.classList.remove('hidden')
    })
    btnAddSongMobile.addEventListener('click', () => {
        formAddSong.classList.remove('hidden')
    })
    btnAddPlaylist.addEventListener('click', () => {
        formAddPlaylist.classList.remove('hidden')
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
}

inicia()
