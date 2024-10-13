import {BeHive, EMC, seed} from 'be-hive/be-hive.js';
import {MountObserver, MOSE} from 'mount-observer/MountObserver.js';
import {AP} from '../types';

export const emc: EMC<any, AP> = {
    enhPropKey: 'beAlit',
    base: 'be-alit',
    branches: ['', 'vm', 'eval'],
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
        },
        '1.0':{
            instanceOf: 'Object',
            mapsTo: 'vm'
        },
        '2.0': {
            instanceOf: 'String',
            mapsTo: 'eval'
        }
    },
    importEnh: async () => {
        const {BeAlit} = await import('./be-alit.js');
        return BeAlit
    }
};

const mose = seed(emc);

MountObserver.synthesize(document, BeHive, mose);