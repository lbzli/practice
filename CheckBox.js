/* eslint-disable max-depth */
/* eslint-disable no-sequences */
/* eslint-disable no-eq-null */
/* eslint-disable no-invalid-this */
/* eslint-disable no-prototype-builtins */

let sourceData
if (localStorage.getItem("sourceData") !== null) {
    sourceData = JSON.parse(localStorage.getItem("sourceData"))
} else {
    sourceData = [{
        product: "手机",
        region: "华东",
        sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
    }, {
        product: "手机",
        region: "华北",
        sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
    }, {
        product: "手机",
        region: "华南",
        sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
    }, {
        product: "笔记本",
        region: "华东",
        sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
    }, {
        product: "笔记本",
        region: "华北",
        sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
    }, {
        product: "笔记本",
        region: "华南",
        sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
    }, {
        product: "智能音箱",
        region: "华东",
        sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
    }, {
        product: "智能音箱",
        region: "华北",
        sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
    }, {
        product: "智能音箱",
        region: "华南",
        sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
    }]
}

let divDom = document.querySelector("#table-wrapper")
let regionDom = document.querySelector("#region-radio-wrapper")
let productDom = document.querySelector("#product-radio-wrapper")
let arr //  地区
let arr2    //  商品

/**
 * 初始化创建checkbox并且添加事件
 *
 * @param   {Object}  parentDom  父元素
 * @param   {Array}  data       原始数据
 * @param   {string}  category   原始数据的某个Key
 *
 * @return  {voie}             void
 */
function createChckBox(parentDom, data, category) {
    //  创建一个全选的checkbox
    let checkboxstr = `<input type="checkbox" checkbox-type="all">全选`
    //  用一个数组记录所有的符合Key的那个数据
    let arr = []
    //  找到符合Key的那个数据，不重复添加
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (arr.indexOf(element[category]) === -1) {
                arr.push(element[category])
            }
        }
    }
    //  根据arr的数据创建checkbox
    let resultStr = ``
    for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
            const element = arr[key];
            resultStr += `<input type="checkbox" checkbox-type="child" value="${element}">${element}`
        }
    }
    //  创建完毕
    parentDom.innerHTML = checkboxstr + resultStr

    // 在父元素上设置一个事件，利用事件冒泡的特性，根据不同的e.target的自定义属性做不同的判断
    parentDom.addEventListener("click", function (e) {
        // console.log(e.target)
        // console.log(e.target.getAttribute("checkbox-type"))
        let flag = false; let flag2 = false
        if (e.target.getAttribute("checkbox-type") === "all") {
            for (let index = 1; index < this.children.length; index++) {
                const element = this.children[index];
                if (!element.checked) {
                    element.checked = true
                }
            }
            e.target.checked = true
        } else if (e.target.getAttribute("checkbox-type") === "child") {
            for (let index = 1; index < this.children.length; index++) {
                const element = this.children[index];
                if (!element.checked) {
                    flag = true
                } else {
                    flag2 = true
                }
            }
            this.children[0].checked = flag ? false : true
            e.target.checked = flag2 ? e.target.checked : true
        }
        divDom.innerHTML = createTable(getData())
        //  编辑功能初始化
        editInit()

        //  下面的是，鼠标经过某一行的时候，创建SVG和canvas
        let trDomList = document.querySelectorAll("#table-wrapper tr")
        for (const key in trDomList) {
            if (trDomList.hasOwnProperty(key)) {
                const element = trDomList[key];
                element.addEventListener("mouseover", function () {

                    if (this.getAttribute("data-region") !== null) {
                        // console.log(getDataByKey(sourceData, this.getAttribute("data-region"), this.getAttribute("data-product")))
                        let datalist = getDataByKey(sourceData, this.getAttribute("data-region"), this.getAttribute("data-product"))
                        //  console.log("这个是datalist"+datalist)
                        // console.log(document.querySelector("#mysvg"))
                        // eslint-disable-next-line no-undef
                        lineChart.setData(document.querySelector("#tutorial"), datalist, this.getAttribute("data-region") + " " + this.getAttribute("data-product"))
                        // eslint-disable-next-line no-undef
                        barChart.setData(document.querySelector("#mysvg"), datalist)
                    }
                })
            }
        }

    })


}


/**
 * 这个函数是用来获取生成SVG和canvas的数据用的
 *
 * @param   {[Array]}  data        [data 原始数据]
 * @param   {[string]}  regionKey   [regionKey 地区名字]
 * @param   {[string]}  productKey  [productKey 商品名字]
 *
 * @return  {[Array]}              [return 返回的数据仅仅是sale的数据不包括其他的数据信息]
 */
function getDataByKey(data, regionKey, productKey) {
    let result
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (element.region === regionKey && element.product === productKey) {
                result = element.sale
                return result
            }
        }
    }
}



/**
 * 这个函数是用来获取生成table用的数据，其中的会把checkbox选择的哪些挂关键字给getDataByKey
 *
 * @return  {[Array]}  [return 返回生成table用的数据（数据包括其他的关键的信息，如region和product）]
 */
