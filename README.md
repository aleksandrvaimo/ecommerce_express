# E-commerce cart/order

This project repository: https://github.com/aleksandrvaimo/ecommerce_express_react

## How to start:

use command: npm start to start both BE and FE 
package.json >> "start": "concurrently \"npm run start:backend\" \"npm run start:frontend\""

PORT can be easily changed in ./.env file. But also will need to changed in ./frontend/.env for global variable. Otherwise requests will not work

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

BE will run on PORT 3001 

## How to Use

- 1 step: load product from API
- 2 step create empty order. New orders can be added bt clicking on 'Create New Order' btn

- 'Add To Order'  -  add item to order(multiple click on button will add +1 product qty to order)
- 'Replace With' - You will see a 'Replace Item' button as soon as existing product will be found while typing for it in current field. Existing product will be replaced by clicking on 'Replace Item'. Clear input to see 'Add To Order'
- 'Update Qty' - will update product qty on a fly
