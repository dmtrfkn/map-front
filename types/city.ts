export interface City {
  name: string;
  regions: Region[];
}

export interface Region {
  name: string;
  coordinates: Cordinates[];
}

export type Cordinates = [number, number];
