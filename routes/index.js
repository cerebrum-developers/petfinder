module.exports = (app, wagner) => {
	app.get('/', (req, res, next)=> {
	  res.send("Pet-finder Apis");
	});
	
	// const users  = require('./users')(app, wagner);
	const animals  = require('./animals')(app, wagner);

	// app.use('/users', users);
	app.use('/animals', animals);
}