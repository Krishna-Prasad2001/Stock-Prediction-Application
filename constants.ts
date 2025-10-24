
import type { RiskProfile } from './types';

export const RISK_PROFILES: RiskProfile[] = ['Conservative', 'Moderate', 'Aggressive'];

export const RISK_PROFILE_DESCRIPTIONS: Record<RiskProfile, string> = {
  Conservative: 'You prefer lower-risk investments, prioritizing capital preservation over high returns.',
  Moderate: 'You are willing to accept some risk for potentially higher returns, seeking a balanced approach.',
  Aggressive: 'You are comfortable with high-risk investments, aiming for maximum long-term growth.'
};
