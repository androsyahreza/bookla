import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Field from 'App/Models/Field'
import User from 'App/Models/User'

export default class Booking extends BaseModel {
  public serializeExtras = true

  @column({ isPrimary: true })
  public id: number

  @column.dateTime()
  public playDateStart: DateTime

  @column.dateTime()
  public playDateEnd: DateTime

  @column()
  public title: string

  @column()
  public userId: number

  @column()
  public fieldId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Field)
  public field: BelongsTo<typeof Field>

  @belongsTo(() => User)
  public bookingUser: BelongsTo<typeof User>

  @manyToMany(() => User, {
    pivotTable: 'schedules'
  })
  public players: ManyToMany<typeof User>

}
