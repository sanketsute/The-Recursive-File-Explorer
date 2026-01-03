import { memo, use, useCallback, useEffect, useState } from "react";
import { useFolderStructureContext } from "../contexts/folderStructureContext";
import type { TExplorerNode } from "../services/constantStucture";

const FolderIcon = ({ open = false }: { open?: boolean }) => (
  <span className="mr-2 text-yellow-500">{open ? "📂" : "📁"}</span>
);
const FileIcon = () => <span className="mr-2 text-blue-400">📄</span>;
const ChevronRight = () => <span className="text-gray-400 text-xs mr-1">▶</span>;
const ChevronDown = () => <span className="text-gray-400 text-xs mr-1">▼</span>;

const Folder = memo(({ data }: { data: TExplorerNode }) => {
  const [open, setOpen] = useState(data.open || false);
  const { setFolderStuctureRef } = useFolderStructureContext();
  const isFolder = data.isFolder;

  const toggleFolder = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); 
    setOpen((prev) => {
      setFolderStuctureRef(data.id, !prev);
      return !prev});
  }, [data.id, setFolderStuctureRef]);

  return (
    <div className="select-none"> 
      <div 
        onClick={isFolder ? toggleFolder : undefined}
        className="flex items-center py-1 hover:bg-gray-100 cursor-pointer transition-colors"
      >
        <span className="w-5 flex justify-center">
             {isFolder ? (open ? <ChevronDown /> : <ChevronRight />) : <span className="w-4" />}
        </span>

        {isFolder ? <FolderIcon open={open} /> : <FileIcon />}
        
        <span className="text-sm text-gray-700 font-medium">
            {data.name}
        </span>
      </div>

      {isFolder && open && (
        <div className="pl-5 border-l border-gray-200 ml-2.5">
          {data?.children?.map((child: TExplorerNode) => (
            <Folder data={child} key={child.id} />
          ))}
        </div>
      )}
    </div>
  );
});

const FolderStructure = () => {
  const { folderStructure } = useFolderStructureContext();
  return (
    <div className="p-10 pt-22 size-max"> 
      <Folder data={folderStructure} />
    </div>
  );
};

export default FolderStructure;