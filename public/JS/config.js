let data = []
let changedData = {
    playlistName: null,
    songId: null,
    playlistId: null,
}
let userData

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

const formSongDeleteBtn = document.querySelector('#formSongDeleteBtn')
const formPlaylistDeleteBtn = document.querySelector('#formPlaylistDeleteBtn')

const totalPlaylists = document.querySelector('#totalPlaylists')
const totalMusics = document.querySelector('#totalMusics')
const contentPlaylist = document.querySelector('#contentPlaylist')
const contentSongs = document.querySelector('#contentSongs')

const playlistDeleteNameInputToConfirm = document.querySelector(
    '#playlistDeleteNameInputToConfirm'
)

playlistDeleteNameInputToConfirm.addEventListener('paste', (e) => {
    e.preventDefault()
})

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

const formEditPlaylistIn = document.querySelector('#formEditPlaylistIn')

const formPlaylistEditInputNome = document.querySelector(
    '#formPlaylistEditInputNome'
)
const formPlaylistEditInputGender = document.querySelector(
    '#formPlaylistEditInputGender'
)
const formPlaylistEditInputThumbnail = document.querySelector(
    '#formPlaylistEditInputThumbnail'
)
const formPlaylistEditPreviewThumbnail = document.querySelector(
    '#formPlaylistEditPreviewThumbnail'
)
const formPlaylistEditDescription = document.querySelector(
    '#formPlaylistEditDescription'
)

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
            changedData.playlistName = playlist.gender
            changedData.playlistId = playlist._id

            formPlaylistEditInputNome.value = playlist.title
            formPlaylistEditInputGender.value = playlist.gender
            formPlaylistEditInputThumbnail.value = playlist.coverUrl
            formPlaylistEditPreviewThumbnail.src = playlist.coverUrl
            formPlaylistEditDescription.value = playlist.description

            document.querySelector('#playlistDeleteName').textContent =
                playlist.title
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

const formEditSongIn = document.querySelector('#formEditSongIn')

const formSongEditInputNome = document.querySelector('#formSongEditInputNome')
const formSongEditInputURL = document.querySelector('#formSongEditInputURL')
const formSongEditInputThumbnail = document.querySelector(
    '#formSongEditInputThumbnail'
)
const formSongEditPreviewThumbnail = document.querySelector(
    '#formSongEditPreviewThumbnail'
)

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

    if (music.audioUrl.endsWith('.mp3')) {
        document.querySelector('#focusSongURL').href = music.audioUrl
        document.querySelector('#focusSongURL').textContent = music.audioUrl
    } else {
        document.querySelector(
            '#focusSongURL'
        ).href = `https://youtu.be/${music.audioUrl}`
        document.querySelector(
            '#focusSongURL'
        ).textContent = `https://youtu.be/${music.audioUrl}`
    }

    document.querySelector(
        '#focusSongGender'
    ).textContent = `Gênero: ${music.gender}`

    changedData.songId = music._id

    function gerarLinkDoVideo(id) {
        return `https://youtu.be/${id}`
    }

    formSongEditInputNome.value = music.title
    formSongEditInputURL.value = gerarLinkDoVideo(music.audioUrl)
    formSongEditInputThumbnail.value = music.coverUrl
    formSongEditPreviewThumbnail.src = music.coverUrl

    document.querySelector('#songDeleteName').textContent = music.title
}

const formAddPlaylistInputNome = document.querySelector(
    '#formAddPlaylistInName'
)
const formAddPlaylistInputGenero = document.querySelector(
    '#formAddPlaylistInGender'
)
const formAddPlaylistInputThumbnail = document.querySelector(
    '#formAddPlaylistInThumbnail'
)
const formAddPlaylistPreviewThumbnail = document.querySelector(
    '#formAddPlaylistInPreviewThumbnail'
)
const textareaDescricao = document.querySelector(
    '#formAddPlaylistInDescription'
)

const formPlaylist = document.querySelector('#formAddPlaylistIn')

formAddPlaylistInputThumbnail.addEventListener('input', () => {
    formAddPlaylistPreviewThumbnail.src = formAddPlaylistInputThumbnail.value
})
formPlaylistEditInputThumbnail.addEventListener('input', () => {
    formPlaylistEditPreviewThumbnail.src = formPlaylistEditInputThumbnail.value
})

