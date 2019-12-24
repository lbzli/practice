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

function createBar(data) {
    let rootSvg = document.querySelector("#mysvg")
    let bar_x=10,bar_y=300,bar_width=40,bar_height,bar_color="blue"
    let line_color="rgb(99,99,99)"
    let myrect,mylineX,mylineY,my_stroke = 2


    mylineX = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    mylineX.setAttribute('x1', my_stroke)
    mylineX.setAttribute('y1', 0)
    mylineX.setAttribute('x2', my_stroke)
    mylineX.setAttribute('y2', 300 - my_stroke)
    mylineX.setAttribute('stroke', line_color)
    mylineX.setAttribute('stroke-width', my_stroke)
    mylineY = document.createElementNS('http://www.w3.org/2000/svg', 'line')
    mylineY.setAttribute('x1', my_stroke)
    mylineY.setAttribute('y1', 300 - my_stroke)
    mylineY.setAttribute('x2', 600)
    mylineY.setAttribute('y2', 300 - my_stroke)
    mylineY.setAttribute('stroke', line_color)
    mylineY.setAttribute('stroke-width', my_stroke)
    rootSvg.appendChild(mylineX)
    rootSvg.appendChild(mylineY)

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        bar_height = Math.floor((element / 300) * 100)
        myrect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        myrect.setAttribute('width', bar_width);
        myrect.setAttribute('height', bar_height);
        myrect.setAttribute('x',((index+1)*bar_x+(index*bar_width)))
        myrect.setAttribute('y', bar_y-bar_height-4)
        myrect.setAttribute('fill', bar_color)
        rootSvg.appendChild(myrect)
    }

    
}

function getData(data) {
    let result 
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (element.region==="华东"&&element.product==="手机") {
                result = element.sale
                return result
            }
        }
    }
}

createBar(getData(sourceData))