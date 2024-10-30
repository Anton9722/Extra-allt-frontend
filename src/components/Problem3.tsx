import { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import '../style.css';

function Problem3({ accountId }: { accountId: string }) {
    console.log(accountId);

    const [displayResult, setDisplayResult] = useState("");
    const [displayHelpMe, setDisplayHelpMe] = useState("");

    const editorRef = useRef<AceEditor>(null);

    const helpMe = () => {
        let userCode = editorRef.current?.editor.getValue();
        fetch("https://goldfish-app-9c2tv.ondigitalocean.app/help-me", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                systemDescription: "du är en ai assistent som ska hjälpa en person att lösa ett kodningsproblem , problem dem ska lösa är att dem ska göra en funktion som tar emot en lista med ints och ska ta borts alla dubbletter i listan och retunera listan, användaren kommer att skicka sin kod till dig och du ska hjälpa dem att lösa det utan att ge några direkta lösningar utan du ska hjälpa dem i rätt riktning",
                prompt: userCode
            })
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
            setDisplayHelpMe(data);
        })
    }

    const runCode = () => {

        let userCode = editorRef.current?.editor.getValue();
        
        var hiddenCode = `
        import java.util.List;
        import java.util.ArrayList;
        import java.util.Arrays;
        class UserCode {
            public static void main(String[] args) {
                List<Integer> n = new ArrayList<>(Arrays.asList(1, 11, 12, 11, 5, 1));
                UserCode userCode = new UserCode();
                System.out.println(userCode.removeDuplicates(n));
            }
        
        `;
        
        let fullCode = hiddenCode + userCode + "}";
        let resultWeWant = "[1, 11, 12, 5]";

        fetch("https://goldfish-app-9c2tv.ondigitalocean.app/code-execution/run-code", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: fullCode,
                resultWeWant: resultWeWant
            })
        })
        .then(res => res.text())
        .then(data => {
            setDisplayResult(data)
            if(data == "Correct!"){
                fetch("https://goldfish-app-9c2tv.ondigitalocean.app/user/update-points", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        points: 15,
                        userId: accountId
                    })
                })
            }
        })
    }

    return (
        <div className="editor-div">
            <h1>Ta bort dubbletter</h1>
            <AceEditor
                ref={editorRef}
                mode="java"
                theme="monokai" 
                name="ace-editor"
                editorProps={{ $blockScrolling: true }}
                width="100%"
                height="300px" 
                defaultValue={`public List<Integer> removeDuplicates(List<Integer> numbers) {\n    \n}`}
            />
            <button className="btn" onClick={runCode}>Run code</button>
            <p id="response-text">{displayResult}</p>
            <div>
                <button onClick={helpMe}>Hjälp mig</button>
                <div>{displayHelpMe}</div>
            </div>
        </div>
        
    );
}

export default Problem3;