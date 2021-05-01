const UserFactory = require("./factory/userFactory")


;(async function(){
  const userService = await UserFactory.createInstance();
  const users = await userService.find({name: 'Tiago*'});

  console.log(users)
})()