const production = {
  appName: 'Comics', // Nombre de la aplicación html - title
  appBaseDir: '/', // Directorio de despliegue de la aplicación
  rootUrl: '../../../', // Url del servidor del api
  baseUrl: '../../../', //Url del apí por default
}

const development = {
  ...production, // spread,
  rootUrl: `http://localhost:3000/`,
  baseUrl: `http://localhost:3000/comics/`
}

export default {
  development,
  production
}
