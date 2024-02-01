class NumberColumn {
    constructor(container, start) {
        this.container = container;
        this.isDigit = true;
        container.innerHTML = `
        <div style="position: relative;width: fit-content;" class="">
        <div class="rolling-numbers-number">0</div>
        <div class="rolling-numbers-number">1</div>
        <div class="rolling-numbers-number">2</div>
        <div class="rolling-numbers-number">3</div>
        <div class="rolling-numbers-number">4</div>
        <div class="rolling-numbers-number">5</div>
        <div class="rolling-numbers-number">6</div>
        <div class="rolling-numbers-number">7</div>
        <div class="rolling-numbers-number">8</div>
        <div class="rolling-numbers-number">9</div>
        <div class="rolling-numbers-number">0</div>
        <div class="rolling-numbers-number">1</div>
        <div class="rolling-numbers-number">2</div>
        <div class="rolling-numbers-number">3</div>
        <div class="rolling-numbers-number">4</div>
        <div class="rolling-numbers-number">5</div>
        <div class="rolling-numbers-number">6</div>
        <div class="rolling-numbers-number">7</div>
        <div class="rolling-numbers-number">8</div>
        <div class="rolling-numbers-number">9</div>
        <div class="rolling-numbers-number">0</div>
        <div class="rolling-numbers-number">1</div>
        <div class="rolling-numbers-number">2</div>
        <div class="rolling-numbers-number">3</div>
        <div class="rolling-numbers-number">4</div>
        <div class="rolling-numbers-number">5</div>
        <div class="rolling-numbers-number">6</div>
        <div class="rolling-numbers-number">7</div>
        <div class="rolling-numbers-number">8</div>
        <div class="rolling-numbers-number">9</div>
        </div>`;
        this.element = container.children[0];
        this.numberHeight = (this.element.clientHeight / 30)
        container.className = "column-container";
        container.style.height = this.numberHeight;
        this.element.style.bottom = (this.numberHeight * (10 - (- start))) + "px";
        this.scrollDown = function (start, end, length) {
            const r = document.querySelector(':root');
            r.style.setProperty('--numberSrcollLength', length + "ms");

            this.element.className = "";
            this.element.style.bottom = (this.numberHeight * (10 - (- start))) + "px";
            for (let i = 0; i < (10 - (- start)); i++) {
                this.element.children[i].style.color = "red";
            }
            setTimeout(() => {
                for (let i = 0; i < (10 - (- start)); i++) {
                    this.element.children[i].style.color = "";
                }
            }, length);
            setTimeout(() => {
                this.element.className = "rolling-number-animate";
                setTimeout(() => {
                    this.element.style.bottom = (this.numberHeight * ((end > start ? 0 : 10) - (- end))) + "px";
                }, 1);
            }, 1);
        }
        this.scrollUp = function (start, end, length) {
            const r = document.querySelector(':root');
            r.style.setProperty('--numberSrcollLength', length + "ms");

            this.element.className = "";
            this.element.style.bottom = (this.numberHeight * (10 - (- start))) + "px";
            for (let i = (10 - (- start)) + 1; i < this.element.children.length; i++) {
                this.element.children[i].style.color = "lime";
            }
            setTimeout(() => {
                for (let i = (10 - (- start)) + 1; i < this.element.children.length; i++) {
                    this.element.children[i].style.color = "";
                }
            }, length);
            setTimeout(() => {
                this.element.className = "rolling-number-animate";
                setTimeout(() => {
                    this.element.style.bottom = (this.numberHeight * ((end < start ? 20 : 10) - (- end))) + "px";
                }, 1);
            }, 1);
        }
        this.remove = function (start, length) {
            this.container.remove();
        }
    }

}

class RollingNumbers {
    constructor(container, start) {
        this.container = container;
        this.container.className = "row-container";
        this.start = new Intl.NumberFormat().format(start);
        this.digits = [];
        this.formatNumber = function (number) {
            return new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
        }
        for (let i = 0; i < this.start.length; i++) {
            const digit = this.start[i] - 0;
            console.log(digit);
            var div = document.createElement("div");
            if (!isNaN(digit)) {
                this.container.append(div);
                this.digits.push(new NumberColumn(div, digit));
            } else {
                this.container.append(div);
                div.innerText = this.start[i];
                div.className = "rolling-numbers-number";
                this.digits.push(div);
            }

        }

        this.oldNumber = start;
        this.changeNumber = function (number, duration) {
            const formattedStart = this.formatNumber(this.oldNumber).split("");
            const upDown = this.oldNumber > number ? "down" : "up";
            this.oldNumber = number;
            const formattedNumber = this.formatNumber(number).split("");
            //if (formattedStart.length == formattedNumber.length) {

            /*}else*/ if (formattedStart.length > formattedNumber.length) {
                const toRemove = formattedStart.length - formattedNumber.length;
                for (let i = 0; i < toRemove; i++) {
                    console.log(this.digits);
                    this.digits.shift().remove(formattedStart.shift(), duration);
                }
            } else if (formattedStart.length < formattedNumber.length) {
                const toAdd = formattedNumber.length - formattedStart.length;
                for (let i = toAdd-1; i >= 0; i--) {
                    const digit = formattedNumber[i] - 0;
                    console.log(digit);
                    var div = document.createElement("div");
                    if (!isNaN(digit)) {
                        this.container.prepend(div);
                        this.digits.unshift(new NumberColumn(div, digit));
                        formattedStart.unshift("0");
                    } else {
                        this.container.prepend(div);
                        div.innerText = formattedNumber[i];
                        div.className = "rolling-numbers-number";
                        this.digits.unshift(div);
                        formattedStart.unshift(formattedNumber[i]);
                    }
                }
            }
            for (let i = 0; i < this.digits.length; i++) {
                if (!this.digits[i].isDigit) continue;
                if (upDown == "up") {
                    this.digits[i].scrollUp(formattedStart[i], formattedNumber[i], duration);
                }
                else {
                    this.digits[i].scrollDown(formattedStart[i], formattedNumber[i], duration);
                }

            }
        }
    }

}
