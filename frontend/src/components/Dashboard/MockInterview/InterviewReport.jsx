import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    Trophy,
    Brain,
    MessageCircle,
    Mic,
    TrendingUp,
    CheckCircle,
    AlertTriangle,
    Lightbulb,
    RotateCcw,
    Home,
    Sparkles
} from "lucide-react";

import { toast } from "react-toastify";

import "./InterviewReport.css";

export default function InterviewReport() {

    const { sessionId } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    
    const [report, setReport] = useState(null);
    const loadedRef = useRef(false);

    useEffect(() => {

    if (loadedRef.current) return;

    loadedRef.current = true;

    loadReport();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

    const loadReport = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await fetch(
            "https://career-genie-backend-gf7z.onrender.com/api/interview/finish",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    session_id: Number(sessionId)
                })
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {

            toast.error(
                data.message || "Failed to load report."
            );

            navigate("/mock-interview");

            return;

        }

        setReport(data.report);

    }

    catch (error) {

        console.log(error);

        toast.error("Server Error");

    }

    finally {

        setLoading(false);

    }

};

    const getBadge = (score) => {

        if (score >= 90) {

            return {
                color: "#00d26a"
            };

        }

        if (score >= 75) {

            return {
                color: "#3b82f6"
            };

        }

        if (score >= 60) {

            return {
                color: "#f59e0b"
            };

        }

        return {
            color: "#ef4444"
        };

    };

    const getSummary = () => {

        if (!report) return "";

        const score = report.overall_score;

        if (score >= 90) {

            return "Outstanding performance. Your technical understanding, communication and confidence closely match what interviewers expect from a strong candidate.";

        }

        if (score >= 75) {

            return "Very good interview performance. You demonstrated solid knowledge and communication skills with only a few areas that could be improved.";

        }

        if (score >= 60) {

            return "Good foundation. Continue improving technical depth and confidence to perform even better in future interviews.";

        }

        return "This interview highlighted several improvement areas. Keep practicing mock interviews and strengthen your core technical concepts.";

    };

    if (loading) {

        return (

                <div className="report-loading">

                    <div className="loader"></div>

                    <h2>AI is preparing your report...</h2>

                </div>

        );

    }

    if (!report) return null;

    const badge = getBadge(report.overall_score);

    return (

            <div className="report-page">

                <div className="report-hero-card">

                    <div className="report-hero-left">

                        <Sparkles size={40} />

                        <div>

                            <h1>

                                AI Interview Report

                            </h1>

                            <p>

                                Your interview has been analyzed successfully.

                            </p>

                        </div>

                    </div>

                    <div
                        className="overall-score"
                        style={{
                            borderColor: badge.color
                        }}
                    >

                        <h2>

                            {report.overall_score}

                        </h2>

                        <span>

                            Overall Score

                        </span>

                        <small
                            style={{
                                color: badge.color
                            }}
                        >

                        </small>

                    </div>

                </div>

                <div className="summary-card">

                    <TrendingUp size={28} />

                    <div>

                        <h3>

                            AI Performance Summary

                        </h3>

                        <p>

                            {getSummary()}

                        </p>

                    </div>

                </div>

                <div className="score-grid">

                    <div className="score-card">

                        <Brain size={34} />

                        <h3>

                            Technical

                        </h3>

                        <h2>

                            {report.technical_score}%

                        </h2>

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${report.technical_score}%`
                                }}
                            ></div>

                        </div>

                    </div>

                    <div className="score-card">

                        <MessageCircle size={34} />

                        <h3>

                            Communication

                        </h3>

                        <h2>

                            {report.communication_score}%

                        </h2>

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${report.communication_score}%`
                                }}
                            ></div>

                        </div>

                    </div>

                    <div className="score-card">

                        <Mic size={34} />

                        <h3>

                            Confidence

                        </h3>

                        <h2>

                            {report.confidence_score}%

                        </h2>

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${report.confidence_score}%`
                                }}
                            ></div>

                        </div>

                    </div>

                    <div className="score-card">

                        <Trophy size={34} />

                        <h3>

                            Overall

                        </h3>

                        <h2>

                            {report.overall_score}%

                        </h2>

                        <div className="progress">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${report.overall_score}%`
                                }}
                            ></div>

                        </div>

                    </div>

                </div>

                                <div className="report-sections">

                    <div className="report-card">

                        <div className="section-title">

                            <CheckCircle size={24} />

                            <h2>

                                Strengths

                            </h2>

                        </div>

                        <div className="list-container">

                            {
                                report.strengths.map((item, index) => (

                                    <div
                                        className="list-item strength"
                                        key={index}
                                    >

                                        <CheckCircle size={18} />

                                        <span>

                                            {item}

                                        </span>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                    <div className="report-card">

                        <div className="section-title">

                            <AlertTriangle size={24} />

                            <h2>

                                Areas For Improvement

                            </h2>

                        </div>

                        <div className="list-container">

                            {
                                report.weaknesses.map((item, index) => (

                                    <div
                                        className="list-item weakness"
                                        key={index}
                                    >

                                        <AlertTriangle size={18} />

                                        <span>

                                            {item}

                                        </span>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

                <div className="recommendation-card">

                    <div className="section-title">

                        <Lightbulb size={26} />

                        <h2>

                            AI Recommendations

                        </h2>

                    </div>

                    <div className="recommendation-list">

                        {
                            report.recommendations.map((item, index) => (

                                <div
                                    key={index}
                                    className="recommendation-item"
                                >

                                    <span className="recommend-number">

                                        {index + 1}

                                    </span>

                                    <span>

                                        {item}

                                    </span>

                                </div>

                            ))
                        }

                    </div>

                </div>

                <div className="final-message">

                    <Sparkles size={30} />

                    <h2>

                        Keep Practicing!

                    </h2>

                    <p>

                        Every interview makes you stronger. Continue practicing,
                        improve your technical knowledge, and build confidence.
                        Your next interview will be even better!

                    </p>

                </div>

                <div className="report-actions">

                    <button
                        className="dashboard-btn"
                        onClick={() => navigate("/dashboard")}
                    >

                        <Home size={20} />

                        Dashboard

                    </button>

                    <button
                        className="retry-btn"
                        onClick={() => navigate("/mock-interview")}
                    >

                        <RotateCcw size={20} />

                        Take Another Interview

                    </button>

                </div>

            </div>

    );

}
