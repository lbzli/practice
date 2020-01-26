let DOMItem = {
    setCook: function (item, connentList) {
        let str = ``
        for (let i = 0; i < connentList.length; i++) {
            if(connentList[i].zt==="F"){
                str += `<li>${connentList[i].name + "剩余完成时间：" + connentList[i].time}</li>`
            }else{
                str += `<li>${connentList[i].name + "剩余完成时间：已完成"}</li>`
            }
            
        }
        item.innerHTML = str
    },
    setList: function (item, connentList) {
        let str = ``
        for (let i = 0; i < connentList.length; i++) {
            str += `<li>客户：${i+1}</li>`
        }
        item.innerHTML = str
    },
    moveToCook: function (item) {
        item.style.marginLeft = "0px"
    },
    moveToCustmer: function (item) {
        item.style.marginLeft = "450px"
    },
    setCustmer: function (item, connentList) {
        let str = ``
        for (let i = 0; i < connentList.length; i++) {
            str += `<li>${connentList[i]}</li>`
        }
        item.innerHTML = str
    },
    setMoney: function (item, connent) {
        item.innerHTML = connent
    }
}

let moneyDom = document.querySelector(".money")
let cookDom = document.querySelector(".cook .info")
let waiterDom = document.querySelector(".waiter")
let custmerDom = document.querySelector(".custmer .info")
let listDom = document.querySelector(".list .info")
let count = 0

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

//  厨师的定义，使用代理单例模式
function Cook(ID = Math.floor(Math.random() * 100000),name, salajro) {
    Staff.call(this, ID,name,salajro)
}
Cook.prototype.doneWork = function (menu) {
    // console.log("完成一次工作,烹饪菜品:"+menu[0].name+"  "+menu[0].money)
    let num = 0
    
    document.querySelector(".waiter .info").innerHTML = "上菜"
    let info = document.querySelector(".cook .info")
    function run(data) {
        return new Promise(function(resolve,reject) {
            count += data.money
            console.log("烹饪菜品:" + data.name + "  " + data.money+" "+data.time)
            menu[num].zt="T"
            DOMItem.setCook(info,menu)
            DOMItem.moveToCook(waiterDom)
            setTimeout(DOMItem.moveToCustmer, 500, waiterDom);
            num++
            if(num<menu.length){
                setTimeout(resolve, menu[num].time * 1000, menu[num])
            }else {
                console.log("上菜完毕");
                setTimeout(resolve, menu.length * 3000)
            }
            
        })
    }
    let p = new Promise(function(resolve,reject) {
        console.log("这里是厨师，马上开始烹饪菜品")
        DOMItem.moveToCook(waiterDom)
        DOMItem.setCook(info,menu)
        setTimeout(resolve, menu[num].time*1000,menu[num]);
    })
    for (let i = 0; i < menu.length; i++) {
        p = p.then(run)
    }
    p
    .then(function(){
        console.log("吃完了")
        console.log("付钱" + count)
        DOMItem.setMoney(moneyDom,count)
        ListArray.pop()
        DOMItem.setList(listDom,ListArray)
        ListArray[ListArray.length-1].instance()
    })
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

//  服务员的定义，使用代理单例模式
function Waiter(ID = Math.floor(Math.random() * 100000), name, salajro) {
    Staff.call(this, ID, name, salajro)
}
Waiter.prototype.doneWork = function (parm) {
   console.log("完成一次工作");
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

//  客户的定义
function Customer(cuscommand,waitercommand) {
    console.log("顾客入座")
    //  服务员使用顾客的点菜命令的数据生成真正的点菜命令，然后返回一个信息表示是否点菜成功
    let p = new Promise(function(resolve,reject) {
        console.log("开始点菜")
        DOMItem.moveToCustmer(waiterDom)
        document.querySelector(".waiter .info").innerHTML = "点菜"
        setTimeout(resolve, 3000,cuscommand.execute);
    })
    p.then(waitercommand.execute)
    // let flag = waitercommand.execute(cuscommand.execute)
    // if(flag) {
    //     this.eat()
    // }
   
}
Customer.prototype.eat = function() {
    console.log("开始吃菜")
}

//  菜单的定义，使用单例模式
function Menu() {
    this.name = ["叫花鸡","红烧肉","北京烤鸭","红烧狮子头","糖醋排骨"]
    this.money = [23,30,36,35,26]
    this.time = [1,2,3,4,5]
}
Menu.prototype.diancai = function(params) {
    return [{ name: this.name[params], money:this.money[params],time:this.time[params],zt:"F"}]
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

/** *****************************************************命令对象***********************************************************/
let Customer_order_dishes = {
    refresh : function () {
        //  找到菜单
        let MenuInstance = new ProxyMenu()
        let result = []
        let random = Math.floor(Math.random() * 4)
        for (let i = 0; i <= random; i++) {
            result.push(...MenuInstance.diancai(Math.floor(Math.random(1, 4) * 10) % 4))
        }
        return result
    }
}
let Customer_command = function (receive){
    return {
        execute : function () {
            return receive.refresh()
        }
    }
}
let Waiter_done = {
    diancai : function (command) {
        //  服务员询问顾客的菜单，调用顾客的点菜方法
        let menu = command()
        console.log("开始烹饪")
        //  找到厨师，并传入菜单
        let CookInstance = new ProxyCook(null, "CookInstance", 10000)
        //  厨师开始工作
        CookInstance.doneWork(menu)
        return true
    }
}
let Waiter_command = function(receive) {
    return {
        execute : function(command) {
            receive.diancai(command)
        }
    }
}


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

let List = {
    instance:function(){
        //  生成客户点菜命令
        let command1 = Customer_command(Customer_order_dishes)
        //  生成服务员点菜命令
        let command2 = Waiter_command(Waiter_done)
        // eslint-disable-next-line no-unused-vars
        let test = new Customer(command1, command2)
    }
}
let ListArray = []
for (let i = 0; i < 3; i++) {
    ListArray.push(List)
}
DOMItem.setList(listDom,ListArray)
ListArray[ListArray.length-1].instance()