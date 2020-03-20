import { spawn } from 'child_process';
import { childProcess } from './childProcess';

export const commandBuild = async (info) => {
  try {
    if (childProcess.length > 3) {
      childProcess[0].kill();
    }
    const cProcess = await spawn('venus', ['build', `-m="${info.name}"`], { windowsHide: false, cwd: info.projectPath });
    cProcess.on('message', (data) => {
      console.log(data);
    });
    cProcess.on('exit', () => {
      console.log(1);
    });
    cProcess.stdout.on('data', (data) => {
      console.log(`接收到数据块 ${data}`);
    });
    cProcess.stdin.on('data', (data) => {
      console.log(`接收到数据块 ${data}`);
    });
    // cProcess.stdio.on('data', (data) => {
    //   console.log(`接收到数据块 ${data}`);
    // });
    cProcess.on('close', () => {
      console.log(`超过最大进程数:`);
      console.log(`子进程 ${info.name} 终止`);
      childProcess.shift();
    });
    childProcess.push(cProcess);
    console.log(`当前进程数量:${childProcess.length}`);
    return true;
  } catch (error) {
    return false;
  }
};
