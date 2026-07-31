export type MediaContentType = 'VIDEO' | 'PHOTO' | 'ARTICLE' | 'DOCUMENT';

export interface MediaContent {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  type: MediaContentType;
  category: string;
  discipline?: string;
  season?: string;
  competition?: string;
  matchId?: string;
  url: string;
  thumbnail?: string;
  tags: string[];
  aiGenerated: boolean;
  sponsorId?: string;
  isHistorical?: boolean;
  createdAt: Date;
}

export interface AIContentJob {
  id: string;
  tenantId: string;
  prompt: string;
  result: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
}

export interface MediaView {
  id: string;
  tenantId: string;
  mediaContentId: string;
  sponsorId?: string;
  viewedAt: Date;
}

export interface GenerateMatchArticleInput {
  matchTitle: string;
  resultScore: string;
  topPlayers: string[];
  keyNotes: string;
  discipline?: string;
}

export interface GenerateSocialPostsInput {
  articleTitle: string;
  keyHighlights: string;
}
