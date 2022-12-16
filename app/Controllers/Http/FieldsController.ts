import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FieldValidator from 'App/Validators/FieldValidator';
import Field from 'App/Models/Field'
import Venue from 'App/Models/Venue'


export default class FieldsController {
  public async index({response}: HttpContextContract) {
    try {
      const allFields = await Field.all();
      response.ok({
        message: "Successfully display fields data",
        data: allFields
      })
    } catch (error) {
      response.badRequest({
        message: "Failed to display fields data"
      })
    }
  }

  public async store({response, request, params}: HttpContextContract) {
    try {
      const venue = await Venue.findByOrFail('id', params.venue_id)
      const payload = await request.validate(FieldValidator)
      const newField = await Field.create({
        name: payload.name,
        type: payload.type
      })

      await newField.related('venue').associate(venue);

      response.ok({
        message: "Successfully save data"
      })
    } catch (error) {
      response.badRequest({
        message: "Failed to save data",
        error: error.message
      })
    }
  }

  public async show({response, params}: HttpContextContract) {
    try {
      const field = await Field.query()
        .where('id', params.id)
        .preload('bookings', (bookingQuery) => {
          bookingQuery.select(['title', 'play_date_start', 'play_date_end'])
        })
        .firstOrFail()

      response.ok({
            message: "Successfully display ID",
            data: field
          })
    } catch (error) {
      response.badRequest({
        message: "Failed to display ID"
      })
    }
  }

  public async update({response, request, params}: HttpContextContract) {
    try {
      const updateField = await Field.findOrFail(params.id)
      updateField.name = request.input('name');
      updateField.type = request.input('type');
      await updateField.save()
        response.ok({
          message: "Successfully updated data",
        })
    } catch (error) {
      response.badRequest({
        message: "Failed to update data"
      })
    }
  }

  public async destroy({response, params}: HttpContextContract) {
    try {
      const deleteField = await Field.findOrFail(params.id)
      await deleteField.delete()
      
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
