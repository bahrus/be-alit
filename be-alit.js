import { config as beCnfg } from 'be-enhanced/config.js';
import { BE } from 'be-enhanced/BE.js';
class BeAlit extends BE {
    static config = {
        propDefaults: {
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
        compacts: {
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
        positractions: [
            ...beCnfg.positractions
        ]
    };
    getAttrExpr(self) {
        const { enhancedElement, eval: e } = self;
        const eAttr = enhancedElement.getAttribute(e);
        const attrExpr = eAttr === null ? undefined : eAttr;
        const scriptRef = attrExpr ? undefined : '^{(*)}';
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
    async importSymbols(self) {
        const { scriptEl } = self;
        import('be-exportable/be-exportable.js');
        if (!scriptEl.src) {
            const { rewrite } = await import('./rewrite.js');
            rewrite(self, scriptEl);
        }
        const { emc } = await import('be-exportable/behivior.js');
        const exportable = await scriptEl.beEnhanced.whenResolved(emc);
        return {
            renderer: exportable.exports['renderer'],
            resolved: true,
        };
    }
    doRender(self) {
        const { renderer, vm, enhancedElement } = self;
        renderer(vm, enhancedElement);
    }
    async onScriptRef(self) {
        const { enhancedElement, scriptRef } = self;
        const { parse } = await import('trans-render/dss/parse.js');
        const specifier = await parse(scriptRef);
        console.log({ specifier });
        const { find } = await import('trans-render/dss/find.js');
        const scriptEl = await find(enhancedElement, specifier);
        console.log({ scriptEl });
        return {
            scriptEl,
        };
    }
}
await BeAlit.bootUp();
export { BeAlit };
