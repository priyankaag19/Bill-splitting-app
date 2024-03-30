const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://priyankacrudapp:7zM7SWc4eJdgcFPA@priyanka.egqlius.mongodb.net/orders';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const orderListSchema = new mongoose.Schema({
  totalCost: Number,
  friends: [String],
  meals: [String],
  individualShare: Number
});

const OrderList = mongoose.model('orders', orderListSchema);

app.use(bodyParser.json());

app.get('/get_orders', async (req, res) => {
  try {
    const orders = await OrderList.find();
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

app.post('/add_order', async (req, res) => {
  try {
    const { totalCost, friends, meals } = req.body;
    const individualShare = totalCost / (friends.length);
    const order = new OrderList({ totalCost, friends, meals, individualShare });
    await order.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Error adding order:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/calculate_bill', async (req, res) => {
  try {
    const { orderIndex } = req.body;
    const order = await OrderList.findOne().skip(orderIndex);
    if (!order) {
      throw new Error('Order not found');
    }
    res.json({ individualShare: order.individualShare });
  } catch (error) {
    console.error('Error calculating bill:', error.message);
    res.status(500).json({ error: error.message });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
