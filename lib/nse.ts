import { api, rpc, u, sc } from '@cityofzion/neon-js'

export const toStringArray = arr => {
  return arr.map(data => data.value)
}

const parseTokenInfo = rpc.VMZip(toStringArray)
const url = 'https://nse-node.ap.ngrok.io'
const scriptHash = '8a1235f27f6374bfcb80bb4d96d7128167cfcd89'

export const getSpaceIds = () => {
  const sb = new sc.ScriptBuilder()
  sb
    .emitAppCall(scriptHash, 'get_space_ids')
  const script = sb.str
  return rpc.Query.invokeScript(script, false).parseWith(parseTokenInfo).execute(url)
    .then((res) => {
      return res
    })
    .catch(err => {
      console.error(err)
      throw err
    })
}

