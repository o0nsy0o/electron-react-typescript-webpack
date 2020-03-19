import walkSync from 'walk-sync';
import path from 'path';
import { IProjectArrItem, IGitInfo } from 'src/interface';
import { getGitInfo } from './getGitInfo';

declare const __non_webpack_require__: any;

export const getModule = async (configPath) => {
  const paths = walkSync(configPath, { directories: false, includeBasePath: true, globs: ['*/venus.config.js'] });
  const projectArr: IProjectArrItem[] = [];
  for (const p of paths) {
    // Get git information
    const projectPath = path.dirname(p);
    const gitInfo: IGitInfo = await getGitInfo(projectPath);
    // 'Require' that won't be resolved by 'webpack'.
    const project = __non_webpack_require__(p);
    // Get name of the project
    const pArr = p.split('/');
    const projectName = pArr[pArr.length - 2];
    // Filter invalid projects
    if (project.webpack || project.scaffoldType === 'rollup') { continue; }

    const keys = Object.keys(project.entries);
    const module = keys.map((key) => {
      return { name: key, projectPath, path: project.entries[key].entry };
    });

    projectArr.push({
      projectName,
      gitInfo,
      scaffoldType: project.scaffoldType,
      projectVirtualPath: project.projectVirtualPath,
      module,
    });
  }
  return projectArr;
};
