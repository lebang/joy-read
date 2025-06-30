import request from '@utils/request'

export const getCourse = ({ id }) => {
  return request.get(`/courses/${id}`)
}

export const getCourses = (params) => {
  return request.get(`/courses/`, { params })
}

export const createCourse = (data) => {
  return request.post(`/courses`, data)
}

export const updateCourse = (data) => {
  return request.put(`/courses/${data.id}`, data)
}

export const deleteCourse = (id) => {
  return request.delete(`/courses/${id}`)
}
