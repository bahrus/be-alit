export function rewrite({ enhancedElement }, scriptEl) {
    const inner = scriptEl.innerHTML.trim();
    scriptEl.innerHTML = `
import {html, render} from 'lit-html';

const templ = vm => ${inner};

export const renderer = vm => {
    render(templ, enhancedElement);
};
    `;
}
