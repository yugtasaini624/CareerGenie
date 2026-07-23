import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./FAQ.css";

const faqs = [
  {
    question: "Is CareerAI free to use?",
    answer:
      "Yes! Students can access AI-powered career guidance and learning recommendations for free."
  },
  {
    question: "How does the Skill Assessment work?",
    answer:
      "CareerAI analyzes your current skills, interests, and career goals to create a personalized learning roadmap."
  },
  {
    question: "Can I change my career goal later?",
    answer:
      "Absolutely! You can retake the assessment anytime and generate a new roadmap."
  },
  {
    question: "Does CareerAI recommend projects?",
    answer:
      "Yes. Based on your roadmap, AI suggests practical projects to strengthen your portfolio."
  }
];

export default function FAQ() {

  const [openIndex, setOpenIndex] = useState(null);

  return (

    <section id="faq" className="faq-section">

      <div className="faq-heading">

        <span>FAQ</span>

        <h2>Frequently Asked Questions</h2>

      </div>

      <div className="faq-container">

        {faqs.map((item, index) => (

          <motion.div
            key={index}
            className="faq-item"
            whileHover={{ scale: 1.01 }}
          >

            <div
              className="faq-question"
              onClick={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            >

              <h3>{item.question}</h3>

              <motion.div
                animate={{
                  rotate: openIndex === index ? 180 : 0
                }}
              >
                <ChevronDown />
              </motion.div>

            </div>

            <AnimatePresence>

              {openIndex === index && (

                <motion.div
                  className="faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >

                  <p>{item.answer}</p>

                </motion.div>

              )}

            </AnimatePresence>

          </motion.div>

        ))}

      </div>

    </section>

  );

}