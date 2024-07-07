const listing = require("./models/listing");
const Review = require("./models/review");



module.exports.isLogged = (req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in");
        return res.redirect("/signup/login");
      }
      next();
}

module.exports.savedUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};


module.exports.isOwner = async (req,res,next)=>{
  let picture =  await listing.findById(id);
    if( !picture.owner._id.equals(res.locals.currUser._id)){
      req.flash("error", "You can't Update this listing");
      return res.redirect(`/listings/${id}`)
    }
    next();
};



module.exports.isAuthor = async (req,res,next)=>{
  let {id,reviewId}= req.params;
  let review =  await Review.findById(reviewId);
    if( !review.author._id.equals(res.locals.currUser._id)){
      req.flash("error", "you haven't created this review");
      return res.redirect(`/listings/${id}`)
    }
    next();
}