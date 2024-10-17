import { Schema, model } from "mongoose";


const moviesSchema = new Schema({
    
    title: {
        type: String,
        unique: true,
        required : true
    },
    director: {
        type: String,
        required : true
    },
    duration: {
        type: Number,
        required : true
    },
    poster: {
        type: String,
        required : true
    },
    rate: {
        type: Number,
        required : true
    },
    genres: [String]
}, {versionKey: false, })

export const movieConnection = model('movie', moviesSchema)