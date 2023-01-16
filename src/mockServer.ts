import { promises as fs } from "fs";
import * as mockttp from "mockttp";
import path from "path";
import selfsigned from "selfsigned";

/*
Instances of mockttp.Mockttp, which are returned by startMockServer
are expected to reside in the same process as your test code,
in order to control the mocking behaviour.
Thus, using it in `globalSetup`/`globalTeardown` won't work.

`setupAfterEnv` is a good place to have it,
but `beforeAll`/`afterAll` in every test suite also works

Pay attention to `testCaPath` parameter, as in order to make Node respect that,
you'll have to pass it in NODE_EXTRA_CA_CERTS in environment.
*/

export type MockServerParams = {
  port: number;
  name: string;
  testCaCertPath: string; // Something like "testdir/test-ca.pem", a .key file will be also created nearby
};

export async function startMockServer(params: MockServerParams): Promise<mockttp.Mockttp> {
  const certPath = params.testCaCertPath;
  const keyPath = path.join(path.dirname(certPath), `${path.basename(certPath, ".pem")}.key`);

  await ensureCert(certPath, keyPath);

  const defaultParams = { https: { keyPath, certPath } };

  const server = mockttp.getLocal(defaultParams);
  await server.start(params.port);

  await server.on("request", (request: mockttp.Request) => {
    if (request.matchedRuleId === undefined) {
      console.log(`Unmatched request (${params.name}): ${request.method} ${request.url}`);
      process.exit(1);
    }
    console.log(`Got matching request: (${params.name}): ${request.method} ${request.url}`);
  });

  return server;
}

async function ensureCert(certPath: string, keyPath: string): Promise<void> {
  try {
    await fs.stat(certPath);
  } catch (e) {
    if (e instanceof Error && e.code !== "ENOENT") {
      throw e;
    }

    const pems = selfsigned.generate([], { keySize: 4096 });
    await fs.writeFile(keyPath, pems.private);
    await fs.writeFile(certPath, pems.cert);
  }
}
