import JobModel from "../models/job.model.js";

export default class JobController {
  homePage(req, res) {
    res.render("home", {
      userEmail: req.session.userEmail,
    });
  }

  getJobs(req, res) {
    let searchKey = req.query.searchText;

    let jobs = JobModel.get(searchKey);
    console.log("joblist ", jobs);
    res.render("jobs", {
      jobs: jobs,
      userEmail: req.session.userEmail,
    });
  }

  getJobDetails(req, res) {
    // console.log('object');
    const jobId = req.params.id;
    let jobFound = JobModel.getJobById(jobId);
    // console.log(jobFound);
    if (jobFound) {
      res.render("job-details", {
        job: jobFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    } else {
      res.status(401).send("Job not found");
    }
  }
  getApplicantsListView(req, res) {
    // console.log('route handler req path: ', req.path);
    const jobId = req.params.id;
    const applicantsList = JobModel.getApplicantList(jobId);
    console.log(applicantsList);
    res.render("applicantsList", {
      applicantsList: applicantsList,
      userEmail: req.session.userEmail,
    });
  }

  getJobApplyView(req, res) {
    const jobId = req.params.id;
    res.render("job-apply", {
      jobId: jobId,
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }
  addApplicant(req, res) {
    // console.log(req.params);
    const jobId = req.params.id;
    //  console.log(jobId);
    const { applicantId, name, email, contactNumber } = req.body;
    const resumePathVal = req.file.filename;
    const applicant = {
      applicantId: applicantId,
      name: name,
      email: email,
      contactNumber: contactNumber,
      resumePath: resumePathVal,
    };
    JobModel.add(jobId, applicant);
    // let jobs = JobModel.get();
    // res.render("jobs", {
    //   jobs: jobs,
    //   userEmail: req.session.userEmail,
    // });
    res.redirect("/jobs");
    // res.send("added applicant");
  }

  getResume(req, res) {
    const resumePath = req.params;
    // console.log(resumePath);
    const filePath = path.join(__dirname, resumePath);
    //  console.log(filePath);
    res.sendFile(filePath);
  }

  // updateJob(req, res){

  // }

  getAddNewJobForm(req, res) {
    // console.log('object');
    return res.render("new-job", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }

  createNewJob(req, res) {
    // console.log(req.body);
    let newJobObj = {
      jobCategory: req.body.jobCategory,
      jobDesignation: req.body.jobDesignation,
      jobLocation: req.body.jobLocation,
      companyName: req.body.companyName,
      salary: req.body.salary,
      applyBy: req.body.applyBy,
      skillsRequired: req.body.skillsRequired.split(","),
      numberOfOpenings: Number(req.body.numberOfOpenings),
      jobPosted: req.body.jobPosted,
      jobPostedBy: req.session.userEmail,
      applicants: [],
    };
    //  console.log(newJobObj);
    JobModel.addNewJob(newJobObj);
    res.redirect("/jobs");
  }

  updateJob(req, res) {
    req.body.jobPostedBy = req.session.userEmail;
    JobModel.updateJob(req.body);
    res.redirect("/jobs");
  }

  getUpdateJobView(req, res, next) {
    //if product exist then return the view
    // console.log('hello',req.body);
    const jobId = req.params.id;
    // console.log(productId);
    let jobFound = JobModel.getJobById(jobId);
    // console.log(productFound);
    if (jobFound) {
      res.render("update-job", {
        job: jobFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    }
    //return product not found.
    else {
      res.status(401).send("Job not found");
    }
  }

  deleteJob(req, res) {
    // console.log("object");
    const id = req.params.id;
    let jobFound = JobModel.getJobById(id);
    if (!jobFound) {
      res.status(401).send("Job not found");
    }
    JobModel.deleteJob(id);
    let jobs = JobModel.get();

    res.render("jobs", { jobs: jobs, userEmail: req.session.userEmail });
  }
}
