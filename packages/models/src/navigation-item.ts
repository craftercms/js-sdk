export interface NavigationItem {
    url: string;
    active: boolean;
    subItems: Array<NavigationItem>;
    [prop: string]: any;
}
      