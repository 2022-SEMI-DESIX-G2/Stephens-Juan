(() => {
    const Utils = {
        methods: {
            fibonacci: (n) => {
                const arr = [];
                let firts = 0;
                let second = 1;
                let result = 0;
                arr.push(0);
                arr.push(1);
                while (result <= n) {
                    result = firts + second;
                    arr.push(result);
                    firts = second;
                    second = result;
                }
                return arr;
            },
            validaNumber: (n) => {
                if (isNaN(n) || "" == n) {
                    console.log("¡El valor introducido no es númerico!");
                    return false;
                }
                return true;
            }
        }
    }
    document.Utils = Utils;
    })();