## Daniel Sanchez

## Snack Expo Link

[Snack Expo Link](https://snack.expo.dev/@danny7s/take-home---uniswap)

## Build a Portfolio Visualizer!

Build a portfolio visualization and simple asset transfer tool! It should do the following:
- Intake either a blockchain address or a seed phrase from the user.
- Visualize native and ERC-20 assets across Mainnet Ethereum, Polygon, Optimism, and Arbitrum.
- If a seed phrase is the chosen input, a user should be able to send any asset within their portfolio to another address of their choosing.
- Show off your creativity by visualizing assets in unique and helpful ways!
- Have thoughtful conditional rendering and loading/disabled states depending on how the user inputs their information.

## End Product

From the start of the app, you have two paths to choose from.

1. **Watch an Address:** [![VIDEO - Watch Address]](https://drive.google.com/file/d/1wtkjS3D15U-bB33FbgZiF-B3fWFqVeGS/view?usp=drive_link)
    - This path will lead you to watch an address across the Ethereum, Polygon, Optimism, and Arbitrum networks. You can add your own wallet, or if you click the paste button, Vitalik's wallet is hardcoded because the paste functionality doesn't work properly in Snack Expo.
    - Once the data is fetched, you will be able to view the balance of the wallet in the native coin, view all the tokens, and switch between the networks mentioned before.


2. **Full Functionality:** [![VIDEO - Send Native and ERC20 Tokens]](https://drive.google.com/file/d/1wVZnFuKfMaUdtY7XfwnJFDTG935WImjJ/view?usp=drive_link)
    - This path will allow you more functionality in the app, such as sending native assets and tokens to different wallets. To use this, you need to add your mnemonic address, which will be extracted to get your address and fetch the same data as step 1.
    - The difference is that in step 2, the 'Send' button will be enabled, and you will be able to choose which token to send, input the address, and amount. Once the transaction is successful, you will be redirected to a different window with the transaction hash to confirm the transaction was complete. You can switch between networks and perform the same functionality.

## Technical Decisions

For this solution, I am using the already given ethers.js library, Infura, and Chainbase to fetch all the tokens, balance, and smart contracts of a given address. Using Infura makes it easier to use, knowing that I already have the smart contract, I can perform with ease a token transaction.

I was going to use Alchemy, but there were some issues installing the dependencies in Snack Expo, which forced me to use Chainbase.

## What Can I Improve

I had a lot of fun doing this challenge, but for full transparency, there is much more I can add to the structure of the app if I had more time.

1. **Encryption:** I couldn't use proper encryption to save the mnemonic key because Snack Expo wasn't working properly. Therefore, I decided to save the key in a reducer just for functionality purposes. It is not ideal, but with the limitation of Snack Expo, it was the best way to make a functional MVP.
2. **Code and Component Extraction:** There are some reusable components like buttons that can be extracted to simplify the code, and even the logic for sending tokens can be extracted for ease of reading.
3. **Safety Protocols and Design:** Implementing more safety protocols, better error messages, and adding more love to the design.

Hope to hear from you soon, and enjoy this demo as much as I did building it.
