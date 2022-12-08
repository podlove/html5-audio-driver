import path from "path";
import { defineConfig } from "vite";

const entries = [
  "index",
  "actions",
  "audio",
  "video",
  "events",
  "props",
  "utils",
  "hls",
  "filters",
  "media",
  "connect",
];

export default defineConfig({
  build: {
    lib: {
      formats: ["es"],
      entry: entries.reduce(
        (result, entry) => ({
          ...result,
          [entry]: path.resolve(__dirname, "src", `${entry}.js`),
        }),
        {}
      ),
    },
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: `[name].[hash].js`,
      },
    },
  },
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  }
});

// export const developmentConfig = {
//   build: {
//     lib: {
//       formats: ["es"],
//       entry: {
//         "audio-connect": path.resolve(__dirname, "example", "audio-connect.js"),
//         "audio-hls": path.resolve(__dirname, "example", "audio-hls.js"),
//         audio: path.resolve(__dirname, "example", "audio.js"),
//         "live-hls": path.resolve(__dirname, "example", "live-hls.js"),
//         "live": path.resolve(__dirname, "example", "live.js"),
//         "video-hls": path.resolve(__dirname, "example", "video-hls.js"),
//         "video": path.resolve(__dirname, "example", "video.js"),
//       }
//     }
//   },
//   resolve,
// };

// export default defineConfig(({ command }) => {
//   if (command === "serve") {
//     return developmentConfig;
//   } else {
//     // command === 'build'
//     return productionConfig;
//   }
// });
