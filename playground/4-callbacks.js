setTimeout(() => {
  console.log("2 sec passed!");
}, 2000);

// we want to create a function that make a request and do someting with the result
// ============= NOT WORKING IN NODE!! ==============
// const geocode = (address, callback) => {
//   // simulate the delay from a real request
//   setTimeout(() => {
//     const data = { latitude: 0, longitude: 0 };
//     return data;
//   }, 2000);
// };
//data will be undefined because value returned of geocode function is 'undefined'.
// let data = geocode("Los Angeles");
// console.log(data);

// ============= THE CORRECT WAY ==============
const geocode = (address, callback) => {
  // simulate the delay from a real request
  setTimeout(() => {
    const data = { latitude: 0, longitude: 0 };

    callback(data);
  }, 2000);
};

// add a callback that takes care of our logic when request is done
geocode("Los Angeles", (data) => {
  console.log(data);
});
