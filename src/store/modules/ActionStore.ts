import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Action } from '@/models/Action'

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  _actions: Action[] = []
  private startingTimestamp: number = Date.now()

  @Mutation
  pushAction(action: Action) {
    if (action.type === 'click') {
      this._actions.push({
        type: action.type,
        page_href: action.page_href,
        btn_id: action.btn_id,
        timestamp: action.timestamp - this.startingTimestamp,
        startingTimestamp: this.startingTimestamp
      })
    } else if (action.type === 'intersect') {
      this._actions.push({
        type: action.type,
        page_href: action.page_href,
        intersect_id: action.intersect_id,
        timestamp: action.timestamp - this.startingTimestamp,
        startingTimestamp: this.startingTimestamp
      })
    }
  }

  @Mutation
  clearActions() {
    this._actions = []
  }
}
