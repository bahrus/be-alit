import {AP} from './legacy/types';

export function rewrite({enhancedElement}: AP, scriptEl: HTMLScriptElement){
    const inner = scriptEl.innerHTML.trim();
    scriptEl.innerHTML = `
import {html, render} from 'lit-html/lit-html.js';

const templ = vm => ${inner};

export const renderer = (vm, enhancedElement) => {
    render(templ(vm), enhancedElement);
};
    `;
}