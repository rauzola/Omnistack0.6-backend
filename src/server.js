const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

const Server = require('http').Server(app);
const io = require('socket.io')(server);

io.on("connect", socket => {
    socket.on("connectRoom", box => {
        socket.join(box);
    });
});

mongoose.connect(`mongodb+srv://omnistack:omnistack@cluster0-jwq0n.mongodb.net/omnistack6?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require("./routes"));

app.listen(process.env.PORT || 3333);