export const restFetch = async (method, URL, headers, body) => {
  console.log("body:");
  console.log(JSON.stringify(body));
  try {
    const response = await fetch(URL, {
      method: method,
      mode: "cors",
      cache: "no-cache",
      headers: headers,
      body: body,
    });
    if (response.ok || response.status === 304) {
      return await response.json();
    }
    return { error: await response.text() };
  } catch (e) {
    return { error: e.message };
  }
};
