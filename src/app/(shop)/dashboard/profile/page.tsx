'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // TODO: Implement profile update API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      alert('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/dashboard" className="hover:text-blue-600">
          Dashboard
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Profile</span>
      </nav>

      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>

          {/* Change Password */}
          {isEditing && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <p className="text-sm text-gray-600 mb-4">
                Leave blank if you don't want to change your password
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Account Info */}
          {!isEditing && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">Account Information</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p>
                  <span className="font-medium">Member since:</span> January 2024
                </p>
                <p>
                  <span className="font-medium">Account status:</span>{' '}
                  <span className="text-green-600 font-medium">Active</span>
                </p>
                <p>
                  <span className="font-medium">Total orders:</span> 15
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Danger Zone */}
        {!isEditing && (
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6 border border-red-200">
            <h2 className="text-xl font-semibold text-red-600 mb-2">Danger Zone</h2>
            <p className="text-sm text-gray-600 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
