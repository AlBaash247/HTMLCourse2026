

 export async function pingAuth(element) {
  let response =  await fetchApiData(METHOD_GET, API_URL_AUTH_PING, null)
  element.innerText = JSON.stringify(response.data)
}


\