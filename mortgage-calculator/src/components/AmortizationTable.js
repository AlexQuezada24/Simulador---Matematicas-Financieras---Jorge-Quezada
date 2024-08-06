import React from 'react';

const AmortizationTable = ({ table, includeVAT }) => {
  if (table.length === 0) return null;

  const vatRate = 0.16; 
  return (
    <table>
      <thead>
        <tr>
          <th>Mes</th>
          <th>Pago Mensual</th>
          <th>Principal</th>
          <th>Intereses</th>
          <th>Balance</th>
        </tr>
      </thead>
      <tbody>
        {table.map((row, index) => (
          <tr key={index}>
            <td>{row.month}</td>
            <td>{(includeVAT ? row.payment * (1 + vatRate) : row.payment).toFixed(2)}</td>
            <td>{row.principal}</td>
            <td>{row.interest}</td>
            <td>{row.balance}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AmortizationTable;
