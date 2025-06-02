import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAppSelector } from '../hooks/useRedux';
import { Minus, Plus, Trash2, CreditCard, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CouponInput from '../components/CouponInput';
import OrderConfirmation from '../components/OrderConfirmation';
import {
  validateEmail,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validatePostalCode,
  validatePhoneNumber,
  validateRequired
} from '../utils/validation';
import { useOrders } from '../contexts/OrderContext';

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  nameOnCard?: string;
}

const Checkout = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { appliedCoupon } = useAppSelector(state => state.coupon);
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Calculate discount and final total
  const discountAmount = appliedCoupon ? (totalPrice * appliedCoupon.discount) / 100 : 0;
  const discountedSubtotal = totalPrice - discountAmount;
  const gstAmount = discountedSubtotal * 0.18;
  const finalTotal = discountedSubtotal + gstAmount;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Personal Information
    if (!validateRequired(formData.firstName)) {
      newErrors.firstName = 'First name is required';
    }
    if (!validateRequired(formData.lastName)) {
      newErrors.lastName = 'Last name is required';
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    // Address Information
    if (!validateRequired(formData.address)) {
      newErrors.address = 'Address is required';
    }
    if (!validateRequired(formData.city)) {
      newErrors.city = 'City is required';
    }
    if (!validatePostalCode(formData.postalCode)) {
      newErrors.postalCode = 'Please enter a valid 6-digit postal code';
    }
    if (!validateRequired(formData.country)) {
      newErrors.country = 'Country is required';
    }

    // Payment Information
    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    if (!validateExpiryDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
    }
    if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid 3 or 4-digit CVV';
    }
    if (!validateRequired(formData.nameOnCard)) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate a random order number
      const newOrderNumber = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();

      // Create new order
      const newOrder = {
        orderNumber: newOrderNumber,
        date: new Date().toISOString(),
        totalAmount: finalTotal,
        status: 'Processing' as const,
        items: items.map(item => ({
          ...item,
          quantity: item.quantity
        })),
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country
        }
      };

      // Add order to context
      addOrder(newOrder);

      // Clear cart and show order confirmation
      clearCart();
      setOrderComplete(true);
      setOrderNumber(newOrderNumber);
    } catch (error) {
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <OrderConfirmation
        orderDetails={{
          ...formData,
          orderNumber,
          totalAmount: finalTotal
        }}
      />
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100 last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                      <p className="font-semibold text-gray-900">₹{item.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-full ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Coupon Code</h2>
              <CouponInput />
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Customer Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit number"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.address}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    placeholder="6-digit code"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.postalCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.postalCode}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.country ? 'border-red-500' : 'border-gray-300'
                      }`}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number *
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.expiryDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV *
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.cvv}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card *
                  </label>
                  <input
                    type="text"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent ${errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {errors.nameOnCard && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors.nameOnCard}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span>₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    <span>Place Order</span>
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
