import { motion } from "framer-motion";
import "./Profile.css";


const skills = [
    "React",
    "JavaScript",
    "DSA",
    "Node.js",
    "AI Tools",
    "MongoDB"
];


function Profile(){

    return(

        <div className="profile-page">


            <motion.div
            className="profile-card"

            initial={{
                opacity:0,
                y:40
            }}

            animate={{
                opacity:1,
                y:0
            }}

            transition={{
                duration:0.5
            }}

            >


                <div className="profile-avatar">

                    👨‍💻

                </div>


                <h1>
                    Nikki
                </h1>


                <p className="role">
                    Full Stack Developer | AI Enthusiast
                </p>



                <div className="stats">


                    <div>
                        <h2>
                            75%
                        </h2>

                        <span>
                            Profile Complete
                        </span>
                    </div>



                    <div>
                        <h2>
                            12
                        </h2>

                        <span>
                            Projects
                        </span>
                    </div>



                    <div>
                        <h2>
                            8
                        </h2>

                        <span>
                            Skills
                        </span>
                    </div>


                </div>



                <h3>
                    Skills
                </h3>


                <div className="skill-list">

                {
                    skills.map(skill=>(

                        <span key={skill}>
                            {skill}
                        </span>

                    ))
                }

                </div>



                <button className="edit-btn">

                    Edit Profile ✨

                </button>



            </motion.div>


        </div>

    )

}


export default Profile;