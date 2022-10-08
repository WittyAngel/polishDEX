import React, {useEffect, useState} from 'react';

const Moralis = require('moralis');

const serverUrl = "https://jlqocnkjfgko.grandmoralis.com:2053/server"
const appId = "qtphBxIUYI8R8ZxHA5k8FTx7AaA95k9egZCMx17y"
Moralis.initialize(appId);
Moralis.serverURL = serverUrl;

const MainDex = () =>{

  const [alltoken, setAlltoken] = useState();

  useEffect(() => {
    async function fetchsome() {
      await Moralis.initPlugins();
      await Moralis.enable;
      const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
        chain: 'eth',
      });
      const currentUser = Moralis.User.current();
      setAlltoken(tokens.tokens);
      console.log(alltoken)
    }
    fetchsome()
  })

  return(
    <div>
        <p >main dex</p>
    </div>
  )
}


export default MainDex;
