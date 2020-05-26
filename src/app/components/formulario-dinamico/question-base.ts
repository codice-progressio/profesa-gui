export class QuestionBase<T> {
  value: T
  key: string
  label: string
  required: boolean
  order: number
  controlType: string
  type: string
  options: { key: string; value: string }[]
  classForGroup: string

  constructor(
    options: {
      value?: T
      key?: string
      label?: string
      required?: boolean
      order?: number
      controlType?: string
      type?: string
      classForGroup?: string
    } = {}
  ) {
    this.value = options.value
    this.key = options.key || ''
    this.label = options.label || ''
    this.required = !!options.required
    this.order = options.order === undefined ? 1 : options.order
    this.controlType = options.controlType || ''
    this.type = options.type || ''
    this.classForGroup = options.classForGroup || 'col-12'
  }
}

