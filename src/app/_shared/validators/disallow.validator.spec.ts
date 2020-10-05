import { async } from '@angular/core/testing';
import { disallowValidator } from './disallow.validator'

describe('disallowValidator', () => {
    let testKeyString;
    beforeEach(async(() => {
        testKeyString = {
            value: ''
        }
    }));
   

    it('should create validator', () => {
        expect(disallowValidator).toBeTruthy();
    });

    it('should validate against incorrect key entry', () => {
        testKeyString.value = 'newKey';
        expect(disallowValidator(testKeyString)).toEqual(null);
    });

    it('should invalidate missing key', () => {
        testKeyString.value = 'agent_discovered';
        expect(disallowValidator(testKeyString)).toEqual({ disallow: true });
    });
});