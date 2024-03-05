import {AP} from './types';

export function rewrite({enhancedElement}: AP, scriptEl: HTMLScriptElement){
    const inner = scriptEl.innerHTML.trim();
    scriptEl.innerHTML = `
import {html, render} from 'lit-html';

const templ = vm => ${inner};

export const renderer = vm => {
    render(templ, enhancedElement);
};
    `;
}