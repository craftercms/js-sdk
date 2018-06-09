export interface Page {
  'content-type': string;
  placeInNav: boolean;
  objectId: string;
  objectGroupId: string;
  sections: Array<{
    item: Array<{
      key: string;
      value: string;
      component: any;
      disableFlattening: 'false' | 'true';
    }>
  }>
}
