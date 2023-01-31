import { Movie } from "@models/entity/Movie"
import { convertMovieRequest } from "@service/movie/movieRequest"
import { validate } from "class-validator"
import { JsonWebKey } from "crypto"
import { response } from "express"
import { request } from "http"
import { json } from "stream/consumers"
import { getRepository } from "typeorm"

export const getMovies = async (request, response) => {
  try {
    const movieRepository = getRepository(Movie)

    let movies = await movieRepository.find({
      order: { id: "ASC" },
      select: ["id", "title", "releaseDate", "resume", "note", "image"],
    })

    return response.status(200).json(movies)
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const getMovieById = async (request, response) => {
  try {
    let { id } = request.params
    const movieRepository = getRepository(Movie)

    const movie = await movieRepository.findOne({ where: { id } })
    if (movie) {
      return response.status(200).json(movie)
    }
    return response.status(404).json({ message: "filme não encontrado" })
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const createMovie = async (request, response) => {
  try {
    const movieRequest = convertMovieRequest(request.body)
    const movieRepository = getRepository(Movie)

    const newMovieCreated = movieRepository.create(movieRequest)
    const errors = await validate(newMovieCreated)

    if (errors.length > 0) {
      return response.status(400).json(errors)
    }
    await movieRepository.save(newMovieCreated)

    return response.status(200).json({ status: "200", message: "sucesso" })
  } catch (error) {
    return response.status(500).json({ status: "500", message: "falha" })
  }
}

export const deleteMovie = async (request, response) => {
  try {
    const { id } = request.params

    await getRepository(Movie).delete({ id })

    return response.status(200).json({ Status: "204", Message: "ok" })
  } catch (error) {
    return response.status(500).json(error)
  }
}

export const updateMovie = async (request, response) => {
  try {
    const { id } = request.params
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
    } = convertMovieRequest(request.body)

    const movieRepository = getRepository(Movie)
    let movie = await movieRepository.findOne({ where: { id } })

    if (title) {
      movie.title = title
    }
    if (subtitle) {
      movie.subtitle = subtitle
    }
    if (resume) {
      movie.resume = resume
    }
    if (gender) {
      movie.gender = gender
    }
    if (classification) {
      movie.classification = classification
    }
    if (image) {
      movie.image = image
    }
    if (releaseDate) {
      movie.releaseDate = releaseDate
    }
    if (director) {
      movie.director = director
    }
    if (writter) {
      movie.writter = writter
    }
    if (studio) {
      movie.studio = studio
    }
    if (actors) {
      movie.actors = actors
    }
    if (awards) {
      movie.awards = awards
    }
    if (note) {
      movie.note = note
    }

    await movieRepository.save(movie)

    return response.status(200).json({ message: "atualizado com sucesso" })
  } catch (error) {
    return response.status(500).json(error)
  }
}
