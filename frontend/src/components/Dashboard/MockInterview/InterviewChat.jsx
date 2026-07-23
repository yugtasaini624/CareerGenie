import { useEffect, useRef, useState, useCallback } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { Mic } from "lucide-react";
import { toast } from "react-toastify";

import "./InterviewChat.css";

export default function InterviewChat() {
    const { sessionId } = useParams();
    const navigate = useNavigate();
    const chatRef = useRef(null);
    const recognitionRef = useRef(null);
    const listeningRef = useRef(false);
    const speakingRef = useRef(false);
    const recognitionReadyRef = useRef(false);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);
    const transcriptRef = useRef("");
    const submitTimerRef = useRef(null);
    const hasNavigatedRef = useRef(false);
    const interviewLoadedRef = useRef(false);

    useEffect(() => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: "smooth"
        });
    }, [messages]);

    const startListening = useCallback(() => {

    console.log("Trying to start microphone");

    if (loading || speakingRef.current || listeningRef.current) {

        console.log("Microphone blocked");

        return;

    }

    transcriptRef.current = "";   // Reset previous answer

    try {

        recognitionRef.current?.start();

    }

    catch (error) {

        console.log("Recognition start error:", error);

    }

}, [loading]);
   const speak = useCallback((text, onComplete) => {

    if (!text) return;

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    const setVoice = () => {

        const voices = speechSynthesis.getVoices();

        const femaleVoice =
    voices.find(v => v.name === "Google UK English Female") ||
    voices.find(v => v.name === "Microsoft Zira Desktop") ||
    voices.find(v => v.name === "Samantha") ||
    voices.find(v =>
        v.lang.startsWith("en") &&
        (
            v.name.toLowerCase().includes("female") ||
            v.name.toLowerCase().includes("zira") ||
            v.name.toLowerCase().includes("samantha")
        )
    );

        if (femaleVoice) {
            utterance.voice = femaleVoice;
        }

        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;

        speakingRef.current = true;

        utterance.onend = () => {

            speakingRef.current = false;

            if (onComplete) {

                onComplete();

                return;

            }

            setTimeout(() => {

                startListening();

            }, 1000);

        };

        utterance.onerror = () => {

            speakingRef.current = false;

        };

        speechSynthesis.speak(utterance);

    };

    if (speechSynthesis.getVoices().length === 0) {

        speechSynthesis.onvoiceschanged = () => {

            setVoice();

        };

    }

    else {

        setVoice();

    }

}, [startListening]);


    useEffect(() => {
        if (interviewLoadedRef.current) {

                return;

            }

        interviewLoadedRef.current = true;
        const loadInterview = async () => {
            try {
                console.log("loadInterview() called");

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `https://career-genie-backend-gf7z.onrender.com/api/interview/session/${sessionId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!data.success) {
                    toast.error(data.message || "Interview not found");
                    navigate("/mock-interview");
                    return;
                }

                const allMessages = data.messages.map((msg) => ({
                    sender: msg.role === "interviewer" ? "ai" : "user",
                    text: msg.message
                }));

                setMessages(allMessages);

                if (allMessages.length > 0) {
                    const lastMessage = allMessages[allMessages.length - 1];

                    if (lastMessage.sender === "ai") {
                        setTimeout(() => {
                            if (recognitionReadyRef.current) {
                                speak(lastMessage.text);
                            }
                        }, 1000);
                    }
                }
            } catch (error) {
                console.log(error);
                toast.error("Failed loading interview");
            }
        };

        loadInterview();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId, navigate]);


    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            toast.error(
                "Use Google Chrome for voice interview."
            );
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = true;
        recognition.continuous = true;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            console.log(
                "Listening started"
            );
            listeningRef.current = true;
            setListening(true);
        };

        recognition.onend = () => {
            console.log(
                "Listening stopped"
            );
            listeningRef.current = false;
            setListening(false);
        };

        recognition.onerror = (event) => {
            console.log(
                "Speech recognition error:",
                event.error
            );
            listeningRef.current = false;
            setListening(false);
            if (event.error === "not-allowed") {
                toast.error(
                    "Allow microphone permission."
                );
            }
            if (event.error === "no-speech") {
                toast.info(
                    "No voice detected."
                );
            }
        };

        recognition.onresult = (event) => {

    transcriptRef.current = "";

    for (let i = 0; i < event.results.length; i++) {

        transcriptRef.current +=
            event.results[i][0].transcript + " ";

    }

    console.log(transcriptRef.current);

    clearTimeout(submitTimerRef.current);

    submitTimerRef.current = setTimeout(() => {

        recognition.stop();

        sendAnswer(transcriptRef.current.trim());

    }, 3000);

};

        recognitionRef.current = recognition;
        recognitionReadyRef.current = true;
        console.log(
            "Speech recognition ready"
        );
        return () => {

    clearTimeout(submitTimerRef.current);

    recognition.stop();

};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const sendAnswer = async (answer) => {

    if (!answer || loading) return;

    setMessages((prev) => [

        ...prev,

        {
            sender: "user",
            text: answer
        }

    ]);

    setLoading(true);

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(

            "https://career-genie-backend-gf7z.onrender.com/api/interview/chat",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    session_id: Number(sessionId),

                    message: answer

                })

            }

        );

        const data = await response.json();

        console.log("CHAT RESPONSE:", data);

        if (!response.ok || !data.success) {

            toast.error(

                data.message || "Failed to communicate with AI."

            );

            setLoading(false);

            return;

        }

        setMessages((prev) => [

            ...prev,

            {

                sender: "ai",

                text: data.reply

            }

        ]);

        setLoading(false);

        // ===============================
        // Interview Finished
        // ===============================

        if (data.completed) {

    speak(

        data.reply,

        () => {

            if (hasNavigatedRef.current) {

                return;

            }

            hasNavigatedRef.current = true;

            navigate(
                `/mock-interview/report/${sessionId}`
            );

        }

    );

    return;

}

        // ===============================
        // Continue Interview
        // ===============================

        speak(data.reply);

    }

    catch (error) {

        console.log(error);

        toast.error("Server Error");

        setLoading(false);

    }

};


useEffect(() => {

    return () => {

        console.log("Cleaning interview");

        speechSynthesis.cancel();

        recognitionRef.current?.stop();

    };

}, []);

    return (
            <div className="interview-chat">
                <div className="interview-header">
                    <div>
                        <h2>
                            🎤 AI Mock Interview
                        </h2>
                        <p>
                            Speak naturally.
                            The AI will ask questions automatically.
                        </p>
                    </div>
                </div>
                <div className="chat-body" ref={chatRef}>
                    {
                        messages.map(
                            (msg, index) => (
                                <div key={index} className={`message ${msg.sender}`}>
                                    <div className="bubble">
                                        {msg.text}
                                    </div>
                                </div>
                            )
                        )
                    }
                    {
                        loading &&
                        <div className="message ai">
                            <div className="bubble thinking">
                                🤖 Thinking...
                            </div>
                        </div>
                    }
                </div>
                <div className="voice-panel">
                    <div className={listening ? "voice-circle listening" : "voice-circle"}>
                        <Mic size={34} />
                    </div>
                    <h3>
                        {
                            listening ? "Listening..." : loading ? "Generating Next Question..." : "AI will automatically listen after speaking."
                        }
                    </h3>
                    <p>
                        Do not Click.

                        Simply answer using your voice.
                    </p>
                </div>
            </div>
    );
}