formPlaylist.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (formAddPlaylistInputNome.value.trim() === '') {
        alert('Por favor, preencha o campo Nome.')
        return
    }
    const NomeExiste = data[0].some(
        (musica) =>
            musica.title.toLowerCase() ===
            formAddPlaylistInputNome.value.trim().toLowerCase()
    )
    if (NomeExiste) {
        alert('O Nome já existe, escolha outro.')
        return
    }

    if (formAddPlaylistInputGenero.value.trim() === '') {
        alert('Por favor, preencha o campo Gênero.')
        return
    }

    const generoExiste = data[0].some(
        (musica) =>
            musica.gender.toLowerCase() ===
            formAddPlaylistInputGenero.value.trim().toLowerCase()
    )
    if (generoExiste) {
        alert('O gênero já existe, escolha outro.')
        return
    }

    if (formAddPlaylistInputThumbnail.value.trim() === '') {
        alert('Por favor, preencha o campo Thumbnail.')
        return
    }

    if (textareaDescricao.value.trim() === '') {
        alert('Por favor, preencha o campo Descrição.')
        return
    }

    const dataResponse = {
        title: formAddPlaylistInputNome.value.trim(),
        coverUrl: formAddPlaylistInputThumbnail.value.trim(),
        description: textareaDescricao.value.trim(),
        gender: formAddPlaylistInputGenero.value.trim(),
    }

    const response = await fetch('/playlists', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataResponse),
    })

    const result = await response.json()

    if (result.message != 'Playlist added succesfully!') {
        return alert('Internal Error')
    }

    if (result.message == 'Playlist added succesfully!') {
        alert('Playlist adicionada com sucesso!')
        formAddPlaylistInputNome.value = ''
        formAddPlaylistInputThumbnail.value = ''
        textareaDescricao.value = ''
        formAddPlaylistInputGenero.value = ''
        formAddPlaylistPreviewThumbnail.src = ''
        formAddPlaylist.classList.add('hidden')

        await dataFetch()
        defineTotalNumbers()
        listPlaylists()
    }
})

const formSong = document.querySelector('#formAddSongIn')

const formSongAddSongInputNome = document.querySelector(
    '#formSongAddSongInputNome'
)
const formSongAddSongInputURL = document.querySelector(
    '#formSongAddSongInputURL'
)
const formSongAddSongInputThumbnail = document.querySelector(
    '#formSongAddSongInputThumbnail'
)
const formSongAddSongPreviewThumbnail = document.querySelector(
    '#formSongAddSongPreviewThumbnail'
)

formSongAddSongInputThumbnail.addEventListener('input', () => {
    formSongAddSongPreviewThumbnail.src = formSongAddSongInputThumbnail.value
})
formSongEditInputThumbnail.addEventListener('input', () => {
    formSongEditPreviewThumbnail.src = formSongEditInputThumbnail.value
})

formSong.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (formSongAddSongInputNome.value.trim() === '') {
        alert('Por favor, preencha o campo Nome.')
        return
    }
    const NomeExiste = data[1].some(
        (musica) =>
            musica.title.toLowerCase() ===
            formSongAddSongInputNome.value.trim().toLowerCase()
    )
    if (NomeExiste) {
        alert('O Nome já existe, escolha outro.')
        return
    }

    if (formSongAddSongInputURL.value.trim() === '') {
        alert('Por favor, preencha o campo URL.')
        return
    }

    if (formSongAddSongInputThumbnail.value.trim() === '') {
        alert('Por favor, preencha o campo Thumbnail.')
        return
    }

    function extrairIdDoVideo(url) {
        if (url.endsWith('.mp3')) {
            return url
        } else {
            const regex =
                /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*?(\?si=\S+))?/

            const match = url.match(regex)

            if (match && match[1]) {
                return match[1]
            } else {
                return null
            }
        }
    }

    const dataResponse = {
        title: formSongAddSongInputNome.value.trim(),
        coverUrl: formSongAddSongInputThumbnail.value.trim(),
        audioUrl: extrairIdDoVideo(formSongAddSongInputURL.value.trim()),
        gender: changedData.playlistName,
        theme: 'Original',
        isVideo: true,
    }

    const response = await fetch('/songs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataResponse),
    })

    const result = await response.json()

    if (result.message != 'Music added succesfully!') {
        return alert('Internal Error')
    }

    if (result.message == 'Music added succesfully!') {
        alert('Música adicionada com sucesso!')
        formSongAddSongInputNome.value = ''
        formSongAddSongInputURL.value = ''
        formSongAddSongInputThumbnail.value = ''
        formSongAddSongPreviewThumbnail.src = ''
        formAddSong.classList.add('hidden')
        containerPlaylistToManage.classList.add('hidden')
        document.body.style.overflow = 'auto'
        await dataFetch()
        defineTotalNumbers()
        listPlaylists()
    }
})

