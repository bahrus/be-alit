import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';
import {VMLocator, AP, ProPAP, PAP} from './types';

const strType = String.raw `\||\#|\@|\/|\%|\~`;

const reWithStatements: RegExpOrRegExpExt<VMLocator>[] = [
    {
        regExp: new RegExp(String.raw `^(?<type>${strType})(?<name>[\w\-\:\|]+)`),
        defaultVals:{}
    }
]

export async function prsWith(self: AP) : ProPAP{
    const {With, with: w} = self;
    const withUnion = [...(With || []), ...(w || [])];
    const locators: Array<VMLocator> = [];
    for(const withS of withUnion){
        const locator = tryParse(withS, reWithStatements) as VMLocator;
        if(locator === null) throw 'PE'; //Parse Error
        locators.push(locator);
    }
    return {
        locators,
    }
}