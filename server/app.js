require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;
const clues = require("./clues.json");

app.use(cors());
app.use("/clues", express.json());

app.get('/', (req, res) => {
    if (clues.length == 1) {
        res.status(200).send(`There is currently a total of ${clues.length} topic to pick from!`);
    } else if (clues.length > 1) {
        res.status(200).send(`There is currently a total of ${clues.length} topics to pick from!`)
    } else {
        res.status(406).send(`The clues database contains an error and cannot be accessed.`)
    }
})

app.get('/clues',(req,res)=>{
    res.send(clues)
})

app.get('/clues/:topicNum',(req,res)=>{
    const topicNum = req.params.topicNum;
    const clue = clues.find((clue) => clue.topicNum == topicNum);

    if (clue==undefined){
        res.status(404).send(`This topic number does not exist. Please write a number between 1 and ${clues.length}.`)
    } else {
        res.send(clue)
    }
})

module.exports = {app, port};