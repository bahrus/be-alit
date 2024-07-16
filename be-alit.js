import { config as beCnfg } from 'be-enhanced/config.js';
import { BE } from 'be-enhanced/BE.js';
class BeAlit extends BE {
    static config = {
        propInfo: {
            ...beCnfg.propInfo,
        }
    };
}
await BeAlit.bootUp();
export { BeAlit };
