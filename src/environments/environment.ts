// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyByhuGWfhW3o4eTzChAs2pbf7Tg42yFdx4',
    authDomain: 'mybooks-220323.firebaseapp.com',
    databaseURL: 'https://mybooks-220323.firebaseio.com',
    projectId: 'mybooks-220323',
    storageBucket: 'mybooks-220323.appspot.com',
    messagingSenderId: '320950540389'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
