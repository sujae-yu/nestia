import typia from "typia";
import type { Primitive } from "typia";

import api from "../../../../api/bbs";
import type { IBbsArticle } from "../../../../api/structures/IBbsArticle";

export const test_api_bbs_articles_store = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IBbsArticle> =
    await api.functional.bbs.articles.store(
      connection,
      typia.random<string>(),
      typia.random<IBbsArticle.IStore>(),
    );
  typia.assert(output);
};
