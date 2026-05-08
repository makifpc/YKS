'use client';
import { formatDuration } from '@/lib/utils';
import { Clock, Hash } from 'lucide-react';

interface Props {
  baslik: string;
  sure: number;
  soru: number;
  renk: 'indigo' | 'purple' | 'violet' | 'pink';
}

const renkMap = {
  indigo: 'from-indigo-900/50 to-indigo-800/30 border-indigo-700/50',
  purple: 'from-purple-900/50 to-purple-800/30 border-purple-700/50',
  violet: 'from-violet-900/50 to-violet-800/30 border-violet-700/50',
  pink: 'from-pink-900/50 to-pink-800/30 border-pink-700/50',
};

const textRenkMap = {
  indigo: 'text-indigo-400',
  purple: 'text-purple-400',
  violet: 'text-violet-400',
  pink: 'text-pink-400',
};

export default function OzetKart({ baslik, sure, soru, renk }: Props) {
  return (
    <div className={`bg-gradient-to-br ${renkMap[renk]} border rounded-xl p-5`}>
      <h3 className={`text-sm font-medium ${textRenkMap[renk]} mb-3`}>{baslik}</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-gray-400" />
          <span className="text-xl font-bold text-white">{formatDuration(sure)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Hash size={16} className="text-gray-400" />
          <span className="text-sm text-gray-300">{soru} soru</span>
        </div>
      </div>
    </div>
  );
}
