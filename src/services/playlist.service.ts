import { Injectable } from '@nestjs/common';
import { iPlaylist } from 'src/model/playlist.model';
import { iTrack } from 'src/model/track.model';

const BASE_URL = "http://localhost:3031/playlist";

@Injectable()
export class PlaylistService {
  async getPlaylist(): Promise<iPlaylist[]> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    return parsed;
  }
  async getPlaylistById(id: number): Promise<iPlaylist> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    return parsed.find((pl) => pl.id == id);
  }
  
  async agregarTrackAPlaylistByID(id: number, newTrack: iTrack): Promise<iPlaylist> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    let newPlaylist = parsed.find((pl) => pl.id == id);
    newPlaylist.tracks.push(newTrack);
    newPlaylist.cantCanciones = newPlaylist.tracks.length;
    return newPlaylist;
  }
  
  async eliminarTrackDePlaylistByID(playlistID: number, trackID: iTrack): Promise<string | iPlaylist> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    const newPlaylist = parsed.find((pl) => pl.id == playlistID);
    const index = newPlaylist.tracks.findIndex((tr) => tr.id == trackID.id);
    for (let i = 0; i < newPlaylist.tracks.length; i++) {
      if (newPlaylist.tracks[i].id == trackID.id) {
        newPlaylist.tracks.splice(index, 1);
        newPlaylist.cantCanciones = newPlaylist.tracks.length;
        return newPlaylist;
      }
    }
    return 'No se encontró el track en la playlist';
  }
}

// export let tracks: iTrack[] = [
//   { id: 14, artist: 'John Lennon', duration: 2.5, title: "Let it Be" },
//   { id: 15, artist: 'Paul McCartney', duration: 2.1, title: "Imagine" },
//   { id: 16, artist: 'Megadeth', duration: 6.8, title: "Tornado of Soul" },
//   { id: 17, artist: 'Rammstein', duration: 3.5, title: "Sonne" }
// ];

// export let playlist: iPlaylist[] = [
//   {
//     id: 1,
//     duration: 100,
//     title: 'rock nacional',
//     cantCanciones: 10,
//     tracks: [
//       { id: 1, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
//       { id: 2, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
//       { id: 3, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
//     ],
//     estilo: 'rock & roll',
//   },
//   {
//     id: 2,
//     duration: 180,
//     title: 'pop internacional',
//     cantCanciones: 7,
//     tracks: [
//       { id: 4, artist: 'madonna ', duration: 2, title: 'Let it be' },
//       { id: 5, artist: 'Adelle', duration: 2, title: 'Let it be' },
//       { id: 6, artist: 'Bruno Mars', duration: 5, title: 'Let it be' },
//     ],
//     estilo: 'pop',
//   },
//   {
//     id: 3,
//     duration: 180,
//     title: 'urbano ',
//     cantCanciones: 3,
//     tracks: [
//       { id: 4, artist: 'duki ', duration: 2.6, title: 'Let it be' },
//       { id: 5, artist: 'tini', duration: 2.4, title: 'Let it be' },
//       { id: 6, artist: 'fmk', duration: 5.3, title: 'Let it be' },
//     ],
//     estilo: 'pop',
//   }
// ];