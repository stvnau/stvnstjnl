export interface Article {
  id: string;
  date: string;
  category: string;
  headline: string;
  summary: string;
  sourceUrl: string;
  sourceTitle: string;
  reframing: string;
  createdAt: Date;
}

export interface LeaderLesson {
  id: string;
  date: string;
  leaderName: string;
  era: string;
  lesson: string;
  application: string;
  relatedCategory: string | null;
  createdAt: Date;
}

export interface DailyContent {
  date: string;
  articles: Article[];
  leaderLesson: LeaderLesson | null;
  lastUpdated: string;
}
