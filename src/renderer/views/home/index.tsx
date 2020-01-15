import React, { Component } from 'react';
import { ipcRenderer } from 'electron';

export class Home extends Component {
  /**
   * openModal
   */
  public openModal() {
    ipcRenderer.send('newModal', { data: '123' });
  }

  public render() {
    return (
      <div className="header" onClick={this.openModal}>newModal</div>
    );
  }
}
