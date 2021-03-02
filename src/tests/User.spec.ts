import request from 'supertest'
import { getConnection } from 'typeorm'
import { app } from '../app'

import createConnetion from '../database'

describe('Users', () => {
  beforeAll(async () => {
    const connection = await createConnetion()
    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()
    await connection.dropDatabase()
    await connection.close()
  })

  it('Should create a new user', async() => {
    const response = await request(app).post('/users').send({
      name: 'Test user',
      email: 'testuser@gmail.com',
      password: 'testUser12345'
    })

    expect(response.status).toBe(201)
  })

  it('Should not to be able to create a user with exists email', async() => {
    const response = await request(app).post('/users').send({
      name: 'Test user',
      email: 'testuser@gmail.com',
      password: 'testUser12345'
    })

    expect(response.status).toBe(400)
  })
})