'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Mail, KeyRound, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import Image from 'next/image';

type Step = 'email' | 'code' | 'success';

export default function AdminLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Envoyer le magic link + OTP
  const handleSendCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/administrator`,
        },
      });

      if (authError) {
        if (authError.message.includes('rate limit')) {
          setError('Trop de tentatives. Veuillez patienter quelques minutes.');
        } else {
          setError('Une erreur est survenue. Vérifiez votre adresse email.');
        }
        setIsLoading(false);
        return;
      }

      setStep('code');
      setIsLoading(false);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  // Vérifier le code OTP
  const handleVerifyCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email',
      });

      if (verifyError) {
        if (verifyError.message.includes('expired')) {
          setError('Le code a expiré. Veuillez en demander un nouveau.');
        } else if (verifyError.message.includes('invalid')) {
          setError('Code incorrect. Vérifiez et réessayez.');
        } else {
          setError('Code invalide. Veuillez réessayer.');
        }
        setIsLoading(false);
        return;
      }

      setStep('success');
      setTimeout(() => {
        router.push('/administrator');
        router.refresh();
      }, 1500);
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };

  // Renvoyer le code
  const handleResendCode = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/administrator`,
        },
      });

      if (authError) {
        setError('Impossible de renvoyer le code. Réessayez plus tard.');
      } else {
        setError(null);
      }
      setIsLoading(false);
    } catch {
      setError('Une erreur est survenue.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-teal-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="Greenter"
            width={180}
            height={50}
            className="mx-auto mb-4"
            priority
          />
          <p className="text-neutral-500">Espace Administration</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-8">
          
          {/* Step: Email */}
          {step === 'email' && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-3">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-heading font-semibold text-neutral-900">
                  Connexion sécurisée
                </h2>
                <p className="text-neutral-500 text-sm mt-1">
                  Entrez votre email pour recevoir un code de connexion
                </p>
              </div>

              <form onSubmit={handleSendCode} className="space-y-5">
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
                    autoFocus
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl 
                             focus:ring-2 focus:ring-green-500 focus:border-green-500
                             transition-all duration-200
                             placeholder:text-neutral-400"
                    placeholder="votre@email.fr"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold
                           py-3 px-4 rounded-xl transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      Recevoir le code
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          {/* Step: Code */}
          {step === 'code' && (
            <>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-xl mb-3">
                  <KeyRound className="w-6 h-6 text-teal-600" />
                </div>
                <h2 className="text-xl font-heading font-semibold text-neutral-900">
                  Vérification
                </h2>
                <p className="text-neutral-500 text-sm mt-1">
                  Entrez le code reçu par email ou cliquez sur le lien magique
                </p>
                <p className="text-green-600 text-sm font-medium mt-2">
                  {email}
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-5">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-neutral-700 mb-1.5"
                  >
                    Code à 6 chiffres
                  </label>
                  <input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    required
                    autoFocus
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl 
                             focus:ring-2 focus:ring-teal-500 focus:border-teal-500
                             transition-all duration-200
                             placeholder:text-neutral-400
                             text-center text-2xl font-mono tracking-[0.5em]"
                    placeholder="000000"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || code.length !== 6}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold
                           py-3 px-4 rounded-xl transition-all duration-200
                           focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2
                           disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Vérification...
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-5 h-5" />
                      Vérifier le code
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setCode('');
                      setError(null);
                    }}
                    className="text-sm text-neutral-500 hover:text-neutral-700 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Changer d'email
                  </button>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-sm text-green-600 hover:text-green-700 font-medium disabled:opacity-50"
                  >
                    Renvoyer le code
                  </button>
                </div>
              </form>

              {/* Info box */}
              <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
                <p className="text-xs text-neutral-500 text-center">
                  💡 Vous pouvez aussi cliquer directement sur le <strong>lien magique</strong> dans l'email pour vous connecter instantanément.
                </p>
              </div>
            </>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-heading font-semibold text-neutral-900 mb-2">
                Connexion réussie !
              </h2>
              <p className="text-neutral-500 text-sm">
                Redirection vers le tableau de bord...
              </p>
              <div className="mt-4">
                <Loader2 className="w-6 h-6 animate-spin text-green-600 mx-auto" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-400 mt-6">
          © {new Date().getFullYear()} Greenter. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
