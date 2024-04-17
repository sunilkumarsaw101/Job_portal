//import necessary dependencies
import express from 'express';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import cookieParser from 'cookie-parser'
import JobController from './src/controllers/job.controller.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js';
import {uploadFile} from './src/middlewares/file-upload.middleware.js'
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
import {userType} from './src/middlewares/userType.middleware.js';
//setting up express instace.
let server=  express();

//setting public folder available globle.
server.use(express.static('public'));

//setting express.urlencoded middleware to parse the url encoded data.
server.use(express.urlencoded({extended:true}));
server.use(cookieParser());

//configure the session.
server.use(session({
    secret:'SecretKey',
    resave: false,
    saveUninitialized:true,
    cookie: {
        secure:false
       
    }
}));

//setting up ejs for server side templating.
server.set('view engine', 'ejs');
server.set('views', path.join(path.resolve(),'src','views'));
server.use(ejsLayouts);


let jobController= new JobController();
const userController= new UserController();

server.get('/register', userController.getRegister );
server.get('/login', userController.getLogin );
server.post('/register', userController.postRegister);
server.post('/login', userController.postLogin);

server.get('/', setLastVisit,
jobController.homePage);
server.get('/jobs',
jobController.getJobs);

server.get('/jobs/createNewJob', jobController.getAddNewJobForm);
server.post('/jobs/createNewJob', jobController.createNewJob);

server.get('/resume/:resumePath', jobController.getResume);


server.get('/job-details/applicants/list/:id', jobController.getApplicantsListView);
server.get('/job-details/:id',  jobController.getJobDetails);
server.get('/job-apply/:id', jobController.getJobApplyView);


server.post('/job-apply/:id', uploadFile.single('resumePath'), jobController.addApplicant);
server.get('/jobs/update-job/:id', userType, jobController.getUpdateJobView);
server.post('/jobs/updateJob', jobController.updateJob);

server.post('/delete-job/:id', jobController.deleteJob );
server.get('/logout', userController.logout);

//middleware to handle 404 requests.
server.use((req, res) => {
    res.render("notFound");
  });
server.listen(3600);
console.log('server is listening on port 3600');