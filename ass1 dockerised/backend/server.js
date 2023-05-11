const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
require('dotenv').config()
const authRoutes = require('./routes/auth');
const profileRouter = require('./routes/profileRoute');
const editRouter = require('./routes/editRoute');
const { db } = require('./models/registration.model');
const subgreddiitRouter = require('./routes/SubgreddiitsRoute');
const mysubgreddiitRouter = require('./routes/mySubgredditsRoute');
const searchRouter = require('./routes/searchRoute');
const followersRouter = require('./routes/followersRoute');
const followingRouter = require('./routes/followingRoute');
const joinRouter = require('./routes/joinRequest');
const postRouter = require('./routes/postsRoute');

const app = express()
const port = process.env.PORT || 5000

const uri = process.env.ATLAS_URI;

mongoose.set('strictQuery', true)
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
mongoose.connect(uri)
const connction = mongoose.connection
connction.once('open', () => {
    console.log('connected to mongo')
})

// middleware
app.use(cors()) /// allows us to parse json
app.use(bodyParser.json());

//routes middleware
app.use('/api', authRoutes);
// app.use('/api/followers', followerRouter)
app.use('/api/profile', profileRouter)
app.use('/api/edit', editRouter)
app.use('/api/subgreddiits', subgreddiitRouter)
app.use('/api/mysubgreddiits', mysubgreddiitRouter)
app.use('/api/search', searchRouter)
app.use('/api/followers', followersRouter)
app.use('/api/following', followingRouter)
app.use('/api/join', joinRouter)
app.use('/api/posts', postRouter)

// app.use('/api/auth')
// app.use('/api/posts', postRouter)

app.listen(port, () => {
    console.log('server running on port,', port)
})
