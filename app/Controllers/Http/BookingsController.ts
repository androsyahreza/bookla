import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Booking from 'App/Models/Booking'
import Field from 'App/Models/Field'
import FormBookingValidator from 'App/Validators/FormBookingValidator'

export default class BookingsController {
  public async index({response}: HttpContextContract) {
    const allBooking = await Booking.all()
    return response.ok({
      message: "Successfully display venues data",
      data: allBooking
    })
  }

  public async store({request, response, auth, params}: HttpContextContract) {
    const field = await Field.findByOrFail('id', params.field_id)
    const user = auth.user!
    const payload = await request.validate(FormBookingValidator)
    
    const booking = new Booking()
    booking.playDateStart = payload.play_date_start
    booking.playDateEnd = payload.play_date_end
    booking.title = payload.title

    booking.related('field').associate(field)
    
    user.related('myBookings').save(booking)

    return response.created({status: 'success', data: booking})
  }

  public async show({params, response}: HttpContextContract) {
    const booking = await Booking.query()
      .where('id', params.id)
      .preload('players', (userQuery) => {
        userQuery.select(['name', 'email', 'id '])
      }).withCount('players')
      .firstOrFail()
    //let rawData = JSON.stringify(booking)
    //let dataWithCount = {...JSON.parse(rawData), players_count : booking.$extras.players_count}
    return response.ok({status: 'success', data: booking})
  }

  public async join({response, auth, params}: HttpContextContract) {
    const booking = await Booking.findOrFail(params.id)
    let user = auth.user!

    await booking.related('players').attach([user.id])

    return response.ok({status: 'Success', data : 'successfully join'})
  }

  public async unjoin({params, response, auth}: HttpContextContract) {
    const booking = await Booking.findOrFail(params.id)
    const user = auth.user!
    await booking.related('players').detach([user.id])

    return response.ok({status: 'success', data: 'successfully unjoin'})
  }

  public async schedules({response}: HttpContextContract) {
    const schedule = await Database.table('schedules')

    return response.ok({status: 'Success', data : schedule})
  }
  
}
