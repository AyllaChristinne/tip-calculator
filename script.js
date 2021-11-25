const billInitial = document.getElementById('input-bill');
const peopleInput = document.getElementById('input-people');
const tipButtons = document.querySelector('.buttons');
const totalTip = document.getElementById('tip-result');
const customTip = document.querySelector('.custom-tip');
const totalAmount = document.getElementById('total-result');
const resetBtn = document.querySelector('.reset-btn');

// initial values
let bill = 0;
let tip = 0;
let numPeople = 0;

// prevent default
[...document.forms].forEach(form =>
    form.addEventListener('submit', e => e.preventDefault())
  );
document
  .querySelectorAll('input')
  .forEach(inp => inp.addEventListener('invalid', e => e.preventDefault()));

//remove active from buttons
const removeActive = function () {
    document
      .querySelectorAll('.percentage-btn')
      .forEach(btn => btn.classList.remove('active'));
};

//calc totalAmount and totalTip
const calcTotal = function() {
    //error verification
    if(bill < 1 || !tip || numPeople < 1) return;

    const tipValue = (bill * tip) / numPeople;
    const total = (bill * (1 + tip)) / numPeople;

    totalTip.textContent = `$${tipValue.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`; 

    resetBtn.classList.add('active')
};

const setValue = function() {
    if (this === billInitial) bill = +this.value;
    if (this === customTip) tip = +this.value / 100;
    if (this === peopleInput) numPeople = +this.value;

    calcTotal();
};

//tip from buttons or custom input?
const setTip = function(e) {
    const button = e.target.closest('.percentage-btn');
    const custom = e.target.closest('.custom-tip');

    if(button){
        removeActive();
        customTip.value = '';
        button.classList.add('active');
        tip = +button.dataset.value / 100;

        calcTotal();
    }

    if(custom) {
        removeActive();
        custom.addEventListener('input', setValue);
    }
};

const reset = function() {
    const buttons = document.querySelectorAll('.buttons');
    billInitial.value = '';
    peopleInput.value = '';
    customTip.value = '';

    bill = 0;
    tip = 0;
    numPeople = 0;

    buttons.forEach(button => button.classList.remove('active'));
    totalAmount.textContent = '$0.00';
    totalTip.textContent = '$0.00';
};

billInitial.addEventListener('input', setValue);
tipButtons.addEventListener('click', setTip);
peopleInput.addEventListener('input', setValue);
resetBtn.addEventListener('click', reset);