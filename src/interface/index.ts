export interface FrameOption {
  id: string;
  label: string;
  cols: number;
  rows: number;
  ratio: number; 
}

export interface Frame {
  id: string;
  label: string;
  width: number;
  height: number;
  price: number;
  cols: number;
  options: FrameOption[];
}