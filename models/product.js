const Product = require('./models/product');

const newProduct = new Product({
  name: 'Срібний кулон з кришталем',
  description: 'Прекрасний кулон зі срібла та кришталем',
  price: 29.99,
  image: 'path/to/image.jpg',
  category: 'Кулони',
});

newProduct.save()
  .then(() => console.log('Товар додано до бази даних'))
  .catch(err => console.error('Помилка при додаванні товару:', err));
