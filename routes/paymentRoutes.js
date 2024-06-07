const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your-stripe-secret-key');

router.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body.items,
    mode: 'payment',
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/cancel`,
  });

  res.json({ id: session.id });
});

module.exports = router;
