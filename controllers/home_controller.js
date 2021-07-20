//this is a callback function , it will return an object so ti receive it we do .home there
module.exports.home = function home(req , res){

   // res.end('<h1>Hey I am in Contoller!!</h1>');
  
   res.render('home' , {
        'title' : "Social Clone"
   })
}