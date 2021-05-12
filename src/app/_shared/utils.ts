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


function formatMultipleData(records) {
    var arr = [];
    var groupName;
    for (let data of records) {
    var keys = Object.keys(data.values);
    var values = Object.values(data.values);
    groupName = data.tags.host + '_' + data.tags.os + '_' + data.tags.deployment;
      var res = keys.map((v, i) => {
        return {
          mean : values[i],
          time : keys[i],
          tags : groupName
        }
      });

      arr.push(res);
    }
      const combinedArray = [].concat(...arr);
    return combinedArray;
  }

export {
    transformKeyPairs,
    MarkFormGroupTouched,
    mergeUniqueObjectsOfArray,
    implementsObject,
    formatMultipleData
}