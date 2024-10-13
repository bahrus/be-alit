import { BeHive, seed } from 'be-hive/be-hive.js';
import { MountObserver } from 'mount-observer/MountObserver.js';
export const emc = {
    enhPropKey: 'beAlit',
    base: 'be-alit',
    branches: ['', 'vm', 'eval'],
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
        },
        '1.0': {
            instanceOf: 'Object',
            mapsTo: 'vm'
        },
        '2.0': {
            instanceOf: 'String',
            mapsTo: 'eval'
        }
    },
    importEnh: async () => {
        const { BeAlit } = await import('./be-alit.js');
        return BeAlit;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
