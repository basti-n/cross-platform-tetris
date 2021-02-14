import { Component } from '@angular/core';
import { ElectronService } from './core/services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tetris';

  constructor(private readonly electronService: ElectronService) {
    if(this.electronService.isElectron) {
      console.log('Run in Electron')
      console.log('Electron Renderer: ', this.electronService.ipcRenderer)
      console.log('Electron Child Process: ', this.electronService.childprocess)
    } else {
      console.log('Run in Browser')
    }
  }
}
