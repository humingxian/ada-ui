test('test common matcher', () => {
  expect(2 + 2).toBe(4)
  expect(2 + 2).not.toBe(5)
})

test('test to be true or false', () => {
  expect(1).toBeTruthy()
  expect(0).toBeFalsy()
})

test('test number', () => {
  // 4 是否大于 3
  expect(4).toBeGreaterThan(3)
  // 3 是否小于 5
  expect(3).toBeLessThan(5)
})

test('test object', () => {
  expect({ name: 'hudada' }).toEqual({ name: 'hudada' })
})
