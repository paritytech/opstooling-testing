import * as mockttp from "mockttp";
export type MockServerParams = {
    port: number;
    name: string;
    testCaCertPath: string;
};
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
export declare function startMockServer(params: MockServerParams): Promise<mockttp.Mockttp>;
