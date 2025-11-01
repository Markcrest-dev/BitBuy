'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BuildingStorefrontIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function VendorRegisterPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    description: '',
    address: '',
    city: '',
    country: '',
    taxId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/vendor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register as vendor');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/vendor/dashboard');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin?callbackUrl=/vendor/register');
    return null;
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="text-green-600 text-6xl mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your vendor application has been submitted successfully. We'll review it and get back to you within 2-3 business days.
          </p>
          <p className="text-sm text-gray-500">Redirecting to vendor dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Become a Vendor</h1>
        <p className="text-gray-600">
          Join our marketplace and start selling your products to thousands of customers.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-8">
        {/* Business Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BuildingStorefrontIcon className="h-6 w-6 mr-2" />
            Business Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                required
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Business Name"
              />
            </div>

            <div>
              <label htmlFor="businessEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Business Email *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="businessEmail"
                  name="businessEmail"
                  required
                  value={formData.businessEmail}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="business@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="businessPhone" className="block text-sm font-medium text-gray-700 mb-2">
                Business Phone
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PhoneIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="businessPhone"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Business Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about your business and the products you plan to sell..."
              />
            </div>
          </div>
        </div>

        {/* Business Address */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <MapPinIcon className="h-6 w-6 mr-2" />
            Business Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 Business St"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="New York"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                id="country"
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
                <option value="FR">France</option>
                <option value="IT">Italy</option>
                <option value="ES">Spain</option>
                <option value="NL">Netherlands</option>
                <option value="SE">Sweden</option>
                <option value="NO">Norway</option>
                <option value="DK">Denmark</option>
                <option value="FI">Finland</option>
                <option value="IE">Ireland</option>
                <option value="BE">Belgium</option>
                <option value="CH">Switzerland</option>
                <option value="AT">Austria</option>
                <option value="PT">Portugal</option>
                <option value="GR">Greece</option>
                <option value="PL">Poland</option>
                <option value="CZ">Czech Republic</option>
                <option value="HU">Hungary</option>
                <option value="RO">Romania</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tax Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Tax Information</h2>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-2">
                Tax ID / VAT Number
              </label>
              <input
                type="text"
                id="taxId"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123-45-6789 or VAT123456"
              />
              <p className="text-sm text-gray-500 mt-1">
                Optional: Provide your tax identification number for tax purposes
              </p>
            </div>
          </div>
        </div>

        {/* Commission Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">Commission Structure</h3>
          <p className="text-sm text-blue-800">
            Our platform charges a <strong>15% commission</strong> on each sale. This covers payment processing,
            hosting, customer support, and marketing. You'll receive 85% of each sale directly to your account.
          </p>
        </div>

        {/* Terms Agreement */}
        <div className="mb-6">
          <label className="flex items-start">
            <input
              type="checkbox"
              required
              className="mt-1 mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">
              I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>, and confirm that all
              information provided is accurate.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </button>
        </div>
      </form>
    </div>
  );
}
