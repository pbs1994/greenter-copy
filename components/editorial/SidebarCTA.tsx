import { Phone } from 'lucide-react';

interface SidebarCTAProps {
  title: string;
  description?: string;
  phone: string;
  variant?: 'subtle' | 'editorial';
}

export function SidebarCTA({ 
  title, 
  description, 
  phone, 
  variant = 'subtle' 
}: SidebarCTAProps) {
  // Format phone for tel: link (remove spaces, add country code)
  const phoneLink = `tel:+33${phone.replace(/\s/g, '').replace(/^0/, '')}`;
  
  const variantClasses = {
    subtle: 'bg-white border border-slate-200',
    editorial: 'bg-emerald-50/30 border border-emerald-100',
  };

  return (
    <div 
      className={`rounded-2xl p-6 my-8 ${variantClasses[variant]}`}
      data-testid="sidebar-cta"
      data-variant={variant}
    >
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-slate-600 mb-4">{description}</p>
      )}
      <a
        href={phoneLink}
        className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
      >
        <Phone className="w-5 h-5" />
        <span>{phone}</span>
      </a>
    </div>
  );
}
