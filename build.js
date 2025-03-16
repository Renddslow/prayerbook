import { build } from "esbuild";

void build({
  entryPoints: ["components/index.ts"],
  bundle: true,
  minify: true,
  target: ["es2020"],
  splitting: true,
  format: "esm",
  outdir: "dist",
});
