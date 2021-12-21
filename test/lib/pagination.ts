export type Order = 'ASC' | 'DESC'

export interface PaginationParams {
  cursor?: number
  isNext?: boolean
  size?: number
  order?: Order
}
