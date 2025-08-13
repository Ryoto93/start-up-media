'use client'

import { useFormStatus } from 'react-dom'
import { useState, useMemo } from 'react'
import Image from 'next/image'

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const previewUrl = useMemo(() => (selectedFile ? URL.createObjectURL(selectedFile) : ''), [selectedFile])

  return (
    <form action={serverAction} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          ユーザー名 <span className="ml-2 inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-200">必須</span>
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
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
          年齢 <span className="ml-2 inline-flex items-center rounded bg-gray-50 px-2 py-0.5 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-200">任意</span>
        </label>
        <input
          type="number"
          id="age"
          name="age"
          min={0}
          inputMode="numeric"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="年齢を入力してください"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
          自己紹介文 <span className="ml-2 inline-flex items-center rounded bg-gray-50 px-2 py-0.5 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-200">任意</span>
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="あなたの経歴や興味関心、取り組んでいる事業について書いてください"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          プロフィール画像 <span className="ml-2 inline-flex items-center rounded bg-gray-50 px-2 py-0.5 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-200">任意</span>
        </label>
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 ring-1 ring-gray-200 flex items-center justify-center">
            {previewUrl ? (
              <Image src={previewUrl} alt="選択したプロフィール画像のプレビュー" width={80} height={80} className="h-20 w-20 object-cover" unoptimized />
            ) : (
              <span className="text-xs text-gray-400">No Image</span>
            )}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files?.[0] || null
                setSelectedFile(file)
              }}
              className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-orange-50 file:px-3 file:py-2 file:text-orange-700 hover:file:bg-orange-100"
            />
            <p className="mt-1 text-xs text-gray-500">画像はまだアップロードされません。プレビューのみです。</p>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="entrepreneurship_start_date" className="block text-sm font-medium text-gray-700 mb-2">
          起業日 <span className="ml-2 inline-flex items-center rounded bg-gray-50 px-2 py-0.5 text-xs font-semibold text-gray-600 ring-1 ring-inset ring-gray-200">任意</span>
        </label>
        <input
          type="date"
          id="entrepreneurship_start_date"
          name="entrepreneurship_start_date"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="consideration_start_date" className="block text-sm font-medium text-gray-700 mb-2">
          起業検討開始日 <span className="ml-2 inline-flex items-center rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-200">必須</span>
        </label>
        <input
          type="date"
          id="consideration_start_date"
          name="consideration_start_date"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
      </div>

      <SubmitButton />
    </form>
  )
} 