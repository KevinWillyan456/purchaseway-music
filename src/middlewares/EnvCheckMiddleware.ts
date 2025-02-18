const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'API_YOUTUBE_KEY']

const checkEnvVars = (): void => {
    console.log('🔍 Checking required environment variables...')
    const missingVars = requiredEnvVars.filter((key) => {
        const isMissing = !process.env[key]
        if (isMissing) {
            console.warn(`⚠️ Environment variable ${key} is missing`)
        } else {
            console.log(`✅ Environment variable ${key} is set`)
        }
        return isMissing
    })

    if (missingVars.length > 0) {
        console.error(
            '❌ Server configuration error: Missing environment variables',
        )
        console.error(`❌ Missing variables: ${missingVars.join(', ')}`)
        process.exit(1)
    }

    if (process.env.EMAIL_USER && !process.env.EMAIL_PASS) {
        console.error(
            '❌ Server configuration error: EMAIL_USER is defined but EMAIL_PASS is missing',
        )
        process.exit(1)
    }

    if (!process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        console.error(
            '❌ Server configuration error: EMAIL_PASS is defined but EMAIL_USER is missing',
        )
        process.exit(1)
    }

    console.log('✅ All required environment variables are set')
    console.log('🚀 Starting server...')
}

export { checkEnvVars }
