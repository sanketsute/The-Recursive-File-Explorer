import "./App.css";
import FolderStructure from "./components/folderStructure";
import Header from "./components/header";
import { FolderStructureContextProvider } from "./contexts/folderStructureContext";

const App = () => {
  return (
    <>
      <Header />
      <FolderStructureContextProvider>
        <FolderStructure />
      </FolderStructureContextProvider>
    </>
  );
}

export default App;
