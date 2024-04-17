export const setLastVisit= (req, res, next)=>{
    //if cookie are set before, then store the last visited time in a variable.
 
    if(req.cookies.lastVisit){
     
       res.locals.lastVisit= new Date(req.cookies.lastVisit).toLocaleString();
    }

    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 2*24*60*60*1000
    })
    next();
}