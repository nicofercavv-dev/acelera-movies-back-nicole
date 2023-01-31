import { User } from "@models/entity/User"
import { response } from "express"
import { getRepository } from "typeorm"

export const validateLogin = async (request, response) => {
  try {
    let { login, password } = request.body
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({ where: { login } })

    if (!user || (user.login === login && user.password !== password)) {
      return response.status(404).json({ auth: "false", message: "falha" })
    }
    if (user.login === login && user.password === password) {
      return response.status(200).json({ auth: "true", message: "sucesso" })
    }
  } catch (error) {
    return response.status(500).json(error)
  }
}
