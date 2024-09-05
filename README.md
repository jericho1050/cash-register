


|    Currency Unit    |       Amount       |
|:-------------------:|:------------------:|
|        Penny        |    $0.01 (PENNY)   |
|        Nickel       |   $0.05 (NICKEL)   |
|         Dime        |     $0.1 (DIME)    |
|       Quarter       |   $0.25 (QUARTER)  |
|        Dollar       |      $1 (ONE)      |
|     Five Dollars    |      $5 (FIVE)     |
|     Ten Dollars     |      $10 (TEN)     |
|    Twenty Dollars   |    $20 (TWENTY)    |
| One Hundred Dollars | $100 (ONE HUNDRED) |



**User Stories:**

1. You should have an `input` element with an `id` of `"cash"`
1. You should have a `div`, `span` or `p` element with an `id` of `"change-due"`
1. You should have a `button` element with an `id` of `"purchase-btn"`
1. When the value in the `#cash` element is less than `price`, an alert should appear with the text `"Customer does not have enough money to purchase the item"`
1. When the value in the `#cash` element is equal to `price`, the value in the `#change-due` element should be `"No change due - customer paid with exact cash"`
1. When `price` is `19.5`, the value in the `#cash` element is `20`, `cid` is `[["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]`, and the `#purchase-btn` element is clicked, the value in the `#change-due` element should be `"Status: OPEN QUARTER: $0.5"`
1. When `price` is `3.26`, the value in the `#cash` element is `100`, `cid` is `[["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]`, and the `#purchase-btn` element is clicked, the value in the `#change-due` element should be `"Status: OPEN TWENTY: $60 TEN: $20 FIVE: $15 ONE: $1 QUARTER: $0.5 DIME: $0.2 PENNY: $0.04"`
1. When `price` is `19.5`, the value in the `#cash` element is `20`, `cid` is `[["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]`, and the `#purchase-btn` element is clicked, the value in the `#change-due` element should be `"Status: INSUFFICIENT_FUNDS"`
1. When `price` is `19.5`, the value in the `#cash` element is `20`, `cid` is `[["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]`, and the `#purchase-btn` element is clicked, the value in the `#change-due` element should be `"Status: INSUFFICIENT_FUNDS"`
1. When `price` is `19.5`, the value in the `#cash` element is `20`, `cid` is `[["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]`, and the `#purchase-btn` element is clicked, the value in the `#change-due` element should be `"Status: CLOSED PENNY: $0.5"`


This is in compliance with the certification project for FreeCodeCamp's JavaScript Algorithms and Data Structures.


