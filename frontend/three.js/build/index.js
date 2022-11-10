/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ 'use strict';
  /******/ var __webpack_modules__ = {
    /***/ './src/index.js':
      /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");\n\n// 무언갈 보이기 위해서는 scene, camera, renderer가 필요하다.\n// camera를 통해 scene을 render한다.\nconst scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();\n/*\nFOV: 화면에 보이는 scene의 정도, degree\naspect ratio,\nnear보다 가깝고 far보다 먼 것은 보이지 않음. 좋은 성능을 위해 조절해야될수도. \n*/\nconst camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);\n// WebGL 없는 브라우저를 위한 다른 렌더러도 있음.\nconst renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer();\n// 세번째 인자가 false인 채로 반반 크기로 렌더링하면 해상도가 줄음.\n// 문서에서는 half resolution인데 quater 아닌가? 0.5 * 0.5 = 0.25..\nrenderer.setSize(window.innerWidth, window.innerHeight);\ndocument.body.appendChild(renderer.domElement);\n\n// 정육면체의 모든 점(vertices)들과 fill(면?)(faces)를 가짐\nconst geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(1, 1, 1);\n// 칠하기 위함.\nconst material = new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({ color: 0x00ff00 });\n// geometry를 받아 material을 적용, scene에 삽입하여 움직일 수 있는 객체\nconst cube = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, material);\nscene.add(cube);\n// 없으면 cube안에 들어가는 듯\ncamera.position.z = 5;\n\n// render or animate loop로 불림\n// 화면이 refresh될 때마다 렌더러에게 그리라고 시키는 루프 (초당 60회 느낌)\nfunction animate() {\n  // setInterval도 있지만 다른 탭으로 갔을 때 일시정지하는 등 이점이 많음.\n  requestAnimationFrame(animate);\n  cube.rotation.x += 0.01;\n  cube.rotation.y += 0.01;\n  renderer.render(scene, camera);\n}\nanimate();\n\n\n//# sourceURL=webpack://three/./src/index.js?'
        );

        /***/
      },

    /***/ './node_modules/three/build/three.module.js':
      /*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
      /***/ (__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
        eval(
        );

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module can't be inlined because the eval devtool is used.
  /******/ var __webpack_exports__ = __webpack_require__('./src/index.js');
  /******/
  /******/
})();