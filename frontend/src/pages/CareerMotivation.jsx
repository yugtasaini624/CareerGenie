import React, { useEffect, useState } from "react";
import "./CareerMotivation.css";


function CareerMotivation(){


    const [name,setName] = useState("");


    useEffect(()=>{


        fetchUser();


    },[]);





    const fetchUser = async()=>{


        try{


            const token = localStorage.getItem(
                "access_token"
            );


            const response = await fetch(

                "http://localhost:5000/api/dashboard",

                {

                    headers:{

                        "Authorization":
                        `Bearer ${token}`

                    }

                }

            );



            const data = await response.json();



            if(data.success){

                setName(
                    data.user.name
                );

            }



        }
        catch(error){

            console.log(error);

        }


    };






return(


<div className="career-motivation-card">





<div className="career-motivation-header">


<h2>

Career Momentum

</h2>



<span>

🚀

</span>


</div>







<p className="career-motivation-text">


You are making strong progress, {name}.

Keep building your skills and complete your next milestone.


</p>








<div className="career-motivation-box">





<div>


<span>

Current Focus

</span>


<strong>

React Development

</strong>


</div>







<div>


<span>

Next Goal

</span>


<strong>

Full Stack Project

</strong>


</div>





</div>







<button className="career-motivation-btn">

Continue Journey

</button>





</div>


)


}


export default CareerMotivation;