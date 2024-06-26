# Puzzlwise

<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
</div>

<br>

#### :mag_right: Improve your critical thinking skills with logic grid puzzles :mag:

Test your historical knowledge and sharpen your critical thinking skills with this engaging game application. Immerse yourself in the world of history while tackling logic grid puzzles, a brain-teasing challenge that requires you to deduce relationships between elements based on a set of clues. These puzzles provide an excellent opportunity to practice logical reasoning and problem-solving abilities while exploring historical themes.

### Reason for this project?
There's generally a lack of focus on developing critical thinking skills. This project aims to shift focus towards developing critical thinking skills by gamifying the learning process.

Additionally, I wanted to practice using vanilla JavaScript, HTML and CSS to build a website. This application uses its own API, using node.js as my runtime. It's a good first project to get a handle on how to manoeuvre through pages, add simple features (such as drop down menus, popups, etc.) and build a full backend.

## Frontend
url: https://puzzlwise.onrender.com

This simple project has a home page and puzzle page.

## Backend
url: https://puzzlwise-server.onrender.com/

| Route | Purpose | Parameters |
|:------|---------|------------|
|/clues|Lists all the clues for each of the topics available to play from|none|
|/clues/:topicNum|Lists all the clues for a specific topic|topic id|

## To view the application
1) run the command `npm i` in the server and client folders, separately.
2) run the command `npm run dev` in the server folder to get the server started.
3) right click the home.html file in the client folder and select 'Open with Live Server'
