
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
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
    const lineItems = [
        {
            price_data: {
                currency: 'eur',
                product_data: {
                    name: 'Real Prayer Contribution',
                    description: isPhysical ? 'Includes Physical Book + Membership' : 'Digital Archive Only',
                },
                unit_amount: Math.round(amount * 100), // Convert to cents
            },
            quantity: 1,
        }
    ];

    let sessionParams: any = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment', // Default to payment for just donation
      success_url: `${req.headers.origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/`,
    };

    // If subscription is required (all donations get enrolled after 30 days per user request)
    // To do hybrid (one-time + subscription), we use 'subscription' mode with 'add_invoice_items' or 'setup_future_usage'?
    // Actually, Stripe Checkout allows 'subscription' mode to have one-time items too.
    // BUT we want a trial period of 30 days for the subscription.

    const SUBSCRIPTION_PRICE_ID = 'price_1SxZRDIExvrU7SroGdH1j0ij'; // Provided by user

    // Hybrid flow: Subscription with trial + One-time fee
    sessionParams = {
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
        mode: 'subscription', // Must be subscription if any item is recurring
        subscription_data: {
            trial_period_days: 30, // Delay first subscription charge by 30 days
        },
        success_url: `${req.headers.origin}/?payment_success=true`,
        cancel_url: `${req.headers.origin}/?payment_cancelled=true`,
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
