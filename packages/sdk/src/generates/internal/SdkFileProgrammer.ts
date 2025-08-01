import fs from "fs";
import ts from "typescript";

import { INestiaProject } from "../../structures/INestiaProject";
import { ITypedApplication } from "../../structures/ITypedApplication";
import { ITypedHttpRoute } from "../../structures/ITypedHttpRoute";
import { ITypedWebSocketRoute } from "../../structures/ITypedWebSocketRoute";
import { MapUtil } from "../../utils/MapUtil";
import { FilePrinter } from "./FilePrinter";
import { ImportDictionary } from "./ImportDictionary";
import { SdkHttpRouteProgrammer } from "./SdkHttpRouteProgrammer";
import { SdkRouteDirectory } from "./SdkRouteDirectory";
import { SdkWebSocketRouteProgrammer } from "./SdkWebSocketRouteProgrammer";

export namespace SdkFileProgrammer {
  /* ---------------------------------------------------------
        CONSTRUCTOR
    --------------------------------------------------------- */
  export const generate = async (app: ITypedApplication): Promise<void> => {
    // CONSTRUCT FOLDER TREE
    const root: SdkRouteDirectory = new SdkRouteDirectory(null, "functional");
    for (const route of app.routes) emplace(root)(route);

    // ITERATE FILES
    await iterate(app.project)(root)(`${app.project.config.output}/functional`);
  };

  const emplace =
    (directory: SdkRouteDirectory) =>
    (route: ITypedHttpRoute | ITypedWebSocketRoute): void => {
      // OPEN DIRECTORIES
      for (const key of route.accessor.slice(0, -1)) {
        directory = MapUtil.take(
          directory.children,
          key,
          () => new SdkRouteDirectory(directory, key),
        );
      }

      // ADD ROUTE
      directory.routes.push(route);
    };

  /* ---------------------------------------------------------
        FILE ITERATOR
    --------------------------------------------------------- */
  const iterate =
    (project: INestiaProject) =>
    (directory: SdkRouteDirectory) =>
    async (outDir: string): Promise<void> => {
      // CREATE A NEW DIRECTORY
      try {
        await fs.promises.mkdir(outDir);
      } catch {}

      // ITERATE CHILDREN
      const statements: ts.Statement[] = [];
      for (const [key, value] of directory.children) {
        await iterate(project)(value)(`${outDir}/${key}`);
        statements.push(
          ts.factory.createExportDeclaration(
            undefined,
            false,
            ts.factory.createNamespaceExport(ts.factory.createIdentifier(key)),
            ts.factory.createStringLiteral(`./${key}`),
            undefined,
          ),
        );
      }
      if (statements.length && directory.routes.length)
        statements.push(FilePrinter.enter());

      // ITERATE ROUTES
      const importer: ImportDictionary = new ImportDictionary(
        `${outDir}/index.ts`,
      );
      directory.routes.forEach((route, i) => {
        if (!(project.config.clone === true && route.protocol === "http"))
          importer.declarations(route.imports);
        statements.push(
          ...(route.protocol === "http"
            ? SdkHttpRouteProgrammer.write(project)(importer)(route)
            : SdkWebSocketRouteProgrammer.write(project)(importer)(route)),
        );
        if (i !== directory.routes.length - 1)
          statements.push(FilePrinter.enter());
      });

      // FINALIZE THE CONTENT
      if (directory.routes.length !== 0)
        statements.push(
          ...importer.toStatements(outDir),
          ...(!importer.empty() && statements.length
            ? [FilePrinter.enter()]
            : []),
          ...statements.splice(0, statements.length),
        );
      await FilePrinter.write({
        location: importer.file,
        statements,
        top:
          "/**\n" +
          " * @packageDocumentation\n" +
          ` * @module ${directory.module}\n` +
          " * @nestia Generated by Nestia - https://github.com/samchon/nestia \n" +
          " */\n" +
          "//================================================================\n",
      });
    };
}
