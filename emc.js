// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
import {Registry} from 'be-hive/Registry.js';
import { w as bw } from 'be-hive/w.js';
/** @import {EMC, EventListenerOrFn} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP,  AP} from './ts-refs/be-alit/types' */;
/** @import {CSSQuery} from './ts-refs/trans-render/types.js' */

/**
 * @type {Partial<EMC<any, AP>>}
 */
export const emc = {
    base: 'be-alit',
    enhPropKey: 'beAlit',
    importEnh: async () => {
        const { BeAlit } = 
        /** @type {{new(): IEnhancement<Element>}} */ 
        /** @type {any} */
        (await import('./be-alit.js'));
        return BeAlit;
    },
    ws: [],
    primaryProp: 'renderer'
};

const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);

/**
 * 
 * @param {string} handlerName 
 * @param {EventListenerOrFn} handler 
 */
export function register(handlerName, handler){
    Registry.register(emc, handlerName, handler);
}

/**
 * 
 * @param {CSSQuery} q 
 */
export function w(q){
    return bw(q, emc.ws, w);
}