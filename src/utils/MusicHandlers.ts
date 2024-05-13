class MusicHandlers {
    public static async getVideoTitle(
        videoId: string,
        API_KEY: string
    ): Promise<string | undefined> {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`
            )
            const data = await response.json()
            return data.items[0].snippet.title || undefined
        } catch (err) {
            return undefined
        }
    }

    public static async getVideoCover(videoId: string): Promise<string> {
        const urls = [
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
            `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            `https://img.youtube.com/vi/${videoId}/default.jpg`,
        ]

        for (const url of urls) {
            try {
                const response = await fetch(url)
                if (response.ok) {
                    return url
                }
            } catch (err) {
                console.error(err)
            }
        }

        return `https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg`
    }
}

export default MusicHandlers
