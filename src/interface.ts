export interface IProjectArrItem {
    module: IModuleItem[];
    projectVirtualPath: string;
    scaffoldType: string;
    projectName: string;
    gitInfo: IGitInfo;
}

export interface IGitInfo {
    branch: string;
    remoteUrl: string;
}

export interface IModuleItem {
    name: string;
    path: string[];
}
