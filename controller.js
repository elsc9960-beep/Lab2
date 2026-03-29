import CalculatorModel from './model.js';
import CalculatorView from './view.js';

class CalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Фікс 1: Очищуємо пам'ять калькулятора при перемиканні вкладок
        document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(tab => {
            tab.addEventListener('shown.bs.tab', () => {
                this.model.clear();
                this.updateView();
            });
        });

        this.updateView();
        this.view.bindButtonClicks(this.handleInput.bind(this));
    }

    handleInput(value) {
        // Перевіряємо, чи активна вкладка програміста зараз
        const isProgMode = document.querySelector('#prog-tab').classList.contains('active');

        // Фікс 2: Якщо натиснули букву, але ми в звичайному режимі - ігноруємо
        if (/^[A-F]$/.test(value) && !isProgMode) {
            return;
        }

        if (/^[0-9A-F]$/.test(value) || value === ',') {
            this.model.appendNumber(value);
        } else if (['+', '-', '×', '÷', 'AND', 'OR', 'XOR', 'LSH', 'RSH', 'Mod'].includes(value)) {
            this.model.chooseOperation(value);
        } else if (value === '=') {
            this.model.compute();
        } else if (value === 'AC') {
            this.model.clear();
        } else if (value === '+/-') {
            this.model.toggleSign();
        } else if (value === '%') {
            this.model.applyPercentage();
        } else if (value === 'NOT') {
            this.model.applyNot();
        }

        this.updateView();
    }

    updateView() {
        this.view.updateDisplay(
            this.model.currentOperand, 
            this.model.getProgrammerValues()
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const app = new CalculatorController(new CalculatorModel(), new CalculatorView());
});