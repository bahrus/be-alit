import { BeHive, seed } from 'be-hive/be-hive.js';
import { MountObserver } from 'mount-observer/MountObserver.js';
export const emc = {
    enhPropKey: 'beAlit',
    base: 'be-alit',
    map: {
        '0.0': {
            instanceOf: 'Object$entences',
            objValMapsTo: '.',
        }
    },
    importEnh: async () => {
        const { BeAlit } = await import('./be-alit.js');
        return BeAlit;
    }
};
const mose = seed(emc);
MountObserver.synthesize(document, BeHive, mose);
