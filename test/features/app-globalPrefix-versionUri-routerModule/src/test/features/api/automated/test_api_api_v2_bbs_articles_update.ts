import type { Primitive, tags } from "typia";
import typia from "typia";

import api from "../../../../api";
import type { IBbsArticle } from "../../../../api/structures/IBbsArticle";

export const test_api_api_v2_bbs_articles_update = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IBbsArticle> =
    await api.functional.api.v2.bbs.articles.update(
      connection,
      typia.random<string>(),
      typia.random<string & tags.Format<"uuid">>(),
      typia.random<IBbsArticle.IStore>(),
    );
  typia.assert(output);
};
