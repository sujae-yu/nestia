/**
 * @packageDocumentation
 * @module api.functional.arrayRecursiveUnionExplicit
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { HttpError, IConnection, IPropagation } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Resolved } from "typia";
import typia from "typia";

import type { IDirectory } from "../../structures/IDirectory";
import type { IImageFile } from "../../structures/IImageFile";
import type { IShortcut } from "../../structures/IShortcut";
import type { ITextFile } from "../../structures/ITextFile";
import type { IZipFile } from "../../structures/IZipFile";

/**
 * @controller ArrayRecursiveUnionExplicitController.index
 * @path GET /arrayRecursiveUnionExplicit
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function index(connection: IConnection): Promise<index.Output> {
  return true === connection.simulate
    ? index.simulate(connection)
    : PlainFetcher.propagate<any>(connection, {
        ...index.METADATA,
        template: index.METADATA.path,
        path: index.path(),
      });
}
export namespace index {
  export type Output = IPropagation<
    {
      200: (IDirectory | IImageFile | ITextFile | IZipFile | IShortcut)[];
    },
    200
  >;

  export const METADATA = {
    method: "GET",
    path: "/arrayRecursiveUnionExplicit",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = () => "/arrayRecursiveUnionExplicit";
  export const random = (): Resolved<
    (IDirectory | IImageFile | ITextFile | IZipFile | IShortcut)[]
  > =>
    typia.random<
      (IDirectory | IImageFile | ITextFile | IZipFile | IShortcut)[]
    >();
  export const simulate = (_connection: IConnection): Output => {
    return {
      success: true,
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      data: random(),
    } as Output;
  };
}

/**
 * @controller ArrayRecursiveUnionExplicitController.at
 * @path GET /arrayRecursiveUnionExplicit/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function at(
  connection: IConnection,
  id: number,
): Promise<at.Output> {
  return true === connection.simulate
    ? at.simulate(connection, id)
    : PlainFetcher.propagate<any>(connection, {
        ...at.METADATA,
        template: at.METADATA.path,
        path: at.path(id),
      });
}
export namespace at {
  export type Output = IPropagation<
    {
      200: IDirectory | IImageFile | ITextFile | IZipFile | IShortcut;
    },
    200
  >;

  export const METADATA = {
    method: "GET",
    path: "/arrayRecursiveUnionExplicit/:id",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = (id: number) =>
    `/arrayRecursiveUnionExplicit/${encodeURIComponent(id?.toString() ?? "null")}`;
  export const random = (): Resolved<
    IDirectory | IImageFile | ITextFile | IZipFile | IShortcut
  > =>
    typia.random<IDirectory | IImageFile | ITextFile | IZipFile | IShortcut>();
  export const simulate = (connection: IConnection, id: number): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(id),
      contentType: "application/json",
    });
    try {
      assert.param("id")(() => typia.assert(id));
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
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
      data: random(),
    } as Output;
  };
}

/**
 * @controller ArrayRecursiveUnionExplicitController.store
 * @path POST /arrayRecursiveUnionExplicit
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function store(
  connection: IConnection,
  body: store.Body,
): Promise<store.Output> {
  return true === connection.simulate
    ? store.simulate(connection, body)
    : PlainFetcher.propagate<any, any>(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...store.METADATA,
          template: store.METADATA.path,
          path: store.path(),
        },
        body,
      );
}
export namespace store {
  export type Body = IDirectory | IImageFile | ITextFile | IZipFile | IShortcut;
  export type Output = IPropagation<
    {
      201: IDirectory | IImageFile | ITextFile | IZipFile | IShortcut;
    },
    201
  >;

  export const METADATA = {
    method: "POST",
    path: "/arrayRecursiveUnionExplicit",
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

  export const path = () => "/arrayRecursiveUnionExplicit";
  export const random = (): Resolved<
    IDirectory | IImageFile | ITextFile | IZipFile | IShortcut
  > =>
    typia.random<IDirectory | IImageFile | ITextFile | IZipFile | IShortcut>();
  export const simulate = (connection: IConnection, body: Body): Output => {
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
      data: random(),
    } as Output;
  };
}
