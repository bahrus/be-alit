// @ts-check
import { BE } from 'be-enhanced/BE.js';
import { propInfo, resolved, rejected } from 'be-enhanced/cc.js';
import {render, html} from 'lit-html';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';
import {BeRenderNeutral} from 'be-render-neutral/be-render-neutral.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP,  AP, BAP} from './ts-refs/be-render-neutral/types' */;
/** @import {Specifier} from './ts-refs/trans-render/dss/types.d.ts' */

/**
 * @implements {Actions}
 * 
 */
class BeAlit extends BeRenderNeutral {

    /**
     * 
     * @param {BAP} self 
     */
    doRender(self) {
        const {renderer, vm, enhancedElement} = self;
        const {parentElement} = enhancedElement;
        if(parentElement === null) throw 400;
        render(renderer(vm, html), parentElement);
    }

}

await BeAlit.bootUp();
export {BeAlit}