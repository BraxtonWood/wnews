const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
const postBank = require('./postBank');


app.use(express.static('public'));



app.get('/', (req, res) => {
    const posts = postBank.list();
    
    console.log(posts);
    const html = `<!DOCTYPE html>
            <html>
            <head>
            <title>Wizard News</title>
            <link rel="stylesheet" href="/style.css" />
            </head>
            <body>
            <div class="news-list">
                <header><img src="/logo.png"/>Wizard News</header>
                ${posts.map(post => `
                <div class='news-item'>
                    <p>
                    <span class="news-position">${post.id}. ▲</span>
                    <a href="/posts/${post.id}">${post.title}</a>
                    <small>(by ${post.name})</small>
                    </p>
                    <small class="news-info">
                    ${post.upvotes} upvotes | ${post.date}
                    </small>
                </div>`
                ).join('')}
            </div>
            </body>
        </html>`;
    res.send(html);
});
app.get('/posts/:id', (req, res) =>{
    console.log( req.params.id );
    const id = req.params.id;
    const post = postBank.find(id);
    let postHtml = '';
    if(post === undefined){
        postHtml = `<!DOCTYPE html>
                <html>
                <head>
                <title>Wizard News</title>
                <link rel="stylesheet" href="/style.css" />
                </head>
                <body>
                <div class="news-list">
                    <header><img src="/logo.png"/>Wizard News</header>
                    
                    <div class='news-item'>
                        <p>
                        <span class="news-position">${post.id}. ▲</span>
                        ${post.title}
                        <small>(by ${post.name})</small>
                        </p>
                        <small class="news-info">
                        ${post.upvotes} upvotes | ${post.date}
                        </small>
                        <p> ${post.content}</p>
                    </div>
                    
                </div>
                </body>
            </html>`
    }else{
        res.status(404);
        postHtml = `<!DOCTYPE html>
        <html>
        <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
        </head>
        <body>
        <div class="news-list">
            <header><img src="/logo.png"/>Wizard News</header>
            <div class="not-found">
                <p>Accio Page! 🧙‍♀️ ... Page Not Found</p>
                <img src="/dumbledore-404.gif" />
            </div>
        </body>
    </html>`
    }
    
    res.send(postHtml);
});
app.get( '/users/:name', (req, res) =>{
    console.log(req.params.name);
})













const PORT = 1337;
app.listen(PORT, () =>{
    console.log(`app listening to port ${PORT}`)
});