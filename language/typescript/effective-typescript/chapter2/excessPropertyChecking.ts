interface Options {
    title: string;
    darkMode?: boolean;
}

function createWindow(options: Options) {}
createWindow({
    title: "Hello",
    darkmode: false, // Object literal may only specify known properties
});
