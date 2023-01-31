import { validateLogin } from "@controllers/auth"
import {
  createMovie,
  deleteMovie,
  getMovieById,
  getMovies,
  updateMovie,
} from "@controllers/movie"
import { getTODO, itsWorks } from "@controllers/todo"

export const defineRoutes = (app) => {
  app.get("/", itsWorks)
  app.get("/todo", getTODO)
  app.post("/login", validateLogin)
  app.get("/movie", getMovies)
  app.get("/movie/:id", getMovieById)
  app.post("/movie", createMovie)
  app.put("/movie/:id", updateMovie)
  app.delete("/movie/:id", deleteMovie)
}
