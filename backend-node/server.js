const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connDb = require('./config/db');
const errorHandler = require('./middlewares/error');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const socketIo = require('socket.io');
const cors = require('cors');

// Load env vars
dotenv.config({ path: './config/config.env' });

connDb();
// Routes files
const users = require('./routes/users');
const auth = require('./routes/auth');
const tasks = require('./routes/tasks');

const app = express();

// Body parser

app.use(express.json());

// Middleware

if (process.env.NODE_ENV == 'development') {
    app.use(morgan(
        'default'
    ));
}


// Sanitzie data
app.use(mongoSanitize());

// Security headers
app.use(helmet());

// Prevent xss attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 100,
    max: 100
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable Cors error

app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routes
app.use('/api/v1/auth', auth);
app.use('/api/users', users);
app.use('/api/tasks', tasks);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;


const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// Socket Io
const userss = {}; // object to store all connected s
const rooms = {}; // object to store all created rooms
const userList = [];
const io = socketIo(server);
io.on('connection', (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on('online', (name, users) => {
    userList.push(users);
    const userIndex = userList.findIndex((user) => user._id === socket.id);
    if (userIndex !== -1) {
      userList[userIndex].name = name;
      io.emit('userList', userList);
    }
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected.`);
    delete userss[socket.id];
    const userList = Object.values(users);
    io.emit('userList', userList);
  });

  socket.on('createRoom', (userId) => {
    const roomName = `${socket.id}-${userId}`;
    rooms[roomName] = { userss: [socket.id, userId], messages: [] };
    socket.join(roomName);
    io.to(roomName).emit('roomCreated', roomName);
  });


  socket.on('sendMessage', (roomName, message) => {
    const user = userss[socket.id];
    rooms[roomName].messages.push({ user, message });
    io.to(roomName).emit('message', rooms[roomName].messages);
  });


});

//Unhandled promise rejections

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err}`);
    server.close(() => process.exit(1));
});
