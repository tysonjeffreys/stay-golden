module.exports = (req,res,next) => {
    if(req.session.userId) {
        return res.redirect('/') //if user is logged in redirect to the homepage
    }
    next()
}
