import { useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import '../style.css';

function Problem5({ accountId }: { accountId: string }) {
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
                systemDescription: "Du är en AI-assistent som hjälper användaren att lösa ett specifikt kodningsproblem. Problemet de arbetar på går ut på att skapa en funktion som tar en lista av heltal och genererar en ny lista med summorna av varje unik parbildning av de ursprungliga elementen. Målet är att resultatet ska vara en lista med endast unika summor. Användaren kommer att skicka sin kod till dig, och din uppgift är att hjälpa dem att förstå och felsöka sin lösning utan att ge direkta svar. Istället ska du guida dem steg för steg i rätt riktning, ge förklaringar om varför vissa tillvägagångssätt fungerar och varför andra inte gör det, samt hjälpa dem att förstå hur de kan identifiera unika parsummor korrekt.",
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
                List<Integer> n = new ArrayList<>(Arrays.asList(7,11,14));
                UserCode userCode = new UserCode();
                System.out.println(userCode.uniqueSums(n));
            }
        
        `;
        
        let fullCode = hiddenCode + userCode + "}";
        let resultWeWant = "[18, 21, 25]";

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
                        points: 25,
                        userId: accountId
                    })
                })
            }
        })
    }

    return (
        <>
        <div className="text-div">
            <h1>Problem: Unika summor av parbildningar</h1>
            <h4>Värde - 25 poäng</h4>
            <h2>Beskrivning:</h2>
            <p>Implementera en funktion <code>public static List&lt;Integer&gt; uniqueSums(List&lt;Integer&gt; numbers)</code> som tar emot en lista av heltal (<code>Integer</code>) och genererar en ny lista med summorna av varje unik parbildning av de ursprungliga elementen. Målet är att resultatet ska vara en lista med endast unika summor.</p>
            <pre><code>uniqueSums(Arrays.asList(1, 2, 3));  //ska returnerar [3, 4, 5]</code></pre>
            <pre><code>uniqueSums(Arrays.asList(1, 2, 3, 4));  // ska returnerar [3, 4, 5, 6, 7, 8]
            </code></pre>

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
                defaultValue={`public static List<Integer> uniqueSums(List<Integer> numbers) {\n    \n}`}
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

export default Problem5;