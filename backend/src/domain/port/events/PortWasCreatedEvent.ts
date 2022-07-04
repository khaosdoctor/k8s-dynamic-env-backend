import { Event } from '@irontitan/paradox'
import ObjectID from 'bson-objectid'
import { Port } from '../entity'
import { IPortCreationParams } from '../../structures/IPortCreationParams'

interface IEventCreationParams extends IPortCreationParams {
  id: ObjectID
}

export class PortWasCreatedEvent extends Event<IEventCreationParams> {
  static readonly eventName = 'port-was-created'
  readonly user: string

  constructor (data: IEventCreationParams, user: string) {
    super(PortWasCreatedEvent.eventName, data)
    this.user = user
  }

  static commit (state: Port, event: PortWasCreatedEvent): Port {
    state.id = event.data.id
    state.name = event.data.name
    state.dockedShips = event.data.dockedShips.map((shipId) => new ObjectID(shipId))
    state.createdAt = event.timestamp
    state.createdBy = event.user
    state.updatedAt = event.timestamp
    state.updatedBy = event.user
    return state
  }
}
