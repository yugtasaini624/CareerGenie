import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResumeAnalyzer.css";

function ResumeAnalyzer() {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [fileName, setFileName] = useState("No file selected");

    const [loading, setLoading] = useState(false);

    const handleFile = (e) => {

        const selected = e.target.files[0];

        if (!selected) return;

        setFile(selected);

        setFileName(selected.name);

    };

    const analyzeResume = async () => {

    try {

        setLoading(true);

        const token = localStorage.getItem("token");

        const formData = new FormData();

        formData.append("resume", file);

        const response = await fetch(
            "http://localhost:5000/api/resume/analyze",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );

        console.log("Response Status:", response.status);

        const data = await response.json();

        console.log("Response Data:", data);

        if (!response.ok) {

            console.log("Request failed!");

            alert(data.message);

            return;

        }

        console.log("Navigating with state:", data);

        navigate(
            "/resume-result",
            {
                state: data
            }
        );

    }
    catch (error) {

        console.error("Catch Error:", error);

        alert("Resume Analysis Failed");

    }
    finally {

        setLoading(false);

    }

};

    return (

        <div className="container">

            <h1>

                Smart Resume Analyzer

            </h1>

            <p>

                Upload your resume to detect role & skill gaps

            </p>

            <label className="file-wrapper">

                <span className="file-text">

                    {fileName}

                </span>

                <span className="browse-btn">

                    {file ? "Change" : "Browse"}

                </span>

                <input

                    type="file"

                    accept=".pdf,.doc,.docx"

                    onChange={handleFile}

                />

            </label>

            <div className="divider"></div>

            <button

                className={`btn ${file ? "enabled" : ""}`}

                disabled={!file || loading}

                onClick={analyzeResume}

            >

                {

                    loading

                        ?

                        "Analyzing..."

                        :

                        "Analyze Resume"

                }

            </button>

            <div className="footer-text">

                Supported formats: PDF, DOCX

            </div>

        </div>

    );

}

export default ResumeAnalyzer;