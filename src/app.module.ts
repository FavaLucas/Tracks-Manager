import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TracksController } from './controllers/tracks.controller';
import { TracksService } from './services/tracks.service';
import { PlaylistController } from './controllers/playlist.controller';
import { PlaylistService } from './services/playlist.service';
import { ArtistaController } from './controllers/artista.controller';
import { ArtistaService } from './services/artista.service';
import { UsuarioService } from './services/usuario.service';
import { usuarioController } from './controllers/usuario.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
  ],
  controllers: [TracksController, PlaylistController, ArtistaController, UsuarioService],
  providers: [TracksService, PlaylistService, ArtistaService, usuarioController],
})
export class AppModule {}
