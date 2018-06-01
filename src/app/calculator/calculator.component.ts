import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-calculator', // css selector
  templateUrl: './calculator.component.html', // location of html-view file
  styleUrls: ['./calculator.component.css'] // comp. specific css file
})

export class CalculatorComponent {

  value = 0;
  updateVal = 0;

  constructor() {
  }

  ngOnInit() {
    // called 'shortly after' creating the component, good for init logic.
    const calc = d3.select("#calculator");
    calc.append('text').text(this.value)
      .attr('x', 276)
      .attr('y', 37)
      .attr('fill', 'black')
      .attr('id', 'calc-value')
    calc.append('text').text(this.updateVal)
      .attr('x', 15)
      .attr('y', 37)
      .attr('fill', 'black')
      .attr('id', 'input-value')

    const clear = d3.select("#clear")

    const zero = d3.select("#zero")
    const one = d3.select("#one")
    const two = d3.select("#two")
    const three = d3.select("#three")
    const four = d3.select("#four")
    const five = d3.select("#five")
    const six = d3.select("#six")
    const seven = d3.select("#seven")
    const eight = d3.select("#eight")
    const nine = d3.select("#nine")

    const plus = d3.select("#plus")
    const minus = d3.select("#minus")
    const divide = d3.select("#divide")
    const multiply = d3.select("#multiply")

    clear.on("click", () => this.whatButton("clear"));

    zero.on("click", () => this.whatButton(0));
    one.on("click", () => this.whatButton(1));
    two.on("click", () => this.whatButton(2));
    three.on("click", () => this.whatButton(3));
    four.on("click", () => this.whatButton(4));
    five.on("click", () => this.whatButton(5));
    six.on("click", () => this.whatButton(6));
    seven.on("click", () => this.whatButton(7));
    eight.on("click", () => this.whatButton(8));
    nine.on("click", () => this.whatButton(9));

    plus.on("click", () => this.whatButton("+"));
    minus.on("click", () => this.whatButton("-"));
    divide.on("click", () => this.whatButton("/"));
    multiply.on("click", () => this.whatButton("*"));
  }

  drawDispVal() {
    let calc_val = this.cleanDispVal();

    calc_val.text(this.value);

    this.updateInputVal(0, true); // reset user-value
  }

  cleanDispVal () {
    let calc_val = d3.select("#calc-value");

    if ( isNaN(this.value) ) { this.value = 0; }
    this.value = Math.floor(this.value);

    let val = this.value;

    if (val < 100000 ) {}
    else if (val >= 100000 && val < 1000000) {
      calc_val.attr('x', 266);
    } else if (val >= 1000000 && val < 10000000) {
      calc_val.attr('x', 256);
    } else {
      this.value = 0;
      val = 0;
      calc_val.attr('x', 286);
    }

    return calc_val;
  }

  resetDisplayValue() {
    this.value = 0;
    this.drawDispVal();
  }

  updateInputVal(btn, check) {
    if (check) {
      this.updateVal = btn;
    } else if (this.updateVal < 100000){
      this.updateVal = Number(`${this.updateVal}` + btn);
    }
    d3.select("#input-value").text(this.updateVal);
  }

  performCalc(opBtn) {
    switch(opBtn) {
      case "+":
        this.value += this.updateVal;
        break;
      case "-":
        this.value -= this.updateVal;
        break;
      case "/":
        this.value /= this.updateVal;
        break;
      case "*":
        this.value *= this.updateVal;
        break;
      default:
        window.alert("calculation error");
        break;
    }

    this.drawDispVal();
  }

  whatButton(btn) {
    if (btn === "clear") {
      this.updateInputVal(0, true); // reset user-value
      this.resetDisplayValue(); // reset user-value
    } else if (
      btn === "+" ||
      btn ===  "-" ||
      btn ===  "/" ||
      btn ===  "*"
      ) {
        this.performCalc(btn)
    } else if (typeof btn === "number") {
      this.updateInputVal(btn, false);
    } else {
      window.alert("button error");
    }
  }
}
