
export type TExplorerNode = {
  id: string;
  name: string;
  isFolder: boolean;
  children?: TExplorerNode[];
};
export const explorerData:TExplorerNode = {
  id: "root",
  name: "root",
  isFolder: true,
  children: [
    {
      id: "1",
      name: "src",
      isFolder: true,
      children: [
        {
          id: "1-1",
          name: "components",
          isFolder: true,
          children: [
            { id: "1-1-1", name: "Header.tsx", isFolder: false },
            { id: "1-1-2", name: "Footer.tsx", isFolder: false },
          ],
        },
        { id: "1-2", name: "App.tsx", isFolder: false },
        { id: "1-3", name: "main.tsx", isFolder: false },
      ],
    },
    {
      id: "2",
      name: "package.json",
      isFolder: false,
    },
    {
      id: "3",
      name: "README.md",
      isFolder: false,
    },
  ],
};