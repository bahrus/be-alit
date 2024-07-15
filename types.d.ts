import {IEnhancement} from 'trans-render/be/types';

export interface EndUserProps extends IEnhancement{
    eval?: string,
    vm?: any,
}

export interface AP extends EndUserProps{

}

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export interface Actions {

}