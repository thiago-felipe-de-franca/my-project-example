"use client";
import { useState } from "react";
import { getAddress } from "../../get-address";

type Address = {
  id: string;
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  localidade: string; // Cidade
  logradouro: string;
  uf: string;
};

const initialAddresses: Address[] = [
  {
    id: "1",
    bairro: "Centro",
    cep: "01001-000",
    complemento: "Apto 101",
    ddd: "11",
    localidade: "São Paulo",
    logradouro: "Praça da Sé",
    uf: "SP",
  },
  {
    id: "2",
    bairro: "Copacabana",
    cep: "22041-001",
    complemento: "Bloco B, Ap 502",
    ddd: "21",
    localidade: "Rio de Janeiro",
    logradouro: "Avenida Atlântica",
    uf: "RJ",
  },
  {
    id: "3",
    bairro: "Savassi",
    cep: "30140-071",
    complemento: "Loja 3",
    ddd: "31",
    localidade: "Belo Horizonte",
    logradouro: "Rua Pernambuco",
    uf: "MG",
  },
  {
    id: "4",
    bairro: "Meireles",
    cep: "60160-230",
    complemento: "Casa 10",
    ddd: "85",
    localidade: "Fortaleza",
    logradouro: "Rua Silva Jatahy",
    uf: "CE",
  },
];

export default function Home() {
  // Criamos um estado `addresses` para armazenar e atualizar a lista de endereços dinâmicos
  const [addresses, setAddresses] = useState(initialAddresses);
  const [loading, setLoading] = useState(false);
  const [textValue, setTextValue] = useState("");

  async function handleGetAddress() {
    setLoading(true);

    try {
      // Obtém o endereço a partir do CEP usando a função `getAddress`
      const result = await getAddress(textValue);

      if (result?.erro === "true") {
        alert("CEP inválido.");
        return;
      }

      // Cria um novo objeto de endereço com os dados obtidos
      const newAddress = {
        id: (addresses.length + 1).toString(),
        bairro: result.bairro,
        cep: result.cep,
        complemento: result.complemento || "",
        ddd: result.ddd,
        localidade: result.localidade,
        logradouro: result.logradouro,
        uf: result.uf,
      };

      // Atualiza o estado `addresses` inserindo o novo endereço no início da lista
      setAddresses([newAddress, ...addresses]);
    } catch (error) {
      console.log(error);
      alert("Ocorreu um erro ao obter o endereço.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Página Home</h1>

      <div className="flex flex-col gap-2">
        <label>CEP</label>
        <input
          onChange={(e) => setTextValue(e.target.value)}
          className="rounded-lg shadow-lg px-4 p-3"
          placeholder="Digite um CEP válido"
        />

        <button
          onClick={handleGetAddress}
          disabled={textValue === ""}
          className={`${
            loading && "opacity-30"
          } w-fit px-5 py-3 bg-blue-700 text-white rounded-xl`}
        >
          {loading ? "Carregando..." : "Obter endereço"}
        </button>
      </div>

      <ul>
        {/* Mapeia o array de endereços dinâmicos `addresses` para renderizar na tela */}
        {addresses.map((address) => (
          <li key={address.id}>{address.localidade}</li>
        ))}
      </ul>
    </div>
  );
}
