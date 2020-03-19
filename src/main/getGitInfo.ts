
import createGitinfo from 'gitinfo';
import { IGitInfo } from 'src/interface';

export const getGitInfo: (path: string) => Promise<IGitInfo> = async (path) => {
    const info: IGitInfo = { branch: '', remoteUrl: '' };
    try {
        const gitinfo = createGitinfo({ gitPath: path });
        info.branch = gitinfo.getBranchName();
        info.remoteUrl = gitinfo.getRemoteUrl();
        return info;
    } catch (error) {
        return info;
    }
};
