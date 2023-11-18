import CypherEditor from "./components/CypherEditor/CypherEditor.tsx";
import Previewer from "./components/Previewer/Previewer.tsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="app-title">QV-VQL</div>
      <div className="app-container">
        <CypherEditor />
        <Previewer />
      </div>
      <div className="app-footer"> &copy; TJUDB 2023</div>
    </div>
  );
}

export default App;
