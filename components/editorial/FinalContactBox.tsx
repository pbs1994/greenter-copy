import { Phone } from 'lucide-react';

interface FinalContactBoxProps {
  title?: string;
  phone: string;
}

export function FinalContactBox({ 
  title = "Besoin d'un conseil ?", 
  phone 
}: FinalContactBoxProps) {
  // Format phone for tel: link (remove spaces, add country code)
  const phoneLink = `tel:+33${phone.replace(/\s/g, '').replace(/^0/, '')}`;

  return (
    <div 
      className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 my-8 text-center"
      data-testid="final-contact-box"
    >
      <h3 className="text-lg font-semibold text-slate-800 mb-3">{title}</h3>
      <p className="text-sm text-slate-600 mb-4">
        Nos conseillers sont à votre écoute pour répondre à vos questions.
      </p>
      <a
        href={phoneLink}
        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-sm"
      >
        <Phone className="w-4 h-4" />
        <span>{phone}</span>
      </a>
    </div>
  );
}
