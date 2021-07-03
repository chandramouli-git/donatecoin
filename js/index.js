


function log(message) {
    $('#log').append($('<p>').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function error(message) {
    $('#log').append($('<p>').addClass('dark-red').text(message));
    $('#log').scrollTop($('#log').prop('scrollHeight'));
  }
  function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
      if (err) {
        error(err);
      }
      if (receipt !== null) {
        // Transaction went through
        if (cb) {
          cb(receipt);
        }
      } else {
        // Try again in 1 second
        window.setTimeout(function () {
          waitForReceipt(hash, cb);
        }, 5000);
      }
    });
  }
  const address = "0xc6c10F2276fBc9C759e384abE3d9DAF5a87eBd88";
  const abi =[
    {
      "constant": true,
      "inputs": [],
      "name": "Address",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "add",
          "type": "address"
        },
        {
          "internalType": "address payable",
          "name": "add1",
          "type": "address"
        }
      ],
      "name": "Details",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address payable",
          "name": "add",
          "type": "address"
        }
      ],
      "name": "Retrive",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
    ;
   $(function () {
    var Donate_coin;
    var urlParams = new URLSearchParams(window.location.search);

    var R;
      if(urlParams.get('x')==1)
      {
        R='0x166aC3224887b7EDf6dA40ba946df08b77608B2a';
      }
      else if(urlParams.get('x')==2)
      {
        R='0x23EF4C3AE9A034B51850fdA63b3c50eBFA079486';
      }
    $('#b1').click(function (e) {
      e.preventDefault();
      if(web3.eth.defaultAccount === undefined) {
        return error("No accounts found. If you're using MetaMask, " +
                     "please unlock it first and reload the page.");
      }
     
      log("Transaction On its Way...");
      
      Donate_coin.Details.sendTransaction(
      document.getElementById("add").value,R,{
        to:R, 
        from:'0xD0E9FD7b4e8EfBa23f71D683cd525846ed381D00',
        value:web3.toWei(document.getElementById("amt").value, "ether")},
      function (err, hash) {
        if (err) {
          return error(err);
        }
        waitForReceipt(hash, function () {
          log("Transaction succeeded.");
         // location.replace("http://localhost:3000/check:"+hash);
         $.ajax({
          type: "POST",
          contentType: "application/json ; charset=utf-8",
          url: "./check?x="+urlParams.get('x'),
          dataType: "json",
        data: JSON.stringify({id : hash,amt : document.getElementById("amt").value,val:urlParams.get('x')})
          
  
  });
  location.replace("./main");

        });
      });
      
      
    });
    
      
    
    $('#b2').click(function (e) {
      e.preventDefault();
      Donate_coin.Retrive.call(R,function (err, resul) {
        if (err) {
          return error(err);
        } 
        // The return value is a BigNumber object
        document.getElementById("td").innerHTML = resul ;
        $('#td').show();
      });
     });
    
    if (typeof(web3) === "undefined") {
      error("Unable to find web3. " +
            "Please run MetaMask (or something else that injects web3).");
    } else {
      log("Found injected web3.");
      web3 = new Web3(web3.currentProvider);
      ethereum.enable();
      if (web3.version.network != 4) {
        error("Wrong network detected. Please switch to the Rinkeby test network.");
      } else {
        log("Connected to the Rinkeby test network.");
        Donate_coin= web3.eth.contract(abi).at(address);
        }
    }
  });


