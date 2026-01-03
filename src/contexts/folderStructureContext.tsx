import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { explorerData, type TExplorerNode } from "../services/constantStucture";

type TFolderStructureProps = { children: ReactNode };

type TContextProvider = {
  folderStructure: TExplorerNode;
  setFolderStuctureRef: (id: string, open: boolean) => void;
};

const FolderStructureContext = createContext<TContextProvider | null>(null);

const useFolderStructureContext = () => {
  const contextProvider = useContext(FolderStructureContext);
  if (contextProvider === null) {
    throw new Error(
      "useFolderStructureContext must be used within a FolderStructureContextProvider"
    );
  }
  return contextProvider;
};

const FolderStructureContextProvider = ({
  children,
}: TFolderStructureProps) => {
  const [folderStructure, setFolderStructure] = useState<TExplorerNode | null>(
    null
  );
  const folderStructureStateRef = useRef<TExplorerNode | null>(null);

  const setFolderStuctureRef = useCallback((id: string, open: boolean) => {
    if (folderStructureStateRef.current) {
      const updateNode = (node: TExplorerNode): TExplorerNode => {
        if (node.id == id) {
          return { ...node, open };
        }
        if (node.children) {
          return {
            ...node,
            children: node.children.map(updateNode),
          };
        }
        return node;
      };
      folderStructureStateRef.current = updateNode(
        folderStructureStateRef.current
      );
      localStorage.setItem(
        "folderStructure",
        JSON.stringify(folderStructureStateRef.current)
      );
    }
  }, []);

  useEffect(() => {
    const folderStructure = localStorage.getItem("folderStructure");

    folderStructureStateRef.current = folderStructure
      ? JSON.parse(folderStructure)
      : explorerData;
    setFolderStructure(folderStructureStateRef.current);
  }, []);

  if (!folderStructure) return null;

  return (
    <FolderStructureContext.Provider
      value={{ folderStructure, setFolderStuctureRef }}
    >
      {children}
    </FolderStructureContext.Provider>
  );
};

export { FolderStructureContextProvider, useFolderStructureContext };
