export interface Item {
  name: string;
  url: string;
  descriptorUrl: string;
  desriptorDom: Object;
  folder: boolean;
  [prop: string]: any;
}
