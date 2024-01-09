import { elements } from './elements';
import { type ElementType, type Orbital, selectedElement$, matrixSelection$, unitsSelection$ } from './stores';
import { updateSelectableMatrixContents, watchCustomMatrixForChanges } from './selectableMatrix';
import { handleTabSwitching } from './tabHandling';



/*
 * MAIN
 */
window.addEventListener("load", () => {

  // TODO: move the following to a script topTable.ts ?
  // periodic table interactions
  const pTableElements = document.querySelectorAll(".clickable > .element.ptable");
  for (let i = 0; i < pTableElements.length; i++) {
    pTableElements[i].addEventListener("click", toggleElement);
  }

  const matrixSelect = (document.getElementById("matrixSelector") as HTMLSelectElement);
  matrixSelect.addEventListener("change", () => {
    matrixSelection$.set(matrixSelect.value);
  });

  matrixSelection$.subscribe((sel: string) => {
    console.log('subscription to matrixSelection: value is ', sel);
    updateSelectableMatrixContents(sel);
    if (sel === 'custom') {
      watchCustomMatrixForChanges();
    }
  });

  handleTabSwitching();


});

function getElementByAtomicNumber(atomicNumber: number): ElementType {
  return elements.find((element) => element.number === atomicNumber)!;
}

function computeOrbitals(eConfigStr: string): Orbital[] {
  const res: Orbital[] = [];
  const groups = eConfigStr.split(" ");
  for (const group of groups) {
    const re = /(\d+)([sp])(\d+)/;
    const matches = group.match(re)!;
    res.push({
      level: Number(matches[1]),
      sOrP: matches[2],
      numElectrons: Number(matches[3]),
    });
  }
  return res;
}

function toggleElement(e: Event): void {
  const detailsTempText = document.getElementById("detailsTempText")!;
  const detailsElemBox = document.getElementById("detailsElemBox")!;

  const target =
    (e.target as HTMLElement).nodeName === "A"
      ? (e.target as HTMLElement)!
      : (e.target as HTMLElement).parentElement!;

  if (target.classList.contains("clicked")) {
    // remove selected element if already displayed
    target.classList.remove("clicked");

    // detailsElem.replaceChildren();
    detailsTempText.style.display = "block";
    detailsElemBox.style.display = "none";

    // clear the values changed when changing elements.
    selectedElement$.set({
      selectedHTMLElement: null,
      selectedElementInfo: null,
      selectedElemOrbitals: null,
    });

  } else {

    // TODO: can we improve this? Do we have the old "target"?
    const pTableElements = document.getElementsByClassName("element ptable");
    for (let i = 0; i < pTableElements.length; i++) {
      pTableElements[i].classList.remove("clicked");
    }

    // add clicked class to element
    target.classList.add("clicked");

    // detailsElem.replaceChildren();
    // document.getElementById("energyLevels")?.replaceChildren();

    // retrieve element information
    const elementID = target.textContent!.replace(/\D/g, "");
    const selectedElementInfo = getElementByAtomicNumber(parseInt(elementID));

    // const eConfigInput = <HTMLInputElement>document.getElementById("eConfigInput");
    // eConfigInput.value = selectedElement!.eConfig;

    const selectedElemOrbitals = computeOrbitals(selectedElementInfo!.eConfig);

    // hide information and show element details.
    detailsTempText.style.display = "none";
    detailsElemBox.style.display = "block";

    // Set the state, which will trigger dependent components to update.
    selectedElement$.set({
      selectedHTMLElement: target,
      selectedElementInfo,
      selectedElemOrbitals,
    });
  }
}


////////// Utility Functions /////////////


// convert 1 hartree to the given unit -- Ry, eV, etc.
// the 2nd value is the conversion factor.
const conversions = new Map([
  ['Ha', 1],
  ['Ry', 2],
  ['eV', 27.211386245988],
  ['J', 4.3597447222071E-18],
  ['cal', 1.042E-18],
  ['kJ/mol', 2625.5],
  ['kcal/mol', 627.5],
  ['cm-1', 219474.6],
]);


export function energyToUnitsAsString(energy: number, units: string): string {
  const res = energy * conversions.get(units)!;
  if (Math.abs(res) < 0.0001) {   // if number is really small.
    return `${res.toExponential(3)} ${units}`;
  } else {
    return `${res.toFixed(3)} ${units}`;  // 3 sigfigs
  }
}

export function convert2Strings(energies: number[]): string[] {
  return energies.map(e => energyToUnitsAsString(e, unitsSelection$.get()));
}