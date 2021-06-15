# Generate code snippets using Codegen tool

## Commands

- `npx playwright codegen --help`

    - displays help and all usable commands 

    ```
    Usage: npx playwright [options] [command]

    Options:
    -V, --version                          output the version number
    -h, --help                             display help for command

    Commands:
    open [options] [url]                   open page in browser specified via -b, --browser
    codegen [options] [url]                open page and generate code for user actions
    debug <app> [args...]                  run command in debug mode: disable timeout, open inspector
    install [browserType...]               ensure browsers necessary for this version of Playwright are installed
    install-deps [browserType...]          install dependencies necessary to run browsers (will ask for sudo permissions)
    cr [options] [url]                     open page in Chromium
    ff [options] [url]                     open page in Firefox
    wk [options] [url]                     open page in WebKit
    screenshot [options] <url> <filename>  capture a page screenshot
    pdf [options] <url> <filename>         save page as pdf
    show-trace [options] [trace]           Show trace viewer
    test [options] [test-filter...]        Run tests with Playwright Test
    help [command]                         display help for command
    ```

- `npx playwright codegen -b <browser> -o <filepath>`

    - starts browser (`chromium | webkit | firefox`)
    - the generated code will be stored in to the `filepath` file 

## Excercise

- start codegen for `firefox` browser and save the output to `excercise.js`
- visit Amazon.com
- click into Search field and search for "JavaScript for Kids"
- click to Switch to Kindle version
- Click on first similar book which is offered below
- Click on Amazon icon top left to return to homepage
- Stop the recording.

Now run the file and it should repeat your actions:

    ```
    node excercise.js
    ```