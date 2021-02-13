import { Component } from '@angular/core';
import { GameEngineLibService } from '@game-engine-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tetris';

  constructor(private readonly gameEngineService: GameEngineLibService) {
    console.log(this.gameEngineService.testing)
  }
}
