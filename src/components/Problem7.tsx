import { useRef } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import '../style.css';

function Problem7({ accountId }: { accountId: string }) {
    console.log(accountId);
    const editorRef = useRef<AceEditor>(null);

    return (
        <div className="editor-div">
            <h1>Problem7</h1>
            <AceEditor
                ref={editorRef}
                mode="java"
                theme="monokai" 
                name="ace-editor"
                editorProps={{ $blockScrolling: true }}
                width="100%"
                height="300px" 
                defaultValue={`public int add(int x, int y) {\n    // SKRIV DIN KOD HÄR\n}`}
            />
        </div>
    );
}

export default Problem7;