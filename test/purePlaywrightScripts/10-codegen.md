# Generate code snippets using Codegen tool

## Commands

- `npx playwright codegen --help`

    - displays help and all usable commands 

    ```
    Usage: npx playwright codegen [options] [url]

    open page and generate code for user actions

    Options:
    -o, --output <file name>     saves the generated script to a file
    --target <language>          language to use, one of javascript, python, python-async, csharp (default: "javascript")
    -b, --browser <browserType>  browser to use, one of cr, chromium, ff, firefox, wk, webkit (default: "chromium")
    --channel <channel>          Chromium distribution channel, "chrome", "chrome-beta", "msedge-dev", etc
    --color-scheme <scheme>      emulate preferred color scheme, "light" or "dark"
    --device <deviceName>        emulate device, for example  "iPhone 11"
    --geolocation <coordinates>  specify geolocation coordinates, for example "37.819722,-122.478611"
    --load-storage <filename>    load context storage state from the file, previously saved with --save-storage
    --lang <language>            specify language / locale, for example "en-GB"
    --proxy-server <proxy>       specify proxy server, for example "http://myproxy:3128" or "socks5://myproxy:8080"
    --save-storage <filename>    save context storage state at the end, for later use with --load-storage
    --timezone <time zone>       time zone to emulate, for example "Europe/Rome"
    --timeout <timeout>          timeout for Playwright actions in milliseconds (default: "10000")
    --user-agent <ua string>     specify user agent string
    --viewport-size <size>       specify browser viewport size in pixels, for example "1280, 720"
    -h, --help                   display help for command
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