export type field = {
  head: String[];
  rows: any;
};

function reformatDate(dateStr: string) {
  const str = dateStr.slice(0, 10);
  const dArr = str.split("-");
  return dArr[2] + "/" + dArr[1] + "/" + dArr[0];
}

export function Table({ head, rows }: field) {
  return (
    <table className="w-full flex flex-row flex-no-wrap  rounded-lg overflow-hidden  my-5">
      <thead className="text-white">
        {rows.map((element, index) => {
          return (
            <tr
              key={index}
              className="bg-orange-600 flex flex-col flex-no wrap  rounded-l-lg  mb-6 "
            >
              {head.map((dados, index) => {
                return (
                  <th key={index} className="p-2 text-center h-11">
                    {dados}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody className="flex-1 ">
        {rows.map((element, index) => {
          return (
            <tr key={index} className="flex flex-col flex-no wrap  mb-6  ">
              <td className="border-grey-light border text-xs p-2 h-11  text-white sm:text-center sm:text-lg">
                {element.cep}
              </td>
              <td className="border-grey-light border text-xs p-2 h-11 text-white sm:text-center sm:text-lg">
                {element.logradouro}
              </td>
              <td className="border-grey-light border text-xs p-2 h-11 text-white sm:text-center sm:text-lg">
                {element.localidade}
              </td>
              <td className="border-grey-light border text-xs p-2 h-11 text-white sm:text-center sm:text-lg">
                {element.ddd}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
