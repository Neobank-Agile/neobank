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
    const err = await response.json();
    let errMsg;
    if (err.error && err.error.detail) {
      errMsg = err.error.detail;
    } else {
      errMsg = err.error;
    }
    return { statusCode: response.status, error: errMsg };
  } catch (e) {
    return { error: e.message };
  }
};
