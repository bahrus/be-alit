import { tryParse } from 'be-enhanced/cpu.js';
const strType = String.raw `\||\#|\@|\/|\%|\~`;
const reWithStatements = [
    {
        regExp: new RegExp(String.raw `^(?<type>${strType})(?<name>[\w\-\:\|]+)`),
        defaultVals: {}
    }
];
export async function prsWith(self) {
    const { With, with: w } = self;
    const withUnion = [...(With || []), ...(w || [])];
    const locators = [];
    for (const withS of withUnion) {
        const locator = tryParse(withS, reWithStatements);
        if (locator === null)
            throw 'PE'; //Parse Error
        locators.push(locator);
    }
    return {
        locators,
    };
}