function getData() {
    // eslint-disable-next-line no-unused-expressions
    arr = [], arr2 = []
    let result = []
    for (let index = 1; index < regionDom.children.length; index++) {
        const element = regionDom.children[index];
        if (element.checked === true) {
            arr.push(element.value)
        }
    }
    for (let index = 1; index < productDom.children.length; index++) {
        const element = productDom.children[index];
        if (element.checked === true) {
            arr2.push(element.value)
        }
    }
    for (const key in sourceData) {
        if (sourceData.hasOwnProperty(key)) {
            const element = sourceData[key];
            if (arr.indexOf(element.region) !== -1 && arr2.indexOf(element.product) !== -1) {
                result.push(element)
            }
        }
    }
    return result
}



/**
 * 根据传入的数据创建一个表格
 *
 * @param   {Array}  data  传入的数据
 *
 * @return  {void}        void
 */
// eslint-disable-next-line complexity
function createTable(data) {
    let str = `<table border="solid" cellspacing="0" cellpadding="0">
        <tr>
            <td style="border-top: none;">商品</td>
            <td>地区</td>
            <td>1月</td>
            <td>2月</td>
            <td>3月</td>
            <td>4月</td>
            <td>5月</td>
            <td>6月</td>
            <td>7月</td>
            <td>8月</td>
            <td>9月</td>
            <td>10月</td>
            <td>11月</td>
            <td>12月</td>
        </tr>`
    let tbody = ``
    if (arr2.length === 1 && arr.length >= 1) {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            tbody += `<tr data-region="${element.region}" data-product ="${element.product
                }">`
            if (index === 0) {
                tbody += `<td rowspan="${data.length}">${element.product}</td>`
            }
            for (const key in element) {
                if (element.hasOwnProperty(key) && key !== "product") {
                    const element2 = element[key];
                    if (typeof element2 !== "string") {//  这个判断会找到那个销售量的那个数据sale
                        for (let index = 0; index < element2.length; index++) {
                            const element3 = element2[index];
                            tbody += `<td class="edit"><input type="text" value="${element3}" data-old="${element3}" disabled="disabled"><span data-type="no">取消</span><span data-type="yes">确认</span></td>`
                        }
                    } else {
                        tbody += `<td>${element2}</td>`// 如果是string类型就表示这个是商品名，或者是地区名。
                    }
                }
            }
            tbody += `</tr>`
        }
        tbody += `</table>`
    } else if (arr.length === 1 && arr2.length > 1) {

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            tbody += `<tr data-region="${element.region}" data-product = "${element.product
                }">`
            if (index === 0) {
                tbody += `<td rowspan="${data.length}">${element.region}</td>`
            }
            for (const key in element) {
                if (element.hasOwnProperty(key) && key !== "region") {
                    const element2 = element[key];
                    if (typeof element2 !== "string") {//  这个判断会找到那个销售量的那个数据sale
                        for (let index = 0; index < element2.length; index++) {
                            const element3 = element2[index];
                            tbody += `<td class="edit"><input type="text" value="${element3}" data-old="${element3}" disabled="disabled"><span data-type="no">取消</span><span data-type="yes">确认</span></td>`
                        }
                    } else {
                        tbody += `<td>${element2}</td>`// 如果是string类型就表示这个是商品名，或者是地区名。
                    }
                }
            }
            tbody += `</tr>`
        }
        tbody += `</table>`

    } else if (arr.length > 1 && arr2.length > 1) {
        let test
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            tbody += `<tr data-region="${element.region}" data-product = "${element.product
                }">`
            if (index === 0 || index % arr.length === 0) {
                tbody += `<td rowspan="${arr.length}">${element.product}</td>`
                test = element.product
            }
            for (const key in element) {
                if (element.hasOwnProperty(key) && element[key] !== test) {
                    const element2 = element[key];
                    if (typeof element2 !== "string") {     //  这个判断会找到那个销售量的那个数据sale
                        for (let index = 0; index < element2.length; index++) {
                            const element3 = element2[index];
                            tbody += `<td class="edit"><input type="text" value="${element3}" data-old="${element3}" disabled="disabled"><span data-type="no">取消</span><span data-type="yes">确认</span></td>`
                        }
                    } else {
                        tbody += `<td>${element2}</td>`// 如果是string类型就表示这个是商品名，或者是地区名。
                    }
                }
            }
            tbody += `</tr>`
        }
        tbody += `</table>`
    } else if (arr.length === 1 && arr2.length === 1) {
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            tbody += `<tr data-region="${element.region}" data-product = "${element.product
                }">`
            for (const key in element) {
                if (element.hasOwnProperty(key)) {
                    const element2 = element[key];
                    if (typeof element2 !== "string") {//  这个判断会找到那个销售量的那个数据sale
                        for (let index = 0; index < element2.length; index++) {
                            const element3 = element2[index];
                            tbody += `<td class="edit"><input type="text" value="${element3}" data-old="${element3}" disabled="disabled"><span data-type="no">取消</span><span data-type="yes">确认</span></td>`
                        }
                    } else {
                        tbody += `<td>${element2}</td>`// 如果是string类型就表示这个是商品名，或者是地区名。
                    }
                }
            }
            tbody += `</tr>`
        }
        tbody += `</table>`
    }

    return str + tbody
}


