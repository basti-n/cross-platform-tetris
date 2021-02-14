import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedLibModule } from '@shared-lib';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule, SharedLibModule
  ],
  exports: [BoardComponent]
})
export class GameEngineLibModule { }
