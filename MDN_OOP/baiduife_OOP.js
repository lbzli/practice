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


function Kelnero(ID=Math.floor(Math.random()*100000), name, salajro) {
    Staff.call(this, ID, name, salajro)
}
Kelnero.prototype.doneWork = function(parm) {
    if(parm.constructor.name === "Array") {
        console.log("记录了一次菜品："+parm)
    }else {
        console.log("上菜："+parm)
    }
}


function Cook(name, salajro) {
    Staff.call(this, Math.floor(Math.random() * 100000),name,salajro)
}
Cook.prototype.doneWork = function () {
    console.log("完成一次工作：烹饪菜品")
}

function Customer() {

}
Customer.prototype.order_dishes = function() {
    console.log("开始点菜")
}
Customer.prototype.eat = function() {
    console.log("开始吃菜")
}

let ifeRestaurant = new Restaurant({
    cash: 1000000,
    seats: 20,
    staff: []
});

let newCook = new Cook("Tony", 10000);
ifeRestaurant.hire(newCook);

console.log(ifeRestaurant.staffs);

ifeRestaurant.fire(newCook);
console.log(ifeRestaurant.staffs);