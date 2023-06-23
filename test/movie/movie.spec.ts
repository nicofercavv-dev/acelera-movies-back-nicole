import { getMovies } from '../../src/controllers/movie/index'
describe('get movies', () => {
  it('should get movies', async () => {
    //Given
    const responseJSON = {
      json: jest.fn()
    }
    const response = {
      status: jest.fn().mockImplementation(() => {
        return responseJSON
      })
    }
    //When
    const moviesResponse = await getMovies({}, response)

    //Then
    expect(response.status).toBeCalledWith(200)
    expect(responseJSON.json).toBeCalledWith({})

  })
})