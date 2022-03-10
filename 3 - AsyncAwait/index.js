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
// With async function, it will auto return a promise

main()

async function main() {
  try {
    console.time('Time:')
    const user = await getUser();
    //resolve all promises
    const result = await Promise.all([
      getCellPhone(user.id),
      getAddressAsync(user.id)
    ]);

    const address = result[1];
    const cellphone = result[0];


    console.log(`
      Name: ${user.name}
      Address: ${address.street}, ${address.number}
      Phone: ${cellphone.number}
    `);
    console.timeEnd('Time:')

  } catch (error) {

    console.log('Bad request', error)

  }

}
