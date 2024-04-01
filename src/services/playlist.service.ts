import { Injectable } from '@nestjs/common';
import { iPlaylist } from 'src/model/playlist.model';
import { iTrack } from 'src/model/track.model';
import { UsuarioService } from './usuario.service';

const BASE_URL = "http://localhost:3031/playlist";

const playlistsMusic: iPlaylist[] = [
  {
    id: 1,
    duration: 100,
    title: 'rock nacional',
    cantCanciones: 10,
    tracks: [
      { id: 1, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
      { id: 15, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
      { id: 3, artist: 'Poul McCarney', duration: 200, title: 'Let it be' },
    ],
    estilo: 'rock & roll',
  },
  {
    id: 2,
    duration: 180,
    title: 'pop internacional',
    cantCanciones: 7,
    tracks: [
      { id: 4, artist: 'madonna ', duration: 2, title: 'Let it be' },
      { id: 5, artist: 'Adelle', duration: 2, title: 'Let it be' },
      { id: 6, artist: 'Bruno Mars', duration: 5, title: 'Let it be' },
    ],
    estilo: 'pop',
  },
  {
    id: 3,
    duration: 180,
    title: 'urbano ',
    cantCanciones: 3,
    tracks: [
      { id: 4, artist: 'duki ', duration: 2.6, title: 'Let it be' },
      { id: 5, artist: 'tini', duration: 2.4, title: 'Let it be' },
      { id: 6, artist: 'fmk', duration: 5.3, title: 'Let it be' },
    ],
    estilo: 'pop',
  },
  {
    id: 4,
    duration: 180,
    title: 'urbano ',
    cantCanciones: 3,
    tracks: [
      { id: 4, artist: 'duki ', duration: 2.6, title: 'Let it be' },
      { id: 5, artist: 'tini', duration: 2.4, title: 'Let it be' },
      { id: 6, artist: 'fmk', duration: 5.3, title: 'Let it be' },
    ],
    estilo: 'pop',
  }
];
@Injectable()
export class PlaylistService {
  constructor(private readonly usuarioService: UsuarioService) {
    usuarioService.setPlayListService(this);
  }


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

  async eliminarPlaylistByID(playlistID: number): Promise<string> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    const existe = this.usuarioService.buscarPlaylistEnUsuario(playlistID);

    const newPlaylist = parsed.findIndex((plMusic) => plMusic.id == playlistID);
    if (newPlaylist != -1 && !existe) {
      //la borramos
    
      
      parsed.splice(newPlaylist, 1);
      console.log("playlistsMusic", parsed);

      return "Se borro la playlist"
    } else {
      return "Con el id indicado no se pudo borrar la playlist"
    }
  }
  
  private existeTrackArtist(tracks: iTrack[], artist: string): boolean {
    return (
      tracks.filter((tr) => {
        return tr.artist.toUpperCase().includes(artist.toUpperCase());
      }).length > 0
    );
  }

  getPlaylist2(artist: string, playlistName: string): iPlaylist[] {
    console.log(playlistName);
    let playToReturn = [...playlistsMusic];
    playToReturn = playToReturn.filter((pl: iPlaylist) => {
      return (
        (!playlistName ||
          pl.title.toUpperCase().includes(playlistName.toUpperCase())) &&
        (!artist || this.existeTrackArtist(pl.tracks, artist))
      );
    });
    return playToReturn;
  }
  getPlaylistById2(id: number) {
    return playlistsMusic.find((playlist) => playlist.id == id);
  }

  putNewTrackToPlaylist(id: number, newTrack: iTrack): iPlaylist | string {
    const playlist = playlistsMusic.find((pl) => pl.id == id);
    if (playlist) {
      playlist.tracks.push(newTrack);
      playlist.cantCanciones = playlist.tracks.length;
      return playlist;
    }
    return 'la playlist no existe';
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