import Promise from 'bluebird'

/// //////////////////////////////////

const routes = [
  /^\/$/,
  /settings$/,
  /user\/\w+/,
  /login$/,
  /signup$/,
  /post\/\w+/
]

export const noMatch = (route) => {
  let m = true
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].test(route)) m = false
  }
  return m
}
