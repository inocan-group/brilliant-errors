import { Expect, Equal } from "@type-challenges/utils";
import { ConstructorFor, ErrorHttpCodes, ErrorOptions, ErrorSubTypes, ErrorTypes } from "~/@types";
import type { TypeGuard } from "inferred-types";
import { createError } from "~/configurators";
import { isBrilliantError } from "~/@guards";

describe("using MessageContructor", () => {
  it("createError() types are correct for each partial application", () => {
    const TYPE = "standard";
    const nameAndApp = createError("MyError", "MyApp");
    type NameAndApp = typeof nameAndApp; // ErrorTypes
    const typesAllowed = nameAndApp("oh-shit", "no-biggie");
    type TypesAllowed = typeof typesAllowed; // ErrorSubTypes
    const subTypesAllowed = typesAllowed();
    type SubtypesAllowed = typeof subTypesAllowed; // ErrorHttpCodes
    const httpCodesAllowed = subTypesAllowed(401, 404);
    type HttpCodesAllowed = typeof httpCodesAllowed;

    const [MyError, isMyError, isBrilliant] = httpCodesAllowed({
      defaultSubType: "bobs-yur-uncle",
      // constructorType: TYPE,
    });
    type Error = typeof MyError;
    type ErrorExpected = ConstructorFor<
      "MyError",
      "MyApp",
      "oh-shit" | "no-biggie",
      string,
      401 | 404,
      typeof TYPE
    >;
    type TG = typeof isMyError;
    type TG_Expected = TypeGuard<InstanceType<ErrorExpected>>;
    type GeneralTg = typeof isBrilliant;
    type General_Expected = typeof isBrilliantError;

    type cases = [
      // 1st
      Expect<Equal<NameAndApp, ErrorTypes<"MyError", "MyApp">>>,
      // 2nd
      Expect<Equal<TypesAllowed, ErrorSubTypes<"MyError", "MyApp", "oh-shit" | "no-biggie">>>,
      // 3rd
      Expect<
        Equal<SubtypesAllowed, ErrorHttpCodes<"MyError", "MyApp", "oh-shit" | "no-biggie", string>>
      >,
      // 4th
      Expect<
        Equal<
          HttpCodesAllowed,
          ErrorOptions<"MyError", "MyApp", "oh-shit" | "no-biggie", string, 401 | 404>
        >
      >,
      // 5th and final outcome
      Expect<Equal<Error, ErrorExpected>>,
      Expect<Equal<TG, TG_Expected>>,
      Expect<Equal<GeneralTg, General_Expected>>
    ];

    const c: cases = [true, true, true, true, true, true, true];
    expect(c).toBe(c);
  });

  it("API type effects constructor", () => {
    const stage1 = ["MyError", "MyApp"] as const;
    const [emptyStandard] = createError(...stage1)()()()();
    type EmptyStandard = typeof emptyStandard;
    const [defStandard] = createError(...stage1)()()()({});
    type DefStandard = typeof defStandard;
    const [standard] = createError(...stage1)()()()({ constructorType: "standard" });
    type Standard = typeof standard;
    const [network] = createError(...stage1)()()()({ constructorType: "network" });
    type Network = typeof network;
    const [wrapper] = createError(...stage1)()()()({ constructorType: "wrapper" });
    type Wrapper = typeof wrapper;

    type cases = [
      //
      Expect<
        Equal<EmptyStandard, ConstructorFor<"MyError", "MyApp", string, string, number, "standard">>
      >,
      Expect<
        Equal<DefStandard, ConstructorFor<"MyError", "MyApp", string, string, number, "standard">>
      >,
      Expect<
        Equal<Standard, ConstructorFor<"MyError", "MyApp", string, string, number, "standard">>
      >,
      Expect<Equal<Network, ConstructorFor<"MyError", "MyApp", string, string, number, "network">>>,
      Expect<Equal<Wrapper, ConstructorFor<"MyError", "MyApp", string, string, number, "wrapper">>>
    ];

    const c: cases = [true, true, true, true, true];
    expect(c).toBe(c);
  });

  it("standard error works as expected", () => {
    const intro = ["MyError", "MyApp"] as const;
    const types = ["hey", "ho"] as const;
    const http = [401, 403] as const;
    const [MyError, isMyError] = createError(...intro)(...types)()(...http)({
      defaultHttpStatus: 500,
    });

    const err = new MyError("this is a test", "hey/wazzup");

    expect(err.httpStatus).toBe(500);
    expect(err.code).toBe("hey");
    expect(err.subType).toBe("wazzup");
    expect(err.classification).toBe("hey/wazzup");

    expect(isMyError(err)).toBeTruthy();
    expect(isMyError(new Error("not today"))).toBeFalsy();
  });
});
