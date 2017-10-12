import authRoutes from '../routes'
/**
 * Just a 'test' test.
 */
test('Auth route is not null', () => {
    const routes = authRoutes;

    expect(routes).not.toBe(null)
});