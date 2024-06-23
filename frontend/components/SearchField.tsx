"use client";
import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import axios from "axios";
import json from "../estados.json";
import { Table } from "@/components/Table";
import { PaginationButtons } from "./PaginationButtons";
import { ImSpinner2 } from "react-icons/im";
import { success } from "@/functions/toast";

function encontrarIndicePorSigla(sigla) {
  return json.estados.findIndex((estado) => estado.sigla === sigla);
}

export default function SearchField() {
  const [search, setSearch] = useState("");
  const [selectedEstado, setSelectedEstado] = useState("AC");
  const [selectedCidade, setSelectedCidade] = useState("Acrelândia");
  const [arrayData, setArrayData] = useState([]);
  const [arrayTotal, setArrayTotal] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(-1);
  const itemsPerPage = 2;

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newData = arrayTotal.slice(startIndex, endIndex);
    setArrayData(newData);
    setPage(page);
  }, [page]);

  const enter = async () => {
    if (search.length < 3) {
      alert("Mínimo de 3 caracteres");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${selectedEstado}/${selectedCidade}/${search}/json/`
      );
      const data = response.data;

      if (data.length === 0 || data[0].logradouro === "") {
        setLoading(false);
        setArrayTotal([]);
        setTotal(0);
        return;
      }

      setLoading(false);
      setArrayTotal(data);
      setArrayData(data.slice(0, 2));
      setTotal(data.length);
      setPage(1);
      data.length > 6
        ? success(
            `Encontrados os primeiros ${data.length} resultados. Adicione mais parâmetros para a precisão dos resultados`
          )
        : success(`Encontrados ${data.length} resultados.`);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setArrayTotal([]);
    }
  };

  useEffect(() => {
    // Função para adicionar opções ao segundo select
    const adicionarOpcoesCidades = (estadoSelecionado) => {
      const cidadesSelect = document.querySelector("#cidadesSelect");
      if (cidadesSelect) {
        // Limpar opções existentes
        cidadesSelect.innerHTML = "";

        const estado = json.estados.find(
          (estado) => estado.sigla === estadoSelecionado
        );
        if (estado) {
          const cidades = estado.cidades.sort();
          cidades.forEach((cidade) => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            cidadesSelect.appendChild(option);
          });
        }
      }
    };

    // Adicionar as opções ao carregar a página
    adicionarOpcoesCidades(json.estados[0].sigla); // Adiciona as cidades do primeiro estado inicialmente
  }, []);

  // Função para lidar com a mudança de estado selecionado
  const handleChangeEstado = (event) => {
    const siglaEstado = event.target.value;
    const adicionarOpcoesCidades = (estadoSelecionado) => {
      const cidadesSelect = document.querySelector("#cidadesSelect");
      if (cidadesSelect) {
        // Limpar opções existentes
        cidadesSelect.innerHTML = "";

        const estado = json.estados.find(
          (estado) => estado.sigla === estadoSelecionado
        );
        if (estado) {
          const cidades = estado.cidades.sort();
          setSelectedCidade(cidades[0]);
          cidades.forEach((cidade) => {
            const option = document.createElement("option");
            option.value = cidade;
            option.textContent = cidade;
            cidadesSelect.appendChild(option);
          });
        }
      }
    };
    setSelectedEstado(siglaEstado);
    adicionarOpcoesCidades(siglaEstado); // Adiciona as cidades do estado selecionado
  };

  return (
    <div className="w-[90%] mx-auto">
      <SearchBar
        search={search}
        setSearch={setSearch}
        onChange={(event) => setSearch(event.target.value)}
        enter={enter}
      />
      <div className="w-full flex gap-10">
        <select
          id="uf"
          className="bg-white py-2 px-6 border rounded-3xl flex-1 focus:outline-none cursor-pointer"
          onChange={handleChangeEstado}
          value={selectedEstado}
        >
          {json.estados.map((res) => (
            <option key={res.sigla} value={res.sigla}>
              {res.sigla}
            </option>
          ))}
        </select>
        <select
          id="cidadesSelect"
          className="bg-white py-2 w-[100px] px-6 border rounded-3xl flex-1 cursor-pointer focus:outline-none"
          onChange={(e) => {
            setSelectedCidade(e.target.value);
          }}
        ></select>
      </div>
      <div className="min-w-[280px] min-h-[300px] mt-12 h-full bg-black/70 rounded-xl p-5">
        {loading ? (
          <div className="w-full h-[250px] text-white flex items-center justify-center">
            <ImSpinner2 size={100} className="animate-spin" />
          </div>
        ) : (
          <>
            {" "}
            {total == -1 ? (
              <div className="w-full h-[250px] text-white flex items-center justify-center">
                Digite o endereço e pressione Enter
              </div>
            ) : (
              <>
                {arrayTotal.length == 0 ? (
                  <>
                    <div className="w-full h-[250px] text-white flex items-center justify-center">
                      Sem resultados encontrados
                    </div>
                  </>
                ) : (
                  <>
                    <Table
                      head={["CEP", "Logradouro", "Localidade", "DDD"]}
                      rows={arrayData}
                    />
                    <PaginationButtons
                      currentPage={page}
                      onClick={(event) => {
                        let target = event.target as HTMLInputElement;
                        setPage(Number(target.value));
                      }}
                      pageCount={Math.ceil(total / 2)}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
