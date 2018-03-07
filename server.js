const express = require('express'),
			hbs     = require('hbs'),
			fs      = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('./logs/http-requests.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to write to log file');
		}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public-assets'));

hbs.registerHelper('getCurrentYear', () =>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (input) => {
	return input.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: "I Mustache You a Question",
		pageHeader: "Welcome to my mustache Page",
		pageBody: "Where any mustache is a good mustache",
		pageAuthor: "Steven McGrath"
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageHeader: "About Page",
		pageTitle: "About Page",
		pageAuthor: "Steven McGrath"
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: "We fucked up"
	});
});

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageHeader: "Projects Page",
		pageBody: "A curated assortment of projects",
		projectsLink: "www.github.com/mcgraths7"
	});
});

app.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
});