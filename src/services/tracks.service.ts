import { Injectable } from '@nestjs/common';
import { iTrack } from 'src/model/track.model';

const BASE_URL = "http://localhost:3030/tracks";

@Injectable()
export class TracksService {
  async getTracks(): Promise<iTrack[]> {
    const res = await fetch(BASE_URL);
    // console.log(res);
    const parsed = await res.json();
    return parsed;
  }
  
  async getTrackById(id: number): Promise<iTrack> {
    const res = await fetch(BASE_URL);
    console.log(res);
    console.log(id);
    const parsed = await res.json();
    return parsed.find((tr) => tr.id == id);
  }
  
  async createTrack(newTrack: iTrack): Promise<iTrack> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    const newID = new Date().getTime();
    const trCreated = {
      ...newTrack,
      id: newID,
    };
    parsed.push(trCreated);
    return trCreated;
  }
  
  async deleteTrack(id: number): Promise<void> {
    const res = await fetch(BASE_URL);
    let parsed = await res.json();
    parsed = parsed.filter((tr) => tr.id != id);
  }
  
  async updateTrack(id: number, newTrack: iTrack): Promise<iTrack> {
    const res = await fetch(BASE_URL);
    let parsed = await res.json();
    const tr = parsed.find((tr) => tr.id == id);
    tr.artist = newTrack.artist;
    tr.duration = newTrack.duration;
    tr.title = newTrack.title;
    return tr;
  }
}

// export let tracks: iTrack[] = [
//   { id: 14, artist: 'John Lennon', duration: 2.5, title: "Let it Be" },
//   { id: 15, artist: 'Paul McCartney', duration: 2.1, title: "Imagine" },
//   { id: 16, artist: 'Megadeth', duration: 6.8, title: "Tornado of Soul" },
//   { id: 17, artist: 'Rammstein', duration: 3.5, title: "Sonne" }
// ];
