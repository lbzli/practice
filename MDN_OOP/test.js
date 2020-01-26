let DOMItem = {
    setCook:function(item,connentList) {
        let str = ``
        for (let i = 0; i < connentList.length; i++) {
            str += `<li>${connentList[i]}</li>`
        }
        item.innerHTML = str
    },
    setList:function(item,connentList) {
        let str = ``
        for (let i = 0; i < connentList.length; i++) {
            str += `<li>${connentList[i]}</li>`
        }
        item.innerHTML = str
    },
    moveToCook:function(item) {
        item.style.marginLeft = "0"
    },
    moveToCustmer:function(item){
        item.style.marginLeft = "600px"
    },
    setCustmer:function(item,connentList){
        let str = ``
        for (let i = 0; i < connentList.length; i++) {
            str += `<li>${connentList[i]}</li>`
        }
        item.innerHTML = str
    },
    setMoney:function(item,connent){
        item.innerHTML = connent
    }
}
