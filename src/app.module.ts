import { Module } from '@nestjs/common';
import { TracksController } from './controllers/tracks.controller';
import { TracksService } from './services/tracks.service';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PlaylistController } from './controllers/playlist.controller';
import { PlaylistService } from './services/playlist.service';
import { ArtistaController } from './controllers/artista.controller';
import { ArtistaService } from './services/artista.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
  ],
  controllers: [TracksController, PlaylistController, ArtistaController],
  providers: [TracksService, PlaylistService, ArtistaService],
})
export class AppModule {}
