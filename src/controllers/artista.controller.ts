import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { iArtista } from "src/model/artista.model";
import { ArtistaService } from "src/services/artista.service";


@Controller('/api/artistas')

export class ArtistaController {
  constructor(private readonly artistaService: ArtistaService) { }

  @Get()
  getArtistas(): iArtista[] {
    return this.artistaService.getArtistas();
  }

  @Get('/:id')
  getArtistaByID(@Param('id') id: number): iArtista {
    if (id) {
      return this.artistaService.getArtistaByID(id);
    }
  }
  @Post('crear')
  postNuevoArtista(@Body() body: iArtista): iArtista {
    const nuevoArtista = body
    if (nuevoArtista.nombre && nuevoArtista.temasCompuestos){
      return this.artistaService.postNuevoArtista(nuevoArtista);
    }
    throw new HttpException('No se pudo crear el artista, complete el Body', HttpStatus.BAD_REQUEST);
  }
  

}


