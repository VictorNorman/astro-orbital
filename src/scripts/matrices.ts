export const faussurierMatrix = [
  [0.31, 0.0135, 0.0003, 0.0, 0.0], // , 0.0, 0.0],
  [0.7388, 0.3082, 0.2522, 0.0, 0.0], // , 0.0, 0.0],
  [0.9461, 0.3481, 0.3495, 0.0392, 0.021], // , 0.0007, 0.0097],
  [0.9511, 0.8511, 0.648, 0.3106, 0.2496], //, 0.1676, 0.0477],
  [0.9696, 0.855, 0.7916, 0.3002, 0.3136], //, 0.3226, 0.0513],
  // [0.9987, 0.9865, 0.9413, 0.4847, 0.323, 0.3786, 0.0743],
  // [0.934, 0.7502, 0.85, 0.6718, 0.6068, 0.6547, 0.2983],
];

/*
  Not used
export const mendozaMatrix = [
  [0.31, 0.0268, 0.0047, 0.0046, 0.0, 0.0, 0.0],
  [0.6874, 0.2761, 0.2686, 0.2663, 0.0136, 0.0012, 0.0068],
  [0.9282, 0.3264, 0.3465, 0.3398, 0.0365, 0.0066, 0.0229],
  [0.9312, 0.5774, 0.5652, 0.5651, 0.2604, 0.1751, 0.0718],
  [0.9457, 0.8394, 0.7401, 0.7373, 0.3122, 0.3211, 0.0876],
  [0.9938, 0.9894, 0.9393, 0.9367, 0.3189, 0.3773, 0.095],
  [0.9462, 0.8092, 0.7443, 0.7282, 0.5256, 0.6104, 0.3019],
]; */

export const dynamic23Matrix = [
  [0.31, 0.0067, 0.0054, 0.0032, 0.0031],
  [0.8139, 0.3128, 0.275, 0.0061, 0.0061],
  [0.9351, 0.3134, 0.3417, 0.0127, 0.0125],
  [0.9564, 0.8851, 0.757, 0.3616, 0.2076],
  [0.9627, 0.8608, 0.8357, 0.3457, 0.3107],
];

export const row23ArgonOnlyMatrix = [
  [0.3100, 0.0071, 0.0055, 0.0031, 0.0031],
  [0.6928, 0.3033, 0.2757, 0.0166, 0.0147],
  [0.9458, 0.3504, 0.3528, 0.0208, 0.0160],
  [0.9525, 0.8052, 0.6549, 0.3313, 0.2657],
  [0.9689, 0.8483, 0.7857, 0.3233, 0.3096],
];

export const row23FrozenMatrix = [
  [0.31, 0.006, 0.0048, 0.0007, 0.0005],
  [0.8094, 0.3193, 0.2766, 0.0061, 0.0061],
  [0.9537, 0.3193, 0.3211, 0.0209, 0.0171],
  [0.9964, 0.9, 0.7933, 0.3844, 0.2154],
  [0.9964, 0.885, 0.847, 0.3833, 0.2741],
];

export let customMatrix: number[][] = Array(5).fill(0).map(() => Array(5).fill(0));

export const name2Matrix: { [key: string]: number[][] } = {
  'custom': customMatrix,
  'dynamic23': dynamic23Matrix,
  'faussurier': faussurierMatrix,
  'row23ArgonOnly': row23ArgonOnlyMatrix,
  'row23Frozen': row23FrozenMatrix,
};