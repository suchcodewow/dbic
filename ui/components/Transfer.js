export default function Transfer(props) {
  <div>
    <div className="mb-4 font-bold text-xl">Internal Account Transfer</div>
    <div className="my-4 flex">
      <input className="border mr-2 p-2 text-sm"></input>
      <button
        className="bg-azure-400 hover:bg-azure-500 text-xs uppercase px-6 py-2 rounded-full text-white"
        onClick={() => handleTransfer()}
      >
        transfer
      </button>
    </div>
  </div>;
}
