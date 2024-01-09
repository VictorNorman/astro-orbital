import { drawDiagram } from "./energyDiagramsDisplay";
import { convert2Strings } from "./utils";
import { energies$, type EnergyComponents, selectedElement$, matrixSelection$ } from "./stores";
import { updateEnergyTables } from "./energyTables";

function updateDiagram(compEnergies: readonly EnergyComponents[]) {
  if (selectedElement$.get().selectedElementInfo === null) {
    // erase drawing of energy levels.
    document.getElementById("eLevelsID")!.replaceChildren();
    return;
  }

  console.log('updateDiagram');
  const econfig = selectedElement$.get().selectedElementInfo!.eConfig;

  // the first item in each list is the total energy, which drawDiagram does not need.
  // Also we convert to strings with fixed digits after the decimal.
  const energies: string[][] = compEnergies.map((c) => (
    convert2Strings(c.totalEnergies).slice(1)
  ));

  drawDiagram(econfig, energies, ["dynamic23", "faussurier", matrixSelection$.get()]);
}



// Trigger redraw when energy computation has emitted.
energies$.subscribe((e) => {
  updateDiagram(e)
  updateEnergyTables();
});
