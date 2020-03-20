import { IModuleItem } from 'src/interface';
import React from 'react';
import { Button } from 'antd';
import { ipcRenderer } from 'electron';

export const ListItem = (props: { item: IModuleItem }) => {
  console.log(props.item);
  const { name } = props.item;
  const startServe = async () => {
    const result = await ipcRenderer.invoke('start-serve', props.item);
  };
  const startBuild = async () => {
    const result = await ipcRenderer.invoke('start-build', props.item);
    console.log(result);
  };
  return (
    <div className="list-item">
      <div>模块名:{name}</div>
      <div>
        <Button size="small" onClick={startServe}>启动</Button>
        <Button size="small" onClick={startBuild}>编译</Button>
      </div>
    </div>
  );
};
