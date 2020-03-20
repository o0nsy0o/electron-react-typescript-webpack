import React, { useState, useEffect } from 'react';
import { Layout, Collapse, List } from 'antd';
import './style/index.less';
import { ipcRenderer } from 'electron';
import { IProjectArrItem, IModuleItem } from 'src/interface';
import { ListItem } from './listItem';

const { Header, Content } = Layout;
const { Panel } = Collapse;

export function Home(props) {
  const [dataSource, changeDataSource]: [IProjectArrItem[], any] = useState([]);
  const [paths, changePaths] = useState('');
  const mount = 'mount';

  useEffect(() => {
    ipcRenderer.invoke('get-default-path').then((result) => {
      changeDataSource(result);
    });
  }, [mount]);

  const onChange = (e) => {
    // console.log(e);
  };

  const openFile = async () => {
    const result = await ipcRenderer.invoke('walk');
    changeDataSource(result);
  };

  const renderItem = (item: IModuleItem) => (<ListItem item={item} />);

  return (
    <Layout>
      <Layout>
        <Header>
          <div onClick={openFile}>选择目录</div>
        </Header>
        <Content>
          <Collapse onChange={onChange}>
            {dataSource.map((item, index) => {
              return (
                <Panel header={
                  <div className="collapse-head">
                    <div>项目名称:{item.projectName}</div>
                    <div className="collapse-head-tips">当前分支:{item.gitInfo.branch}</div>
                  </div>
                } key={index}>
                  <List dataSource={item.module} renderItem={renderItem} />
                </Panel>
              );
            })}
          </Collapse>
        </Content>
      </Layout>
    </Layout>
  );
}
