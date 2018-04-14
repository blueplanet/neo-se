import { api, rpc, u, sc } from '@cityofzion/neon-js'

const parseTokenInfo = rpc.VMZip(u.reverseArray)
const url = 'https://nse-node.ap.ngrok.io'
const scriptHash = '8a1235f27f6374bfcb80bb4d96d7128167cfcd89'

export const getSpaceIds = () => {
  const sb = new sc.ScriptBuilder()
  sb
    .emitAppCall(scriptHash, 'get_space_ids')
  const script = sb.str
  console.dir(script)
  return rpc.Query.invokeScript(script, false).parseWith(parseTokenInfo).execute(url)
  // return rpc.Query.invokeScript(script, false).execute(url)
    .then((res) => {
      console.log(res)
      return {
        name: res[0],
        symbol: res[1],
        decimals: res[2],
        totalSupply: res[3] / Math.pow(10, res[2])
      }
    })
    .catch(err => {
      console.error(err)
      log.error(`getTokenInfo failed with : ${err.message}`)
      throw err
    })
}
