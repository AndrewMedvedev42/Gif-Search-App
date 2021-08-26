import {GIPHY_API_KEY} from "@env"

export const GifByNameURL = (e) => {
    return `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${e}&limit=20&offset=0&rating=g&lang=en`
}

export const GifByIdURL = (e) => {
    return `https://api.giphy.com/v1/gifs/${e}?api_key=${GIPHY_API_KEY}`
}