//middleware to validate empty field in new post. If empty post not made and redirection
//to post page

module.exports = (req,res,next) => {
    if(req.files == null || req.body.title == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}
