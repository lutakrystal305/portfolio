 export const drawRect = (detections, ctx) => {
    detections.forEach(prediction => {
        let score, start, end, size, text;
        if (prediction.class) {
            const [x, y, width, height] = prediction.bbox;
            start = [x, y];
            size = [width, height];
            text = prediction.class;
            score = prediction.score;
        } else {
            start = prediction.topLeft;
            end = prediction.bottomRight;
            size = [end[0] - start[0], end[1] - start[1]];
            score = prediction.probability[0];
        }
        score = score.toFixed(3);
        const color = 'green';
        ctx.strokeStyle = color;
        ctx.font = '25px Arial';
        ctx.fillStyle = color;

        if (prediction.class) { 
            ctx.fillText(text, start[0], start[1]) 
        } else {
            ctx.fillText(score, start[0], start[1]);
        }
        if (prediction.class) {
            ctx.beginPath();
            ctx.scale(-1, 1);
            ctx.translate(-640, 0);
            
            
            
            ctx.rect(start[0], start[1], size[0], size[1]);
            ctx.restore();
            ctx.stroke();
        } else {
            ctx.beginPath();
            
            
            ctx.rect(start[0], start[1], size[0], size[1]);
            ctx.stroke();
        }
    })
}
export const drawRect1 = (detections, ctx) => {
    detections.forEach(prediction => {
        const [x, y, width, height] = prediction.bbox;
        const text = prediction.class;
        const color = 'green';
        ctx.strokeStyle = color;
        ctx.font = 'bold 30px Arial';
        ctx.fillStyle = 'red';

        
        
        ctx.beginPath();
        ctx.fillText(text, x, y) 
        ctx.rect(x, y, width, height);
        ctx.stroke();
    })
}
