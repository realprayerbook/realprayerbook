import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { amount, email, isPhysical, type } = req.body;
  
  try {
    const SUBSCRIPTION_PRICE_ID = 'price_1SxZRDIExvrU7SroGdH1j0ij'; 
    const isBuyNow = type === 'buy_now';
    const isDonationHigh = type === 'donation' && (amount >= 24);
    const isDonationLow = type === 'donation' && (amount < 24);

    let sessionParams = {
        payment_method_types: ['card'],
        line_items: [],
        mode: (isDonationHigh) ? 'subscription' : 'payment',
        success_url: '',
        cancel_url: `https://realprayerbook.com/?payment_cancelled=true`,
    };

    if (isBuyNow) {
        sessionParams.line_items.push({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: 'Real Prayer Physical Book',
                    description: 'The complete physical manuscript for your study. Includes instant PDF download access.',
                },
                unit_amount: 2400, // 24 EUR
            },
            quantity: 1,
        });
        sessionParams.shipping_address_collection = {
            allowed_countries: ['US', 'CA', 'GB', 'IE', 'AU', 'NZ', 'FR', 'DE', 'ES', 'IT', 'NL', 'BE', 'PT', 'SE', 'NO', 'DK', 'FI', 'CH', 'AT'], 
        };
        sessionParams.success_url = `https://realprayerbook.com/?payment_success=true&type=buy_now`;
    } else if (isDonationHigh) {
        sessionParams.line_items = [
            {
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: 'Real Prayer Archive Access',
                        description: 'Instant dashboard access included. You may cancel your monthly subscription at any time without penalty.',
                    },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            },
            {
                price: SUBSCRIPTION_PRICE_ID,
                quantity: 1,
            }
        ];
        sessionParams.subscription_data = {
            trial_period_days: 30, 
        };
        sessionParams.success_url = `https://members.realprayerbook.com/?payment_success=true&type=donation_high`;
    } else { // donation_low or fallback
        sessionParams.line_items.push({
            price_data: {
                currency: 'eur',
                product_data: {
                    name: 'Real Prayer Digital Supporter',
                    description: 'One-time donation for the Complete Digital Archive (PDF).',
                },
                unit_amount: Math.round((amount || 5) * 100),
            },
            quantity: 1,
        });
        sessionParams.success_url = `https://realprayerbook.com/?payment_success=true&type=donation_low`;
    }
    
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
