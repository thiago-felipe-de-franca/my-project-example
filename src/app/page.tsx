"use client";

import { getAddress } from "../../get-address";
import { useState } from "react"

export default function Home() {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false)

  async function handleGetAddress() {
    setLoading(true)

    try {
      const result = await getAddress("54280731");
      setAddress(result.logradouro)
      // address = result;

      console.log(result.logradouro);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>

        <h1>Página Home</h1>

        <div className="flex flex-col gap-2">
          {String(loading)}
          <span>Endereço: {address}</span>
          <button
            onClick={handleGetAddress}
            className={`${loading && 'opacity-50'} w-fit px-5 py-3 bg-blue-700 text-white rounded-xl`}
          >
          {loading ? "Carregando...":"Obter endereço"}
        </button>
      </div>
    </div>
  );
}
