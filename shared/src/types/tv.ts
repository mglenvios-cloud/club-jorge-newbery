export type StreamSourceType = 'YOUTUBE' | 'VIMEO' | 'RTMP' | 'OBS' | 'LIGA_PRO_STUDIO';
export type StreamStatus = 'LIVE' | 'SCHEDULED' | 'FINISHED';
export type MediaType = 'VIDEO' | 'PHOTO' | 'AUDIO' | 'PDF';
export type AdPosition = 'BANNER' | 'PREROLL' | 'MIDROLL';

export interface TvStream {
  id: string;
  tenantId: string;
  title: string;
  description: string;
  sourceType: StreamSourceType;
  streamUrl: string;
  embedUrl: string;
  status: StreamStatus;
  scheduledAt?: string;
  viewerCount: number;
  thumbnailUrl: string;
  category: string;
  createdAt: Date;
}

export interface MediaItem {
  id: string;
  tenantId: string;
  title: string;
  description?: string;
  fileType: MediaType;
  fileUrl: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
  views: number;
  createdAt: Date;
}

export interface SponsorAd {
  id: string;
  tenantId: string;
  sponsorName: string;
  logoUrl: string;
  position: AdPosition;
  targetUrl?: string;
  impressions: number;
  clicks: number;
  isActive: boolean;
}
