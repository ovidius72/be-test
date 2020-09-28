import { capitalize, indexCycler, objectToArray, removeEmptyArrayItems } from "../appUtils";

describe("ObjectToArray", () => {
  const obj = {
    a: { name: "name", job: "developer" },
    b: { name: "jack", job: "marketing" },
  };
  it("Transform a key value pair object into an array", async () => {
    const res = await objectToArray(obj);
    expect(res).toEqual([
      { name: "name", job: "developer", __key: "a" },
      { name: "jack", job: "marketing", __key: "b" },
    ]);
  });
});

describe("Capitalize", () => {
  it("Should capitalize a single word", () => {
    expect(capitalize('jack')).toEqual('Jack');
  });
});

describe("RemoveEmptyArrayItems", () => {
  it("Should remove empty array items", () => {
    const res =removeEmptyArrayItems([1,2,0, null, undefined, 3])
    expect(res).toEqual([1,2,0,3]);
  });
});

describe("IndexCycler", () => {
  it("Should cycle within the given range", () => {
    const cycler = indexCycler(3,0, true);
    expect(cycler.getCurrent()).toEqual(0);
    expect(cycler.next()).toEqual(1);
    expect(cycler.next()).toEqual(2)
    expect(cycler.next()).toEqual(0)
    expect(cycler.next()).toEqual(1)
    cycler.setCurrent(2);
    expect(cycler.getCurrent()).toEqual(2);
  });
});
