'use client'

import { useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-4 rounded-md hover:from-orange-600 hover:to-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? '作成中...' : 'プロフィールを作成'}
    </button>
  )
}

interface AccountSetupFormProps {
  serverAction: (formData: FormData) => Promise<void>
}

export default function AccountSetupForm({ serverAction }: AccountSetupFormProps) {
  return (
    <form action={serverAction} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          ユーザー名
        </label>
        <input
          type="text"
          id="username"
          name="username"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="ユーザー名を入力してください"
        />
      </div>

      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
          フルネーム
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="フルネームを入力してください"
        />
      </div>

      <SubmitButton />
    </form>
  )
} 