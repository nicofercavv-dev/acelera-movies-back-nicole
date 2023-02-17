import { Movie } from "@models/Movie"

export const convertMovieRequest = (body) => {
  const {
    title,
    subtitle,
    resume,
    gender,
    classification,
    image,
    releaseDate,
    director,
    writter,
    studio,
    actors,
    awards,
    note,
  } = body

  const newMovie = new Movie()

  newMovie.title = title
  newMovie.subtitle = subtitle
  newMovie.resume = resume
  newMovie.gender = gender
  newMovie.classification = classification
  newMovie.image = image
  newMovie.releaseDate = releaseDate ? new Date(releaseDate) : null
  newMovie.director = director
  newMovie.writter = writter
  newMovie.studio = studio
  newMovie.actors = actors && actors.split(",")
  newMovie.awards = awards && awards.split(",")
  newMovie.note = note && Number(note)

  return newMovie
}
