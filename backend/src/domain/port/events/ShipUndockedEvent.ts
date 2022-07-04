import { Event } from '@irontitan/paradox'
import { Port } from '../entity'
import ObjectID from 'bson-objectid'

interface IEventCreationParams {
  shipId: ObjectID,
  reason: string
}

export class ShipUndockedEvent extends Event<IEventCreationParams> {
  static readonly eventName = 'ship-was-undocked'
  readonly user: string

  constructor (data: IEventCreationParams, user: string) {
    super(ShipUndockedEvent.eventName, data)
    this.user = user
  }

  static commit (state: Port, event: ShipUndockedEvent): Port {
    state.dockedShips = state.dockedShips.filter((shipId) => !event.data.shipId.equals(shipId))
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}
