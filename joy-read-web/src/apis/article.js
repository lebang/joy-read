import request from '@utils/request'

export const getUser = ({ id }) => {
  return request.get(`/articles/${id}`)
}

export const getArticles = (params) => {
  return request.get(`/articles/`, { params })
}
