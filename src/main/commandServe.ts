import { spawn } from 'child_process';
import { childProcess } from './childProcess';

export const commandServe = async (info) => {
  try {
    if (childProcess.length > 3) {
      childProcess[0].kill();
    }
    const cProcess = await spawn('venus', ['serve', `-m="${info.name}"`], { cwd: info.projectPath });
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
