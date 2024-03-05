import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, EntrustingRule} from './types';
import {getRemoteProp} from 'be-linked/defaults.js';
import {getRemoteEl} from 'be-linked/getRemoteEl.js';
import {ObserveRule, ObserverOptions} from 'be-observant/types';
import {Observer} from 'be-observant/Observer.js';
import {getLocalSignal} from 'be-linked/defaults.js';
import {setSignalVal} from 'be-linked/setSignalVal.js';
import { getSignalVal } from 'be-linked/getSignalVal.js';
import { SignalRefType } from 'be-linked/types';


export const tagName = 'be-alit';