export interface SimulationStep {
  id: string;
  label: string;
  description: string;
  output: string;
  color: string;
}

export interface NeuralNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  connections: string[];
}

export interface StackItem {
  id: string;
  name: string;
  angle: number;
  px: number;
  py: number;
}
