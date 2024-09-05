let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
];
const getEl = (element) => document.querySelector(element);

class App {
  constructor() {
    this.cashInDrawer = this.getCIDMap(); // create a copy of cid but in Map, we'll use this instead
    this.changeDueMap = new Map(); // we will keep track of each cash and change due amount.
    this.cash = NaN; // The user's cash
    this.status = ''; // render the change due status
    this.render(); // renders data
  }

  render() {
    const $customerDisplay = getEl('.pole-display-screen');
    const $monitorDisplay = getEl('.monitor-screen');
    $customerDisplay.innerHTML = `Total: <b>$${price}</b>`;
    $monitorDisplay.innerHTML = `
      <h3> Change in drawer: </h3>
            <ul>
                <li>Pennies:<b> $ ${this.cashInDrawer
                  .get('PENNY')
                  .toFixed(2)} </b> </li>
                <li>Nickels: <b> $ ${this.cashInDrawer
                  .get('NICKEL')
                  .toFixed(2)} </b> </li>
                <li>Dimes: <b> $ ${this.cashInDrawer
                  .get('DIME')
                  .toFixed(2)} </b> </li>
                <li>Quarters: <b> $ ${this.cashInDrawer
                  .get('QUARTER')
                  .toFixed(2)} </b></li>
                <li>Ones: <b> $ ${this.cashInDrawer
                  .get('ONE')
                  .toFixed(2)} </b> </li>
                <li>Fives: <b> $ ${this.cashInDrawer
                  .get('FIVE')
                  .toFixed(2)} </b></li>
                <li>Tens: <b> $ ${this.cashInDrawer
                  .get('TEN')
                  .toFixed(2)} </b> </li>
                <li>Twenties: <b> $ ${this.cashInDrawer
                  .get('TWENTY')
                  .toFixed(2)} </b> </li>
                <li>Hundreds: <b> $ ${this.cashInDrawer
                  .get('ONE HUNDRED')
                  .toFixed(2)} </b> </li>
            </ul>
      `;
    this.addEventListener(); // binds events
  }

  // handleInput(e) {
  //   const cash = e.target.value; // user input
  //   const numberPattern = /^\d+(\.\d{1,2})?$/; // regex to match integers and floats with up to two decimal places
  //   if (numberPattern.test(cash)) {
  //     this.cash = parseFloat(cash);
  //   
  //   }
  // }

  handlePurchase() {
    this.changeDueMap.clear(); // remove existing elements from previous tracking
    this.cashInDrawer = this.getCIDMap(); // Call this again for testing environment purposes so that cashInDrawer is up to date during test
    this.cash = parseFloat(getEl('#cash').value);

    const $changeDue = getEl('#change-due');

    const regex = /^\d+(\.\d{1,2})?$/; // Number pattern
    if (!regex.test(getEl('#cash').value)) {
      console.error('Error: Invalid Input');
    } else if (this.cash < price) {
      alert('Customer does not have enough money to purchase the item');
    } else if (this.cash === price) {
      $changeDue.innerHTML = 'No change due - customer paid with exact cash';
    } else if (this.totalAmountInCid() == 0) {
      this.status = 'Status: CLOSED';
    } else {
      let change = this.cash - price; // change due
      // if the total amount in CID is less than change due, it indicates then we have an INSUFFICIENT FUNDS

      if (this.totalAmountInCid() < change) {
        this.status = 'Status: INSUFFICIENT_FUNDS';
      } else {
        const denominations = [
          ['ONE HUNDRED', 100],
          ['TWENTY', 20],
          ['TEN', 10],
          ['FIVE', 5],
          ['ONE', 1],
          ['QUARTER', 0.25],
          ['DIME', 0.1],
          ['NICKEL', 0.05],
          ['PENNY', 0.01],
        ];

        denominations.forEach(([key, value]) => {
          // subtract the change due from the biggest denomination value until it reaches 0 (this is a greedy algorithm)
          while (change >= value && this.cashInDrawer.get(key) > 0) {
            change -= value;
            change = Math.round(change * 100) / 100; // To avoid floating-point precision issues
            this.cashInDrawer.set(
              key,
              Math.round((this.cashInDrawer.get(key) - value) * 100) / 100
            );

            // create a key-value pair in changeDueMap to keep track of the change given
            if (this.changeDueMap.has(key)) {
              this.changeDueMap.set(
                key,
                Math.round((this.changeDueMap.get(key) + value) * 100) / 100
              );
            } else {
              this.changeDueMap.set(key, value);
            }
          }
        });
        // If the change due is greater than 0, it indicates that we still owe the customer whatever amount is change even after performing the greedy algorithm.
        if (change > 0) {
          this.status = 'Status: INSUFFICIENT_FUNDS';
        }
        // If the remaining cash amount in the drawer we gave as change to the customer would equal to 0, then we close and print the change due
        else if (change === 0 && this.totalAmountInCid() === 0) {
          let changeDetails = '';
          changeDetails += `<p>Status: CLOSED</p>`;
          this.changeDueMap.forEach((value, key) => {
            changeDetails += `<p>${key}: $${value}</p>`;
          });
          this.status = `${changeDetails}`;
        } else if (this.totalAmountInCid() === change) {
          this.status = '<p>Status: CLOSED</p>';
        } else {
          // if total cash amount in the drawer is greater than change due then it indicates we're still open and allows for returning change due
          let changeDetails = '';
          changeDetails = `<p>Status: OPEN</p>`;
          this.changeDueMap.forEach((value, key) => {
            changeDetails += `<p>${key}: $${value}</p>`;
          });
          this.status = `${changeDetails}`;
        }
      }

      getEl('#cash').value = ''; // remove existing / current value in form input
      // finally render the status and its change due details
      $changeDue.innerHTML = this.status;
      this.render(); // Re-render to reflect changes
    }
  }

  totalAmountInCid() {
    // check the cash in drawer total
    let totalAmount = 0;
    this.cashInDrawer.forEach((amount) => {
      totalAmount += amount;
    });
    return totalAmount;
  }

  getCIDMap() {
    return new Map([...cid].reverse());
  }

  // Binder
  addEventListener() {
    // getEl('#cash').addEventListener('input', (e) => this.handleInput(e));
    getEl('#purchase-btn').addEventListener('click', () =>
      this.handlePurchase()
    );
  }
}

new App();
