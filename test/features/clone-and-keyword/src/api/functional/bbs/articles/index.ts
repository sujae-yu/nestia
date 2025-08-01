/**
 * @packageDocumentation
 * @module api.functional.bbs.articles
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
//================================================================
import type { IConnection } from "@nestia/fetcher";
import { NestiaSimulator } from "@nestia/fetcher/lib/NestiaSimulator";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import type { Resolved } from "typia";
import typia from "typia";
import type { Format } from "typia/lib/tags/Format";

import type { IBbsArticle } from "../../../structures/IBbsArticle";
import type { IPage } from "../../../structures/IPage";
import type { IPageIBbsArticle } from "../../../structures/IPageIBbsArticle";

/**
 * List up summarized articles.
 *
 * @param props.section Target section
 * @param props.query Pagination query
 * @returns Paginated articles with summarization
 *
 * @controller BbsArticlesController.index
 * @path GET /bbs/articles/:section
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function index(
  connection: IConnection,
  props: index.Props,
): Promise<index.Output> {
  return true === connection.simulate
    ? index.simulate(connection, props)
    : PlainFetcher.fetch(connection, {
        ...index.METADATA,
        template: index.METADATA.path,
        path: index.path(props),
      });
}
export namespace index {
  export type Props = {
    /**
     * Target section
     */
    section: string;

    /**
     * Pagination query
     */
    query: Query;
  };
  export type Query = IPage.IRequest;
  export type Output = IPageIBbsArticle.ISummary;

  export const METADATA = {
    method: "GET",
    path: "/bbs/articles/:section",
    request: null,
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = (props: Props) => {
    const variables: URLSearchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(props.query as any))
      if (undefined === value) continue;
      else if (Array.isArray(value))
        value.forEach((elem: any) => variables.append(key, String(elem)));
      else variables.set(key, String(value));
    const location: string = `/bbs/articles/${encodeURIComponent(props.section?.toString() ?? "null")}`;
    return 0 === variables.size
      ? location
      : `${location}?${variables.toString()}`;
  };
  export const random = (): Resolved<IPageIBbsArticle.ISummary> =>
    typia.random<IPageIBbsArticle.ISummary>();
  export const simulate = (connection: IConnection, props: Props): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(props),
      contentType: "application/json",
    });
    assert.param("section")(() => typia.assert(props.section));
    assert.query(() => typia.assert(props.query));
    return random();
  };
}

/**
 * Store a new article.
 *
 * @param props.section Section code
 * @param props.input Content to store
 * @returns Newly archived article
 *
 * @controller BbsArticlesController.store
 * @path POST /bbs/articles/:section
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function store(
  connection: IConnection,
  props: store.Props,
): Promise<store.Output> {
  return true === connection.simulate
    ? store.simulate(connection, props)
    : PlainFetcher.fetch(
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
          path: store.path(props),
        },
        props.input,
      );
}
export namespace store {
  export type Props = {
    /**
     * Section code
     */
    section: string;

    /**
     * Content to store
     */
    input: Body;
  };
  export type Body = IBbsArticle.IStore;
  export type Output = IBbsArticle;

  export const METADATA = {
    method: "POST",
    path: "/bbs/articles/:section",
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

  export const path = (props: Omit<Props, "input">) =>
    `/bbs/articles/${encodeURIComponent(props.section?.toString() ?? "null")}`;
  export const random = (): Resolved<IBbsArticle> =>
    typia.random<IBbsArticle>();
  export const simulate = (connection: IConnection, props: Props): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(props),
      contentType: "application/json",
    });
    assert.param("section")(() => typia.assert(props.section));
    assert.body(() => typia.assert(props.input));
    return random();
  };
}

/**
 * Update an article.
 *
 * @param props.section Section code
 * @param props.id Target article ID
 * @param props.input Content to update
 * @returns Updated content
 *
 * @controller BbsArticlesController.update
 * @path PUT /bbs/articles/:section/:id
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function update(
  connection: IConnection,
  props: update.Props,
): Promise<update.Output> {
  return true === connection.simulate
    ? update.simulate(connection, props)
    : PlainFetcher.fetch(
        {
          ...connection,
          headers: {
            ...connection.headers,
            "Content-Type": "application/json",
          },
        },
        {
          ...update.METADATA,
          template: update.METADATA.path,
          path: update.path(props),
        },
        props.input,
      );
}
export namespace update {
  export type Props = {
    /**
     * Section code
     */
    section: string;

    /**
     * Target article ID
     */
    id: string & Format<"uuid">;

    /**
     * Content to update
     */
    input: Body;
  };
  export type Body = IBbsArticle.IStore;
  export type Output = IBbsArticle;

  export const METADATA = {
    method: "PUT",
    path: "/bbs/articles/:section/:id",
    request: {
      type: "application/json",
      encrypted: false,
    },
    response: {
      type: "application/json",
      encrypted: false,
    },
    status: 200,
  } as const;

  export const path = (props: Omit<Props, "input">) =>
    `/bbs/articles/${encodeURIComponent(props.section?.toString() ?? "null")}/${encodeURIComponent(props.id?.toString() ?? "null")}`;
  export const random = (): Resolved<IBbsArticle> =>
    typia.random<IBbsArticle>();
  export const simulate = (connection: IConnection, props: Props): Output => {
    const assert = NestiaSimulator.assert({
      method: METADATA.method,
      host: connection.host,
      path: path(props),
      contentType: "application/json",
    });
    assert.param("section")(() => typia.assert(props.section));
    assert.param("id")(() => typia.assert(props.id));
    assert.body(() => typia.assert(props.input));
    return random();
  };
}
