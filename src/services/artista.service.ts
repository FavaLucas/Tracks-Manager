import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { iArtista } from "src/model/artista.model";

let artistas: iArtista[] = [
  {
    "id": 0,
    "nombre": "Hola1",
    "temasCompuestos": [{ "id": 1, "title": "Hola1", "duration": 1, "artist": "Hola1" },
                        { "id": 2, "title": "Hola2", "duration": 2, "artist": "Hola1" },
                        { "id": 3, "title": "Hola3", "duration": 3, "artist": "Hola1" }],
    "playLists" : [0,1,4]
  },
  {
    "id": 1,
    "nombre": "Hola2",
    "temasCompuestos": [{ "id": 4, "title": "Hola4", "duration": 1, "artist": "Hola2" },
                        { "id": 5, "title": "Hola5", "duration": 2, "artist": "Hola2" },
                        { "id": 6, "title": "Hola6", "duration": 3, "artist": "Hola2" }],
    "playLists" : [0,1,4]
  },
  {
    "id": 2,
    "nombre": "Hola3",
    "temasCompuestos": [{ "id": 7, "title": "Hola7", "duration": 1, "artist": "Hola3" },
                        { "id": 8, "title": "Hola8", "duration": 2, "artist": "Hola3" },
                        { "id": 9, "title": "Hola9", "duration": 3, "artist": "Hola3" }],
    "playLists" : [0,1,4]
  }
]

@Injectable()
export class ArtistaService {
  getArtistas(): iArtista[] {
    if (artistas) {
      return artistas;
    }
  }

  getArtistaByID(id: number): iArtista {
    let artistaBuscado = artistas.find((ar) => ar.id == id);
    if (artistaBuscado) {
      return artistaBuscado;
    }
    throw new HttpException('El Artista con ID indicado no existe', HttpStatus.NOT_FOUND);
  }

  private setID(): number {
    const ultimoID = artistas.length - 1;
    const nuevoID = ultimoID + 1;
    return nuevoID;
  }

  postNuevoArtista(nuevoArtista: iArtista): iArtista {
    const id = this.setID();
    if (nuevoArtista != null) {
      const newArtista = { id, ...nuevoArtista }
      if (newArtista) {
        const buscarArtista = artistas.find((ar) => ar.nombre == newArtista.nombre)
        if (!buscarArtista) {
          artistas.push(newArtista);
          return artistas[id - 1];
        }
        throw new HttpException('Ya existe el artista', HttpStatus.BAD_REQUEST);
      }
      // Por que no me toma esta linea? 
      // Esta de mas por que no cumple la condicion para llegar al service
      throw new HttpException('No se pudo crear el artista, intente de nuevo', HttpStatus.BAD_REQUEST);
    }
  }
}