/**
 * @packageDocumentation
 * @module api.functional.partial_dto_test.partial_type
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection, IPropagation, HttpError } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";
import type { Resolved } from "typia";

import type { PartialPickIOriginalbemailcreated_atoriginal_optionalundefinable_attr } from "../../../structures/PartialPickIOriginalbemailcreated_atoriginal_optionalundefinable_attr";
import type { PartialPickIOriginaldemailcreated_atoriginal_optionalundefinable_attr } from "../../../structures/PartialPickIOriginaldemailcreated_atoriginal_optionalundefinable_attr";

/**
 * @controller PartialDTOTestController.partialType
 * @path POST /partial-dto-test/partial-type
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function partialType(
  connection: IConnection,
  body: partialType.Input,
): Promise<partialType.Output> {
  return !!connection.simulate
    ? partialType.simulate(connection, body)
    : PlainFetcher.propagate<any, any>(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...partialType.METADATA,
          template: partialType.METADATA.path,
          path: partialType.path(),
        },
        body,
      );
}
export namespace partialType {
  export type Input =
    PartialPickIOriginaldemailcreated_atoriginal_optionalundefinable_attr;
  export type Output = IPropagation<
    {
      201: PartialPickIOriginalbemailcreated_atoriginal_optionalundefinable_attr;
    },
    201
  >;

  export const METADATA = {
    method: "POST",
    path: "/partial-dto-test/partial-type",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 201,
  } as const;

  export const path = () => "/partial-dto-test/partial-type";
  export const random = (
    g?: Partial<typia.IRandomGenerator>,
  ): Resolved<PartialPickIOriginalbemailcreated_atoriginal_optionalundefinable_attr> =>
    typia.random<PartialPickIOriginalbemailcreated_atoriginal_optionalundefinable_attr>(
      g,
    );
  export const simulate = (
    connection: IConnection,
    body: partialType.Input,
  ): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(),
      contentType: "application/json",
    });
    try {
      assert.body(() => typia.assert(body));
    } catch (exp) {
      if (!typia.is<HttpError>(exp)) throw exp;
      return {
        success: false,
        status: exp.status,
        headers: exp.headers,
        data: exp.toJSON().message,
      } as any;
    }
    return {
      success: true,
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
      data: random(
        "object" === typeof connection.simulate && null !== connection.simulate
          ? connection.simulate
          : undefined,
      ),
    } as Output;
  };
}