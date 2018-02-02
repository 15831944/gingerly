module.exports.about=function(req, res) {
	res.render('loc8r/index', {title: 'About Loc8r - This is Angular SPA Implementation'});
};
module.exports.angularApp=function(req, res) {
	res.render('loc8r/layout', {title: 'Loc8r - Angular SPA'});
};
