### Compilation of source files

The theme is built using SASS and PugJs which are in turn compiled into HTML and CSS by Webpack. If you are not familiar with Webpack, [here](https://webpack.js.org/guides/getting-started/) is a guide to get started. If you are familiar with Webpack follow the instruction mentioned bellow to edit or customize the source.

If you don't want to edit theme you can use the compiled files directly inside `dist` folder.

Run `npm install` command in project root directory to install and build dependencies.

Use `npm run start` task to edit and compile source files on the go or use `npm run build` task to compile all source files at once.

### Layout Customization

The layout is built using PugJs. All the layout source files are located in src/pug directory. There are two sub directories inside this directory:

* `layout` - Includes common HTML skeleton layout which is extended by all the pages
* `includes` - Includes layout partials like sidebar and navbar and footer

### Style Customization

The styles are written in SASS. All the style files are located in src/sass directory. There is a file in this directory neoadmin.sass which imports all the files and exported as neoadmin.css There are two subdirectories inside this directory:

* vendors - It includes styles of all the external libraries which contains the variables required for the application
* neoadmin - It contains the basic style like overall structure css and theming options

The neoadmin subdirectory contains the following:

* files *.scss - These SASS files have the general settings and start variables of the themes.
* component - It contains the styles for the components like card, widgets, sidebar, navbar etc
* pages - It contains the styles for the specific pages like login page, lock-screen page

To customize the primary color of the theme and sidebar you need to change the variables in the `scss/_var.scss`. The detailed documentation about changing the colors is mentioned in this file itself.

If you don't want to use particular component or plug-in just comment the import statement for that particular component in `src/sass/neoadmin.scss` and compile the SASS by running npm run build command.

### Compatibility with other frameworks

This theme is not built for a specific framework or technology like Angular or React etc. But due to it's modular nature it's very easy to incorporate it into any front-end or back-end framework like Angular, React or VueJs or Node JS. The CSS is modular enough to be incorporated in any framework. While the Javascript used to make the components interactive can be used from any of the following framework.

If you are using Angular you can use [ui-bootstrap](https://angular-ui.github.io/bootstrap/), for React use [React-Bootstrap](https://react-bootstrap.github.io/) and for VueJs you can use [VueStrap](https://yuche.github.io/vue-strap/).

If you are using Node JS as your web server you can use pug as your layout engine to render html templates as is without compiling them to HTML. More details are available [here](https://pugjs.org/api/express.html).

### RTL Support

To enable RTL support

* Uncomment this line `@import 'component/rtl'`; in `src/sass/neoadmin.scss`.
* Webpack will include the style automatically, but you can also add dir="rtl" attribute to <html> tag in `src/pug/layouts/_layout.pug`.
* Build the source files using npm run build command.

### Contribution & Issues

If you liked the theme do star and fork it on [GitHub](https://github.com/cesarcalicb/NeoAdmin). If you find anything missing or want to contribute to this documentation, the source is available [here](https://github.com/cesarcalicb/NeoAdmin/). If you have an issue or feature request regarding theme please report it [here](https://github.com/cesarcalicb/NeoAdmin/issues/new).
