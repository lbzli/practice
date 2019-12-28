/* eslint-disable no-undef */
barChart = {
    createBar: function (root,data) {
        root.innerHTML = ""
        let bar_x = 5, bar_y = 300, bar_width = 20, bar_height, bar_color = "blue"
        let line_color = "rgb(99,99,99)"
        let myrect, mylineX, mylineY, my_stroke = 2


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
        console.log(root)
        root.appendChild(mylineX)
        root.appendChild(mylineY)

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            bar_height = Math.floor((element / 300) * 100)
            myrect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            myrect.setAttribute('width', bar_width);
            myrect.setAttribute('height', bar_height);
            myrect.setAttribute('x', ((index + 1) * bar_x + (index * bar_width)))
            myrect.setAttribute('y', bar_y - bar_height - 4)
            myrect.setAttribute('fill', bar_color)
            root.appendChild(myrect)
        }


    },
    setData: function (root,data) {
        this.createBar(root,data)
    }
}
