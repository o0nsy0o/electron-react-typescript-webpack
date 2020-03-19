import { IModuleItem } from 'src/interface';
import React from 'react';
import { Button } from 'antd';

export const ListItem = (props: { item: IModuleItem }) => {
  console.log(props.item);
  const { name } = props.item;
  return (
    <div className="list-item">
      <div>模块名:{name}</div>
      <div>
        <Button size="small">启动</Button>
      </div>
    </div>
  );
};
