import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';
import {ElTypes, SignalRefType} from 'be-linked/types';
import {ObserveRule} from 'be-observant/types';

export interface EndUserProps extends IBE{
    with?: Array<WithStatement>;
    With?: Array<WithStatement>
}

export interface AllProps extends EndUserProps{
    
}

export type WithStatement = string;
