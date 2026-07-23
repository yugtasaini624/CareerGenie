import { motion } from "framer-motion";
import "./Quiz.css";

export default function QuestionCard({

    question,
    currentQuestion,
    totalQuestions,
    selectedAnswer,
    setSelectedAnswer

}) {

    const options = [

        { key: "A", value: question.option_a },
        { key: "B", value: question.option_b },
        { key: "C", value: question.option_c },
        { key: "D", value: question.option_d }

    ];

    return (

        <motion.div
            className="question-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >

            <span className="question-count">
                Question {currentQuestion + 1} of {totalQuestions}
            </span>

            <h2 className="question-title">
                {question.question}
            </h2>

            <div className="options">

                {options.map(option => (

                    <motion.button

                        key={option.key}

                        whileHover={{ scale: 1.02 }}

                        whileTap={{ scale: .98 }}

                        onClick={() => setSelectedAnswer(option.key)}

                        className={`option ${
                            selectedAnswer === option.key
                                ? "selected"
                                : ""
                        }`}

                    >

                        <div className="option-letter">
                            {option.key}
                        </div>

                        <div className="option-text">
                            {option.value}
                        </div>

                    </motion.button>

                ))}

            </div>

        </motion.div>

    );

}