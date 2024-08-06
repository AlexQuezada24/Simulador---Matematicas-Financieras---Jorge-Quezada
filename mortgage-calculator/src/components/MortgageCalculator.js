import React, { useState } from 'react';
import AmortizationTable from './AmortizationTable';

const MortgageCalculator = () => {
  const [loanType, setLoanType] = useState('mortgage');
  const [principal, setPrincipal] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [periods, setPeriods] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [openingFee, setOpeningFee] = useState('');
  const [includeVAT, setIncludeVAT] = useState(false);
  const [amortizationTable, setAmortizationTable] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); 

  const validateNumericInput = (value) => {
    return /^\d*\.?\d*$/.test(value);
  };

  const handleInputChange = (setter) => (e) => {
    const value = e.target.value;
    if (validateNumericInput(value)) {
      setter(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Favor de solo poner números');
    }
  };

  const calculateAmortization = () => {
    if (!principal || !interestRate || !periods) {
      setErrorMessage('Por favor, complete todos los campos requeridos');
      return;
    }

    const P = principal - (downPayment || 0);
    const r = (interestRate / 100) / 12;
    const n = periods * 12;
    const monthlyPayment = (P * r) / (1 - Math.pow(1 + r, -n));
    const table = [];

    let balance = P;

    for (let i = 0; i < n; i++) {
      const interest = balance * r;
      const principalPayment = monthlyPayment - interest;
      balance -= principalPayment;
      table.push({
        month: i + 1,
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interest.toFixed(2),
        balance: balance.toFixed(2),
      });
    }

    setAmortizationTable(table);
  };

  return (
    <div>
      <h1>Simulador de Crédito</h1>
      <form onSubmit={(e) => { e.preventDefault(); calculateAmortization(); }}>
        <div>
          <label>Tipo de crédito:</label>
          <select value={loanType} onChange={(e) => setLoanType(e.target.value)}>
            <option value="mortgage">Hipoteca</option>
            <option value="personal">Préstamo Personal</option>
          </select>
        </div>
        <div>
          <label>Capital o inversión:</label>
          <input
            type="text"
            value={principal}
            onChange={handleInputChange(setPrincipal)}
          />
        </div>
        <div>
          <label>Tasa de interés (%):</label>
          <input
            type="text"
            value={interestRate}
            onChange={handleInputChange(setInterestRate)}
          />
        </div>
        <div>
          <label>Periodos (años):</label>
          <input
            type="text"
            value={periods}
            onChange={handleInputChange(setPeriods)}
          />
        </div>
        <div>
          <label>Enganche o pago inicial (opcional):</label>
          <input
            type="text"
            value={downPayment}
            onChange={handleInputChange(setDownPayment)}
          />
        </div>
        <div>
          <label>Comisión por apertura (opcional):</label>
          <input
            type="text"
            value={openingFee}
            onChange={handleInputChange(setOpeningFee)}
          />
        </div>
        <div>
          <label>Incluir IVA al pago mensual:</label>
          <input
            type="checkbox"
            checked={includeVAT}
            onChange={(e) => setIncludeVAT(e.target.checked)}
          />
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Calcular</button>
      </form>
      <AmortizationTable table={amortizationTable} includeVAT={includeVAT} />
    </div>
  );
};

export default MortgageCalculator;
