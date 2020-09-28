import cuid from 'cuid';

export const uuid = () => cuid();

export const objectToArray = async (keyedObject: { [key: string]: any }): Promise<any> => {
  return new Promise(resolve => {
    const keys = Object.keys(keyedObject);
    const res: any[] = keys.map(k => ({ ...keyedObject[k], __key: k }));
    resolve(res);
  });
};

export const isNill = (value: any) => {
  if (value === null || value === undefined) {
    return true;
  }
  if (typeof value.length !== "undefined" && value.length === 0) {
    return true;
  }
  if (typeof value === "object") {
    for (const key in value) {
      const obj = value as Record<string, any>;
      // eslint-disable-next-line
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
  return false;
};


export const notUndefined = <T>(x: T | undefined): x is T => x !== undefined;
export const capitalize = (str: string, lower = true) => {
  return (lower ? str.toLowerCase() : str).replace(/(?:^|\s)\S/g, a => {
    return a.toUpperCase();
  });
};

export const isDefined = (el: any) => typeof el !== 'undefined' && el !== null;
export const removeEmptyArrayItems = (arr: any[]) => arr.filter(i => isDefined(i));

export function debounce<F extends (args?: any) => any | void>(func: F, wait = 300): F {
  let timeoutID: number;
  // conversion through any necessary as it wont satisfy criteria otherwise
  return <F>(<any>function(this: any, ...args: any[]) {
    clearTimeout(timeoutID);
    const context = this as any;

    timeoutID = window.setTimeout(() => {
      func.apply(context, args);
    }, wait);
  });
}

export const indexCycler = (len: number, initialValue = 0, zeroBase = false) => {
  let current = initialValue;
  const inc = zeroBase ? 0 : 1;
  const getCurrent = () => (current + inc) % len + inc;
  return {
    getCurrent,
    next: () => (current += 1) !== undefined && getCurrent(),
    previous: () => (current -= 1) !== undefined && getCurrent(),
    setCurrent: (value: number) => (current = value),
  };
};

export const funCycler = (len: number, baseZero = true) => {
  const inc = baseZero ? 0 : 1;
  return {
    decIndex: (index: number) => (index - 1 - inc + len) % len + inc,
    incIndex: (index: number) => (index + 1 - inc) % len + inc,
  };
};
