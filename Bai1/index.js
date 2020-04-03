const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res)=>res.send('<h1>Hello CodersX, I\'m Hoa Pha</h1>'));

app.get('/user', (req, res)=>res.send('User List'));

app.listen(port, ()=>console.log(`Server listening on port ${port}`));
