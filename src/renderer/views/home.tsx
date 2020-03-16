import React, { useState } from 'react';
import { Layout, Collapse } from 'antd';
import { ipcRenderer } from 'electron';
import { FileSelect } from '../common/components';
import './style/index.less';

const { Header, Content } = Layout;
const { Panel } = Collapse;

export function Home(props) {
  const [dataSource, changeDataSource] = useState([]);
  const [paths, changePaths] = useState('');

  const onChange = (e) => {
    console.log(e);

  };
  const text = '123';

  const onFileChange = async (file) => {
    const path = await new Promise((resolve, reject) => {
      ipcRenderer.on('walk-reply', (_event, arg) => {
        console.log(arg);
        resolve(arg);
      });
      ipcRenderer.send('walk-main', file[0].path);
    });
    console.log(path);
    // changePaths(path);

  };

  return (
    <Layout>
      <Layout>
        <Header>
          <FileSelect onChange={onFileChange}>{paths ? paths : '选择目录'}</FileSelect>
        </Header>
        <Content>
          <Collapse defaultActiveKey={['1']} onChange={onChange}>
            <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3" disabled>
              <p>{text}</p>
            </Panel>
          </Collapse>
        </Content>
      </Layout>
    </Layout>
  );
}
