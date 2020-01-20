import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import { FileSelect } from '../../common/components';

export class Home extends Component {

  public componentDidMount() {
    ipcRenderer.on('selected-directory', (_event: any, path: any) => {
      console.log(path);
    });
  }
  /**
   * openModal
   */
  public openFileModal() {
    ipcRenderer.send('newModal', { data: '123', url: './' });
  }

  public updatePath(e: any) {
    alert(JSON.stringify(e));
  }

  public render() {
    return (
      <div>
        {/* <div onClick={this.openFileModal} >Drag your file here</div> */}
        <FileSelect>asdfasdfasdf</FileSelect>
      </div>
    );
  }
}
