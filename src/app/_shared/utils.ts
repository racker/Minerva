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


export {
    transformKeyPairs,
    MarkFormGroupTouched,
    mergeUniqueObjectsOfArray,
    isAdmin
 }