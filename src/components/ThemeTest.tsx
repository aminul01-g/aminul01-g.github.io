import React from 'react';

export default function ThemeTest(): React.ReactElement {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-8">Theme Visibility Test</h1>

      {/* Profile Picture Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Profile Picture Test</h2>
        <div className="flex justify-center">
          <div className="profile-image-container rounded-full shadow-2xl profile-image-border bg-white dark:bg-gray-800 overflow-hidden flex items-center justify-center mx-auto w-32 h-32">
            <img
              src="/images/optimized/profile_pic.webp"
              alt="Profile Test"
              className="w-full h-full object-cover mx-auto"
            />
            {/* Subtle glowing ring effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-indigo-500/10 dark:from-primary/20 dark:to-indigo-500/20 blur-md pointer-events-none" />
            {/* Enhanced border glow for better visibility */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 dark:border-primary/50 pointer-events-none" />
          </div>
        </div>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          The profile picture should be clearly visible in all themes
        </p>
      </div>

      {/* Glass Card Test */}
      <div className="glass-card p-6 rounded-2xl">
        <h2 className="text-xl font-semibold mb-4">Glass Card Test</h2>
        <p className="text-gray-700 mb-2">This text should be visible in all themes</p>
        <p className="text-gray-500 mb-2">This secondary text should also be visible</p>
        <p className="text-gray-400">This tertiary text should be readable</p>
      </div>

      {/* Background Test */}
      <div className="bg-white/70 dark:bg-gray-900/70 p-6 rounded-2xl border">
        <h2 className="text-xl font-semibold mb-4">Background Test</h2>
        <p className="text-gray-900 dark:text-white mb-2">
          This text should be visible on bg-white/70
        </p>
        <p className="text-gray-600 dark:text-gray-300">This secondary text should be readable</p>
      </div>

      {/* Form Input Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Form Input Test</h2>
        <input
          type="text"
          placeholder="This input should be visible"
          className="w-full p-3 rounded-lg border"
        />
        <textarea
          placeholder="This textarea should be visible"
          className="w-full p-3 rounded-lg border"
          rows={3}
        />
      </div>

      {/* Text Color Test */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Text Color Test</h2>
        <p className="text-gray-900">text-gray-900 - Should be dark and visible</p>
        <p className="text-gray-700">text-gray-700 - Should be medium dark and visible</p>
        <p className="text-gray-600">text-gray-600 - Should be medium and visible</p>
        <p className="text-gray-500">text-gray-500 - Should be medium light and visible</p>
        <p className="text-gray-400">text-gray-400 - Should be light but still visible</p>
        <p className="text-gray-300">text-gray-300 - Should be very light but visible</p>
      </div>

      {/* Badge Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Badge Test</h2>
        <div className="flex flex-wrap gap-2">
          <span className="themed-badge themed-badge-blue px-3 py-1 rounded-full">Blue Badge</span>
          <span className="themed-badge themed-badge-green px-3 py-1 rounded-full">
            Green Badge
          </span>
          <span className="themed-badge themed-badge-yellow px-3 py-1 rounded-full">
            Yellow Badge
          </span>
          <span className="themed-badge themed-badge-gray px-3 py-1 rounded-full">Gray Badge</span>
        </div>
      </div>

      {/* Dark Theme High Contrast Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Dark Theme High Contrast Test</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Switch to dark theme and enable high contrast to test these elements:
        </p>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-primary">Primary Text</h3>
          <p className="text-gray-900 dark:text-white">
            Regular text should be white in dark high contrast
          </p>
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
            This link should be yellow in dark high contrast
          </a>
          <div className="bg-primary text-white px-4 py-2 rounded">
            Primary background should be yellow with black text
          </div>
        </div>
      </div>
    </div>
  );
}
