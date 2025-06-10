import Cart from '../models/cartModel.js';

// Add product to cart
export const addToCart = async (req, res) => {
  const { userId, productId, productName, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, productName, price, quantity: 1 });
      }

      await cart.save();
    } else {
      cart = await Cart.create({
        userId,
        items: [{ productId, productName, price, quantity: 1 }]
      });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// // Get user's cart
// export const getCart = async (req, res) => {
//   try {
//     const cart = await Cart.findOne({ userId: req.params.userId });
//     if (!cart) return res.status(404).json({ message: 'Cart not found' });
//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Calculate total amount
    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    res.status(200).json({
      ...cart.toObject(),
      totalAmount: parseFloat(totalAmount.toFixed(2)) // optional: round to 2 decimals
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update quantity
export const updateQuantity = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    item.quantity = quantity;
    await cart.save();
    // Recalculate totalAmount before responding
const totalAmount = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

res.status(200).json({
  _id: cart._id,
  userId: cart.userId,
  items: cart.items,
  totalAmount,
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true }
    );

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { $set: { items: [] } },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

