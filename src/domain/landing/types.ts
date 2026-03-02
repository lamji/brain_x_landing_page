export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PreventionMechanism {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface DebugPractice {
  id: string;
  title: string;
  description: string;
  icon: string;
  keyPoints: string[];
}
