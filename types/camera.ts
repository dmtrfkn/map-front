export type State = 'online' | 'offline' | 'disable';

export interface Camera {
  ipadress: number;
  id: number;
  lat: number;
  lng: number;
  isOnline: State;
}
