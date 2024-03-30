import React, { useState, useEffect } from 'react';

function App() {
  const [orders, setOrders] = useState([]);
  const [totalCost, setTotalCost] = useState('');
  const [friendsList, setFriendsList] = useState('');
  const [meals, setMeals] = useState('');
  const [individualShare, setIndividualShare] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/get_orders');
      if (!response.ok) {
        throw new Error('Error fetching orders');
      }
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    }
  };

  const addOrder = async () => {
    try {
      if (!totalCost || !friendsList || !meals) {
        throw new Error('Total Cost and Friends and Meals are required fields');
      }

      const response = await fetch('/add_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ totalCost: parseFloat(totalCost), friends: friendsList.split(','), meals })
      });
      if (!response.ok) {
        throw new Error('Error adding order');
      }
      fetchOrders();
      setTotalCost('');
      setFriendsList('');
      setMeals('');
    } catch (error) {
      console.error('Error adding order:', error.message);
    }
  };

  const calculateBill = async (index) => {
    try {
      const response = await fetch('/calculate_bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderIndex: index })
      });
      if (!response.ok) {
        throw new Error('Error calculating bill');
      }
      const data = await response.json();
      setIndividualShare(data.individualShare);
    } catch (error) {
      console.error('Error calculating bill:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Bill Splitting Application</h1>
      <div className="mb-4">
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Total Cost"
          min="1"
          value={totalCost}
          required
          onChange={(e) => setTotalCost(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Friends"
          value={friendsList}
          onChange={(e) => setFriendsList(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Meals"
          value={meals}
          onChange={(e) => setMeals(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addOrder}>Add Order</button>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Total Cost</th>
              <th>Friends</th>
              <th>Meals</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>Order {index + 1}</td>
                <td>${order.totalCost}</td>
                <td>{order.friends.join(', ')}</td>
                <td>{order.meals}</td>
                <td><button className="btn btn-success" onClick={() => calculateBill(index)}>Calculate Bill</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {individualShare && <p>Individual share for this order: ${individualShare.toFixed(2)}</p>}
    </div>
  );
}

export default App;
