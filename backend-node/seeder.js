const fs = require('fs');
const mongoose = require('mongoose');
const dontenv = require('dotenv');
// Load ENV vars
dontenv.config({ path: './config/config.env' });
 
// Load Models
const User = require('./models/User');
 
// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
 
//Read JSON files
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
);

 
// Import data
const importData = async () => {
  try {
    await User.create(users);
    console.log('User Data imported...');
    process.exit();
  } catch (error) {
    console.error(error);
  }
};
 
// Delete data
const deleteData = async () => {
  try {
   
    await User.deleteMany();
    console.log('User Data destroyed...');
    if (process.argv[2] === '-d') {
      process.exit();
    }
  } catch (error) {
    console.error(error);
  }
};
 
// Reset Data
const resetData = async () => {
  try {
    console.log('Deleting data...');
    await deleteData();
    console.log('data deleted');
    console.log('Importing data...');
    await importData();
    console.log('data imported');
  } catch (error) {
    console.error(error);
  }
}
 
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else if (process.argv[2] === '-r') {
  resetData();
}