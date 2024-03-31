import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TracksService } from './services/tracks.service';
import { TracksController } from './controllers/tracks.controller';
import { PlaylistController } from './controllers/playlist.controller';
import { PlaylistService } from './services/playlist.service';

@Module({
  imports: [],
  controllers: [AppController, TracksController, PlaylistController],
  providers: [AppService, TracksService, PlaylistService],
})
export class AppModule {}
