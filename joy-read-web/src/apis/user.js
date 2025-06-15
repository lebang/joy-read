import request from '@utils/request'

export const userLogin = (data) => {
  return request.post('/login', data)
}

export const getUser = ({ id }) => {
  return request.get(`/users/${id}`)
}

export const getUsers = ({ id }) => {
  return request.get(`/users/${id}`)
}

export const createUser = (data) => {
  return request.post(`/users`, data)
}

export const updateUser = (data) => {
  return request.put(`/users/${data.id}`, data)
}

export const deleteUser = (id) => {
  return request.delete(`/users/${id}`)
}