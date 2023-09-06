```
{
    "compilerOptions": {
    "outDir": "build",
    "target": "esnext",
    "module": "esnext",
    "lib": ["DOM", "esnext"],
    "strict": true,
    "jsx": "react",
    "moduleResolution": "node",
    "noEmitOnError": true
    },
    "include": ["src/**/*"],
    "exclude": ["node_modules", "build"]
}

```

-   outDir: This is the folder that the transpiled JavaScript is placed in.
-   target: This is the version of JavaScript we want to transpile to. The esnext target means the next version.
-   Module: This is the type of module used within the code. The esnext module means
    standard JavaScript modules.
-   Lib: Gives the standard library types included in the type checking process. DOM gives the browser DOM API types, and esnext are types for APIs in the next version of JavaScript.
-   Strict: When set to true, means the strictest level of type checking.
-   Jsx: When set to React, allows the compiler to transpile React’s JSX.
-   moduleResolution: This is how dependencies are found. We want TypeScript to look
    in the node_modules folder, so we have chosen node.
-   noEmitOnError: When set to true, means the transpilation won’t happen if a type
    error is found.
