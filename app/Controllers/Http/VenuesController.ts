import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Venue from 'App/Models/Venue'
import VenueValidator from 'App/Validators/VenueValidator'


export default class VenuesController {
  public async index({response}: HttpContextContract) {
    try {
      const allVenues = await Venue.all();

      response.ok({
        message: "Successfully display venues data",
        data: allVenues
      })
    } catch (error) {
      response.badRequest({
        message: "Failed to display venues data"
      })
    }
  }

  public async store({response, request}: HttpContextContract) {
    try {
      const payload = await request.validate(VenueValidator)
      let newVenue = await Database.table('venues').returning('id').insert({
        name: payload.name,
        address: payload.address,
        phone: payload.phone
      })
      response.ok({
        message: "Successfully save data",
        data: newVenue
      })
    } catch (error) {
      response.badRequest({
        message: "Failed to save venues data"
      })
    }
  }

  public async show({response, params}: HttpContextContract) {
    try {
      const showIdVenues = await Venue.query()
        .where('id', params.id)
        .preload('fields')
        .firstOrFail()

      response.ok({
        message: "Success to display id from venues data",
        data: showIdVenues
      })
    } catch (error) {
      response.badRequest({
        message: "Failed to display id from venues data",
      })
    }
  }

  public async update({response, request, params}: HttpContextContract) {
    try {
      const payload = await request.validate(VenueValidator)
      let updated = await Venue.updateOrCreate({id: params.id}, payload)

      response.ok({
        message: "Successfully updated data",
        data: updated
      })
    } catch (error) {
      response.badRequest({
        message: "Failed to update data"
      })
    }
  }

  public async destroy({response, params}: HttpContextContract) {
    try {
      const deleteVenue = await Venue.findOrFail(params.id)
      await deleteVenue.delete()

      response.ok({
        message: "Successfully deleted data",
      })
    } catch (error) {
      response.badRequest({
        message: "Failed to delete data"
      })
    }
  }
}
