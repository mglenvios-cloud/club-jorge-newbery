'use client';

import React, { useState } from 'react';
import { Sparkles, Check, Copy, Share2, FileText, Send } from 'lucide-react';

export default function AICreatorPage() {
  const [matchTitle, setMatchTitle] = useState('Gran Clásico de la Ciudad vs Sportivo Norte');
  const [resultScore, setResultScore] = useState('3 - 1');
  const [topPlayers, setTopPlayers] = useState('Emiliano Ríos, Lucas Valenzuela');
  const [keyNotes, setKeyNotes] = useState('Doblete de Emiliano Ríos en los minutos 34 y 68. Asistencia brillante de Valenzuela.');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<{
    headline: string;
    subdeck: string;
    body: string;
  } | null>(null);

  const [socialPosts, setSocialPosts] = useState<{
    instagram: string;
    twitter: string;
    facebook: string;
  } | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedArticle({
        headline: `¡Triunfo y fiesta albiazul! Victoria brillante por ${resultScore} frente a ${matchTitle.split('vs')[1] || 'el rival'}`,
        subdeck: `Actuación consagratoria del plantel con pasajes de alto vuelo deportivo liderados por ${topPlayers}.`,
        body: `En una tarde inolvidable para la institución, el equipo principal firmó una actuación memorable imponiéndose con categoría por ${resultScore}.

Desde el pita inicial, la propuesta ofensiva sometió estratégicamente al rival. ${keyNotes}

Con esta contundente victoria, el club suma puntos fundamentales en la tabla de posiciones y ratifica el gran momento del proyecto deportivo.`,
      });

      setSocialPosts({
        instagram: `🔥 ¡TRIUNFO HISTÓRICO! 🔥\n\nFinal del partido: ${resultScore}\n\n⭐ Destacados: ${topPlayers}\n📝 ${keyNotes}\n\n#ClubDigitalPro #Deportes #GranVictoria`,
        twitter: `🏆 FINAL DEL PARTIDO | ${resultScore}\n\nGran victoria con goles y actuaciones sobresalientes de ${topPlayers}.\n\n#ClubDigitalPro`,
        facebook: `🔵 NOTICIA OFICIAL DE LA JORNADA\n\n¡Triunfo por ${resultScore}! Compartimos la crónica oficial de un partido brillante.\n\n${keyNotes}`,
      });
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-blue-400" />
          <span>IA Sports Content Creator</span>
        </h1>
        <p className="text-slate-400 text-xs mt-1">
          Ingrese los datos brutos del partido y deje que el motor de IA redacte la noticia oficial y los posts para redes sociales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Input Form */}
        <form onSubmit={handleGenerate} className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Datos de Entrada del Encuentro</h3>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">Partido / Rival</label>
            <input
              type="text"
              required
              value={matchTitle}
              onChange={(e) => setMatchTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">Resultado Final (Marcador)</label>
            <input
              type="text"
              required
              value={resultScore}
              onChange={(e) => setResultScore(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">Jugadores Destacados</label>
            <input
              type="text"
              value={topPlayers}
              onChange={(e) => setTopPlayers(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
          </div>

          <div className="space-y-1.5 text-xs">
            <label className="font-semibold text-slate-300">Apuntes Clave de la Jornada</label>
            <textarea
              rows={3}
              value={keyNotes}
              onChange={(e) => setKeyNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Generando Crónica e IA Copy...' : 'Generar Noticia con IA'}</span>
          </button>
        </form>

        {/* Right: Generated Result & Social Copies */}
        {generatedArticle ? (
          <div className="space-y-6 animate-in fade-in">
            {/* Generated Article Editor */}
            <div className="glass-card p-6 rounded-3xl border border-blue-500/30 space-y-4">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Crónica Generada por IA (Editable)
              </span>
              <input
                type="text"
                value={generatedArticle.headline}
                onChange={(e) => setGeneratedArticle({ ...generatedArticle, headline: e.target.value })}
                className="w-full font-extrabold text-white text-base bg-transparent border-b border-slate-800 pb-2 focus:outline-none"
              />
              <textarea
                rows={5}
                value={generatedArticle.body}
                onChange={(e) => setGeneratedArticle({ ...generatedArticle, body: e.target.value })}
                className="w-full text-slate-300 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 focus:outline-none"
              />
            </div>

            {/* Social Posts Copies */}
            {socialPosts && (
              <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Copys para Redes Sociales</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="font-bold text-amber-400">Instagram & Feed</span>
                    <p className="text-slate-300 whitespace-pre-line text-[11px]">{socialPosts.instagram}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="font-bold text-sky-400">X (Twitter)</span>
                    <p className="text-slate-300 whitespace-pre-line text-[11px]">{socialPosts.twitter}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="glass-card p-8 rounded-3xl border border-slate-800 text-center py-20 text-slate-500 text-xs">
            Complete los datos del partido y haga clic en "Generar Noticia con IA" para ver la redacción automatizada.
          </div>
        )}
      </div>
    </div>
  );
}
