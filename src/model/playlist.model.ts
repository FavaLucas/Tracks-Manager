import { iTrack } from "./track.model";

export interface iPlaylist {
  id?: number;
  title: string;
  duration: number;
  cantCanciones: number;
  tracks: iTrack[];
  estilo: string;
}

