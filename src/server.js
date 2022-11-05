const Hapi = require('@hapi/hapi')
const {videoHandler} = require('./handler')

const init = async () => {
    const server = Hapi.server({
        host: process.env.NODE_ENV !== "production" ? 'localhost' : '0.0.0.0',
        port: 5000
    })

    server.route([
        {
            method: 'POST',
            path: '/video',
            handler: videoHandler
        }
    ])

    await server.start();
    console.log(`Server running on ${server.info.uri}`)
}

init()