import { Controller } from "@nestjs/common";

import core from "@nestia/core";

import { Collection } from "../../../../structures/pure/Collection";
import { ObjectHierarchical } from "../../../../structures/pure/ObjectHierarchical";
import { createNestExpressStringifyProgram } from "../createNestExpressStringifyProgram";

createNestExpressStringifyProgram(false)(37_011)((input: Collection<ObjectHierarchical>) => {
    @Controller()
    class NestiaController {
        @core.TypedRoute.Get("stringify")
        public stringify(): Collection<ObjectHierarchical> {
            return input;
        }
    }
    return NestiaController;
});