import { User } from "@models/User"
import { getRepository } from "typeorm"
import md5 from "md5"

const isAuth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization.split(" ")[1]
    const encoded = Buffer.from(auth, "base64")
    const [login, password] = encoded.toString("utf-8").split(":")

    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ where: { login } })

    if (!user || md5(password) !== user.password) {
      res.status(401).json({ auth: "false", message: "Acesso negado" })
    } else if (login === user.login && md5(password) === user.password) {
      res.status(200).json({ auth: "true", message: "sucesso" })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

export default isAuth
