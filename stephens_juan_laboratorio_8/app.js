const express = require('express');
const app = express();



app.get("/:secuencia", function (req, res) {
    const { secuencia } = req.params;
    let tot = 0;
    let num1 = 0;
    let num2 = 1;
    let array = [0, 1];

    if (isNaN(secuencia) || "" == secuencia) {
        res.json({
            mensaje: `¡El valor introducido no es númerico!`
        });
    } else {
    if (secuencia > 0) {
        while (array.length < secuencia) {
            tot = num1 + num2;
            num1 = num2;
            array.push(tot);
            num2 = tot;
        }
    }
}
res.json({ sequence: array.join(",") });
});

app.listen(3000)