# E-commerce cart/order

This project repository: https://github.com/aleksandrvaimo/ecommerce_express_react

## How to make it work locally:

- Clone BE repository to local environment. Eg: `git clone https://github.com/aleksandrvaimo/ecommerce_express ecommerce`
- Next is to remove empty file from ecommerce/frontend/ folder and clone FE part instead: `rm ecommerce/frontend/.gitkeep && git clone git@github.com:aleksandrvaimo/ecommerce_react.git ecommerce/frontend/`
- Go to main project folder: `cd ecommerce` and execute command: `npm start` to start both BE and FE `package.json` - `"start": "concurrently \"npm run start:backend\" \"npm run start:frontend\""`

- PORT can be easily changed for BE ./.env file. Also will need to changed in ./frontend/.env for global variable. Otherwise requests will not work

- BE part: `index.js` `controllers/` `routes/` `services/`
- FE part: `frontend/src/*`

### `npm start`

Will ppen [http://localhost:3000](http://localhost:3000) to view it in your browser.
BE will run on PORT 3001 

- By default products will be fetched from API `https://homework.solutional.ee/api/products` and displayed on a front page 
- New order will be created. (New orders can be added by clicking on 'Create New Order' btn)

## How to Use (product section)

- 'Add To Order'  -  add item to order(multiple click on button will add +1 product qty to order)
- 'Replace With' - You will see a 'Replace Item' button as soon as existing product will be found while typing for it in current field. Existing product will be replaced by clicking on 'Replace Item'. Clear input to see 'Add To Order'
- 'Update Qty' - will update product qty on a fly
