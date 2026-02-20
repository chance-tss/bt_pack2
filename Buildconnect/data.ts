
import { UserRole, Post } from './types';

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    type: UserRole.PRESTATAIRE,
    name: "Architecte Ibrahim",
    category: "Conception & Etudes",
    location: "Cotonou, Fidjrossè",
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop",
    description: "Architecte agréé spécialisé en villas modernes et plans techniques. Conception bioclimatique.",
    rating: 4.9,
    avatar: "https://i.pravatar.cc/150?u=ibrahim"
  },
  {
    id: '2',
    type: UserRole.FOURNISSEUR,
    name: "Quincaillerie Le Sommet",
    category: "Gros Oeuvre",
    location: "Porto-Novo",
    imageUrl: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?q=80&w=1000&auto=format&fit=crop",
    description: "Fournisseur de ciment, fer à béton et agrégats. Livraison sur chantier disponible.",
    rating: 4.7,
    avatar: "https://i.pravatar.cc/150?u=sommet"
  },
  {
    id: '3',
    type: UserRole.PRESTATAIRE,
    name: "Moussa Maçonnerie",
    category: "Gros Oeuvre",
    location: "Abomey-Calavi",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1000&auto=format&fit=crop",
    description: "Expert en fondations, élévation de murs et coffrage. Équipe de 15 maçons qualifiés.",
    rating: 4.5,
    avatar: "https://i.pravatar.cc/150?u=moussa"
  },
  {
    id: '4',
    type: UserRole.FOURNISSEUR,
    name: "Cotonou Céramique",
    category: "Finitions & Décoration",
    location: "Cotonou, Akpakpa",
    imageUrl: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1000&auto=format&fit=crop",
    description: "Carrelage importé (Espagne, Italie) et local. Grès cérame, faïence et mosaïque.",
    rating: 4.8,
    avatar: "https://i.pravatar.cc/150?u=carrelage"
  },
  {
    id: '5',
    type: UserRole.PRESTATAIRE,
    name: "Elec-Pro Bénin",
    category: "Second Oeuvre",
    location: "Parakou",
    imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop",
    description: "Installation électrique bâtiment et industrielle. Maintenance et dépannage 24/7.",
    rating: 4.6,
    avatar: "https://i.pravatar.cc/150?u=lumiere"
  },
  {
    id: '6',
    type: UserRole.FOURNISSEUR,
    name: "Bois & Charpentes NK",
    category: "Gros Oeuvre",
    location: "Djougou",
    imageUrl: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1000&auto=format&fit=crop",
    description: "Bois de charpente traité, chevrons, lattes. Coupe sur mesure.",
    rating: 4.4,
    avatar: "https://i.pravatar.cc/150?u=bois"
  },
  {
    id: '7',
    type: UserRole.PRESTATAIRE,
    name: "Peinture Luxe",
    category: "Finitions & Décoration",
    location: "Cotonou, Haie Vive",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1000&auto=format&fit=crop",
    description: "Peinture décorative, stucco, staff et revêtements muraux. Finitions haut de gamme.",
    rating: 5.0,
    avatar: "https://i.pravatar.cc/150?u=peinture"
  },
  {
    id: '8',
    type: UserRole.PRESTATAIRE,
    name: "Sébastien Plomberie",
    category: "Second Oeuvre",
    location: "Ouidah",
    imageUrl: "https://images.unsplash.com/photo-1585704032915-c3400ca1f963?q=80&w=1000&auto=format&fit=crop",
    description: "Plomberie sanitaire, chauffe-eau solaire et traitement de l'eau. Dépannage rapide.",
    rating: 4.7,
    avatar: "https://i.pravatar.cc/150?u=plomberie"
  },
  {
    id: '9',
    type: UserRole.PRESTATAIRE,
    name: "Géomètre Expert Kodjo",
    category: "Conception & Etudes",
    location: "Abomey",
    imageUrl: "https://images.unsplash.com/photo-1455165814004-1126a7199f9b?q=80&w=1000&auto=format&fit=crop",
    description: "Bornage, lotissement et relevés topographiques. Agrée par l'ordre des géomètres.",
    rating: 4.8,
    avatar: "https://i.pravatar.cc/150?u=geo"
  }
];
