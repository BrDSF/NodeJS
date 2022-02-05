const util = require('util');

const getAddressAsync = util.promisify(getAddress); //tranform getAdress that use callback to promisse

function getUser(callback) {
  // when an error occur -> reject(ERROR)
  // when success -> resolve
  return new Promise(function resolvePromise(resolve, reject) {
    // await 1 second, and when execute resturn, the state change to fullfiled
    //uncomment below to return a error. 
    //return reject(new Error('Bad, sorry!'));
    setTimeout(() => {
      return resolve({
        id: 1,
        name: "Brayan",
        birthday: new Date()
      });
    }, 1000);
  });
}


function getCellPhone(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve({
        number: '123'
      }, 2000);
    })

  });


}
function getAddress(id, callback) {
  setTimeout(() => {
    return callback(null, {
      street: 'test',
      number: 5
    }, 3000);
  })

}
//to manipulate the object .then()
//to manipulate errors .catch()
const userPromisse = getUser();

userPromisse
  .then((user) => {
    return getCellPhone(user.id).then((cellPhone) => {
      return {
        user: {
          name: user.name,
          id: user.id
        },
        cellphone: cellPhone
      }
    }).catch();
  })
  .then((result) => {//this then get the last promise that was manipulate ->  getCellPhone() was resulved, so, result will have his return
    const address = getAddressAsync(result.user.id);
    return address
      .then((address) => {
        return {
          user: result.user,
          phone: result.cellphone,
          address: address
        }

      });

  })
  .then((result) => {
    console.log(`
      Name: ${result.user.name}
      Address: ${result.address.street}, ${result.address.number}
      Phone: ${result.phone.number}
    `);
  })
  .catch((error) => {
    console.log("Something goes wrong", error);
  });



