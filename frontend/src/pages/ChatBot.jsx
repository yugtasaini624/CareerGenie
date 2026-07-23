import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import "./ChatBot.css";

export default function ChatBot() {

    const [messages,setMessages] = useState([
        {
            sender:"ai",
            text:"👋 Hello! I'm your CareerGenie Assistant. Ask me anything about careers, skills, projects or placements."
        }
    ]);

    const [input,setInput] = useState("");

    const [sessionId,setSessionId] = useState(null);

    const [loading,setLoading] = useState(false);

    const chatEndRef = useRef(null);

    const token = localStorage.getItem("token");

    const scrollBottom = ()=>{

        chatEndRef.current?.scrollIntoView({
            behavior:"smooth"
        });

    };

    useEffect(()=>{

        scrollBottom();

    },[messages]);

    const startChat = async()=>{

        try{

            const res = await fetch(
                "https://career-genie-backend-gf7z.onrender.com/api/chat/start",
                {
                    method:"POST",
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            const data = await res.json();

            if(data.success){

                setSessionId(data.session_id);

            }

        }catch(error){

            console.log(error);

        }

    };

    useEffect(()=>{

        startChat();

    },[]);

    const sendMessage = async()=>{

        if(!input.trim() || !sessionId)
            return;

        const question=input;

        setMessages(prev=>[
            ...prev,
            {
                sender:"user",
                text:question
            }
        ]);

        setInput("");

        setLoading(true);

        try{

            const res = await fetch(
                "https://career-genie-backend-gf7z.onrender.com/api/chat",
                {

                    method:"POST",

                    headers:{

                        "Content-Type":"application/json",

                        Authorization:`Bearer ${token}`

                    },

                    body:JSON.stringify({

                        session_id:sessionId,

                        message:question

                    })

                }
            );

            const data = await res.json();

            if(data.success){

                setMessages(prev=>[

                    ...prev,

                    {

                        sender:"ai",

                        text:data.reply

                    }

                ]);

            }

        }catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }

    };

    return (

        <div className="chat-page">

            <div className="chat-header">

                <div>

                    <h1>
                        🤖 CareerGenie Assistant
                    </h1>

                    <p>
                        Your personal AI mentor for careers and learning.
                    </p>

                </div>

                <div className="online-status">

                    <span></span>

                    AI Online

                </div>

            </div>

            <div className="chat-box">

                {
                    messages.map((msg,index)=>(

                        <motion.div

                            key={index}

                            className={`message ${msg.sender}`}

                            initial={{
                                opacity:0,
                                y:20
                            }}

                            animate={{
                                opacity:1,
                                y:0
                            }}

                        >

                            <div className="message-icon">

                                {
                                    msg.sender==="ai"
                                    ?
                                    <Bot size={22}/>
                                    :
                                    <User size={22}/>
                                }

                            </div>

                            <div className="message-text">

                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                >

                                    {msg.text}

                                </ReactMarkdown>

                            </div>

                        </motion.div>

                    ))
                }

                {
                    loading &&

                    <div className="message ai">

                        <div className="message-icon">

                            <Bot size={22}/>

                        </div>

                        <div className="message-text typing">

                            Thinking...

                        </div>

                    </div>

                }

                <div ref={chatEndRef}/>

            </div>

            <div className="chat-input">

                <input

                    placeholder="Ask anything about careers..."

                    value={input}

                    onChange={(e)=>setInput(e.target.value)}

                    onKeyDown={(e)=>{

                        if(e.key==="Enter")
                            sendMessage();

                    }}

                />

                <button onClick={sendMessage}>

                    <Send size={22}/>

                </button>

            </div>

        </div>

    );

}
