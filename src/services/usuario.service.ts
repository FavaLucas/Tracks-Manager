import { Injectable } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import Usuario from 'src/model/usuario.model';


let usuarios: Usuario[] = [
    {
        id: 1,
        nombre: "Marito",
        playlist: [1]
    },
    {
        id: 2,
        nombre: "Lucas",
        playlist: [1]
    },
    {
        id: 3,
        nombre: "Kevin",
        playlist: [1]
    },
    {
        id: 4,
        nombre: "Fran",
        playlist: [1]
    }
];

@Injectable()
export class UsuarioService {
    private plservice?: PlaylistService;
    // static setPlayListService: any;
    constructor() { }

    setPlayListService(plservice: PlaylistService) {
        this.plservice = plservice;
    }

    //Post
    //Requiriendo nombre y apelliodo sin id de playlist

    private setID(): number {
        const ultimoID = usuarios.length - 1;
        const nuevoID = ultimoID + 1;
        return nuevoID;
    }

    postUsuario(nombreParam: string): Usuario | string {
        const nuevoUsuario: Usuario = {
            id: this.setID(),
            nombre: nombreParam,
            playlist: []
        };
        usuarios.push(nuevoUsuario);
        return "Usuario creado con exito";
    }

    postPlaylistEnUsuario(idUsuario: number, idPlaylist: number) {
        // console.log(idUser);
        const usuarioBuscado2 = usuarios.find((us2) => us2.id === idUsuario);
        // console.log("usuarioBuscado2", usuarioBuscado2);

        if (usuarioBuscado2) {
            const playlistBuscada = usuarioBuscado2.playlist.find((plNumero) => plNumero == idPlaylist);
            // console.log("Playlist Buscada", playlistBuscada);
            // console.log("idPlaylist", idPlaylist);
            if (playlistBuscada == idPlaylist) {
                return "Esa playlist ya existe"
            } else if (playlistBuscada != idPlaylist) {
                // console.log("Usuario o playlist!!", playlistBuscada || null);
                usuarioBuscado2.playlist.push(idPlaylist);
                // console.log("uSUARIO DOS 2", usuarioBuscado2);
                return usuarioBuscado2;
            }
        } else {
            return "Usuario no encontrado"
        }
    }

    //Delete
    buscarPlaylistEnUsuario(idPlaylist: number): boolean {
        //recorrer usuario por usuarioS

        for (const usuario of usuarios) {
            const playlistEncontrada = usuario.playlist.includes(idPlaylist);

            if (playlistEncontrada) {
                console.log("La playlist está siendo utilizada por al menos un usuario.");
                return true;
            }
        }
        console.log("!!!")
        // const playlistBorrada = this.plservice.eliminarPlaylistByID(idPlaylist);
        // console.log("playlistBorrada", playlistBorrada);
        // En caso de que ningun usuario contenga la playlist retorno False.
        return false

    }

    

    // const usuarioBuscado2 = usuarios.forEach((us2) => {
    //     const playlistEncontrada = us2.playlist.map((plNumber) => plNumber == idPlaylist)
    //     console.log("playlistEncontrada", playlistEncontrada);

    //     if (playlistEncontrada) {
    //         console.log("playlistEncontrada dentro del if")
    //         // return "No se puede borrar la playlist porque la tiene un usuario";
    //     } else {
    //         //Llamamos al metodo de borrar playlist porque ya sabemos que ninigun usuario la tiene
    //         const playlistBorrada = this.plservice.eliminarPlaylistByID(idPlaylist);
    //         console.log("playlistBorrada", playlistBorrada);
    //         return "Se elimino la playlist que no tenia ningun usuario"
    //     }
    // });

    // return "No se puede borrar la playlist porque la tiene un usuario"
    //recorremos las playlist de cada usuario
    //si la playlist buscada existe, no se borra
    //Si no se borra

}

