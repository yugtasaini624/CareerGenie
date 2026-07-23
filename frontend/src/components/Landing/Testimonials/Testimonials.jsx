import { motion } from "framer-motion";
import "./Testimonials.css";


const testimonials = [

    {
        name: "Priya Sharma",
        role: "Computer Science Student",
        review:
            "CareerAI gave me a clear roadmap to become a Frontend Developer. I finally knew what to learn next."
    },


    {
        name: "Rahul Verma",
        role: "Engineering Student",
        review:
            "The AI skill assessment was surprisingly accurate. It suggested projects that actually improved my portfolio."
    },


    {
        name: "Ananya Gupta",
        role: "B.Tech Student",
        review:
            "Instead of feeling confused, I now have a personalized learning path. The dashboard is amazing!"
    }

];



export default function Testimonials() {

    return (

        <section id="testimonials" className="testimonials-section">


            <div className="testimonial-heading">

                <span>
                    TESTIMONIALS
                </span>


                <h2>
                    Students Love CareerAI
                </h2>


                <p>
                    Helping students discover their dream career through AI-powered guidance.
                </p>


            </div>



            <div className="testimonial-grid">


                {
                    testimonials.map((item, index) => (


                        <motion.div

                            key={index}

                            className="testimonial-card"

                            initial={{
                                opacity: 0,
                                y: 50
                            }}

                            whileInView={{
                                opacity: 1,
                                y: 0
                            }}

                            viewport={{
                                once: true
                            }}

                            transition={{
                                duration: .6,
                                delay: index * .15
                            }}

                            whileHover={{
                                y: -10
                            }}

                        >


                            <p className="review">

                                "{item.review}"

                            </p>


                            <h3>
                                {item.name}
                            </h3>


                            <span>
                                {item.role}
                            </span>


                        </motion.div>


                    ))
                }



            </div>


        </section>

    )

}