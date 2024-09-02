import type { Primitive } from "@nestia/fetcher";
import typia from "typia";
import type { Format } from "typia/lib/tags/Format";

import api from "../../../../api/bbs";
import type { IBbsComment } from "../../../../api/structures/IBbsComment";

export const test_api_bbs_articles_comments_store = async (
  connection: api.IConnection,
) => {
  const output: Primitive<IBbsComment> =
    await api.functional.bbs.articles.comments.store(
      connection,
      typia.random<string>(),
      typia.random<string & Format<"uuid">>(),
      typia.random<IBbsComment.IStore>(),
    );
  typia.assert(output);
};