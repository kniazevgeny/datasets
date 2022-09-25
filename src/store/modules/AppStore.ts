import { User } from './../../models/User'
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'
import { Dataset } from '@/models/Dataset'

@Module({ namespaced: true, name: 'AppStore' })
export default class AppStore extends VuexModule {
  user?: User = undefined
  language?: string = undefined
  dark = false

  browse?: any[] = undefined
  browseFilters?: any[] = undefined
  datasets?: Dataset[] = undefined
  datasetsFilters?: any[] = undefined
  predictors?: any[] = undefined
  predictorsFilters?: any[] = undefined

  @Mutation
  setUser(user?: User) {
    this.user = user
  }

  @Mutation
  setLanguage(language: string) {
    this.language = language
  }

  @Mutation
  setDatasets(datasets: Dataset[]) {
    this.datasets = datasets
  }

  @Mutation
  setDark(dark: boolean) {
    this.dark = dark
  }
}
