import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {Actions, AP, PAP, ProPAP} from '../types';
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
            scriptEl: {},
            renderer: {},
        },
        compacts:{
            when_eval_changes_invoke_getAttrExpr: 0,
            when_attrExpr_changes_invoke_onAttrExpr: 0,
            when_scriptEl_changes_invoke_importSymbols: 0,
            when_scriptRef_changes_invoke_onScriptRef: 0,
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
        console.log('getattrexpr', e);
        const eAttr = enhancedElement.getAttribute(e!)
        const attrExpr = eAttr === null ? undefined : eAttr;
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

    async onScriptRef(self: this){
        const {enhancedElement, scriptRef} = self;
        const {parse} = await import('trans-render/dss/parse.js');
        const specifier = await parse(scriptRef!);
        const {find} = await import('trans-render/dss/find.js');
        const scriptEl = await find(enhancedElement, specifier);
        return {
            scriptEl,
        } as PAP
    }
}

interface BeAlit extends AP{}

await BeAlit.bootUp();

export {BeAlit}