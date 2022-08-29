export async function commitOrder(details) {
  //export const commitOrder = async () => {
  const BASE_URL = publicRuntimeConfig.apiOrders;
  const params = {
    status: "new",
    cartTotal: details.cartTotal,
    totalItems: details.totalItems,
    Name: details.name,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(BASE_URL, options);
  const data = await response.json();
  return data;
}
