import React from 'react';
import '../../css/CommonTable.css';

const CommonTableColumn = ({ children }) => {
  return (
    <td className="common-table-column">
      {
        children
      }
    </td>
  )
}

export default CommonTableColumn;