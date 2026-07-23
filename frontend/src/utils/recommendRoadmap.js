import roadmaps from "../data/roadmaps";


function recommendRoadmap(profile){


    const goal = profile.goal;



    if(goal === "AI Engineer")
    {
        return roadmaps["AI Engineer"];
    }



    if(goal === "Data Scientist")
    {
        return roadmaps["Data Scientist"];
    }



    if(goal === "Frontend Developer")
    {
        return roadmaps["Frontend Developer"];
    }



    if(goal === "Backend Developer")
    {
        return roadmaps["Backend Developer"];
    }



    if(goal === "Full Stack Developer")
    {
        return roadmaps["Full Stack Developer"];
    }



    return roadmaps["Full Stack Developer"];


}


export default recommendRoadmap;