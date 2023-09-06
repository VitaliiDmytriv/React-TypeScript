### Package.json

The package.json file defines our project name, description, npm scripts, dependent npm modules,and much more.

### TS&React

```
const root = createRoot(
document.getElementById('root') as HTMLElement
);
```

This is called a type assertion, which tells TypeScript what the type should be. Without the type assertion, TypeScript will infer the type as HTMLElement | null because document.getElementById may not find an element and return null.

### Webpack

```
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {
    Configuration as WebpackConfig,
    HotModuleReplacementPlugin,
} from "webpack";
import { Configuration as WebpackDevServerConfig } from "webpack-dev-server";

type Configuration = WebpackConfig & {
    devServer?: WebpackDevServerConfig;
};

const config: Configuration = {
    mode: "development",
    output: {
        publicPath: "/",
    },
    entry: "./src/index.tsx",
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
        }),
        new HotModuleReplacementPlugin(),
    ],
    devtool: "inline-source-map",
    devServer: {
        static: path.join(__dirname, "dist"),
        historyApiFallback: true,
        port: 4000,
        open: true,
        hot: true,
    },
};

export default config;

```

-   The path node library will tell webpack where to place the bundle.
-   HtmlWebpackPlugin will be used to create index.html.
-   The webpack configuration TypeScript types come from both the webpack and webpackdev- server packages. So, we combine them using an intersect type, creating a type called Configuration.
-   The mode property tells webpack the configuration is for development, meaning that the React development tools are included in the bundle
-   The output.publicPath property is the root path in the app, which is important for deep linking in the dev server to work correctly
-   The entry property tells webpack where the React app’s entry point is, which is index.tsx in our project
-   Webpack expects the configuration object to be a default export, so we export the config object as a default export
-   The module property informs webpack how different modules should be processed. We need to tell webpack to use babel-loader for files with .js, .ts, and .tsx extensions.
-   The resolve.extensions property tells webpack to look for TypeScript files and JavaScript files during module resolution.
-   As mentioned earlier, HtmlWebpackPlugin creates the HTML file. It has been configured to use index.html in the src folder as a template.
-   HotModuleReplacementPlugin allows modules to be updated while an application is
    running, without a full reload.
-   The devtool property tells webpack to use full inline source maps, which allow the original source code to be debugged before transpilation.
-   The devServer property configures the webpack development server. It configures the web server root to be the dist folder and to serve files on port 4000. Now, historyApiFallback is required for deep links to work, and we have also specified to open the browser after the server has been started.

### Recap

-   An HTML file is required to host the React app
-   Webpack transpiles the app’s React and TypeScript code into JavaScript with the help of Babel and then references it in the HTML file
-   Webpack has a development server that automatically refreshes the app as we write code
