/**
 * MultiKeyMap
 *
 * Allows elements to be stored, indexed by multiple keys
 */
export class MultiKeyMap {
    private numKeys: number;
    private dataMap: Object = new Object();

    /**
     * numKeys: The number of keys each element is indexed by
     */
    constructor(numKeys: number) {
        this.numKeys = numKeys;
    }

    /**
     * Add a new element to the map. Parameter keys must have a length equal to this.numKeys.
     */
    put(keys: Array<string>, value: any): void {
        if (keys == null) {
            throw TypeError(`Invalid parameter keys: ${keys}`);
        }
        if (keys.length !== this.numKeys) {
            throw TypeError(`Invalid parameter keys: keys.length is ${keys.length}, expected ${this.numKeys}`);
        }

        let currObj = this.dataMap;
        for (let i = 0; i < this.numKeys - 1; i++) {
            // Iterate over the keys, moving down a level in the map object each time
            // We stop at this.numKeys - 1, because the lowest mapping is to the value, not a new Object
            if (currObj[keys[i]] == null) {
                // If nothing is mapped to this key, create a new object
                currObj[keys[i]] = new Object();
            }
            currObj = currObj[keys[i]];
        }

        // Finally, set the value in the lowest object
        currObj[keys[this.numKeys - 1]] = value;
    }

    /**
     * Retrieve an element from the map. Parameter keys must have a length equal to this.numKeys.
     * Returns undefined if no mapping can be found.
     */
    get(keys: Array<string>): any {
        if (keys == null) {
            throw TypeError(`Invalid parameter keys: ${keys}`);
        }
        if (keys.length !== this.numKeys) {
            throw TypeError(`Invalid parameter keys: keys.length is ${keys.length}, expected ${this.numKeys}`);
        }

        let currObj = this.dataMap;
        for (let i = 0; i < this.numKeys; i++) {
            // Iterate over the keys, moving down a level in the map object each time
            currObj = currObj[keys[i]];
            if (currObj == null) {
                // No mapping for this key - return undefined
                return undefined;
            }
        }

        return currObj;
    }

    /**
     * Get and array of string arrays, each representing a possible path through the map keys.
     */
    keys(): Array<Array<string>> {
        return this.traverseTreeKeys(this.dataMap, new Array<string>(), this.numKeys);
    }

    /**
     * Traverse down the tree, returning an array of keys required to reach the current node.
     * Stops when it reaches maxDepth.
     * currArray should generally be initially set to a new Array<string>()
     */
    private traverseTreeKeys(tree: Object, currArray: Array<string>, maxDepth: number): Array<Array<string>> {
        const keys = new Array<Array<string>>();

        if (currArray.length === maxDepth) {
            // We've reached maxDepth, so add the current key chain to the master array
            keys.push(currArray);
        } else {
            // Iterate over each key in the current tree
            for (const key in tree) {
                // Clone currArray, so we can use this as the basis for all sub-chains of keys from this point down.
                const tmpArray: Array<string> = JSON.parse(JSON.stringify(currArray));
                // Add the current key to the array
                tmpArray.push(key);
                // Go down to the next level
                keys.push.apply(keys, this.traverseTreeKeys(tree[key], tmpArray, maxDepth));
            }
        }

        return keys;
    }

    /**
     * Get all of the values in this map in an array
     */
    values(): Array<any> {
        return this.traverseTreeValues(this.dataMap, 0, this.numKeys);
    }

    /**
     * Traverse the tree down, returning all nodes at depth maxDepth.
     * Current level should genrally be initialised to 0.
     */
    private traverseTreeValues(tree: Object, currentLevel: number, maxDepth: number): Array<any> {
        const values = new Array<any>();

        if (currentLevel === maxDepth - 1) {
            // We've reached the maxDepth, so add the current nodes to the array
            for (const key in tree) {
                if (tree.hasOwnProperty(key)) {
                    values.push(tree[key]);
                }
            }
        } else {
            // Not yet reached the required depth, so continue down to the next level
            for (const key in tree) {
                if (tree.hasOwnProperty(key)) {
                    values.push.apply(values, this.traverseTreeValues(tree[key], currentLevel + 1, maxDepth));
                }
            }
        }

        return values;
    }
}

let myMap = new MultiKeyMap(3);
myMap.put(['hello', 'world', 'goodbye'], 'myValue');
myMap.put(['a', 'world', 'goodbye'], 'd');
myMap.put(['hello', 'world', 'b'], 'x');
myMap.put(['hello', 'a', 'b'], 'y');

console.log(JSON.stringify(myMap.keys()));
