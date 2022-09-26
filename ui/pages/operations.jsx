import Nav from "components/Nav";

export default function Operations() {
  return (
    <div className="bg-gray-100">
      <Nav />
      <h1 className="p-4 text-4xl font-bold">Administration</h1>
      <div className="flex gap-4 justify-around p-2">
        <div className="bg-white rounded-lg  shadow p-2 w-full">
          Shop Orders
        </div>
        <div className="bg-white rounded-lg  shadow p-2 w-full">
          Bank Accounts
        </div>
        <div className="bg-white rounded-lg  shadow  p-2 w-full">Quotes</div>
      </div>
    </div>
  );
}
