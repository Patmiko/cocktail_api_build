import User from "#models/user";
import { HttpContext } from "@adonisjs/core/http";

export default class AuthController {
    public async register({ request, response }: HttpContext) {
        try {
        const data = request.only(['email', 'password'])
        if(!data.email || !data.password){
          return {message:"No inputs provided for email/password"}
        }
        const user = await User.create(data)
        return response.created(user)
        } catch (error) {
            return {message:'Email already in use'}
        }
      }
    
      public async generatetoken({ request, response }: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        try {
          const user = await User.verifyCredentials(email,password)
          const token = User.accessTokens.create(user,['*'],{expiresIn: '7 days'})

          return {
            user: user.email,
            type: 'bearer',
            value: (await token).value?.release()
          }
        } catch {
          return response.unauthorized({ message: 'Invalid credentials' })
        }
      }
}