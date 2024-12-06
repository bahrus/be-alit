// @ts-check
import { MountObserver, seed, BeHive } from 'be-hive/be-hive.js';
import { emc as baseEMC } from './emc.js';
/** @import  {EMC, EventListenerOrFn} from './ts-refs/trans-render/be/types' */;
/** @import {CSSQuery} from './ts-refs/trans-render/types.js' */
/** @import {Actions, PAP,  AP} from './ts-refs/be-render-neutral/types' */;

/**
 * @type {Partial<EMC<any, AP>>}
 */
export const emc = {
    ...baseEMC,
    base: '🎇',
    enhPropKey: '🎇',
    handlerKey: '🎇',
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);





