export interface FilterItem {
  name?: string;
  filter: ((filterQuery: object) => void) | string;
}
