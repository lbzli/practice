// let selectDom = document.querySelector("#region-select") 
// let selectDom2 = document.querySelector("#region-select2")
let sourceData = [{
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
// selectDom.addEventListener("change",function (e) {
//     divDom.innerHTML = createTable(getData(this.value,selectDom2.value))
// })
// selectDom2.addEventListener("change", function (e) {
//     divDom.innerHTML = createTable(getData(selectDom.value, this.value))
// })
// function getData(dataKey, dataKey2) {
//     let result = new Array()
//     for (const key in sourceData) {
//         if (sourceData.hasOwnProperty(key)) {
//             const element = sourceData[key];
//             if (element["region"] === dataKey && element["product"] === dataKey2) {
//                 result.push(element)
//             }
//         }
//     }
//     return result
// }


let divDom = document.querySelector("#table-wrapper")
let regionDom = document.querySelector("#region-radio-wrapper")
let productDom = document.querySelector("#product-radio-wrapper")
let arr,arr2
function createChckBox(parentDom, data, category) {
    let checkboxstr = `<input type="checkbox" checkbox-type="all">全选`
    let arr = []

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (arr.indexOf(element[category]) === -1) {
                arr.push(element[category])
            }
        }
    }
    let resultStr = ``
    for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
            const element = arr[key];
            resultStr += `<input type="checkbox" checkbox-type="child" value="${element}">${element}`
        }
    }
    parentDom.innerHTML = checkboxstr + resultStr

    //在元素上设置一个事件，利用事件冒泡的特性，根据不同的e.target的自定义属性做不同的判断
    parentDom.addEventListener("click", function (e) {
        // console.log(e.target)
        // console.log(e.target.getAttribute("checkbox-type"))
        let flag = false, flag2 = false
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
    })


}
function getData() {
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
            if (arr.indexOf(element.region) != -1 && arr2.indexOf(element.product) != -1) {
                result.push(element)
            }
        }
    }
    return result
}
function createTable(data) {
    str = `<table border="solid" cellspacing="0" cellpadding="0">
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
    if(arr2.length===1&&arr.length>=1) {
        for (let index = 0; index < data.length; index++) {
            tbody += `<tr>`
            const element = data[index];
            if (index === 0) {
                tbody += `<td rowspan="${data.length}">${element.product}</td>`
            }
            for (const key in element) {
                if (element.hasOwnProperty(key) && key !="product") {
                    const element2 = element[key];
                    if (typeof element2 != "string") {
                        for (let index = 0; index < element2.length; index++) {
                            const element3 = element2[index];
                            tbody += `<td>${element3}</td>`
                        }
                    } else {
                        tbody += `<td>${element2}</td>`
                    }
                }
            }
            tbody += `</tr>`
        }
        tbody += `</table>`
    }else if(arr.length===1&&arr2.length>1) {

        for (let index = 0; index < data.length; index++) {
            tbody += `<tr>`
            const element = data[index];
            if (index === 0) {
                tbody += `<td rowspan="${data.length}">${element.region}</td>`
            }
            for (const key in element) {
                if (element.hasOwnProperty(key) && key != "region") {
                    const element2 = element[key];
                    if (typeof element2 != "string") {
                        for (let index = 0; index < element2.length; index++) {
                            const element3 = element2[index];
                            tbody += `<td>${element3}</td>`
                        }
                    } else {
                        tbody += `<td>${element2}</td>`
                    }
                }
            }
            tbody += `</tr>`
        }
        tbody += `</table>`
        
    }else if(arr.length>1&&arr2.length>1) {
        let test
        for (let index = 0; index < data.length; index++) {
            tbody += `<tr>`
            const element = data[index];
            if (index === 0||index%arr.length===0) {
                tbody += `<td rowspan="${arr.length}">${element.product}</td>`
                test = element.product
            }
            for (const key in element) {
                if (element.hasOwnProperty(key) && element[key]!=test) {
                    const element2 = element[key];
                    if (typeof element2 != "string") {
                        for (let index = 0; index < element2.length; index++) {
                            const element3 = element2[index];
                            tbody += `<td>${element3}</td>`
                        }
                    } else {
                        tbody += `<td>${element2}</td>`
                    }
                }
            }
            tbody += `</tr>`
        }
        tbody += `</table>`
    }else if (arr.length===1&&arr2.length===1) {
        for (let index = 0; index < data.length; index++) {
            tbody += `<tr>`
            const element = data[index];
            for (const key in element) {
                if (element.hasOwnProperty(key)) {
                    const element2 = element[key];
                    if (typeof element2 != "string") {
                        for (let index = 0; index < element2.length; index++) {
                            const element3 = element2[index];
                            tbody += `<td>${element3}</td>`
                        }
                    } else {
                        tbody += `<td>${element2}</td>`
                    }
                }
            }
            tbody += `</tr>`
        }
        tbody += `</table>`
    }


    
    return str + tbody
}
createChckBox(regionDom, sourceData, "region")
createChckBox(productDom, sourceData, "product")