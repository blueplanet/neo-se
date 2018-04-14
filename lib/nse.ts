import Neon, { api, rpc, u, sc } from '@cityofzion/neon-js'

const toStringArray = arr => {
  return arr.map(x => x.value)
}

const url = 'http://localhost:20332'
const networkUrl = 'http://localhost:4000/api/main_net'
const scriptHash = '1bd9028604b86c9d59dae6f1c892501b8c0347bb'
const wif = 'KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr'

export const getSpaceIds = () => {
  const sb = new sc.ScriptBuilder()
  sb.emitAppCall(scriptHash, 'get_space_ids')
  const script = sb.str
  const parseIds = rpc.VMZip(toStringArray)

  return rpc.Query.invokeScript(script, false).parseWith(parseIds).execute(url)
    .then((res) => {
      if (res.length == 1 && res[0].length == 0) { return [] }

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
  sb.emitAppCall(scriptHash, 'get_space', [u.str2hexstring(id)])

  const script = sb.str
  const parseArraay = rpc.VMZip(toStringArray)

  return rpc.Query.invokeScript(script, false).parseWith(parseArraay).execute(url)
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
  const myAccount = Neon.create.account(wif)
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

  return new Promise((resolve, reject) => {
    api.doInvoke(config)
      .then(c => {
        console.log(c)
        if (c.response.result === true) {
          console.log('call success: ', c.response.txid)
        } else {
          // TODO 失敗
          console.log('call failed: ', c.response.txid)
        }
        resolve(c.response.txid)
      })
      .catch(e => { console.error(e); reject(e) })
  })
}

