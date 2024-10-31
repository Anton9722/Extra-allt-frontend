import {useRef, useState } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/java';
import 'brace/theme/monokai';
import '../style.css';

function Problem1({ accountId }: { accountId: string}) {
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
                systemDescription: "du är en ai assistent som ska hjälpa en person att lösa ett kodningsproblem , problem dem ska lösa är att dem ska göra en funktion som tar emot 2 heltal och dem sa retunera dem talen tillsamans så alltså plussa dem, användaren kommer att skicka sin kod till dig och du ska hjälpa dem att lösa det utan att ge några direkta lösningar utan du ska hjälpa dem i rätt riktning",
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
        class UserCode {
            public static void main(String[] args) {
                int x = 2200;
                int y = 5500;
                UserCode userCode = new UserCode();
                System.out.println(userCode.add(x, y));
            }
        
        `;
        
        let fullCode = hiddenCode + userCode + "}";
        let resultWeWant = "7700";

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
                        points: 5,
                        userId: accountId
                    })
                })
            }    
        })
    }

    return (
        <>
        <div className="text-div">
            <h1>Problem: Addera</h1>
            <h4>Värde - 5 poäng</h4>
            <h2>Beskrivning:</h2>
            <p>Implementera en funktion <code>add</code> som tar emot två heltal (<code>int</code>), <code>x</code> och <code>y</code>, och returnerar summan av dessa två tal. Din funktion ska utföra additionen och returnera resultatet som ett heltal.</p>
            <h2>Specifikationer:</h2>
            <ul>
                <li>Den tar emot två parametrar, <code>x</code> och <code>y</code>, båda av typen <code>int</code>.</li>
                <li>Funktionen ska returnera summan av <code>x</code> och <code>y</code> som en <code>int</code>.</li>
            </ul>
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
                defaultValue={`public int add(int x, int y) {\n    \n}`}
            />
            <div>

            </div>
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

export default Problem1;
