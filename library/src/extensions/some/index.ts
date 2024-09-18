/**
 * @license
 * Copyright 2024 Daymon Littrell-Reyes
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ExpectMessageBuilder, place } from "@rbxts/expect";
import { CustomMethodImpl, extendMethods } from "@rbxts/expect/out/expect";
import { Option } from "@rbxts/rust-classes";
import { startsWith } from "@rbxts/string-utils";

const baseMessage = new ExpectMessageBuilder(
  `Expected ${place.name} to ${place.not} be 'Some' (Option)`
).nestedMetadata({ [place.path]: place.actual.value });

const some: CustomMethodImpl<unknown> = (_, actual) => {
  const message = baseMessage.use();

  if (typeOf(actual) !== "table") {
    return message.suffix(`, but it was of type ${place.actual.type}`).fail();
  }

  const classType = tostring(actual);

  if (startsWith(classType, "Option.some(")) {
    return message.pass();
  }

  if (classType === "Option.none") {
    return message.suffix(", but it was 'None' (Option)").fail();
  }

  return message.suffix(", but it was not an 'Option'").fail();
};

declare module "@rbxts/expect" {
  interface Assertion<T> {
    some(): Assertion<Option<defined>>;
  }
}

extendMethods({
  some: some,
});
