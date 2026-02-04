'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // Display French error messages
        if (authError.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect');
        } else if (authError.message.includes('Email not confirmed')) {
          setError('Veuillez confirmer votre adresse email');
        } else if (authError.message.includes('Too many requests')) {
          setError('Trop de tentatives. Veuillez réessayer plus tard.');
        } else {
          setError('Une erreur est survenue. Veuillez réessayer.');
        }
        setIsLoading(false);
        return;
      }

      // Redirect to admin dashboard on success
      router.push('/administrator');
      router.refresh();
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-green-700">
            Greenter
          </h1>
          <p className="text-neutral-600 mt-2">Administration</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-6">
            Connexion
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-1.5"
              >
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg 
                         focus:ring-2 focus:ring-green-500 focus:border-green-500
                         transition-colors duration-200
                         placeholder:text-neutral-400"
                placeholder="admin@greenter.fr"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-1.5"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg 
                         focus:ring-2 focus:ring-green-500 focus:border-green-500
                         transition-colors duration-200
                         placeholder:text-neutral-400"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold
                       py-2.5 px-4 rounded-lg transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-500 mt-6">
          © {new Date().getFullYear()} Greenter. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
