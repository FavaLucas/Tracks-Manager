import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TracksService } from '../services/tracks.service';
import { iTrack } from 'src/model/track.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Controller('/api/tracks')
export class TracksController {
  constructor(private readonly trackService: TracksService) { }

  @Get()
  getTracks(): Promise<iTrack[]> {
    return this.trackService.getTracks();
  }

  @Get('/:id')
  getTrackById(@Param() params: any): Promise<iTrack> | string {
    const { id } = params;
    const track = this.trackService.getTrackById(id);
    if (track) {
      return track;
    }
    return 'No se encontro track'
  }

  @Post()
  creatTrack(@Body() body: iTrack): Promise<iTrack> | string {
    const newTrack = body;
    const track = this.trackService.createTrack(newTrack);
    if (track) {
      return track;
    }
    return 'Fallo la creacion del track'
  }

  @Put('/:id')
  updateTrack(@Param() params: any, @Body() body: iTrack): Promise<iTrack> | string {
    const newTrack = body;
    const { id } = params;
    const track = this.trackService.updateTrack(id, newTrack);
    if (track) {
      return track
    }
    return 'Error actualizando el Track'
  }

  @Delete('/:id')
  deleteTrack(@Param() params: any): Promise<void> {
    const { id } = params;
    this.trackService.deleteTrack(id);
    return;
  }
}
