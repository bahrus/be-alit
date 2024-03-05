import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
export class BeAlit extends BE {
    static get beConfig() {
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        };
    }
    getAttrExpr(self) {
        const { enhancedElement, eval: e } = self;
        const attrExpr = enhancedElement.getAttribute(e);
        const scriptRef = attrExpr ? undefined : 'previousElementSibling';
        return {
            attrExpr,
            scriptRef,
        };
    }
    onAttrExpr(self) {
        const { attrExpr } = self;
        //TODO optimize
        const scriptEl = document.createElement('script');
        scriptEl.innerHTML = attrExpr;
        return {
            scriptEl
        };
    }
}
export const tagName = 'be-alit';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
            ...propDefaults,
            eval: 'onload',
        },
        propInfo: {
            ...propInfo,
        },
        actions: {
            getAttrExpr: {
                ifAllOf: ['isParsed', 'eval']
            },
        }
    }
});
