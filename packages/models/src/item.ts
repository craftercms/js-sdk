import { Descriptor } from "./descriptor";

export interface Item {
  name: string;
  url: string;
  descriptorUrl: string;
  descriptorDom: Descriptor;
  folder: boolean;
  [prop: string]: any;
}
