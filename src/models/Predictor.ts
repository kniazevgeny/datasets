export interface Predictor {
  predictor: string
  input: string
  algorithm_0: string
  algorithm_1: string
  datasets: object
  meta: boolean
  cv?: string
  multiple_point_mutations: boolean
  complexes: boolean
  hrm_dataset: boolean
  hrm_check: boolean
  compared_tools?: string
  metrics?: string
  T: boolean
  ph: boolean
  author: string
  year: number
  doi: string
  reference: string
  download?: string
  server?: string
}
