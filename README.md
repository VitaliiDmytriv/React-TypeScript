### Plain CSS

-   Create React App configures webpack to process CSS so that CSS files can be imported into React component files
-   All the styles in an imported CSS file are applied to the app – there is no scoping or removing redundant styles

### CSS modules

-   CSS modules allow CSS class names to be automatically scoped to a React component. This prevents styles for different React components from clashing.
-   CSS modules isn’t a standard browser feature; instead, it is an open source library that can be added to the webpack process.
-   CSS modules are pre-installed and pre-configured in projects created with Create React App.
-   Similar to plain CSS, redundant CSS classes are not pruned from the production CSS bundle.

### CSS-in-JS

-   Styles for a CSS-in-JS library are defined in JavaScript rather than a CSS file.
-   Emotion’s styles can be defined directly on a JSX element using a css attribute.
-   A huge benefit is that conditional logic can be added directly to the styles, which helps us style interactive components more quickly.
-   Emotion styles are applied at runtime rather than at build time because they depend on JavaScript variables. While this allows conditional styling logic to be elegantly defined, it does mean a small performance penalty because the styles are created and applied at runtime.

### Tailwind CSS

1. In the Visual Studio project, start by installing Tailwind by running the following command in a terminal:
   `npm i -D tailwindcss`
2. Tailwind integrates into Create React App projects using a library called PostCSS. PostCSS is a tool that transforms CSS using JavaScript and Tailwind runs as a plugin in it. Install PostCSS by running the following command in the terminal:
   `npm i -D postcss`
3. Tailwind also recommends another PostCSS called Autoprefixer, which adds vendor prefixes to CSS. Install this by running the following command in the terminal:
   `npm i -D autoprefixer`
4. Next, run the following command in a terminal to generate configuration files for Tailwind and PostCSS:
   `npx tailwindcss init -p`

After a few seconds, the two configuration files are created. The Tailwind configuration file is called tailwind.config.js, and the PostCSS configuration file is called postcss.config.js.

-   Tailwind is a well-thought-through collection of reusable CSS classes that can be applied to React elements
-   Tailwind has a nice default color palette and a 4 px spacing scale, both of which can be customized
-   Tailwind is a plugin for PostCSS and executed at build time
-   Tailwind does not incur a runtime performance penalty like Emotion, because the styles aren’t created and applied at runtime
-   Only classes used on React elements are included in the CSS build bundle
