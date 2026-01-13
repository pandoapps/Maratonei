
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  embedUrl: string;
  expertId: string;
  category: string;
  trilhaId?: string;
  views: number;
}

export interface Expert {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Trilha {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface UserHistory {
  userId: string;
  videoIds: string[];
}
