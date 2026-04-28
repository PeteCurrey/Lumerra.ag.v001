export type ModuleType = 'grill' | 'prep' | 'fridge' | 'sink' | 'storage';

export interface Module {
  id: string;
  type: ModuleType;
  position: number;
}
