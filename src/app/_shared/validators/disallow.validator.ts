import { AbstractControl } from '@angular/forms';
import { environment } from 'env/minerva/environment';

/**
 * @description Validates fields against using 'agent_' in a key field for labels
 * @param control AbstractControl
 */
export const disallowValidator = (control: AbstractControl): { [key: string]: boolean } => {
    if (control.value.startsWith(environment.resources.disallowLabelEdit)) {
        return { disallow: true }
    }

    return null;
};
