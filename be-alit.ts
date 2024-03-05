import { BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import { BEConfig} from 'be-enhanced/types';
import { XE} from 'xtal-element/XE.js';
import { Actions, AllProps, AP, PAP, ProPAP, POA} from './types';
import { getRemoteProp} from 'be-linked/defaults.js';
import { getRemoteEl} from 'be-linked/getRemoteEl.js';
import { ObserveRule, ObserverOptions} from 'be-observant/types';
import { Observer} from 'be-observant/Observer.js';
import { getLocalSignal} from 'be-linked/defaults.js';
import { setSignalVal} from 'be-linked/setSignalVal.js';
import { getSignalVal } from 'be-linked/getSignalVal.js';
import { SignalRefType } from 'be-linked/types';
import { AllProps as BeExportableAllProps } from 'be-exportable/types';

export class BeAlit extends BE<AP, Actions> implements Actions{
    static override get beConfig(){
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
    }

    getAttrExpr(self: this): PAP {
        const {enhancedElement, eval: e} = self;
        const attrExpr = enhancedElement.getAttribute(e!);
        const scriptRef = attrExpr  ? undefined : 'previousElementSibling';
        return {
            attrExpr,
            scriptRef,
        };
    }

    onAttrExpr(self: this): PAP {
        const {attrExpr} = self;
        //TODO optimize
        const scriptEl = document.createElement('script');
        scriptEl.innerHTML = attrExpr!;
        return {
            scriptEl
        }
    }

    async importSymbols(self: this): ProPAP {
        const {scriptEl} = self;
        import('be-exportable/be-exportable.js');
        
        if(!scriptEl!.src){
            const {rewrite} = await import('./rewrite.js');
            rewrite(self, scriptEl!);
        }
        const exportable = await (<any>scriptEl).beEnhanced.whenResolved('be-exportable') as BeExportableAllProps;
        return {
            renderer: exportable.exports['renderer'],
            resolved: true,
        }
    }

    doRender(self: this) {
        const {renderer, vm, enhancedElement} = self;
        renderer!(vm, enhancedElement); 
    }
}

export interface BeAlit extends AllProps{}

export const tagName = 'be-alit';

const xe = new XE<AP, Actions>({
    config:{
        tagName,
        isEnh: true,
        propDefaults:{
            ...propDefaults,
            eval: 'onload',
        },
        propInfo: {
            ...propInfo,
        },
        actions:{
            getAttrExpr:{
                ifAllOf: ['isParsed', 'eval']
            },
            doRender: {
                ifAllOf: ['renderer', 'vm']
            }
        }
    }
})