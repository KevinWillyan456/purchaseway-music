const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'API_YOUTUBE_KEY']

const checkEnvVars = (): void => {
    const missingVars = requiredEnvVars.filter((key) => !process.env[key])

    if (missingVars.length > 0) {
        console.error(
            'Server configuration error: Missing environment variables'
        )
        console.error(`Missing variables: ${missingVars.join(', ')}`)
        process.exit(1)
    }
}

export { checkEnvVars }
