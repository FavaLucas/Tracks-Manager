import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TracksService } from '../services/tracks.service';
import { iTrack } from 'src/model/track.model';
// import { tracks } from '../services/tracks.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlaylistService } from 'src/services/playlist.service';
import { iPlaylist } from 'src/model/playlist.model';

@Controller('/api/playlist')
export class PlaylistController {
  constructor(private readonly playlistservice: PlaylistService) { }

  @Get()
  getPlaylist(): Promise<iPlaylist[]> {
    
    return this.playlistservice.getPlaylist();
  }

  @Get('/:id')
  getPlaylistById(@Param() params: any): Promise<iPlaylist> | string {
    const { id } = params;
    const playlist = this.playlistservice.getPlaylistById(id);
    if (playlist) {
      return playlist;
    }
    return 'No se encontro Playlist'
  }

  @Put('/add/:id')
  async agregarTrackAPlaylistByID(@Param() params: any, @Body() body: iTrack): Promise<iPlaylist | string> {
    const newTrack = body;
    const { id } = params;
    let newPlaylist = this.playlistservice.getPlaylistById(id);

    (await newPlaylist).tracks.push(newTrack);
    (await newPlaylist).cantCanciones = (await newPlaylist).tracks.length;
    if (newPlaylist) {
      return newPlaylist;
    }
    return 'No se encontro la Playlist correspondiente al ID indicado.';
  }

  @Delete('/delete/:id')
  async eliminarTrackDePlaylist(@Param() params: any, @Body() body: iTrack): Promise< string | iPlaylist>  {
    const trackID = body;
    const { id } = params;
    let newPlaylist = this.playlistservice.eliminarTrackDePlaylistByID(id, trackID);
    if (newPlaylist) {
      return newPlaylist;
    }
    return 'No se encontró la playlist ';
  }

  // Borrar playList entera
  @Delete('/:id')
  eliminarPlaylistByID(@Param() idPlaylist: number): string {
    this.eliminarPlaylistByID(idPlaylist);
    return 'Se ha borrado la playlist con exito';
  }

}
