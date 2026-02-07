import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, email, isPhysical } = req.body;
  
  if (!amount) {
      return res.status(400).json({ message: 'Missing amount' });
  }

  try {
    const SUBSCRIPTION_PRICE_ID = 'price_1SxZRDIExvrU7SroGdH1j0ij'; 

    let sessionParams = {
        payment_method_types: ['card'],
        line_items: [
            // The One-Time Donation
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Real Prayer Donation',
                        description: 'Your immediate contribution',
                    },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            },
            // The Recurring Membership (starts in 30 days)
            {
                price: SUBSCRIPTION_PRICE_ID,
                quantity: 1,
            }
        ],
        mode: 'subscription', 
        subscription_data: {
            trial_period_days: 30, 
        },
        success_url: `https://members.realprayerbook.com/?payment_success=true`,
        cancel_url: `https://realprayerbook.com/?payment_cancelled=true`,
    };
    
    // If email is provided, pre-fill it
    if (email) {
        sessionParams.customer_email = email;
    }

    const session = await stripe.checkout.sessions.create(sessionParams);

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
