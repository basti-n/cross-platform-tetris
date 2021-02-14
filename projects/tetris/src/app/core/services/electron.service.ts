import { Injectable } from '@angular/core';
import { ipcRenderer, webFrame, remote } from 'electron'
import * as childprocess from 'child_process'
import * as fs from 'fs'

@Injectable()
export class ElectronService {
  public ipcRenderer: typeof ipcRenderer;
  public webFrame: typeof webFrame;
  public remote: typeof remote;
  public childprocess: typeof childprocess;
  public fs: typeof fs;

  get isElectron(): boolean {
    return !!(window?.process?.type)
  }

  constructor() {
    if(this.isElectron) {
      this.populateFields()
    }
   }

   private populateFields(): void {
    const {ipcRenderer, webFrame, remote} = window.require('electron');
    this.ipcRenderer = ipcRenderer;
    this.webFrame = webFrame;
    this.remote = remote

    this.childprocess = window.require('child_process')
    this.fs = window.require('fs')
   }

}
