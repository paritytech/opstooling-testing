"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureCert = exports.startMockServer = void 0;
const fs_1 = require("fs");
const mockttp = __importStar(require("mockttp"));
const path_1 = __importDefault(require("path"));
const selfsigned_1 = __importDefault(require("selfsigned"));
/**
 Instances of mockttp.Mockttp, which are returned by startMockServer
 are expected to reside in the same process as your test code,
 in order to control the mocking behaviour.
 Thus, using it in `globalSetup`/`globalTeardown` won't work.

 `setupAfterEnv` is a good place to have it,
 but `beforeAll`/`afterAll` in every test suite also works

 Pay attention to `testCaPath` parameter, as in order to make Node respect that,
 you'll have to pass it in NODE_EXTRA_CA_CERTS in environment.
 */
async function startMockServer(params) {
    const { keyPath, certPath } = await ensureCert(params.testCaCertPath);
    const defaultParams = { https: { keyPath, certPath } };
    const server = mockttp.getLocal(defaultParams);
    await server.start(params.port);
    await server.on("request", (request) => {
        if (request.matchedRuleId === undefined) {
            console.log(`Unmatched request (${params.name}): ${request.method} ${request.url}`);
            process.exit(1);
        }
        console.log(`Got matching request: (${params.name}): ${request.method} ${request.url}`);
    });
    return server;
}
exports.startMockServer = startMockServer;
async function ensureCert(testCaCertPath) {
    const certPath = testCaCertPath;
    const keyPath = path_1.default.join(path_1.default.dirname(certPath), `${path_1.default.basename(certPath, ".pem")}.key`);
    await fs_1.promises.mkdir(path_1.default.dirname(certPath), { recursive: true });
    try {
        await fs_1.promises.stat(certPath);
    }
    catch (e) {
        if (e instanceof Error && e.code !== "ENOENT") {
            throw e;
        }
        const pems = selfsigned_1.default.generate([], { keySize: 4096 });
        await fs_1.promises.writeFile(keyPath, pems.private);
        await fs_1.promises.writeFile(certPath, pems.cert);
    }
    return { certPath, keyPath };
}
exports.ensureCert = ensureCert;
//# sourceMappingURL=mockServer.js.map