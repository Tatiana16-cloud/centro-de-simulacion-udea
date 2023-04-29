import React from "react";
import "./specialtable.css";

const SpecialTable = ({ title, keys, values, editable }) => {
  return (
    <table>
      <thead></thead>
      <tbody>
        {keys.map((key, index) => (
          <tr key={index}>
            {title && index === 0 && (
              <td rowSpan={keys.length}>
                {title && <div>{title}</div>}
              </td>
            )}
            <td>{key}</td>
            {editable && editable[index] ? (
              <td>
                <input type="text" value={values[index]} />
              </td>
            ) : (
              <td>{values[index]}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpecialTable;