formEditSongIn.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (formSongEditInputNome.value.trim() === '') {
        alert('Por favor, preencha o campo Nome.')
        return
    }

    if (formSongEditInputURL.value.trim() === '') {
        alert('Por favor, preencha o campo Gênero.')
        return
    }

    if (formSongEditInputThumbnail.value.trim() === '') {
        alert('Por favor, preencha o campo Thumbnail.')
        return
    }

    function extrairIdDoVideo(url) {
        if (url.endsWith('.mp3')) {
            return url
        } else {
            const regex =
                /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S*?(\?si=\S+))?/

            const match = url.match(regex)

            if (match && match[1]) {
                return match[1]
            } else {
                return null
            }
        }
    }

    const dataResponse = {
        title: formSongEditInputNome.value.trim(),
        audioUrl: extrairIdDoVideo(formSongEditInputURL.value.trim()),
        coverUrl: formSongEditInputThumbnail.value.trim(),
    }

    const response = await fetch(`/songs/${changedData.songId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataResponse),
    })

    const result = await response.json()

    if (result.message != 'Music updated succesfully!') {
        return alert('Internal Error')
    }

    if (result.message == 'Music updated succesfully!') {
        alert('Música atualizada com sucesso!')
        formSongEditInputNome.value = ''
        formSongEditInputURL.value = ''
        formSongEditInputThumbnail.value = ''
        formSongEditPreviewThumbnail.src = ''
        formEditSong.classList.add('hidden')
        focusSong.classList.add('hidden')
        containerPlaylistToManage.classList.add('hidden')
        document.body.style.overflow = 'auto'
        await dataFetch()
        defineTotalNumbers()
        listPlaylists()
    }
})

formSongDeleteBtn.addEventListener('click', async () => {
    const response = await fetch(`/songs/${changedData.songId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()

    if (result.message != 'Music removed succesfully!') {
        return alert('Internal Error')
    }

    if (result.message == 'Music removed succesfully!') {
        alert('Música deletada com sucesso!')
        formDeleteSong.classList.add('hidden')
        focusSong.classList.add('hidden')
        containerPlaylistToManage.classList.add('hidden')
        document.body.style.overflow = 'auto'
        await dataFetch()
        defineTotalNumbers()
        listPlaylists()
    }
})

formPlaylistDeleteBtn.addEventListener('click', async () => {
    if (
        playlistDeleteNameInputToConfirm.value !=
        document.querySelector('#playlistDeleteName').textContent
    ) {
        return alert('Por favor, escreva o nome da playlist corretamente.')
    }

    const response = await fetch(`/songs-playlists/${changedData.playlistId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const result = await response.json()

    if (result.message != 'Playlist and songs removed succesfully!') {
        return alert('Internal Error')
    }

    if (result.message == 'Playlist and songs removed succesfully!') {
        alert('Playlist deletada com sucesso!')
        playlistDeleteNameInputToConfirm.value = ''
        formDeletePlaylist.classList.add('hidden')
        containerPlaylistToManage.classList.add('hidden')
        document.body.style.overflow = 'auto'
        await dataFetch()
        defineTotalNumbers()
        listPlaylists()
    }
})

formEditPlaylistIn.addEventListener('submit', async function (event) {
    event.preventDefault()

    if (formPlaylistEditInputNome.value.trim() === '') {
        alert('Por favor, preencha o campo Nome.')
        return
    }

    if (formPlaylistEditInputGender.value.trim() === '') {
        alert('Por favor, preencha o campo Gênero.')
        return
    }

    if (formPlaylistEditInputThumbnail.value.trim() === '') {
        alert('Por favor, preencha o campo Thumbnail.')
        return
    }

    if (formPlaylistEditDescription.value.trim() === '') {
        alert('Por favor, preencha o campo descrição.')
        return
    }

    const dataResponse = {
        title: formPlaylistEditInputNome.value.trim(),
        coverUrl: formPlaylistEditInputThumbnail.value.trim(),
        gender: formPlaylistEditInputGender.value.trim(),
        description: formPlaylistEditDescription.value.trim(),
    }

    const response = await fetch(`/playlists/${changedData.playlistId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataResponse),
    })

    const result = await response.json()

    if (result.message != 'Playlist updated succesfully!') {
        return alert('Internal Error')
    }

    if (result.message == 'Playlist updated succesfully!') {
        alert('Playlist atualizada com sucesso!')
        formPlaylistEditInputNome.value = ''
        formPlaylistEditInputThumbnail.value = ''
        formPlaylistEditInputGender.value = ''
        formPlaylistEditDescription.value = ''
        formEditPlaylist.classList.add('hidden')
        containerPlaylistToManage.classList.add('hidden')
        document.body.style.overflow = 'auto'
        await dataFetch()
        defineTotalNumbers()
        listPlaylists()
    }
})

async function setUserInfo() {
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

    const idUserConnected = getCookie('user')

    const responseUser = await fetch(`/users/${idUserConnected}`)
    const user = await responseUser.json()

    userData = user.user

    document.querySelector('#userName').textContent = userData.name
    document.querySelector('#userNameMobile').textContent = userData.name
}

async function inicia() {
    await dataFetch()
    defineTotalNumbers()
    listPlaylists()
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
