import { Descriptor } from "./descriptor";

export interface Item {
  name: string;
  url: string;
  descriptorUrl: string;
  descriptorDom: Descriptor | null;
  folder: boolean;
  [prop: string]: any;
}
