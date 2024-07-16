import {IEnhancement} from 'trans-render/be/types';

export interface EndUserProps extends IEnhancement{
    eval?: string,
    vm?: any,
    scriptRef?: string,
}

export interface AP extends EndUserProps{
    attrExpr?: string | null,
    scriptEl?: HTMLScriptElement,
    renderer?: (vm: any, enhancedElement: Element) => any,
}

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export interface Actions {
    getAttrExpr(self: this): PAP;
    onAttrExpr(self: this): PAP;
    importSymbols(self: this): ProPAP;
    doRender(self: this): void;
}