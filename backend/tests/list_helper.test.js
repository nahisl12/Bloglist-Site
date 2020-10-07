const listHelper = require('../utils/list_helper');


describe('sum', () => {
  test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  test('total likes', () => {
    const bloglikes = [{likes: 5}, {likes: 2}]

    const result = listHelper.totalLikes(bloglikes);
    expect(result).toEqual(7);
  })
  
})
