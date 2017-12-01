module.exports = function(app, passport) {

    app.route('/auth/github')
    	.get(passport.authenticate('github'));

    app.route('/auth/github/callback')
    	.get(passport.authenticate('github', {
    		successRedirect: '/',
    		failureRedirect: '/login'
    	}));

}
