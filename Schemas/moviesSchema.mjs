import z from 'zod'

const movieSchema = z.object({
    title: z.string().max(255),
    director: z.string().max(255),
    duration: z.number(),
    poster: z.string().max(500),
    rate: z.number().min(0).max(10).default(0)
})

export function validateMovie(newMovie) {
    return movieSchema.safeParse(newMovie)
}

export function validatePartialMovie(newData) {
    return movieSchema.partial().safeParse(newData)
}