export interface Dataset {
  name: string
  _id: string
  externalLink?: string
  originalPredictor?: string
  isOriginal: boolean
  size: number
  doubled: boolean
  source?: string
  type: string
  proteins: number
  doi?: string
}
