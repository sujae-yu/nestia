/**
 * @packageDocumentation
 * @module api.functional.query
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Primitive, Resolved } from "typia";
import typia from "typia";

import type { IBigQuery } from "../../structures/IBigQuery";
import type { INestQuery } from "../../structures/INestQuery";
import type { IQuery } from "../../structures/IQuery";

/**
 * @controller QueryController.typed
 * @path GET /query/typed
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function typed(
  connection: IConnection,
  query: typed.Query,
): Promise<typed.Output> {
  return PlainFetcher.fetch(connection, {
    ...typed.METADATA,
    template: typed.METADATA.path,
    path: typed.path(query),
  });
}
export namespace typed {
  export type Query = Resolved<IQuery>;
  export type Output = Primitive<IQuery>;

  export const METADATA = {
    method: "GET",
    path: "/query/typed",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = (query: Query) => {
    const variables: URLSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query as any))
      if (undefined === value) continue;
      else if (Array.isArray(value))
        value.forEach((elem: any) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    const location: string = "/query/typed";
    return 0 === variables.size
      ? location
      : `${location}?${variables.toString()}`;
  };
}

/**
 * @controller QueryController.nest
 * @path GET /query/nest
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function nest(
  connection: IConnection,
  query: nest.Query,
): Promise<nest.Output> {
  return PlainFetcher.fetch(connection, {
    ...nest.METADATA,
    template: nest.METADATA.path,
    path: nest.path(query),
  });
}
export namespace nest {
  export type Query = Resolved<INestQuery>;
  export type Output = Primitive<IQuery>;

  export const METADATA = {
    method: "GET",
    path: "/query/nest",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = (query: Query) => {
    const variables: URLSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(query as any))
      if (undefined === value) continue;
      else if (Array.isArray(value))
        value.forEach((elem: any) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    const location: string = "/query/nest";
    return 0 === variables.size
      ? location
      : `${location}?${variables.toString()}`;
  };
}

/**
 * @controller QueryController.individual
 * @path GET /query/individual
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function individual(
  connection: IConnection,
  id: string,
): Promise<individual.Output> {
  return PlainFetcher.fetch(connection, {
    ...individual.METADATA,
    template: individual.METADATA.path,
    path: individual.path(id),
  });
}
export namespace individual {
  export type Output = Primitive<string>;

  export const METADATA = {
    method: "GET",
    path: "/query/individual",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = (id: string) => {
    const variables: URLSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries({
      id: id,
    } as any))
      if (undefined === value) continue;
      else if (Array.isArray(value))
        value.forEach((elem: any) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    const location: string = "/query/individual";
    return 0 === variables.size
      ? location
      : `${location}?${variables.toString()}`;
  };
}

/**
 * @controller QueryController.composite
 * @path GET /query/composite
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function composite(
  connection: IConnection,
  atomic: string,
  query: composite.Query,
): Promise<composite.Output> {
  return PlainFetcher.fetch(connection, {
    ...composite.METADATA,
    template: composite.METADATA.path,
    path: composite.path(atomic, query),
  });
}
export namespace composite {
  export type Query = Resolved<Omit<IQuery, "atomic">>;
  export type Output = Primitive<IQuery>;

  export const METADATA = {
    method: "GET",
    path: "/query/composite",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = (atomic: string, query: Query) => {
    const variables: URLSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries({
      ...query,
      atomic: atomic,
    } as any))
      if (undefined === value) continue;
      else if (Array.isArray(value))
        value.forEach((elem: any) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    const location: string = "/query/composite";
    return 0 === variables.size
      ? location
      : `${location}?${variables.toString()}`;
  };
}

/**
 * @controller QueryController.body
 * @path POST /query/body
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function body(
  connection: IConnection,
  query: body.Body,
): Promise<body.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
    {
      ...body.METADATA,
      template: body.METADATA.path,
      path: body.path(),
    },
    query,
  );
}
export namespace body {
  export type Body = Resolved<IQuery>;
  export type Output = Resolved<IQuery>;

  export const METADATA = {
    method: "POST",
    path: "/query/body",
    request: {
      type: "application/x-www-form-urlencoded",
      encrypted: false,
    },
    response: {
      type: "application/x-www-form-urlencoded",
      encrypted: false,
    },
    status: 201,
    parseQuery: typia.http.createAssertQuery<IQuery>(),
  } as const;

  export const path = () => "/query/body";
}

/**
 * @controller QueryController.big
 * @path POST /query/big
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function big(
  connection: IConnection,
  input: big.Body,
): Promise<big.Output> {
  return PlainFetcher.fetch(
    {
      ...connection,
      headers: {
        ...connection.headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
    {
      ...big.METADATA,
      template: big.METADATA.path,
      path: big.path(),
    },
    input,
  );
}
export namespace big {
  export type Body = Resolved<IBigQuery>;
  export type Output = Resolved<IBigQuery>;

  export const METADATA = {
    method: "POST",
    path: "/query/big",
    request: {
      type: "application/x-www-form-urlencoded",
      encrypted: false,
    },
    response: {
      type: "application/x-www-form-urlencoded",
      encrypted: false,
    },
    status: 201,
    parseQuery: typia.http.createAssertQuery<IBigQuery>(),
  } as const;

  export const path = () => "/query/big";
}
