import type { Metadata } from 'next'
import { ProductTemplateV2 } from '@/components/products/ProductTemplateV2'
import type { ProductV2Data } from '@/components/products/ProductTemplateV2'

export const metadata: Metadata = {
  title: 'Pompe à chaleur Daikin Altherma R 11 kW — Pack Installation Premium | Greenter',
  description: 'PAC air-eau Daikin Altherma R 11 kW, SCOP 5,1 — Pack complet : unité, pose RGE, dossier MaPrimeRénov\' + audit énergétique offert. Livraison 5 j. Garantie 10 ans.',
  robots: { index: false, follow: false },
}

const PRODUCT: ProductV2Data = {
  name: 'Pompe à chaleur air-eau Daikin Altherma R 11 kW — Pack Installation Premium',
  categoryName: 'Pompes à chaleur',
  categorySlug: 'pompe-a-chaleur',
  slug: 'demo-v2',
  shortDescription:
    'Pack clé en main : unité extérieure Daikin Altherma R 11 kW + unité intérieure + pose par technicien certifié QualiPAC + dossier MaPrimeRénov\' déposé par nos soins. Idéal pour les maisons de 80 à 130 m² en Île-de-France.',
  description: `
    <p>La <strong>Daikin Altherma R 11 kW</strong> est l'une des références incontournables du marché des pompes à chaleur air-eau en France. Avec un <strong>SCOP de 5,1</strong> (A7W35, norme EN 14511), elle produit 5,1 kWh de chaleur pour chaque kWh électrique consommé — soit jusqu'à <strong>65 % d'économies</strong> sur votre facture de chauffage par rapport à une chaudière gaz.</p>

    <h3>Ce que comprend le pack</h3>
    <ul>
      <li>Unité extérieure Daikin Altherma R ERLA11DW1 (R-32)</li>
      <li>Unité intérieure EHBX11D6V — réservoir tampon 7 L intégré</li>
      <li>Pose et mise en service par technicien certifié <strong>QualiPAC RGE</strong></li>
      <li>Raccordement hydraulique + électrique</li>
      <li>Dépose de l'ancien système (chaudière ou PAC)</li>
      <li>Dossier <strong>MaPrimeRénov' monté et déposé</strong> par Greenter</li>
      <li>Garantie constructeur 10 ans — pièces et main-d'œuvre</li>
    </ul>

    <h3>Pourquoi choisir ce modèle ?</h3>
    <p>Conçue pour les zones climatiques <strong>H1 et H2</strong> (Île-de-France, Normandie, Grand Est, Bourgogne…), l'Altherma R fonctionne jusqu'à −25 °C et chauffe l'eau de vos radiateurs jusqu'à 60 °C sans résistance d'appoint pour des températures extérieures supérieures à −7 °C. La technologie <strong>Bluevolution R-32</strong> réduit l'empreinte carbone du fluide frigorigène de 68 % par rapport au R-410A.</p>

    <p>Associée à un <strong>plancher chauffant hydraulique</strong> (eau à 28-35 °C), cette PAC atteint son SCOP maximal et vous permet d'espérer une rentabilité complète de l'investissement en <strong>6 à 9 ans</strong> selon votre consommation actuelle.</p>

    <h3>Aides disponibles en 2026</h3>
    <p>En fonction de votre revenu fiscal de référence, vous pouvez bénéficier de <strong>MaPrimeRénov' jusqu'à 11 000 €</strong> + <strong>Coup de pouce CEE 3 000 €</strong> + TVA réduite à 5,5 %. Greenter prend en charge l'intégralité du dossier — aucune avance de trésorerie requise.</p>
  `,
  originalPrice: 13990,
  currentPrice: 10490,
  images: [
    '/images/blog/pac-air-eau-dalle-beton-maison-blanche.jpg',
    '/images/blog/pac-air-eau-moderne-maison-pierre.jpg',
    '/images/blog/pac-chauffage-sol-technicien-installation-unite.jpg',
    '/images/blog/pac-puissance-unite-compacte-bardage-bois.jpg',
  ],
  gift: { name: 'Audit énergétique complet', value: 390 },
  stock: 3,
  deliveryDays: 'sous 5 jours ouvrés',
  nextInstallation: '10 juin 2026',
  rating: 4.8,
  reviewCount: 37,
  buyerCount: 127,
  monthlyBuyers: 42,
  ctaHref: '/contact',
  specs: [
    { label: 'Puissance nominale', value: '11 kW' },
    { label: 'SCOP (A7W35)', value: '5,1' },
    { label: 'Fluide frigorigène', value: 'R-32 (GWP 675)' },
    { label: 'Température min. extérieure', value: '−25 °C' },
    { label: 'Température eau max.', value: '60 °C' },
    { label: 'Alimentation', value: 'Triphasé 400 V' },
    { label: 'Niveau sonore', value: '44 dB(A) à 1 m' },
    { label: 'Classe énergétique', value: 'A+++ (chauffage)' },
    { label: 'Surface recommandée', value: '80 – 130 m²' },
    { label: 'Garantie', value: '10 ans constructeur' },
    { label: 'Pays de fabrication', value: 'Europe (R&D Japon)' },
    { label: 'Certification', value: 'QualiPAC — éligible MPR' },
  ],
  features: [
    {
      icon: '🌡️',
      title: 'SCOP 5,1 — Top du marché',
      description: 'En régime A7W35, la Daikin Altherma R délivre 5,1 kWh de chaleur par kWh électrique consommé — parmi les meilleurs COP de sa catégorie.',
    },
    {
      icon: '❄️',
      title: 'Fonctionne jusqu'à −25 °C',
      description: 'Grâce à l'injecteur vapeur Daikin, la PAC reste performante même lors des hivers les plus rigoureux, sans résistance électrique en appoint.',
    },
    {
      icon: '🌿',
      title: 'Fluide R-32 bas carbone',
      description: 'Le R-32 possède un GWP 3 fois inférieur au R-410A. Moins de CO₂ équivalent émis sur le cycle de vie du produit.',
    },
    {
      icon: '📱',
      title: 'Pilotage Daikin Residential Controller',
      description: 'Application mobile intuitive pour gérer vos consignes à distance, programmer des plages horaires et suivre votre consommation en temps réel.',
    },
    {
      icon: '🔇',
      title: 'Ultra-silencieuse (44 dB)',
      description: 'La ventilation à vitesse variable adapte en permanence le débit d'air pour minimiser le bruit — confort pour vous et vos voisins.',
    },
    {
      icon: '🏛️',
      title: 'Aides MaPrimeRénov' incluses',
      description: 'Tous nos techniciens sont certifiés QualiPAC RGE. Votre dossier de subvention est constitué et suivi par notre équipe administrative, sans avance de trésorerie.',
    },
  ],
  comparison: {
    alt1Name: 'Installateur local',
    alt2Name: 'Chaudière gaz',
    rows: [
      { criterion: 'Économies annuelles estimées', ours: '50 – 65 %', alt1: '50 – 65 %', alt2: '0 %' },
      { criterion: 'Installation par technicien RGE', ours: true, alt1: 'Variable', alt2: false },
      { criterion: 'Dossier MaPrimeRénov' inclus', ours: true, alt1: false, alt2: false },
      { criterion: 'Garantie 10 ans main-d'œuvre', ours: true, alt1: false, alt2: false },
      { criterion: 'Éligible MaPrimeRénov' 2026', ours: true, alt1: true, alt2: false },
      { criterion: 'Prix tout compris', ours: '10 490 €', alt1: '9 000 – 15 000 €', alt2: '3 000 – 6 000 €' },
      { criterion: 'SAV dédié 7 j/7', ours: true, alt1: false, alt2: 'Limité' },
      { criterion: 'Audit énergétique offert', ours: true, alt1: false, alt2: false },
    ],
  },
  reviews: [
    {
      author: 'Christine M.',
      city: 'Versailles (78)',
      date: 'mars 2026',
      rating: 5,
      title: 'Installation impeccable, facture divisée par 2',
      content:
        'L'équipe Greenter est arrivée à 8h pile et a terminé avant 17h. La PAC fonctionne silencieusement — on ne l'entend même pas depuis le jardin. Premier mois de chauffe : 87 € contre 190 € habituellement avec le gaz. Je recommande sans réserve.',
      verified: true,
      helpful: 24,
      tags: ['Installation rapide', 'Équipe pro', 'Économies réelles'],
    },
    {
      author: 'Frédéric L.',
      city: 'Créteil (94)',
      date: 'février 2026',
      rating: 5,
      title: 'Zéro prise de tête pour le dossier MaPrimeRénov'',
      content:
        'Le gros avantage Greenter c'est qu'ils gèrent tout le dossier de subvention. J'ai juste eu à signer quelques papiers. J'ai reçu 8 000 € de MaPrimeRénov' sans bouger le petit doigt. Le reste à charge réel était inférieur à 5 000 €.',
      verified: true,
      helpful: 18,
      tags: ['MaPrimeRénov'', 'Dossier géré', 'Excellent ROI'],
    },
    {
      author: 'Isabelle R.',
      city: 'Massy (91)',
      date: 'janvier 2026',
      rating: 4,
      title: 'Très satisfaite, léger délai pour la livraison',
      content:
        'La PAC elle-même est parfaite — puissante, silencieuse, économique. Un léger retard de 2 jours sur la livraison mais l'équipe a prévenu rapidement. Le service client a été très réactif pour replanifier l'installation. 4 étoiles pour le délai, 5 étoiles pour la qualité.',
      verified: true,
      helpful: 11,
      tags: ['Qualité produit', 'Service client'],
    },
    {
      author: 'Jean-Paul B.',
      city: 'Vincennes (94)',
      date: 'décembre 2025',
      rating: 5,
      title: 'Maison de 110 m² — chauffage parfait même à −8°C',
      content:
        'J'avais des doutes sur la capacité de la PAC à tenir pendant les vagues de froid. Résultat : même à −8°C début janvier, la maison était à 20°C dans toutes les pièces, sans appoint. Le compte EDF montre une consommation de 1 900 kWh sur décembre — contre 2 800 kWh l'an dernier avec le gaz.',
      verified: true,
      helpful: 32,
      tags: ['Performance froid', 'Maison 110 m²', 'Économies hiver'],
    },
    {
      author: 'Sandrine K.',
      city: 'Boulogne-Billancourt (92)',
      date: 'novembre 2025',
      rating: 5,
      title: 'Audit énergétique offert — un vrai bonus',
      content:
        'L'audit énergétique offert avec la commande nous a permis d'identifier que notre VMC était défaillante. Greenter nous a conseillé de la remplacer avant l'installation, ce qui a amélioré le SCOP réel de la PAC. Un service vraiment complet.',
      verified: true,
      helpful: 15,
      tags: ['Audit offert', 'Conseil expert', 'Service complet'],
    },
  ],
  faq: [
    {
      question: 'Quelle est la différence entre ce pack et un achat séparé ?',
      answer:
        'Ce pack inclut l'unité extérieure, l'unité intérieure, la pose complète par technicien QualiPAC RGE, le raccordement hydraulique et électrique, la dépose de l'ancien système, et la constitution du dossier MaPrimeRénov'. En achetant séparément, vous auriez à trouver un installateur RGE, gérer vous-même les aides, et assumer le risque de main-d'œuvre non garantie.',
    },
    {
      question: 'Mon logement est-il compatible avec cette pompe à chaleur ?',
      answer:
        'La Daikin Altherma R 11 kW convient aux maisons de 80 à 130 m² en zone H1/H2 (Île-de-France incluse). Elle est compatible avec les radiateurs basse température, les planchers chauffants hydrauliques et les ventilo-convecteurs. Pour les maisons avec radiateurs haute température, nous réalisons un bilan thermique pour vérifier la compatibilité ou recommander un modèle adapté.',
    },
    {
      question: 'Quel est le délai entre la commande et l'installation ?',
      answer:
        'En moyenne, 5 jours ouvrés pour la livraison de l'équipement, puis planification de l'installation sous 1 à 2 semaines. La première date d'installation disponible est indiquée sur la fiche produit. Pour les urgences (chaudière en panne), nous proposons un service prioritaire — contactez-nous directement.',
    },
    {
      question: 'Comment fonctionne le dossier MaPrimeRénov' ?',
      answer:
        'Nos chargés de dossier remplissent et déposent votre demande MaPrimeRénov' sur le portail de l'ANAH avant le début des travaux (obligatoire). Vous recevez la subvention directement sur votre compte bancaire après réception de la facture. Greenter peut prendre en charge l'avance : vous ne payez que le reste à charge dès le départ.',
    },
    {
      question: 'Que couvre la garantie 10 ans ?',
      answer:
        'La garantie constructeur Daikin couvre toutes les pièces pendant 10 ans. La garantie main-d'œuvre Greenter couvre l'intervention dans les 48h en cas de panne pour les 2 premières années, puis selon contrat de maintenance. En cas de panne durant la période froide, nous intervenons en priorité sous 24h.',
    },
    {
      question: 'Puis-je tester cette PAC et me faire rembourser si je ne suis pas satisfait ?',
      answer:
        'Oui. Notre garantie "Satisfait ou remboursé 30 jours" s'applique à l'installation. Si les performances ne correspondent pas à ce qui a été prévu lors de l'étude thermique (à ±15 % près), nous intervenons sans frais pour régler le problème ou vous remboursons intégralement.',
    },
  ],
}

export default function DemoV2Page() {
  return <ProductTemplateV2 product={PRODUCT} />
}
