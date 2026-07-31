import { GenerateMatchArticleInput, GenerateSocialPostsInput } from '@club-digital-pro/shared';

export class MediaAIService {
  /**
   * Generates a professional sports news article based on match results and key highlights.
   */
  static async generateMatchArticle(input: GenerateMatchArticleInput): Promise<{
    headline: string;
    subdeck: string;
    body: string;
    tags: string[];
  }> {
    const discipline = input.discipline || 'Fútbol';
    const topPlayersStr = input.topPlayers.length > 0 ? input.topPlayers.join(', ') : 'el plantel';

    const headline = `¡Gran victoria en ${discipline}! Triunfo determinante por ${input.resultScore} en ${input.matchTitle}`;
    const subdeck = `Excelente actuación colectiva donde sobresalieron ${topPlayersStr}.`;
    
    const body = `En un apasionante encuentro correspondiente a ${discipline}, se disputó ${input.matchTitle} finalizando con un marcador favorable de ${input.resultScore}.

Desde el inicio de las acciones, el equipo impuso condiciones con un juego fluido y de alta intensidad. Destacaron figuras clave como ${topPlayersStr}, quienes lideraron el volumen de ataque y mantuvieron el orden táctico en todo momento.

Detalles destacados de la jornada:
- ${input.keyNotes}

Con este resultado favorable, la institución reafirma su protagonismo deportivo en la competencia e invita a toda la comunidad y socios a seguir apoyando en los próximos compromisos oficiales.`;

    const tags = [discipline, 'Victoria', 'NoticiaOficial', 'LigaPro'];

    return { headline, subdeck, body, tags };
  }

  /**
   * Generates tailored social media posts for Instagram, X (Twitter), Facebook, and YouTube.
   */
  static async generateSocialPosts(input: GenerateSocialPostsInput): Promise<{
    instagram: string;
    twitter: string;
    facebook: string;
    youtubeDescription: string;
  }> {
    const title = input.articleTitle;
    const highlights = input.keyHighlights;

    return {
      instagram: `🔥 ¡NUEVA NOTICIA OFICIAL! 🔥\n\n${title}\n\n📌 ${highlights}\n\n👇 Leé la nota completa en nuestro Portal de Socios y Club TV.\n\n#ClubDigitalPro #Deportes #PasionPorElClub`,
      twitter: `🏆 ${title}\n\n${highlights.slice(0, 140)}...\n\n🔗 Conocé los detalles en nuestro portal oficial.`,
      facebook: `🔵 NOTICIA INSTITUCIONAL | ${title}\n\nCompartimos el resumen completo de la jornada:\n${highlights}\n\nSumate al apoyo incondicional de los colores. ¡Leé la nota en nuestra web oficial!`,
      youtubeDescription: `${title}\n\nResumen audiovisual oficial del evento.\n\nAcerca de la jornada:\n${highlights}\n\nSuscribite a nuestro canal oficial para más transmisiones e información.`,
    };
  }

  /**
   * Generates an SEO-optimized video description.
   */
  static async generateVideoDescription(title: string, category: string): Promise<string> {
    return `Reviví los mejores momentos de "${title}". Cobertura exclusiva en la categoría ${category}.\n\nSuscribite a Club TV para acceder a más resúmenes, entrevistas en vivo y transmisiones de todos los deportes institucionales.`;
  }
}
