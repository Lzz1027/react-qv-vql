import { useRef } from "react";
import "./CypherEditor.css";
import Editor from "@monaco-editor/react";

export default function () {
  const editorRef = useRef(null);
  const options = {
    minimap: {
      enabled: false,
    },
    lineNumbersMinChars: 2,
    lineDecorationsWidth: 2,
    fontSize: 24,
  };

  function handleEditorDidMount(editor: any, monaco: any) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }
  function handleEditorChange(value: any, event: any) {
    console.log("here is the current model value:", value);
  }

  return (
    <div id="CypherEditor">
      <Editor
        theme="light"
        defaultLanguage="cypher"
        defaultValue="MATCH (keanu:Person {name:'Keanu Reeves'})-[:ACTED_IN]->(m:Movie)<-[:ACTED_IN]-(coActors:Person),(coActors:Person)-[:ACTED_IN]->(m2:Movie)<-[:ACTED_IN]-(cocoActors:Person)
WHERE NOT (keanu)-[:ACTED_IN]->()<-[:ACTED_IN]-(cocoActors) AND keanu <> cocoActors
RETURN cocoActors.name AS recommended, count(cocoActors) AS strength
ORDER BY strength DESC
LIMIT 7"
        loading="Loading Editor..."
        options={options}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
      />
    </div>
  );
}
