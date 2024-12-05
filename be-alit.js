// @ts-check
import { BE } from 'be-enhanced/BE.js';
import { propInfo } from 'be-enhanced/cc.js';
import {render, html} from 'lit-html';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP,  AP, BAP} from './ts-refs/be-alit/types' */;

/**
 * @implements {Actions}
 * 
 * 
 */
class BeAlit extends BE {

    /**
     * @type {BEConfig<BAP, Actions & IEnhancement, any>}
     */
    static config = {
        propInfo:{
            ...propInfo,
            vm: {},
            renderer: {},
        },
        actions: {
            getRenderer: {
                ifNoneOf: ['renderer']
            },
            doRender: {
                ifAllOf: ['renderer', 'vm']
            }
        }
    }

    /**
     * 
     * @param {BAP} self 
     * @returns 
     */
    getRenderer(self){
        const {enhancedElement} = self;
        return /** @type {BAP} */({
            renderer: enhancedElement.renderer
        });
    }

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