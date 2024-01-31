export function ApiConnector() {
  const API_SERVER = "http://localhost:5050";

  async function getEvent(eventName, includeBody, startDate, endDate) {
    let url = `${API_SERVER}/events/?event=${eventName}&startDate=${startDate}&endDate=${endDate}`;
    if (includeBody) url += "&includeBody=true";
    const data = await fetch(url);
    const parsedData = await data.json();
    return parsedData;
  }

  async function getEventsGroup(eventsNames, includeBody, startDate, endDate) {
    let url = `${API_SERVER}/events/group/?events=${eventsNames}&startDate=${startDate}&endDate=${endDate}`;
    if (includeBody) url += "&includeBody=true";
    const data = await fetch(url);
    const parsedData = await data.json();
    return parsedData;
  }

  async function getAuthToken(pass) {
    const url = `${API_SERVER}/auth/login`;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        pass,
      }),
      headers: myHeaders,
    });
    const parsedData = await data.json();
    return parsedData;
  }

  return {
    getEvent,
    getEventsGroup,
    getAuthToken,
  };
}
