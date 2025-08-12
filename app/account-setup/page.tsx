'use server'

import Header from '@/components/Header';
import AccountSetupForm from './AccountSetupForm';
import { createProfile } from '@/lib/data/users';

export default async function AccountSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50/30">
      <Header />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            アカウントセットアップ
          </h1>

          <AccountSetupForm serverAction={createProfile as any} />
        </div>
      </div>
    </div>
  );
} 