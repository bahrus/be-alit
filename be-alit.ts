import {config as beCnfg} from 'be-enhanced/config.js';
import {BE, BEConfig} from 'be-enhanced/BE.js';
import {Actions, AP, PAP, ProPAP} from './types';
import { Positractions, PropInfo } from 'trans-render/froop/types';
import {IEnhancement,  BEAllProps, EnhancementInfo} from 'trans-render/be/types';

class BeAlit extends BE<AP, Actions> implements Actions{

}

interface BeAlit extends AP{}

await BeAlit.bootUp();

export {BeAlit}