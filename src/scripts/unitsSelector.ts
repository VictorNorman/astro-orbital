import { unitsSelection$ } from "./stores";

const unitSelect = document.getElementById("unitSelector") as HTMLSelectElement;
unitSelect.addEventListener("change", () => {
  unitsSelection$.set(unitSelect.value);
});

unitsSelection$.subscribe((s: any) => console.log(s));