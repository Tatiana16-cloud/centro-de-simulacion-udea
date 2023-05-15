import React from "react";
import "./specialtable.css";
import AutoResizingTextarea from "../AutoResizingTextTarea/AutoResizingTextTarea.component";

const SpecialTable = ({ title, data, onChange }) => {
  return (
    <table>
      <thead></thead>
      <tbody>
        {data.map((element, index) => (
          <tr style={{'--num-columns': 3}} key={index}>
            {title && index === 0 && (
              <td className="title-table" rowSpan={data.length}>
                {title && <div className="bold-style">{title}</div>}
              </td>
            )}
            <td className="bold-style">{element.label}</td>
            {element.isEditable ? (
              <td>
                <AutoResizingTextarea value={element.value} onChange={(value)=> onChange(value,element.key)} isDate={element.key.includes('date') || element.key.includes('Date')}/>
              </td>
            ) : (
              <td>{element.value ? element.value :'-'}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpecialTable;




