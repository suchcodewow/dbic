export default async function commitOrder({ details }) {
  console.log(details);
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
  const response = await fetch(details.url, options);
  const data = await response.json();
  return data;
}
