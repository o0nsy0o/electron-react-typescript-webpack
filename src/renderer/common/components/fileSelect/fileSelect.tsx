import React, { Component } from 'react';

export class FileSelect extends Component<any, any> {

    public updatePath = () => {
        const files: any = this.inputObj.files;
        // console.log();
    }

    public componentDidMount() {
        this.inputObj.setAttribute('id', '_ef');
        this.inputObj.setAttribute('type', 'file');
        this.inputObj.setAttribute('display', 'none');
        this.inputObj.setAttribute('webkitdirectory', '');
        this.inputObj.setAttribute('directory', '');
        this.inputObj.addEventListener('change', this.updatePath);
    }

    public inputObj = document.createElement('input');

    public openFileSelect = () => {
        this.inputObj.click();
    }

    public render() {
        return (
            <div onClick={this.openFileSelect}>
                {this.props.children}
            </div>
        );
    }
}
