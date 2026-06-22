// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apirest local
  // apiUrl: "http://127.0.0.1:8000/api",
  // apiUrlMedia: "http://127.0.0.1:8000/storage/app/",
  //remoto
  apiUrl: "https://miembrosapp.svcbmf.com/backend-api/public/api",
  apiUrlMedia: "https://miembrosapp.svcbmf.com/backend-api/storage/app/",
  clientId: 'AQhKPBY5mgg0JustLJCcf6ncmd9RghCiNhXT_b6rNUakyQtnEn8MzCn_dkHAyt5n7_P0Omo5M05to5j0'//malcolm sandbox

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
