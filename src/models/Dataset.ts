export interface Dataset {
  name: string
  _id: string
  fileName: string
  externalLink?: string
  originalPredictor?: string
  isOriginal: boolean
  size: number
  doubled: boolean
  source?: string
  type: string
  proteins: number
  year: number
  doi?: string
}
