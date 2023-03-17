module.exports = {
  plugins: [
    require("postcss-preset-env")({
      stage: 1,
      autoprefixer: {
        grid: true,
      },
    }),
    require("cssnano")(),
    require("autoprefixer"),
  ],
};
