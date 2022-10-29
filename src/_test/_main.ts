import { assertEquals, TestsOf } from "@nicholaskoldys/just-equate-testing";
import { testVar } from "../main.js";

TestsOf("Main.js: ", {

  "Test Variable imported      ": [
    () => {
      console.log(testVar, ' = ', "Hello Test");
      assertEquals(testVar, "Hello Test");
    }, "read variable.",
  ],
});