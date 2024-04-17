export default class JobModel {
  constructor(
    _id,
    _jobCategory,
    _jobDesignation,
    _jobLocation,
    _companyName,
    _salary,
    _applyBy,
    _skillsRequired,
    _numberOfOpenings,
    _jobPostedDate,
    _jobPostedBy,
    _applicants
  ) {
    this.id = _id;
    this.jobCategory = _jobCategory;
    this.jobDesignation = _jobDesignation;
    this.jobLocation = _jobLocation;
    this.companyName = _companyName;
    this.salary = _salary;
    this.applyBy = _applyBy;
    this.skillsRequired = _skillsRequired;
    this.numberOfOpenings = _numberOfOpenings;
    this.jobPosted = _jobPostedDate;
    this.jobPostedBy = _jobPostedBy;
    this.applicants = _applicants;
  }

  // static get(searchKey) {

  //   const filteredArray = jobs.filter((obj) =>
  //     Object.values(obj).some(
  //       (value) => typeof value === "string" && value?.toLowerCase().includes(searchKey?.toLowerCase())
  //     )
  //   );
  //   console.log(filteredArray);
  //   return filteredArray;
  // }
  static get(searchKey) {
    console.log('Search Key:', searchKey);
    if (!searchKey) {
      return jobs; // Return all jobs if no search key
  }
    const filteredArray = jobs.filter((obj) =>
      Object.values(obj).some(
        (value) => {
          // console.log('Value:', value);
          return typeof value === "string" && value?.toLowerCase().includes(searchKey?.toLowerCase());
        }
      )
    );
    
    // console.log('Filtered Array:', filteredArray);
    return filteredArray;
  }
  

  static getJobById(jobId) {
    return jobs.find((job) => job.id == jobId);
  }
  static getApplicantList(jobId) {
    // console.log('object');
    // const selectedJob= jobs.find((job)=>job.id==jobId);
    let selectedJob = jobs.find((job) => job.id == jobId);

    // console.log('selected job- ',selectedJob);
    // console.log('app-', selectedJob?.applicants);
    return selectedJob.applicants;
  }

  static deleteJob(jobId) {
    const index = jobs.findIndex((job) => {
      return job.id == jobId;
    });
    jobs.splice(index, 1);
  }

  static add(jobId, applicant) {
    // console.log(jobId);
    let selectedJob = jobs.find((job) => job.id == jobId);
    //  console.log(selectedJob);
    selectedJob.applicants.push(applicant);
    // console.log(selectedJob.applicants);
  }

  static addNewJob(newJobObj) {
    newJobObj.id = jobs.length + 1;
    console.log(newJobObj);
    jobs.push(newJobObj);
  }

  static updateJob(updatedObj) {
    console.log(updatedObj);
    const index = jobs.findIndex((job) => job.id == updatedObj.id);
    jobs[index] = updatedObj;
  }

  //   static add(name, desc, price, imageUrl) {
  //     let newPro = new ProductModel(
  //       product.length + 1,
  //       name,
  //       desc,
  //       price,
  //       imageUrl
  //     );
  //     product.push(newPro);
  //   }

  //   static update(productObj) {
  //     const index = product.findIndex((prod) => {
  //       return prod.id == productObj.id;
  //     });
  //     product[index] = productObj;
  //   }

  //   static delete(id) {
  //     const index = product.findIndex((prod) => {
  //       return prod.id == id;
  //     });
  //     product.splice(index, 1);
  //     console.log("this is product after delete", product);
  //   }

  //   static getProductById(productId) {
  //     return product.find((product) => product.id == productId);
  //   }
}

var jobs = [
  new JobModel(
    1,
    "Software Development",
    "Full Stack Developer",
    "Anytown, USA",
    "Tech Co.",
    "$80,000 - $100,000",
    "2023-12-31", // Use a date format that suits your needs (e.g., YYYY-MM-DD)
    ["JavaScript", "Node.js", "React"],
    3,
    "2023-01-10", // Date when the job was posted
    "sunil@gmail.com",
    [] // Initially, the list of applicants is empty
  ),
  new JobModel(
    2,
    "Marketing",
    "Digital Marketing Specialist",
    "Banglore, India",
    "Google.",
    "$70,000 - $90,000",
    "2023-12-31", // Use a date format that suits your needs (e.g., YYYY-MM-DD)
    ["Digital Marketing", "SEO", "Social Media Management"],
    4,
    "2023-01-10", // Date when the job was posted
    "sunil@gmail.com",
    [] // Initially, the list of applicants is empty
  ),
  new JobModel(
    3,
    "Software Development",
    "Backend Developer",
    "Anytown, USA",
    "Tech Co.",
    "$80,000 - $100,000",
    "2023-12-31", // Use a date format that suits your needs (e.g., YYYY-MM-DD)
    ["JavaScript", "Node.js", "React"],
    6,
    "2023-01-10", // Date when the job was posted
    "sunilk@gmail.com",
    [] // Initially, the list of applicants is empty
  ),
];
