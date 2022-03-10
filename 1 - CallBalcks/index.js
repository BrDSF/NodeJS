//find user
//find cellphone using user id 
//find adress using user id

function getUser(callback) {
  //set a timer, simulating a db
  setTimeout(() => {
    //return the function after 1000 ms 
    return callback(null,{
      id: 1,
      name: "Brayan",
      birthday: new Date()
    });
  }, 1000);
}


function getCellPhone(id, callback){
  setTimeout(()=>{
    return callback(null, { 
      number: '123'
    },2000);
  })

}
function getAddress(id, callback){
  setTimeout(()=>{
    return callback(null, { 
      street: 'test',
      number: 5
    },3000);
  })

}

function resolveUser(erro, user){
  console.log(user);
}

//when getUser finish what it must done, it call resolveUser
getUser(function resolveUser(error, user) {
  if(error){
    console.log("Ops, something goes wrong on User", error)
    return;
  };
  //when  get user, call getCellPhone
  getCellPhone(user.id, function resolveCellPhone(error1, cellPhone){
    if(error1){
      console.log("Ops, something goes wrong on cellPhone", error1)
      return;
    };
    //when  get cellphone, call getAdress
    getAddress(user.id, function resolveCellPhone(error2, adress){
      if(error2){
        console.log("Ops, something goes wrong on address", error2)
        return;
      };
      console.log(`
        Name: ${user.name},
        CellPhone: ${cellPhone.number},
        Address:  ${adress.street}, ${adress.number}
      `);
    })

  })

})


