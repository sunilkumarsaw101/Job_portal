import JobModel from "../models/job.model.js";
export const userType= (req, res, next)=>{
   console.log(req.params);
   const JobId= req.params.id;
  const job= JobModel.getJobById(JobId);
  if(job.jobPostedBy==req.session.userEmail){
      next();
  }else{
    // res.send("<h1>This job is not created by you</h1>");
    res.render('notYou',{
        userEmail: req.session.userEmail,
    });
  }

}