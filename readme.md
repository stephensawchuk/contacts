# contacts app.
> for adding and editing contacts.


## live.
[http://stephensawchuk.github.io/contacts](http://stephensawchuk.github.io/contacts)


## about.

[Angular](http://angularjs.org) is a great choice for everything from quick prototypes to full-featured, API-integrated applications. The effortless data-binding seemed like a great fit for this application, as the state of the application changes each time a contact is created or edited. Being able to simply attach a `ng-model` to an `input`, then see the entire view update to reflect your changes was very appealing.

As a core member of the [Yeoman](http://yeoman.io) team, it was easy for me to see the benefit in using one of our generators to get the application started. I decided to try [generator-gulp-webapp](https://github.com/yeoman/generator-gulp-webapp) to get this project off the ground.

[Gulp](http://gulpjs.com) is a new JavaScript build tool, now sharing the spotlight with the more established choice, [Grunt](http://gruntjs.com). In such a short time, Gulp already has a near equivalent ecosystem built around it. It was quite straightforward to integrate tools such as `css-minifier`, `ng-min` (for creating minifier-safe Angular code), and `uglify` (for minifying the JS).

[Bower](http://bower.io) is used for the run-time dependencies of the project, such as Angular, Bootstrap, and jQuery. Bower is a package manager within a package manager ([npm](http://npmjs.org)). It works very similarly to `npm`, so developers you're collaborating with should feel at home with nearly identical commands:

```bash
$ bower install --save jquery
$ bower search angular
```

Bower is intended only for browser-friendly libraries and frameworks, such as those mentioned above.

For testing, I thought I'd try something new. [Protractor](https://github.com/angular/protractor) is a tool from the Angular team, which is built on top of [WebDriverJS](https://code.google.com/p/selenium/wiki/WebDriverJs). Some of the tests for this application include: 

- it should show three default contacts on first load

- it should display their age beside their birthday and age

- it should show a warning icon next to a contact's name when editing

- it should confirm you wish to leave before exiting

[These tests](test/test.js) are run against a real browser instance, which is then programmatically interacted with by way of triggering clicks, and entering keys.

Instructions on how to run the application locally, build an optimized version, and test the application are below.


## running locally.

```bash
$ npm install & bower install
$ gulp watch
```

Then open your browser to [http://localhost:9000/#/](http://localhost:9000/#/).


## building.

```bash
$ gulp
```

The optimized site will end up in the `dist` directory.


## testing.

```bash
$ npm install -g protractor
$ webdriver-manager update
$ webdriver-manager start
```

... from a new tab ...

```bash
$ gulp watch
```

... from another new tab ...

```bash
$ protractor test/conf.js
```
