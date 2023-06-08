/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-js

const { configure } = require("quasar/wrappers");

module.exports = configure(function (/* ctx */) {
  return {
    // https://v2.quasar.dev/quasar-cli/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli/boot-files
    boot: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
    css: ["app.scss", "fonts.scss", "controls.scss", "spaces.scss", "colors.scss"],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v5',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      "roboto-font", // optional, you are not bound to it
      "material-icons", // optional, you are not bound to it
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
    build: {
      target: {
        browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
        node: "node16",
      },

      vueRouterMode: "history", // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      publicPath: "/",
      // analyze: true,
      env: {
        GRAPHQL_URI: "https://app.stud.druid.1t.ru/graphql",
        FILE_STORAGE_URI: "https://cdn.stud.druid.1t.ru/",
        RABBIT_URI: "wss://stud.druid.1t.ru/ws",

        EMAILJS_SERVICE_ID: "service_1wdj4t5",
        EMAILJS_TEMPLATE_ID: "template_vlarxg7",
        EMAILJS_TEMPLATE_WRITE_ID: "template_tf5j6md",
        EMAILJS_PUBLIC_KEY: "8VISXizKwxu9ZO_pL",

        MAIN_SPACE_ID: 42,

        MY_ORDERS_PAGE_ID: "4575094536376949576",
        PROJECTS_PAGE_ID: "2175982620077905167",
        MY_PROJECTS_PAGE_ID: "5811147062794236464",
        TEAMS_PAGE_ID: "4854717215393261588",
        ALL_TEAMS_PAGE_ID: "5191226628121289747",
        MY_TEAMS_PAGE_ID: "5297017851980857027",

        USERS_GROUP_ID: "2954744714133191151", // Группа разработчиков
        MODERATORS_GROUP_ID: "3460605780830741669",

        APPLICATION_STATUS_PROPERTY: "5892464470060638614",

        APPLICATION_STATUS_PENDING: "1672342866228253681",
        APPLICATION_STATUS_REJECTED: "7969392693338571273",
        APPLICATION_STATUS_APPROVED: "6989336487856023800",

        APPLICATION_TEAM_PROPERTY: "3278596465340119929",
        APPLICATION_SUBJECT_PROPERTY: "8095962102739461791",

        SUBJECT_TEAMS_PROPERTY_ID: "4567125113940260904",

        COMPETENCE_TYPE_ID: "1021001357304361750",
        SPECIALITY_TYPE_ID: "1054792999490113487",
        USER_STATUS_TYPE_ID: "1676382032638755233",
        SUBJECT_TYPE_ID: "6410837257365292951",
        TEAM_TYPE_ID: "5546930648465563539",
        TASK_TYPE_ID: "3",
        PROJECT_TYPE_ID: "2961807509853802219",
        FILE_TYPE_ID: "5",
        COMMENT_TYPE_ID: "6",
        USERS_GROUP_ID: "1319554634306561363",

        ORDER_TYPE_ID: "1132620023122244600",
        ORDER_FUNCTION_ID: "3660714586775429906",

        DEFAULT_SPECIALITY_ID: "3291532951454342514",

        ORDER_STATUS_0: "2278807492518214753", // Черновик
        ORDER_STATUS_1: "2333596183465108469", // Поиск исполнителя
        ORDER_STATUS_2: "7605524763267860641", // Есть кандидат
        ORDER_STATUS_3: "2037259879891059051", // Заключается сделка
        ORDER_STATUS_4: "8208293674764812284", // Выполняется
        ORDER_STATUS_5: "1192678431246620481", // Завершен
        ORDER_STATUS_6: "9162628079365380487", // Оспаривается
        ORDER_STATUS_7: "5520670310916063859", // Отменен заказчиком
        ORDER_STATUS_8: "4449177655428781531", // Отменен исполнителем

        PROPERTY_STATUS_ID: "6803516740521580313",
      },
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {},
      // viteVuePluginOptions: {},

      // vitePlugins: [
      //   [ 'package-name', { ..options.. } ]
      // ]
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
    devServer: {
      // https: true,
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
    framework: {
      lang: "ru",
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ["Notify", "Dialog", "Cookies"],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   registerServiceWorker: 'src-pwa/register-service-worker',
    //   serviceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    // },

    // https://v2.quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      // ssrPwaHtmlFilename: 'offline.html', // do NOT use index.html as name!
      // will mess up SSR

      // extendSSRWebserverConf (esbuildConf) {},
      // extendPackageJson (json) {},

      pwa: false,

      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        "render", // keep this as last one
      ],
    },

    // https://v2.quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: "generateSW", // or 'injectManifest'
      injectPwaMetaTags: true,
      swFilename: "sw.js",
      manifestFilename: "manifest.json",
      useCredentialsForManifestTag: false,
      // useFilenameHashes: true,
      // extendGenerateSWOptions (cfg) {}
      // extendInjectManifestOptions (cfg) {},
      // extendManifestJson (json) {}
      // extendPWACustomSWConf (esbuildConf) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf)
      // extendElectronPreloadConf (esbuildConf)

      inspectPort: 5858,

      bundler: "packager", // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: "marketplace",
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      contentScripts: ["my-content-script"],

      // extendBexScriptsConf (esbuildConf) {}
      // extendBexManifestJson (json) {}
    },
  };
});
