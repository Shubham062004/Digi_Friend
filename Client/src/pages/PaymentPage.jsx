import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';

export default function PaymentPage() {
  const [amount, setAmount] = useState('');

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // Creating a new order
    const result = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
      }),
    });

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    const { order_id } = await result.json();

    const options = {
    //   key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: amount * 100,
      currency: 'INR',
      name: 'Digi Friend',
      description: 'Payment for services',
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await fetch('/api/success', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        alert(result.data.msg);
      },
      prefill: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Make a Payment
        </h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handlePayment} className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount (in INR)
              </label>
              <Input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full flex justify-center items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Pay Now
            </Button>
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-gray-600">
          Secure payments powered by Razorpay
        </p>
      </div>
    </div>
  );
}