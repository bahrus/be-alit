import {BeHive, EMC, seed} from 'be-hive/be-hive.js';
import {MountObserver, MOSE} from 'mount-observer/MountObserver.js';
import {AP} from './types';

export const emc: EMC<any, AP> = {
    enhPropKey: 'beAlit',
    base: 'be-alit',
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
        }
    },
    importEnh: async () => {
        const {BeAlit} = await import('./be-alit.js');
        return BeAlit
    }
};

const mose = seed(emc);

MountObserver.synthesize(document, BeHive, mose);