import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {Actions, AP, PAP, ProPAP} from './types';
import { Positractions, PropInfo } from 'trans-render/froop/types';
import {IEnhancement,  BEAllProps, EnhancementInfo} from 'trans-render/be/types';

class BeAlit extends BE<AP, Actions> implements Actions{
    static override config: BEConfig<AP & BEAllProps, Actions & IEnhancement, any> = {
        propDefaults:{
            eval: 'onload',
        },
        propInfo: {
            ...beCnfg.propInfo,
            vm: {},
            attrExpr: {},
            scriptRef: {},
        },
        compacts:{
            when_eval_changes_invoke_getAttrExpr: 0,
            when_attrExpr_changes_invoke_onAttrExpr: 0,
            when_scriptEl_changes_invoke_importSymbols: 0,
        },
        actions: {
            doRender: {
                ifAllOf: ['renderer', 'vm']
            },
        },
        positractions:[
            ...beCnfg.positractions!
        ]
    }

    getAttrExpr(self: this): PAP {
        const {enhancedElement, eval: e} = self;
        const attrExpr = enhancedElement.getAttribute(e!);
        const scriptRef = attrExpr  ? undefined : '^{(*)}';
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
        const {emc} = await import('be-exportable/behivior.js');
        const exportable = await (<any>scriptEl).beEnhanced.whenResolved(emc);
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

interface BeAlit extends AP{}

await BeAlit.bootUp();

export {BeAlit}