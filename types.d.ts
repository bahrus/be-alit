import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';
import {ElTypes, SignalRefType} from 'be-linked/types';
import {ObserveRule} from 'be-observant/types';
import {Target, Scope, ProxyPropChangeInfo} from 'trans-render/lib/types';

export interface EndUserProps extends IBE{
    with?: Array<WithStatement>,
    With?: Array<WithStatement>,
    scriptRef?: Target,
    eval?: string,
    vm?: any,
}

export interface AllProps extends EndUserProps{
    //args?: string[],
    attrExpr?: string | null,
    isParsed?: boolean,
    scriptEl?: HTMLScriptElement;
    renderer?: (vm: any, enhancedElement: Element) => any;
}

export type WithStatement = string;

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions{
    getAttrExpr(self: this): PAP;
    onAttrExpr(self: this): PAP;
    importSymbols(self: this): ProPAP;
    doRender(self: this): void;
}

