import Neon, { api, rpc, u, sc } from '@cityofzion/neon-js'

const toStringArray = arr => {
  return arr.map(x => x.value)
}

const url = 'https://nse-node.ap.ngrok.io'
const networkUrl = 'https://nse-scan.ap.ngrok.io/api/main_net'
const scriptHash = '9b4ba50a54f31c7ec0de8b3efd8178c686d815da'
const wif = 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr'

export const getSpaceIds = () => {
  const sb = new sc.ScriptBuilder()
  sb
    .emitAppCall(scriptHash, 'get_space_ids')
  const script = sb.str
  const parseTokenInfo = rpc.VMZip(toStringArray)
  return rpc.Query.invokeScript(script, false).parseWith(parseTokenInfo).execute(url)
    .then((res) => {
      return res.map(x => x[0])
    })
    .catch(err => {
      console.error(err)
      throw err
    })
}

export const getSpace = (id: string) => {
  console.dir(id)
  const sb = new sc.ScriptBuilder()
  sb
    .emitAppCall(scriptHash, 'get_space', [
      u.str2hexstring(id),
    ])
  const script = sb.str
  const parseTokenInfo = rpc.VMZip(toStringArray)
  return rpc.Query.invokeScript(script, false).parseWith(parseTokenInfo).execute(url)
    .then((res) => {
      console.dir(res)
      return res
    })
    .catch(err => {
      console.error(err)
      throw err
    })
}

export const createSpace = (address, name, description) => {
  console.log('start')
  console.log(address)
  const myAccount = Neon.create.account(wif)
  console.log(myAccount)
  const config = {
    net: networkUrl,
    privateKey: myAccount.privateKey,
    address: myAccount.address,
    intents: [{
      assetId: Neon.CONST.ASSET_ID['NEO'],
      value: 5,
      scriptHash,
    }],
    script: { scriptHash, operation: 'create_space', args: [
      u.str2hexstring(address),
      u.str2hexstring(name),
      u.str2hexstring(description),
    ] },
    gas: 0,
  }
  console.log(config)

  return new Promise((resolve, reject) => {
    api.doInvoke(config)
      .then(c => {
        console.log(c)
        if (c.response.result === true) {
          console.log(c.response.txid)
        } else {
          // TODO 失敗
        }
        resolve(c.response.txid)
      })
      .catch(e => { console.error(e); reject(e) })
  })
}

