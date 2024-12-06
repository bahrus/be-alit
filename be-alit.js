// @ts-check
import { BE } from 'be-enhanced/BE.js';
import { propInfo, resolved, rejected } from 'be-enhanced/cc.js';
import {render, html} from 'lit-html';
import {dispatchEvent as de} from 'trans-render/positractions/dispatchEvent.js';

/** @import {BEConfig, IEnhancement, BEAllProps} from './ts-refs/be-enhanced/types.d.ts' */
/** @import {Actions, PAP,  AP, BAP} from './ts-refs/be-alit/types' */;
/** @import {Specifier} from './ts-refs/trans-render/dss/types.d.ts' */

/**
 * @implements {Actions}
 * 
 */
class BeAlit extends BE {
    de = de;

    /**
     * @type {BEConfig<BAP, Actions & IEnhancement>}
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
        },
        positractions: [resolved, rejected],
        handlers: {
            absorbingObject_to_doRender_on: '.'
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
            renderer: enhancedElement.renderer,
            resolved: true,
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

    /**
     * 
     * @param {BAP} self 
     */
    async observe(self){
        const {with: w, enhancedElement} = self;
        const { find } = await import('trans-render/dss/find.js');
        const { ASMR } = await import('trans-render/asmr/asmr.js');
        const specifier = /** @type {Specifier} */ (w[0]);
        //code below copy and pasted from SingleValSwitchHandler
        //package it?
        const remoteEl = await find(enhancedElement, specifier);
        if (!(remoteEl instanceof EventTarget)) throw 404;
        const { prop, host } = specifier;
        let propToAbsorb = undefined;
        /** @type {string | undefined} */
        let evt = specifier.evt || 'input';
        if (host) {
            if (prop === undefined)
                throw 'NI';
            propToAbsorb = prop;
            evt = undefined;
        }
        const absorbingObject = await ASMR.getAO(remoteEl, {
            evt,
            selfIsVal: specifier.path === '$0',
            propToAbsorb
        });
        return /** @type {BAP} */({
            absorbingObject
        });
    }
    
}

await BeAlit.bootUp();
export {BeAlit}