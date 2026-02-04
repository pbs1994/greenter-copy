import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion | Admin Greenter',
  description: 'Connexion à l\'espace d\'administration Greenter',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
