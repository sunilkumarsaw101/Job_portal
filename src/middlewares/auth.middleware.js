export const auth =(req, res, next)=>{
    // console.log(req.session);
    if(req.session.userEmail){
         next();
    }
    else{
        res.redirect('/login');
    }
    }