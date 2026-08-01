export type NavTab = 'dashboard' | 'overview' | 'companion' | 'analytics' | 'journal' | 'directory';

export interface MoodOption {
  id: string;
  label: string;
  emoji: string;
  description?: string;
}

export interface MoodLog {
  id: string;
  moodId: string;
  label: string;
  emoji: string;
  timestamp: string;
  intensity: number;
}

export interface JournalEntry {
  id: string;
  prompt: string;
  content: string;
  date: string;
  detectedMood: string;
  themeTags: string[];
  moodIntensity: number;
  isPrivate: boolean;
  savedAt: string;
  summary?: string;
}

export interface Specialist {
  id: string;
  name: string;
  title: string;
  rating: number;
  reviewsCount: number;
  avatar: string;
  bio: string;
  fee: number;
  distance: string;
  languages: string[];
  specialties: string[];
  isAiRecommended?: boolean;
  recommendationReason?: string;
  onlineAvailable: boolean;
  offlineAvailable: boolean;
  gender: 'Female' | 'Male' | 'Non-binary';
  hospital?: string;
  contactNumber?: string;
  website?: string;
  address?: string;
  coords?: { lat: number; lng: number };
  availability?: string;
  matchScore?: number;
  matchReasons?: string[];
  whyRecommended?: string;
  travelTime?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  shouldOfferProfessionalHelp?: boolean;
  interactiveCard?: 'professional_offer' | 'location_prompt' | 'city_input' | 'recommendations_list';
  recommendationsData?: {
    userCoords?: { lat: number; lng: number };
    city?: string;
    specialists?: Specialist[];
    concern?: string;
  };
  insights?: {
    emotion?: string;
    severity?: string;
    confidence?: number;
    intent?: string;
  };
}

export interface EmotionalInsights {
  sentiment: string;
  mood: string;
  severity: string;
  stabilityScore: number;
}

export interface AnalyticsData {
  wellnessScore: number;
  wellnessScoreChange: number;
  dominantEmotion: string;
  auraTitle: string;
  daysJournaled: number;
  meditationStreaks: number;
  guidedSessions: number;
  biggestWinTitle: string;
  biggestWinDescription: string;
  weeklyTrend: { day: string; level: number }[];
}
