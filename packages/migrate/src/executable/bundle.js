const { version } = require("../../../../package.json");
const cp = require("child_process");
const fs = require("fs");

const ROOT = `${__dirname}/../..`;
const ASSETS = `${ROOT}/assets`;

const update = (content) => {
  const parsed = JSON.parse(content);
  for (const record of [
    parsed.dependencies ?? {},
    parsed.devDependencies ?? {},
  ])
    for (const key of Object.keys(record))
      if (
        key === "@nestia/core" ||
        key === "@nestia/fetcher" ||
        key === "@nestia/sdk"
      )
        record[key] = `^${version}`;
  return JSON.stringify(parsed, null, 2);
};

const bundle = async ({ mode, repository, exceptions, transform }) => {
  const root = `${__dirname}/../..`;
  const assets = `${root}/assets`;
  const template = `${assets}/${mode}`;

  const clone = async () => {
    // CLONE REPOSITORY
    if (fs.existsSync(template))
      await fs.promises.rm(template, { recursive: true });
    else
      try {
        await fs.promises.mkdir(ASSETS);
      } catch {}

    cp.execSync(`git clone https://github.com/samchon/${repository} ${mode}`, {
      cwd: ASSETS,
    });

    // REMOVE VUNLERABLE FILES
    for (const location of exceptions ?? [])
      await fs.promises.rm(`${template}/${location}`, { recursive: true });
  };

  const iterate = (collection) => async (location) => {
    const directory = await fs.promises.readdir(location);
    for (const file of directory) {
      const absolute = location + "/" + file;
      const stats = await fs.promises.stat(absolute);
      if (stats.isDirectory()) await iterate(collection)(absolute);
      else {
        const content = await fs.promises.readFile(absolute, "utf-8");
        collection.push({
          location: (() => {
            const str = location.replace(template, "");
            return str[0] === "/" ? str.substring(1) : str;
          })(),
          file,
          content,
        });
      }
    }
  };

  const archive = async (collection) => {
    const name = `${mode.toUpperCase()}_TEMPLATE`;
    const body = JSON.stringify(collection, null, 2);
    const content = `export const ${name} = ${body}`;

    try {
      await fs.promises.mkdir(`${ROOT}/src/bundles`);
    } catch {}
    await fs.promises.writeFile(
      `${ROOT}/src/bundles/${name}.ts`,
      content,
      "utf8",
    );
  };

  const collection = [];
  await clone();
  await iterate(collection)(template);
  if (transform) for (const it of collection) transform(it);
  await archive(collection);
};

const main = async () => {
  await bundle({
    mode: "nest",
    repository: "nestia-start",
    exceptions: [
      ".git",
      ".github/dependabot.yml",
      "src/api/functional",
      "src/controllers",
      "src/MyModule.ts",
      "src/providers",
      "test/features",
    ],
    transform: (it) => {
      if (it.file === "package.json") it.content = update(it.content);
    },
  });
  await bundle({
    mode: "sdk",
    repository: "nestia-sdk-template",
    exceptions: [
      ".git",
      ".github/dependabot.yml",
      ".github/workflows/build.yml",
      "src/functional",
      "src/structures",
      "test/features",
    ],
    transform: (it) => {
      if (it.file === "package.json") it.content = update(it.content);
    },
  });
};
main().catch((exp) => {
  console.error(exp);
  process.exit(-1);
});