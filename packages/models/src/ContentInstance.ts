
export interface ContentInstance {
  craftercms: {
    id: string
    path: string
    label: string // Internal name
    dateCreated: string
    dateModified: string
    contentTypeId: string
  }
  [prop: string]: any
}
