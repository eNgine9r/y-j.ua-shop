const express = require('express');
const app = express();
const port = 3000;
const ejs = require('ejs');
const mongoose = require('mongoose');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Головна',
    // Тут ви можете передавати інші необхідні дані для відображення на сторінці.
  });
});

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Сервер запущений на порті ${port}`);
});

// app.js


const mongoURI = 'mongodb://localhost:27017/db'; // Замініть 'your-database-name' на назву вашої бази даних

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Підключено до бази даних'))
  .catch(err => console.error('Помилка підключення до бази даних:', err));


  // app.js

const productRoutes = require('./routes/productRoutes');
app.use('/', productRoutes);

// app.js

// Додамо змінну для збереження товарів у кошику
let cartItems = [];

// Маршрут для додавання товару до кошика
app.post('/addToCart/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }
    cartItems.push(product); // Додаємо товар до кошика
    res.redirect('/cart'); // Перенаправляємо на сторінку кошика
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Маршрут для відображення кошика
app.get('/cart', (req, res) => {
  res.render('cart', { cartItems });
});


// app.js

// ...

// Маршрут для оформлення замовлення
app.post('/checkout', async (req, res) => {
  const { name, email, address } = req.body;
  try {
    if (!name || !email || !address) {
      return res.status(400).json({ message: 'Будь ласка, заповніть всі поля' });
    }

    // Розрахунок загальної суми кошика
    const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);

    // Збереження замовлення в базі даних
    const order = new Order({
      name,
      email,
      address,
      cartItems,
      totalPrice,
    });
    await order.save();

    // Очищення кошика після оформлення замовлення
    cartItems = [];

    res.json({ message: 'Замовлення успішно оформлено' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// ...

// Маршрут для відображення списку замовлень
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 }); // Відображення останніх замовлень першими
    res.render('orders', { orders });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});
// ...

