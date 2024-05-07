import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function replaceAll(str:string, cerca:string, sostituisci:string) {
  return str.split(cerca).join(sostituisci);
}
export function htmlToText(html: string) {
  var temp = document.createElement('div');
  temp.innerHTML = html;
  temp.textContent;
  var txt=replaceAll(temp.textContent??"",'&#39;', "'",);
  return txt;
}