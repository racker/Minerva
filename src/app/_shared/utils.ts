import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";


/**
* @description Turns the array of key pairs into an object
* @param keyPairs [{[key: string] : any}]
* @returns {}
*/
function transformKeyPairs(keyPairs: [{ [key: string]: any }]): {} {
    let paired = {};
    keyPairs.forEach(element => {
        if (element.key && element.value) {
            paired[element.key] = element.value;
        }
    });
    return paired;
}

/**
 * @description Marks all a formgroup's controls as dirty & touched
 * @param group FormGroup
 */
function MarkFormGroupTouched(group: FormGroup): void {
(<any>Object).values(group.controls).forEach((control: FormControl) => {
    control.markAsDirty();
    control.markAsTouched({ onlySelf: true });
})
}

const mergeUniqueObjectsOfArray = (original, newdata, selector = 'key') => {
    newdata.forEach(dat => {
		const foundIndex = original.findIndex(ori => ori[selector] == dat[selector]);
		if (foundIndex >= 0) original.splice(foundIndex, 1, dat);
        else original.push(dat);
	});

	return original;
}

/**
 * Is the component or element being used in the Admin project?
 * @param router Router
 */
const isAdmin = (router: Router | any): boolean => {
    return router.url.includes('/admin');
}

/**
 * A TypeGuard to check if an object matches any particular interface
 * @param obj any
 * @param keys (keyof T)[]
 * @returns boolean
 */
function implementsObject<T>(obj: any, keys: (keyof T)[]): boolean {
    let objProperties: Array<string> = [];
    JSON.parse(JSON.stringify(obj), (key, value) => {
        objProperties.push(key);
    });
    for (const key of keys) {
        if (!objProperties.includes(key.toString())) {
            return false;
        }
    }

    objProperties = null;
    return true;
}


export {
    transformKeyPairs,
    MarkFormGroupTouched,
    mergeUniqueObjectsOfArray,
    isAdmin,
    implementsObject
}