/**
 * 编辑功能初始化
 *
 * @return  {void}  void
 */
function editInit() {
    //  为body设置点击取消事件
    document.querySelector("body").addEventListener("click",function (e) {
        if (e.target === this) {
            // console.log("这里是body")
            noSave()
        }
    })
    //  为每一个数据的td设置委托的点击函数
    let editDom = document.querySelectorAll(".edit") 
    for (let i = 0; i < editDom.length; i++) {
        editDom[i].addEventListener("click", function (e) {
            // console.log(e.target)
            // console.log(this)
            // console.log(this===e.target)
            //  执行保存功能
            if (e.target.getAttribute("data-type") === "yes") {
                // console.log("你点击了yes")
                if (isNaN(Number(e.target.parentNode.children[0].value))) {
                    alert("你输入的是非法的数据!!!!")
                    e.target.parentNode.children[0].value = e.target.parentNode.children[0].getAttribute("data-old")
                }
                e.target.parentNode.children[0].disabled ="disabled"
                e.target.parentNode.children[0].classList.remove("up")
                e.target.parentNode.children[1].classList.remove("show")
                e.target.parentNode.children[2].classList.remove("show")
            }
            //  执行取消功能
            if (e.target.getAttribute("data-type") === "no") {
                // console.log("你点击了no")
                e.target.parentNode.children[0].value = e.target.parentNode.children[0].getAttribute("data-old")
                e.target.parentNode.children[0].disabled = "disabled"
                e.target.parentNode.children[1].classList.remove("show")
                e.target.parentNode.children[2].classList.remove("show")
            }
            //  执行一次取消，保证页面只有一个可编辑的td
            noSave()
            //  执行允许编辑功能
            if(this===e.target) {
                this.children[0].disabled = ""
                this.children[0].classList.add("up")
                this.children[0].focus()
                this.children[1].classList.add("show")
                this.children[2].classList.add("show")
            }

        })
    }

    //  为每一个input设置keyup事件，监听esc和enter。分别执行取消和确认操作
    let inputList = document.querySelectorAll(".edit input")
    for (let i = 0; i < inputList.length; i++) {
       inputList[i].addEventListener("keyup",function (e) {
           if (e.key ==="Escape") {
               noSave()
           }
           if (e.key === "Enter") {
               if (isNaN(Number(this.value))) {
                   alert("你输入的是非法的数据!!!!")
                   this.value = this.getAttribute("data-old")
               }
               this.disabled = "disabled"
               this.classList.remove("up")
               this.parentNode.children[1].classList.remove("show")
               this.parentNode.children[2].classList.remove("show")
           }
       })
        
    }
}

/**
 * 取消操作
 *
 * @return  {void}  void
 */
function noSave() {

    let inputDom = document.querySelector(".up")
    if (inputDom!==null) {
        inputDom.value = inputDom.getAttribute("data-old")
        inputDom.disabled = "disabled"
        inputDom.classList.remove("up")
    }
    let showDom = document.querySelectorAll(".show")
    if (showDom.length!==0) {
        for (let index = 0; index < showDom.length; index++) {
           showDom[index].classList.remove("show")
        }
    }
}



//* *****************************************************保存操作*****************************************************//

/**
 * 因为inputLisnt不是一个真正的数组，使用这个函数来实现数组的splice方法
 *
 * @return  {[Array]}  [return 数组]
 */
function inputSplice(data, startIndex, endIndex) {
    let result = []
    for (let i = startIndex; i <= endIndex; i++) {
        if (data[i] !== null) result.push(data[i].value)
    }
    return result
}



/**
 * 修改根据两个Key指向的数据
 *
 * @param   {Array}  data        要被修改的数据
 * @param   {string}  regionKey   第一个Key
 * @param   {string}  productKey  第二个Key
 * @param   {Array}  newdata     新的数据
 *
 * @return  {void}              无返回
 */
// eslint-disable-next-line max-params
function setData(data, regionKey, productKey, newdata) {
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (element.region === regionKey && element.product === productKey) {
                data[key].sale = newdata
            }
        }
    }
    localStorage.setItem("sourceData", JSON.stringify(sourceData))
}

createChckBox(regionDom, sourceData, "region")
createChckBox(productDom, sourceData, "product")


//  下面是保存数据的操作
let button = document.querySelector("button")
button.addEventListener("click", function () {
    let inputList = document.querySelectorAll("#table-wrapper input")
    let trList = document.querySelectorAll("#table-wrapper tr")

    let nowData = []
    if (inputList.length !== 0) {
        //  开始获取数据
        for (let index = 0; index < inputList.length / 12; index++) {
            const element = inputSplice(inputList, index * 12, index * 12 + 11);
            nowData.push(element)
        }
        //  开始设置数据
        for (let i = 1; i < trList.length; i++) {
            const element = trList[i];
            setData(sourceData, element.getAttribute("data-region"), element.getAttribute("data-product"), nowData[i - 1])
        }
    }
})
