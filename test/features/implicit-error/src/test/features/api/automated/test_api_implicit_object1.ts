import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../api";

export const test_api_implicit_object1 = async (
  connection: api.IConnection,
) => {
  const output: Primitive<any> =
    await api.functional.implicit.object1(connection);
  typia.assert(output);
};
