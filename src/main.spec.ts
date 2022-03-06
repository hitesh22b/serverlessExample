import { bootstrap } from './main';
jest.mock('./app', () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      init: jest.fn().mockResolvedValue(undefined),
      listen: jest.fn().mockResolvedValue(undefined),
      get: jest.fn(() => ({ log: jest.fn() })),
    }),
  ),
}));

describe('Bootstrap', () => {
  it('should bootstrap the application', async () => {
    expect(await bootstrap()).toBeUndefined();
  });
});
