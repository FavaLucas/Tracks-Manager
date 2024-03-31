import { iTrack } from "./track.model";

export interface iArtista {
  id?: number,
  nombre: string,
  temasCompuestos: iTrack[],
  playLists: number[],
} 