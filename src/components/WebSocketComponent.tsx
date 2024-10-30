import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const WebSocketComponent: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const stompClientRef = useRef<any>(null); // för att hålla STOMP-klienten

    useEffect(() => {
        // Initiera SockJS och STOMP
        const socket = new SockJS("http://localhost:8080/websocket");
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;

        stompClient.connect({}, () => {
            console.log("connected!");

            stompClient.subscribe("/topic/chat", (chat) => {
                const content = JSON.parse(chat.body).chat;
                setMessages(prevMessages => [...prevMessages, content]);
            });
        });
        return () => {
            stompClient.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (inputValue) {
            stompClientRef.current.send("/app/chat", {}, JSON.stringify({ content: inputValue }));
            setInputValue(''); // Töm inputfältet efter att ha skickat meddelandet
        }
    };

    return (
        <div>
            <ul>
                {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                ))}
            </ul>
            <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                placeholder="Skriv ett meddelande"
            />
            <button onClick={sendMessage}>Skicka</button>
        </div>
    );
};

export default WebSocketComponent;
