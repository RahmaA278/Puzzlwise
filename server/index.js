const {app, port} = require("./app");

app.listen(port, () => {
    console.log(`App Listening At Port ${port}.`);
})