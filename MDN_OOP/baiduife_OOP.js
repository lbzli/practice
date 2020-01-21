function Restaurant(Obj) {
    this.cash = Obj.cash
    this.seats = Obj.seats
    this.staffs = Obj.staff
}
Restaurant.prototype.hire = function(item) {
    this.staffs.push(item)
}
Restaurant.prototype.fire = function(item) {
    for (let i = 0; i < this.staffs.length; i++) {
        if (this.staffs[i] === item) {
            this.staffs.splice(i,1)
        }
    }
}

function Staff(ID, name, salajro) {
    this.ID = ID
    this.name = name
    this.salajro = salajro
}
Staff.prototype.doneWork = function() {
    console.log("完成一次工作")
}


function Cook(ID = Math.floor(Math.random() * 100000),name, salajro) {
    Staff.call(this, ID,name,salajro)
}
Cook.prototype.doneWork = function (menu) {
    console.log("完成一次工作,烹饪菜品:"+menu[0].name+"  "+menu[0].money)
}
let ProxyCook = (function() {
    let instance
    return function (ID,name,salajro) {
        if(!instance) {
            instance = new Cook(ID,name, salajro)
        }
        return instance
    }
})()

function Waiter(ID = Math.floor(Math.random() * 100000), name, salajro) {
    Staff.call(this, ID, name, salajro)
}
Waiter.prototype.doneWork = function (parm) {
    console.log("开始点菜")
    let menu = parm.order_dishes()
    console.log("开始烹饪")
    CookInstance.doneWork(menu)
    return true
}
let ProxyWaiter = (function () {
    let instance
    return function (ID, name, salajro) {
        if (!instance) {
            instance = new Waiter(ID, name, salajro)
        }
        return instance
    }
})()

function Customer() {
    console.log("顾客入座")
    let flag = WaiterInstance.doneWork(this)
    if(flag) {
        this.eat()
    }
}
Customer.prototype.order_dishes = function() {
    return MenuInstance.diancai(Math.floor(Math.random(1, 4) * 10) % 4)
}
Customer.prototype.eat = function() {
    console.log("开始吃菜")
}

function Menu() {
    this.name = ["叫花鸡","红烧肉","北京烤鸭","红烧狮子头","糖醋排骨"]
    this.money = [23,30,36,35,26]
}
Menu.prototype.diancai = function(params) {
    return [{ name: this.name[params], money:this.money[params]}]
}
let ProxyMenu = (function() {
    let instance
    return function() {
        if (!instance) {
            instance = new Menu()
        }
        return instance
    }
})()


/** ****************************************************test*******************************************************/
let ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

let newCook = new Cook(null,"Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staffs);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staffs);

let CookInstance = new ProxyCook(null, "CookInstance", 10000)
let WaiterInstance = new ProxyWaiter(null,"WaiterInstance",3000)
let MenuInstance = new ProxyMenu()

for (let i = 0; i < 10; i++) {
    let test = new Customer()
    console.log("*********************");
}