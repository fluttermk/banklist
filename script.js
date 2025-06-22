'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements,sort=false) {
  containerMovements.innerHTML = '';

  const moves=sort ? movements.slice().sort((a,b)=> a-b): movements;
  moves.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, val) => acc + val, 0);
  labelBalance.textContent = `${acc.balance} €`;
};

const displaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, inco) => acc + inco, 0);
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, inco) => acc + inco, 0);
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map((inter, i) => (inter * acc.interestRate) / 100)
    .filter(intere => intere >= 1)
    .reduce((acc, inte) => acc + inte);
  labelSumIn.textContent = `${income}€`;
  labelSumOut.textContent = `${out}€`;
  labelSumInterest.textContent = `${interest}€`;
};
const creatUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

creatUsernames(accounts);

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    inputLoginPin.value = inputLoginUsername.value = '';

    displayBalance(currentAccount);
    displayMovements(currentAccount.movements);
    displaySummary(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver_acc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiver_acc &&
    receiver_acc?.username === inputTransferTo.value &&
    currentAccount.balance >= amount
  ) {
    currentAccount.movements.push(-amount);
    receiver_acc.movements.push(amount);
    displayBalance(currentAccount);
    displayMovements(currentAccount.movements);
    displaySummary(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
  }
});
btnLoan.addEventListener('click',function(e){
  e.preventDefault();

  const amount=Number(inputLoanAmount.value);

  if(amount>0&&currentAccount.movements.some(mov=>mov > amount*0.1)){
     currentAccount.movements.push(amount);
      displayBalance(currentAccount);
    displayMovements(currentAccount.movements);
    displaySummary(currentAccount);

  }
  inputLoanAmount.value="";
})

btnClose.addEventListener("click",function(e){
  e.preventDefault()

  const user=inputCloseUsername.value;
  const password=Number(inputClosePin.value);
  
  if(currentAccount.username===user && currentAccount.pin===password){
    const receiver_acc = accounts.findIndex(
    acc => acc.username === currentAccount.username
  );
  
    accounts.splice(receiver_acc,1);
    containerApp.style.opacity=0;
  
  }
  inputCloseUsername.value=inputClosePin.value="";
   
})

let sorted=false;
btnSort.addEventListener("click",function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted=!sorted;
})
// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// const checkDogs=function(dogsJulia,dogskate){

//   const shallowjulia=dogsJulia.slice(1,dogsJulia.length-2);
//   const new_arr=[...shallowjulia,...dogskate];
//   new_arr.forEach(function(item,i){

//     if(item >=3){
//       console.log(`Dog number ${i+1} is an adult,and is ${item} years old`);
//     }
//     else{
//       console.log(`Dog number ${i+1} is still a puppy`);
//     }

//   });

// }

// checkDogs([3,5,2,12,7],[4,1,15,8,3]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const balance=movements.reduce(function(acc,curr,i,arr){
//   return acc + curr;
// },0)
// console.log(balance);
// const eurtousd=1.1;

// const mov=movements.map(function(item,x){
//      return item*eurtousd;
// })
// console.log(mov);

// const mov1=movements.map((item)=>item*1.2)
// console.log(mov1);

// const descriptedmsg=movements.map((mov,i)=>
//   `Movement ${i+1}, you ${mov > 0 ? "deposit" :"Withdrawl"} ${Math.abs(mov)}$`
// );

// console.log(descriptedmsg);

// const Humanages=function(ages){
//  const dog=ages.map((age,i)=>{
//     if(age <=2){
//       return 2*age
//     }
//     else{
//       return 16 + age * 4;
//     }
//   });
//   const new_age=dog.filter((ages,i)=>{
//   if(ages >=18){
//     return ages;
//   }
// });

// const new_average=new_age.reduce((acc,arr)=> acc + arr,0);
// const total_average=new_average/new_age.length
// console.log(dog,new_age,total_average);

// }

// const Humanages=function(ages){
//   const Human=ages
//   .map(age => age<=2? 2 * age:16 + age * 4).filter(age => age >= 18).reduce((acc,age,i,arr) => acc+age /arr.length,0);

//     return Human;
//   }

// console.log(Humanages([5,2,4,1,15,8,3]));



// const totalbalance=accounts.map(acc => acc.movements).flat().reduce((acc,value)=> acc+value,0);
// console.log(totalbalance);


// movements.sort((a,b)=> a-b);//ascending order
// movements.sort((a,b) => b-a);  // descending order
// console.log(movements);


// const bankdeposit=accounts.map(acc=> acc.movements).flat().filter(acc => acc >0).reduce((acc,val) => acc + val);
// console.log(bankdeposit);

// const bankdeposit=accounts.map(acc => acc.movements ).flat().filter(acc => acc >=1000);
// console.log(bankdeposit);

// const sum=accounts.flatMap(acc => acc.movements ).reduce((sum,curr)=>{
//   curr >0?sum.deposits+=curr:sum.withdraws+=curr
//   return sum
// },{deposits:0,withdraws:0});

// console.log(sum);
 


// dogs.forEach(function(detail,i){
//  detail.foodportion=Math.floor(detail.weight**0.75*2);
// })
// console.log(dogs);

// const getdetail=dogs.find(acc=>{
//   acc.owners.includes('Sarah');
// }
//  )

// console.log('sarah dog had ');

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

1
dogs.forEach(function(detail,i){
  detail.foodrecp=Math.floor(detail.weight ** 0.75 *28);
});

// console.log(dogs);


// 2
//
const sarahfinder=dogs.find(acc => acc.owners.includes('Sarah'));
console.log(`sarah dogs its eating ${sarahfinder.curFood>=sarahfinder.foodrecp?"too much":"too less"}`);

// 3
const ownersEattoomuch=dogs.filter(dog => dog.curFood >= dog.foodrecp).flatMap(dog => dog.owners);
const ownersEatless=dogs.filter(dog => dog.curFood <= dog.foodrecp).flatMap(dog => dog.owners);



// console.log(ownersEattoomuch);
// console.log(ownersEatless);

// // console.log(`${ownersEattoomuch.join(" and ")} dogs eat too much`);
// // console.log(`${ownersEatless.join(' and ')} dog eat less food`);

// const getdog=dogs.find(dog=> dog.curFood === dog.foodrecp);
// console.log(getdog);
// const checkEatingOkay = dog =>
//   dog.curFood < dog.foodrecp * 1.1 && dog.curFood > dog.foodrecp * 0.9;

// console.log(dogs.some(checkEatingOkay));

// // 7.
// const dogsEatingOkay = dogs.filter(checkEatingOkay);
// console.log(dogsEatingOkay);

// const copyarray=dogs.slice().sort((a,b)=>a.foodrecp - b.foodrecp)
// console.log(copyarray);