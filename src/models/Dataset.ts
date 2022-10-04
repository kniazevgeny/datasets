export interface Dataset {
  showSkeleton: boolean,
  name: string
  _id: string
  fileName: string
  externalLink?: string
  originalPredictor?: string
  origin: string
  size: number
  symmetrized: boolean
  available: boolean
  source?: string
  mutations: string
  proteins: number
  year: number
  author?: string
  reference?: string
  doi?: string
}
