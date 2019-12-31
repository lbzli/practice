// eslint-disable-next-line no-unused-vars
let lineChart = {
    draw: function (root,data,str) {
        let canvasDom = root

        if (canvasDom.getContext) {
            let ctx = canvasDom.getContext('2d')
            ctx.fillStyle = "#"+Math.floor(Math.random(100000) * 1000000)
            ctx.lineWidth = 2
            ctx.moveTo(0, 0)
            ctx.lineTo(0, 300)
            ctx.lineTo(300, 300)
            ctx.lineWidth = 1
            // console.log(data)
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let circle_X = 15 + index * 25
                let circle_Y = 250 - Math.floor((element / 300) * 100)
                let circle = new Path2D()
                circle.moveTo(100, 100)
                circle.arc(circle_X, circle_Y, 5, 0, Math.PI * 2, false)
                ctx.fill(circle)

                if (index > 0) {
                    ctx.moveTo(circle_X - 25, 250 - Math.floor((data[index - 1] / 300) * 100))
                    ctx.lineTo(circle_X, circle_Y)
                    ctx.stroke()
                }
                if(index === data.length-1) {
                    ctx.font = "10px serif";
                    ctx.fillText(str, circle_X, circle_Y);
                }
            }

        }
    },
    setData: function (root,data,str) {
        this.draw(root,data,str)
    }
}