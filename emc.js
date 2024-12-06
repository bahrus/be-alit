// @ts-check
import { BeHive, seed, MountObserver } from 'be-hive/be-hive.js';
/** @import {EMC, EventListenerOrFn} from './ts-refs/trans-render/be/types' */
/** @import {Actions, PAP,  AP} from './ts-refs/be-alit/types' */;
/** @import {CSSQuery} from './ts-refs/trans-render/types.js' */

/**
 * @type {Partial<EMC<any, AP>>}
 */
export const emc = {
    base: 'be-alit',
    branches: ['', 'vm', 'with'],
    map: {
        '1.0': {
            instanceOf: 'Object',
            mapsTo: 'vm'
        },
        '2.0': {
            instanceOf: 'DSSArray',
            arrValMapsTo: 'with'
        }
    },
    enhancedElementInstanceOf: [HTMLScriptElement],
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
