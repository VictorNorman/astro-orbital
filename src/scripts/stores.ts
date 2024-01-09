import { atom, computed } from 'nanostores';
import { dynamic23Matrix, faussurierMatrix, name2Matrix } from './matrices';
import { energyComponents, totalOrbitalEnergy } from './orbitalEnergies';

export interface ElementType {
  name: string;
  symbol: string;
  number: number;
  aMass: number;
  eConfig: string;
}

export interface Orbital {
  level: number;
  sOrP: string;
  numElectrons: number;
}

// Holds information calculated from element, matrix,
// values in matrix (if custom). Units are in hartrees.
export interface EnergyComponents {
  matrix: string;
  v_i: number[];
  t_i: number[];
  v_ij: number[][];
  totalEnergies: number[];
}

export interface Orbital {
  level: number;
  sOrP: string;
  numElectrons: number;
}

interface State {
  selectedHTMLElement: HTMLElement | null;
  selectedElementInfo: ElementType | null;
  selectedElemOrbitals: Orbital[] | null;
}

export const eLevels = ["1s", "2s", "2p", "3s", "3p"];
// max # of electrons in each orbital.
export const FULL_ORBITAL_CTS = [2, 2, 6, 2, 6];
// just the first digits from the orbitals.
export const LEVELS = [1, 2, 2, 3, 3];

export const selectedElement$ = atom<State>({
  selectedHTMLElement: null,
  selectedElementInfo: null,
  selectedElemOrbitals: null,
});

export const matrixSelection$ = atom<string>('custom');
export const customMatrixVers$ = atom<number>(0);
export const unitsSelection$ = atom<string>('Ha');


// private method.
function computeEnergiesForDyn23OrFauss(matName: string, matrix: number[][]) {
  const selElemInfo = selectedElement$.get().selectedElementInfo!;
  const orbs = selectedElement$.get().selectedElemOrbitals!;
  const totalEnergies = totalOrbitalEnergy(selElemInfo.number, orbs, matrix);
  const energyComps = energyComponents(selElemInfo.number, orbs, matrix);
  const result: EnergyComponents = {
    matrix: matName,
    t_i: energyComps.t_i,
    v_i: energyComps.v_i,
    v_ij: energyComps.v_ij,
    totalEnergies,
  };
  return result;
}

// The energy computations are based on basically everything in the state.
// Emit when:
// o element selection changes
// o unit selection changes
// o matrix selection changes
// o custom has been selected, and the custom matrix has been changed
//   since the last emission.
export const energies$ = computed(
  [selectedElement$, matrixSelection$, unitsSelection$, customMatrixVers$],
  (selElem, matrixSel, _unitsSel, _customMatrixVers) => {
    if (selectedElement$.get().selectedElementInfo === null) {
      return [];
    }
    console.log('energies$ emitting');
    const result = [];
    result.push(computeEnergiesForDyn23OrFauss('dynamic23', dynamic23Matrix));
    result.push(computeEnergiesForDyn23OrFauss('faussurier', faussurierMatrix));
    // compute custom matrix values.
    const orbs = selElem.selectedElemOrbitals!;
    const matrix = name2Matrix[matrixSel];
    const totalEnergies = totalOrbitalEnergy(selElem.selectedElementInfo!.number, orbs, matrix);
    const energyComps = energyComponents(selElem.selectedElementInfo!.number, orbs, matrix);
    result.push({
      matrix: matrixSel,
      t_i: energyComps.t_i,
      v_i: energyComps.v_i,
      v_ij: energyComps.v_ij,
      totalEnergies,
    });
    return result;
  });




