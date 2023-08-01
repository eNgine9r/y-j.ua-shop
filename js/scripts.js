function addToCart(productId) {
  fetch(`/addToCart/${productId}`, { method: 'POST' })
    .then(response => {
      if (!response.ok) {
        throw new Error('Помилка додавання товару до кошика');
      }
      return response.json();
    })
    .then(data => {
      alert('Товар успішно додано до кошика');
    })
    .catch(error => {
      alert(error.message);
    });
}