import type { HttpContextContract, } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'
import {schema} from '@ioc:Adonis/Core/Validator' 
// import Mail from '@ioc:Adonis/Addons/Mail'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  public async register({request, response}: HttpContextContract) {
    try {
      const payload = await request.validate(RegisterValidator)
      const newUser = await User.create({
        name: payload.name,
        role: payload.role,
        email: payload.email,
        password: payload.password
      })
      // let otp_code: number = Math.floor(100000 + Math.random() * 900000)
      // await Database.table('otp_codes').insert({otp_code: otp_code, user_id: newUser.id})
      // await Mail.send((message) => {
      //   message
      //     .from('admin@sanberdev.com')
      //     .to(payload.email)
      //     .subject('Welcome Onboard!')
      //     .htmlView('mail/otp_verification', { name: payload.name, otp_code: otp_code })
      // })
      return response.created({status: 'Success', data: newUser, message: "Register Success, Please verify your otp code"})
    } catch (error) {
      response.badRequest({
        message: error.message
      })  
    }
  }
  public async login({ auth, request, response}: HttpContextContract) {
    try {
      const loginSchema = schema.create({
        email: schema.string({trim: true}),
        password: schema.string({trim: true})
      })
      const payload = await request.validate({schema: loginSchema})
      const token = await auth.use('api').attempt(payload.email, payload.password)
      return response.ok({status: 'Success', data: token})
    } catch (error) {
      response.badRequest({
        message: error.message
      })
    }
  }

  public async otp_verification({request, response}) {
    const otp_code = request.input('otp_code')
    const email = request.input('email')
    
    const user = await User.findByOrFail('email', email)
    const dataOtp = await Database.from('otp_codes').where('otp_code', otp_code).firstOrFail()
    if(user.id === dataOtp.user_id) {
      user.isVerified = true
      await user.save()

      return response.ok({status: 'Success' })
    } else {
      return response.badRequest({status: 'error'})
    }
    
  }
}

