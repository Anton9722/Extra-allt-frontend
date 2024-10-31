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
        <>
        <div className="text-div">
        <h1>Problem: Ta bort dubbletter</h1>
        <h4>Värde - 15 poäng</h4>
        <h2>Beskrivning:</h2>
        <p>Implementera en funktion <code>public List&lt;Integer&gt; removeDuplicates(List&lt;Integer&gt; numbers)</code> som tar emot en lista av heltal (<code>Integer</code>) och returnerar en ny lista med alla unika nummer, utan några dubbletter. Din funktion ska säkerställa att varje heltal endast förekommer en gång i den returnerade listan.</p>
        <ul>
            <li>Den returnerade listan ska behålla den ordning som de unika numren först förekom i den ursprungliga listan.</li>
        </ul>
        <pre><code>removeDuplicates(Arrays.asList(1, 2, 2, 3, 4, 4, 5));  //ska returnerar [1, 2, 3, 4, 5]</code></pre>

        </div>
        <div className="editor-div">
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
            <button className="runcodebtn" onClick={runCode}>Kör kod</button>
            <p className="response-text">{displayResult}</p>
            <div>
                <button className="btn" onClick={helpMe}>Hjälp mig</button>
                <p className="displayMessage">{displayHelpMe}</p>
            </div>
        </div>
        </>
        
    );
}

export default Problem3;