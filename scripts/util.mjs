// Retrieve data from local storage
// export function getLocalStorage(key) {
//     const data = localStorage.getItem(key);
//     return data ? JSON.parse(data) : null;
//   }
  
//   // Save data to local storage
//   export function setLocalStorage(key, data) {
//     localStorage.setItem(key, JSON.stringify(data));
//   }
  

  // retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}