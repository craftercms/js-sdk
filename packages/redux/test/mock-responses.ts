import { Item, Descriptor } from "models";

export const item:Item = {
  name: "test",
  url: "/",
  descriptorUrl: "test",
  desriptorDom: new Object(),
  folder: false
}

export const descriptor:Descriptor = {
  page: {
    "objectId": "8d7f21fa-5e09-00aa-8340-853b7db302da"
  }
}

export const children:Array<Item> = [
  item
];

export const navItem = {
  url: "/",
  active: true,
  subItems: []
}

export const tree = { ...item, children: [] }