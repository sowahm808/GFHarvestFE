// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBHwdDdJmAQevqL83_JkQtmEynzAsihU04",
    authDomain: "kidsapp-92fb2.firebaseapp.com",
    projectId: "kidsapp-92fb2",
    storageBucket: "kidsapp-92fb2.firebasestorage.app",
    messagingSenderId: "54742577057",
    appId: "1:54742577057:web:cfca5e902ab173a77025e0",
    measurementId: "G-91V8B05X5E"
  },
  // Leave apiUrl empty when no backend service is available. Using an empty
  // string ensures the application falls back to Firebase when the backend
  // API is not running during local development.
  apiUrl: ''
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
