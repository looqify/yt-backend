const fetch = require('node-fetch');
const ENDPOINT = 'https://youtube-search-and-download.p.rapidapi.com';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

const videoHandler = async (request, h) => {
    try {
        const {id} = request.payload
        const responseFetch = await fetch(`${ENDPOINT}/video?id=${id}`, options)
        const json = await responseFetch.json()
        if (json.videoDetails) {
            const response = h.response({
                status: 1,
                data: json
            })
            response.code(200)
            return response
        } else {
            const response = h.response({
                status: 0,
                message: 'Invalid parameters'
            })
            response.code(400)
            return response
        }
    } catch (error) {
        const response = h.response({
            status: 0,
            message: `Internal server error!`
        })
        response.code(500)
        return response
    }
}

module.exports = {videoHandler}