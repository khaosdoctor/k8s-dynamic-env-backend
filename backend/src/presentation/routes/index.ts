import { factory as shipCreate } from './ship/create'
import { factory as shipDelete } from './ship/delete'
import { factory as shipFind } from './ship/find'
import { factory as shipGetAll } from './ship/getAll'
import { factory as shipDock } from './ship/dock'
import { factory as shipDepart } from './ship/depart'
import { factory as shipGetEvents } from './ship/getEvents'
import { factory as portCreate } from './port/create'
import { factory as portDelete } from './port/delete'
import { factory as portFind } from './port/find'
import { factory as portGetAll } from './port/getAll'
import { factory as portGetEvents } from './port/getEvents'

export const routes = {
  ship: {
    create: shipCreate,
    delete: shipDelete,
    find: shipFind,
    getAll: shipGetAll,
    dock: shipDock,
    depart: shipDepart,
    getEvents: shipGetEvents
  },
  port: {
    create: portCreate,
    delete: portDelete,
    find: portFind,
    getAll: portGetAll,
    getEvents: portGetEvents
  }
}
