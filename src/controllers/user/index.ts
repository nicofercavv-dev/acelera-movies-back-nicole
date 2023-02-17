import { Movie } from "@models/Movie"
import { User } from "@models/User"
import { validate } from "class-validator"
import { getRepository } from "typeorm"
import md5 from "md5"

export const createUser = async (req, res) => {
  try {
    const userRequest = req.body

    userRequest.password = md5(userRequest.password)

    const userRepository = getRepository(User)
    const newUser = userRepository.create(userRequest)
    const errors = await validate(newUser)

    if (errors.length > 0) {
      return res.status(400).json(errors)
    }

    await userRepository.save(newUser)

    return res.status(200).json({ status: "200", message: "sucesso" })
  } catch (error) {
    return res.status(500).json({ status: "500", message: "falha" })
  }
}

export const getUsers = async (req, res) => {
  try {
    const userRepository = getRepository(User)
    const users = await userRepository.find({
      order: { id: "ASC" },
      select: ["id", "login", "password"],
    })

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const editUser = async (req, res) => {
  try {
    const { id } = req.params
    const { login, password } = req.body

    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ where: { id } })

    if (login) {
      user.login = login
    }
    if (password) {
      user.password = md5(password)
    }

    await userRepository.save(user)

    return res.status(200).json({ message: "atualizado com sucesso" })
  } catch (error) {
    return res.status(500).json(error)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const userRepository = getRepository(User)
    await userRepository.delete({ id })

    return res.status(200).json({ message: "apagado com sucesso" })
  } catch (error) {
    return res.status(500).json(error)
  }
}
