import { validateLogin } from "@controllers/auth"
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "@controllers/movie"
import { getTODO, itsWorks } from "@controllers/todo"
import { createUser, deleteUser, editUser, getUsers } from "@controllers/user"
import { User } from "@models/User"
import isAuth from "@service/isAuth"
import { getRepository } from "typeorm"

export const defineRoutes = (app) => {
  app.get("/", itsWorks)
  app.get("/todo", getTODO)
  app.post("/login", isAuth)
  app.get("/movie", getMovies)
  app.get("/movie/:id", getMovieById)
  app.post("/movie", createMovie)
  app.put("/movie/:id", updateMovie)
  app.delete("/movie/:id", deleteMovie)
  app.post("/user", createUser)
  app.get("/user", getUsers)
  app.put("/user/:id", editUser)
  app.delete("/user/:id", deleteUser)
}
