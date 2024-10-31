import { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import '../style.css';

function Problem4({ accountId }: { accountId: string }) {
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
                systemDescription: "du är en ai assistent som ska hjälpa en person att lösa ett kodningsproblem , problem dem ska lösa är att dem ska göra en funktion som tar emot en lista med ints och funktionen ska retunera näst största värdet som finns i listan, användaren kommer att skicka sin kod till dig och du ska hjälpa dem att lösa det utan att ge några direkta lösningar utan du ska hjälpa dem i rätt riktning",
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
        import java.util.Collections;
        import java.util.List;
        import java.util.ArrayList;
        import java.util.Arrays;
        class UserCode {
            public static void main(String[] args) {
                List<Integer> n = new ArrayList<>(Arrays.asList(1,3,2,280,5,6,22,300));
                UserCode userCode = new UserCode();
                System.out.println(userCode.findSecondLargest(n));
            }
        
        `;
        
        let fullCode = hiddenCode + userCode + "}";
        let resultWeWant = "280";

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
                        points: 20,
                        userId: accountId
                    })
                })
            }
        })
    }

    return (
        <>
        <div className="text-div">
        <h1>Problem: Näst största talet</h1>
        <h4>Värde - 20 poäng</h4>
        <h2>Beskrivning:</h2>
        <p>Implementera en funktion <code>public Integer findSecondLargest(List&lt;Integer&gt; numbers)</code> som tar emot en lista av heltal (<code>Integer</code>) och returnerar det näst största talet i listan. Collections är importerat och du får använda dig av det</p>
        <h2>Exempel:</h2>
        <pre><code>findSecondLargest(Arrays.asList(3, 5, 1, 4, 2));  // ska returnerar 4</code></pre>


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
                defaultValue={`public Integer findSecondLargest(List<Integer> numbers) {\n    \n}`}
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

export default Problem4;