const handlers = require('../lib/handlers');

test('home page renders', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.home(req, res);
  // 0번째 요소는 호출을 담고 있고 1번째 요소는 인자를 담고 있다.
  expect(res.render.mock.calls[0][0]).toBe('homeWithLink');
});

test('about page renders with fortune', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.about(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('about');
  expect(res.render.mock.calls[0][1]).toEqual(
    expect.objectContaining({
      fortune: expect.stringMatching(/\W/),
    })
  );
});

test('404 handler renders', () => {
  const req = {};
  const res = { render: jest.fn() };
  handlers.notFound(req, res);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('404');
});

test('500 handler renders', () => {
  const err = new Error('some error');
  const req = {};
  const res = { render: jest.fn() };
  const next = jest.fn();
  handlers.serverError(err, req, res, next);
  expect(res.render.mock.calls.length).toBe(1);
  expect(res.render.mock.calls[0][0]).toBe('500');
});
