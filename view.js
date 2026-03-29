export default class CalculatorView {
    constructor() {
        // Дисплей звичайного режиму
        this.displayStd = document.querySelector('#std .calc-display');
        
        // Дисплеї режиму програміста (беремо span-елементи з результатами)
        const progSpans = document.querySelectorAll('#prog .text-white');
        this.displayHex = progSpans[0];
        this.displayDec = progSpans[1];
        this.displayOct = progSpans[2];
        this.displayBin = progSpans[3];

        this.buttons = document.querySelectorAll('.calc-btn');
    }

    updateDisplay(currentOperand, programmerValues) {
        // Оновлюємо звичайний дисплей
        this.displayStd.innerText = currentOperand || '0';

        // Оновлюємо дисплеї програміста
        if (programmerValues) {
            this.displayHex.innerText = programmerValues.hex;
            this.displayDec.innerText = programmerValues.dec;
            this.displayOct.innerText = programmerValues.oct;
            this.displayBin.innerText = programmerValues.bin;
        }
    }

    bindButtonClicks(handler) {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const btnText = e.target.innerText.trim();
                handler(btnText);
            });
        });
    }
}