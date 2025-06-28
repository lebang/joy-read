import request from '@utils/request'

export const getArticle = ({ id }) => {
  return request.get(`/articles/${id}`)
}

export const getArticles = (params) => {
  return request.get(`/articles/`, { params })
}

export const createArticle = (data) => {
  return request.post(`/articles`, data)
}

export const updateArticle = (data) => {
  return request.put(`/articles/${data.id}`, data)
}

export const deleteArticle = (id) => {
  return request.delete(`/articles/${id}`)
}
