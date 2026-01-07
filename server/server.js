import express from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// or simply 'const stripe = require('stripe')(secret_key)'

app.post('/create-checkout-session', async (req, res) => {
  console.log(req.body.cartItems)
  console.log("Stripe key:", process.env.STRIPE_SECRET_KEY);
    try {
      const items = req.body.cartItems
      
      const line_items = items.map(item => ({
        price_data: {
          currency: 'jpy',
          product_data: { name: item.name },
          unit_amount: item.price * 100
        },
        quantity: item.quantity,
      }))

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items,
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
        shipping_options: [
          { shipping_rate: 'shr_1SmmtiHf2lIp34zb3nugJOu5' },
          { shipping_rate: 'shr_1SmmwgHf2lIp34zbp96UTDCe'} 
        ],
      })

      res.json({ url: session.url })
    } catch (error) {
      console.error('STRIPE ERROR: ', error)
      res.status(500).json({ statusCode: 500, error: error.message })
    }
  })

  app.listen(3000, () => console.log('server running on port 3000'))