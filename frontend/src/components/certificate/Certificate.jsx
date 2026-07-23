import React, { useEffect, useRef, useState } from "react";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
    Download,
    ShieldCheck,
    Sparkles
} from "lucide-react";

import axios from "axios";

import { toast } from "react-toastify";

import { useParams } from "react-router-dom";

import "./Certificate.css";


// Images

import GenieLogo from "../../assets/images/Genie.png";
import signature from "../../assets/images/signature.png";



export default function Certificate() {


    const certificateRef = useRef(null);


    const { sessionId } = useParams();


    const [certificate, setCertificate] = useState(null);


    const [loading, setLoading] = useState(true);


    const [downloading, setDownloading] = useState(false);


    useEffect(() => {


        fetchCertificate();


    }, []);
    const fetchCertificate = async () => {


        try {


            const token = localStorage.getItem("token");



            const response = await axios.get(

                `https://career-genie-backend-gf7z.onrender.com/api/certificate/data/${sessionId}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );




            if (response.data.success) {


                const data = response.data.certificate;



                setCertificate({


                    name: data.name,


                    role: data.role,


                    percentage: data.score,


                    certificateId: data.certificate_id,


                    issueDate: data.issue_date


                });



            }



        }


        catch (error) {



            toast.error(

                error.response?.data?.message ||

                "Certificate loading failed"

            );


        }


        finally {


            setLoading(false);


        }



    };









    // =========================================
    // DOWNLOAD PDF
    // =========================================



    const downloadPDF = async () => {


        try {


            setDownloading(true);
            const element = certificateRef.current;
            const canvas = await html2canvas(
                element,
                {
                    scale: 4,
                    useCORS: true,
                    backgroundColor: "#ffffff"
                }
            );
            const imageData = canvas.toDataURL(
                "image/png"
            );
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: [
                    canvas.width,
                    canvas.height
                ]
            });
            pdf.addImage(
                imageData,
                "PNG",
                0,
                0,
                canvas.width,
                canvas.height
            );
            pdf.save(
                `CareerGenie-${certificate.name}-${certificate.role}-Certificate.pdf`
            );
        }
        catch (error) {
            console.error(
                "Certificate PDF Error",
                error
            );
            toast.error(
                "Certificate download failed"
            );
        }
        finally {
            setDownloading(false);
        }
    };
    if (loading) {
        return (
            <div className="certificate-loading">
                <h2>
                    Generating Your Certificate...
                </h2>
                <p>
                    Fetching verified achievement details.
                </p>
            </div>
        );
    }
    if (!certificate) {
        return (
            <div className="certificate-loading">
                <h2>
                    Certificate Not Available
                </h2>
                <p>
                    Complete your assessment with 100% score.
                </p>
            </div>
        );
    }

    return (
        <div className="certificate-page">
            <div className="sparkle sparkle-1"></div>
            <div className="sparkle sparkle-2"></div>
            <div className="sparkle sparkle-3"></div>
            <div className="sparkle sparkle-4"></div>
            <div
                className="certificate"
                ref={certificateRef}
            >
                <div className="certificate-border">
                    <div className="certificate-watermark">
                        CAREER GENIE
                    </div>
                    <div className="top-decoration"></div>
                    <div className="certificate-header">
                        <img
                            src={GenieLogo}
                            alt="Career Genie Logo"
                            className="certificate-logo"
                        />
                    </div>
                    <div className="brand-small">
                        CAREER GENIE
                    </div>
                    <h1>
                        Certificate
                    </h1>
                    <h2>
                        OF ACHIEVEMENT
                    </h2>
                    <p className="presented">
                        This Certificate is Proudly Presented To
                    </p>
                    <h1 className="student-name">
                        {certificate.name}
                    </h1>
                    <p className="course-text">
                        For successfully completing the
                    </p>
                    <h2 className="course-name">
                        {certificate.role}
                    </h2>
                    <p className="score-achievement">
                        Achieving a perfect {certificate.percentage}% assessment score
                    </p>
                    <p className="description">
                        Demonstrating exceptional dedication,
                        skill development and successful completion
                        of the Career Genie assessment journey.
                    </p>
                    <div className="achievement-badge">
                        <Sparkles size={18} />
                        Verified Learning Achievement
                    </div>
                    <div className="certificate-footer">
                        <div className="date-section">
                            <h3>
                                {certificate.issueDate}
                            </h3>
                            <span>
                                Issue Date
                            </span>
                        </div>
                        <div className="seal">
                            <div className="seal-inner">
                                <ShieldCheck size={28} />
                                <span>
                                    VERIFIED
                                </span>
                            </div>
                        </div>
                        <div className="signature-section">
                            <img
                                src={signature}
                                alt="Authorized Signature"
                                className="signature"
                            />
                            <div className="signature-line"></div>
                            <h3>
                                Genie Team :- Founders - Yugta, Sheetal
                            </h3>
                            <span>
                                Authorized Signature
                            </span>
                        </div>
                    </div>
                    <div className="certificate-id">
                        Certificate ID :
                        {" "}
                        {certificate.certificateId}
                    </div>
                    <div className="verify-text">
                        Verify this certificate at
                        <br />
                        careergenie.com/verify
                    </div>
                </div>
            </div>
            <button
                className="download-btn"
                onClick={downloadPDF}
                disabled={downloading}
            >
                <Download size={20} />
                { downloading ?  "Generating Certificate..." : "Download Certificate"
                }
            </button>
        </div>
    );
}
