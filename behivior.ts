import {BeHive, EMC, seed} from 'be-hive/be-hive.js';
import {MountObserver, MOSE} from 'mount-observer/MountObserver.js';
import {AP} from './types';

export const emc: EMC<any, AP> = {
    enhPropKey: 'beAlit',
    importEnh: async () => {
        const {BeAlit} = await import('./be-alit.js');
        return BeAlit
    }
};