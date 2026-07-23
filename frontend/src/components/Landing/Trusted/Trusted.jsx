import { motion } from "framer-motion";
import "./Trusted.css";


const stats = [
  {
    number: "5,000+",
    title: "Students Guided"
  },
  {
    number: "1,200+",
    title: "Career Roadmaps Created"
  },
  {
    number: "800+",
    title: "Projects Recommended"
  },
  {
    number: "95%",
    title: "Career Confidence"
  }
];


export default function Trusted() {

return (

<section className="trusted-section">


<motion.div
className="trusted-heading"

initial={{
opacity:0,
y:40
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
duration:.6
}}
>


<span>
WHY STUDENTS TRUST US
</span>


<h2>
Trusted by Future Engineers & Developers 🚀
</h2>


<p>
CareerAI helps students discover the right career path
using AI-powered guidance and personalized roadmaps.
</p>


</motion.div>



<div className="trusted-grid">


{
stats.map((item,index)=>(


<motion.div

key={index}

className="trusted-card"

initial={{
opacity:0,
y:50
}}

whileInView={{
opacity:1,
y:0
}}

viewport={{
once:true
}}

transition={{
delay:index*.15,
duration:.5
}}

whileHover={{
y:-8
}}

>


<h3>
{item.number}
</h3>


<p>
{item.title}
</p>


</motion.div>


))
}


</div>


</section>

)

}