import {Body,Controller,Delete,Get,HttpStatus,Param,ParseIntPipe,Patch,Post,Put,Res,} from '@nestjs/common';
import Usuario from 'src/model/usuario.model';
import { UsuarioService } from 'src/services/usuario.service';

@Controller('/api/usuarios')
export class usuarioController {

    constructor(private readonly usuarioService: UsuarioService) { 
    
    }

    @Post()
    postUsuario(@Body() body: string): string {
        this.usuarioService.postUsuario(body);
        return "Se a creado un nuevo usuario";
    }

    //id susario
    //id playlist
    //
    @Post('/:idUsuario/playlist/:idPlaylist')
    postPlaylist(@Param('idUsuario', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    })) idUsuario: number, @Param('idPlaylist', new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
    })) idPlaylist: number): Usuario | string {
        //Crear en servicio un metodo para agregar una playlist al array
        return this.usuarioService.postPlaylistEnUsuario(idUsuario, idPlaylist);
    }

    @Delete('/idPlaylistParaBorrar/:idPlaylist')
    deletePlaylistSinUsar(@Param('idPlaylist') idPl: number): string {
        return this.usuarioService.deletePlaylistSinUsar(idPl);
    }
}