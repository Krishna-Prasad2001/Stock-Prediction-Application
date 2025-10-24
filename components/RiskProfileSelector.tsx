
import React from 'react';
import { RISK_PROFILES, RISK_PROFILE_DESCRIPTIONS } from '../constants';
import type { RiskProfile } from '../types';

interface RiskProfileSelectorProps {
  onProfileSelect: (profile: RiskProfile) => void;
}

export const RiskProfileSelector: React.FC<RiskProfileSelectorProps> = ({ onProfileSelect }) => {
  return (
    <div className="bg-gray-800/50 p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-lg animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 text-gray-100">First, what's your investment style?</h2>
      <p className="text-center text-gray-400 mb-8">This helps our AI tailor its analysis to you.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RISK_PROFILES.map((profile) => (
          <button
            key={profile}
            onClick={() => onProfileSelect(profile)}
            className="group p-6 text-left bg-gray-900 hover:bg-cyan-900/50 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            <h3 className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300">{profile}</h3>
            <p className="mt-2 text-gray-400 group-hover:text-gray-300 text-sm">
              {RISK_PROFILE_DESCRIPTIONS[profile]}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};
