import { Movie } from "@models/entity/Movie"
import { getRepository } from "typeorm"

export const convertMovieRequest = (body) => {
  const {
    title,
    subtitle,
    resume,
    gender,
    classification,
    image,
    director,
    writter,
    studio,
    actors,
    awards,
    note,
  } = body

  let dateFormatted = body.releaseDate.split("/")
  dateFormatted = `${dateFormatted[1]}/${dateFormatted[0]}/${dateFormatted[2]}`

  const newMovie = new Movie()

  newMovie.title = title
  newMovie.subtitle = subtitle
  newMovie.resume = resume
  newMovie.gender = gender
  newMovie.classification = classification
  newMovie.image = image
  newMovie.releaseDate = dateFormatted && new Date(dateFormatted)
  newMovie.director = director
  newMovie.writter = writter
  newMovie.studio = studio
  newMovie.actors = actors && actors.split(",")
  newMovie.awards = awards && awards.split(",")
  newMovie.note = note && Number(note)

  return newMovie
}
