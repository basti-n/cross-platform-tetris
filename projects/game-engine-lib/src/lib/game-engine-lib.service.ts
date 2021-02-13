import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameEngineLibService {

  constructor() { }

  public get testing(): string {
    return 'GameEngineLibService works!'
  }
}
