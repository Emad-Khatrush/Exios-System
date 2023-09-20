if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/error');
const { validatePhoneNumber } = require('./utils/messages');
const cors = require('cors');
const morgan = require('morgan');

// import routes
const orders = require('./routes/orders');
const users = require('./routes/users');
const expenses = require('./routes/expenses');
const incomes = require('./routes/incomes');
const activities = require('./routes/activities');
const offices = require('./routes/offices');
const sendMessages = require('./routes/sendMessages');
const resetToken = require('./routes/resetToken');
const tasks = require('./routes/tasks');
const settings = require('./routes/settings');
const User = require('./models/user');
const { Client, LocalAuth } = require('whatsapp-web.js');
const order = require('./models/order');

let qrCodeData = null;

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox']
  },
});

const app = express();

client.on('qr', (qr) => {
  console.log(qr);
  qrCodeData = qr;
});

client.on('ready', () => {
  console.log('WhatsApp client is ready!');
});

client.initialize();

const connectionUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/exios-admin'
mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    
  next();
})
app.use(cors());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log('MongoDB connected');
})

// render routes
app.use('/api', users);
app.use('/api', orders);
app.use('/api', expenses);
app.use('/api', activities);
app.use('/api', offices);
app.use('/api', incomes);
app.use('/api', sendMessages);
app.use('/api', resetToken);
app.use('/api', tasks);
app.use('/api', settings);

app.get('/api/get-qr-code', (req, res) => {
  if (qrCodeData) {
    res.status(200).json({ qrCode: qrCodeData });
  } else {
    res.status(404).json({ message: 'QR code not available yet' });
  }
});

app.post('/api/sendWhatsupMessage', async (req, res) => {
  const { phoneNumber, message } = req.body

  try {
    const target = await client.getContactById(validatePhoneNumber(phoneNumber));
    if (target) {
      await client.sendMessage(target.id._serialized, message);
      return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'whatsup-auth-not-found' });
  }
});

app.use(async (req, res) => {
  // const newClients = await User.aggregate([
  //   {
  //     $match: {
  //       'roles.isClient': true
  //     }
  //   },
  //   {
  //     $lookup: {
  //       from: 'orders',
  //       localField: '_id',
  //       foreignField: 'user',
  //       as: 'orders'
  //     }
  //   },
  //   {
  //     $match: {
  //       orders: { $size: 0 }
  //     }
  //   },
  //   {
  //     $sort: {
  //       createdAt: -1
  //     }
  //   }
  // ])/
  // generatePDF(newClients).catch((error) => {
  //   console.error(error);
  // });
  // res.send(newClients);
  res.status(404).send("Page Not Found");
});

// Error Handler
app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server working on http://localhost:${process.env.PORT || 8000}/`);
})  
