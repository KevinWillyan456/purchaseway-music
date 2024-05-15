let data = []
let changedData = {
    playlistName: null,
    songId: null,
    playlistId: null,
    previousThumbnail: null,
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
const formDeletePlaylistContent = document.querySelector(
    '#formDeletePlaylistContent'
)

const totalPlaylists = document.querySelector('#totalPlaylists')
const totalMusics = document.querySelector('#totalMusics')
const contentPlaylist = document.querySelector('#contentPlaylist')
const contentSongs = document.querySelector('#contentSongs')

const playlistDeleteNameInputToConfirm = document.querySelector(
    '#playlistDeleteNameInputToConfirm'
)

const warning = document.querySelector('#warning')

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

const formSongEditInputID = document.querySelector('#formSongEditInputID')

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

    document.querySelector(
        '#focusSongURL'
    ).href = `https://youtu.be/${music.videoId}`
    document.querySelector(
        '#focusSongURL'
    ).textContent = `https://youtu.be/${music.videoId}`

    document.querySelector(
        '#focusSongGender'
    ).textContent = `Gênero: ${music.gender}`

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
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Nome.'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }
    const NomeExiste = data[0].some(
        (playlist) =>
            playlist.title.toLowerCase() ===
            formAddPlaylistInputNome.value.trim().toLowerCase()
    )
    if (NomeExiste) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'O Nome já existe, escolha outro.'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (formAddPlaylistInputGenero.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Gênero.'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    const generoExiste = data[0].some(
        (playlist) =>
            playlist.gender.toLowerCase() ===
            formAddPlaylistInputGenero.value.trim().toLowerCase()
    )
    if (generoExiste) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'O gênero já existe, escolha outro.'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (textareaDescricao.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Descrição.'
        setTimeout(() => {
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
        warning.textContent = 'Internal Error'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Playlist added successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Playlist adicionada com sucesso!'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        formAddPlaylistInputNome.value = ''
        formAddPlaylistInputThumbnail.value = ''
        textareaDescricao.value = ''
        formAddPlaylistInputGenero.value = ''
        formAddPlaylistPreviewThumbnail.src = ''
        formAddPlaylist.classList.add('hidden')
        document.body.style.overflow = 'auto'

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

        timerFormsong = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (extrairIdDoVideo(formSongAddInputID.value.trim()) === null) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'ID do YouTube inválido.'
        formSongAddInputID.focus()
        timerFormsong = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    const dataResponse = {
        videoId: extrairIdDoVideo(formSongAddInputID.value.trim()),
        gender: changedData.playlistName,
        theme: 'Original',
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
        timerFormsong = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Music added successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Música adicionada com sucesso!'
        timerFormsong = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        formSongAddInputID.value = ''
        formAddSong.classList.add('hidden')
        containerPlaylistToManage.classList.add('hidden')
        document.body.style.overflow = 'auto'
        await dataFetch()
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
        timerFormEditSong = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        return
    }

    if (extrairIdDoVideo(formSongEditInputID.value.trim()) === null) {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'ID do YouTube inválido.'
        formSongEditInputID.focus()
        timerFormsong = setTimeout(() => {
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
        }
    )

    const result = await response.json()

    if (result.message != 'Music updated successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'ID do YouTube inválido.'
        timerFormEditSong = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Music updated successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Música atualizada com sucesso!'
        timerFormEditSong = setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        formSongEditInputID.value = ''
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
    const response = await fetch(
        `/songs/${changedData.songId}?userId=${userData._id}`,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    )

    const result = await response.json()

    if (result.message != 'Music removed successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Internal Error'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Music removed successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Música deletada com sucesso!'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        formDeleteSong.classList.add('hidden')
        focusSong.classList.add('hidden')
        containerPlaylistToManage.classList.add('hidden')
        document.body.style.overflow = 'auto'
        await dataFetch()
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
        setTimeout(() => {
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
        }
    )

    const result = await response.json()

    if (result.message != 'Playlist and songs removed successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Internal Error'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Playlist and songs removed successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Playlist deletada com sucesso!'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

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
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Nome.'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        return
    }

    if (formPlaylistEditInputGender.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo Gênero.'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

        return
    }

    if (formPlaylistEditDescription.value.trim() === '') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Por favor, preencha o campo descrição.'
        setTimeout(() => {
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
        }
    )

    const result = await response.json()

    if (result.message != 'Playlist updated successfully!') {
        warning.classList.remove('hidden')
        warning.classList.remove('success')
        warning.textContent = 'Internal Error'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)
        return
    }

    if (result.message == 'Playlist updated successfully!') {
        warning.classList.remove('hidden')
        warning.classList.add('success')
        warning.textContent = 'Playlist atualizada com sucesso!'
        setTimeout(() => {
            warning.classList.add('hidden')
        }, 3000)

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
        document.querySelector('#userPersonImgMobile').src =
            userData.profilePicture
    }
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
        formSongAddInputID.focus()
    })
    btnAddSongMobile.addEventListener('click', () => {
        formAddSong.classList.remove('hidden')
        formSongAddInputID.focus()
    })
    btnAddPlaylist.addEventListener('click', () => {
        formAddPlaylist.classList.remove('hidden')
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
}

inicia()
