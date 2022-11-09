const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([1, 2, 3]);
    reject("Something went wrong");
  }, 2000);
});

// registered to be called in case of success (resolve is called in the promise)
doWorkPromise
  .then((result) => {
    console.log("Success!", result);
  })
  //registered to be called in case of failure
  .catch((error) => {
    console.log("Error!", error);
  });
