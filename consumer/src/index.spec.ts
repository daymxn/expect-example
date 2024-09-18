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

/// <reference types="@rbxts/testez/globals" />

import "./setup";

import { expect } from "@rbxts/expect";
import { Option } from "@rbxts/rust-classes";

export = () => {
  describe("expect", () => {
    it("works normally", () => {
      expect(5).to.equal(5).but.not.equal(4);
    });
  });

  describe("options", () => {
    it("checks if the value is a none or some type", () => {
      expect(Option.none()).to.be.none().but.not.some();
      expect(Option.some(5)).to.be.some().but.not.none();
      expect(5).to.not.be.some().or.none();
      expect(undefined).to.not.be.some().or.none();
    });
  });
};
