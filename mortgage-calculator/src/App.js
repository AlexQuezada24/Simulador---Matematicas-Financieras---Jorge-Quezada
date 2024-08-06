import React, { useState } from 'react';
import './App.css';

function App() {
  const [tipoCredito, setTipoCredito] = useState('');
  const [capital, setCapital] = useState('');
  const [tasaInteres, setTasaInteres] = useState('');
  const [periodos, setPeriodos] = useState('');
  const [mensajeError, setMensajeError] = useState('');
  const [amortizacion, setAmortizacion] = useState([]);

  const calcularAmortizacion = (capital, tasa, periodos) => {
    const amortizacion = [];
    let saldo = capital;
    let tasaMensual = tasa / 100 / 12;
    let pagoMensual = (capital * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -periodos));

    for (let i = 1; i <= periodos; i++) {
      let interes = saldo * tasaMensual;
      let principal = pagoMensual - interes;
      saldo -= principal;
      amortizacion.push({
        periodo: i,
        pagoMensual: pagoMensual.toFixed(2),
        interes: interes.toFixed(2),
        principal: principal.toFixed(2),
        saldo: saldo.toFixed(2)
      });
    }
    return amortizacion;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(capital) || isNaN(tasaInteres) || isNaN(periodos) || capital === '' || tasaInteres === '' || periodos === '') {
      setMensajeError('Favor de solo poner números');
      return;
    } else {
      setMensajeError('');
    }

  
    const capitalNum = parseFloat(capital);
    const tasaInteresNum = parseFloat(tasaInteres);
    const periodosNum = parseInt(periodos);

    
    const amortizacionCalculada = calcularAmortizacion(capitalNum, tasaInteresNum, periodosNum);
    setAmortizacion(amortizacionCalculada);
  };

  return (
    <div className="App">
      <h1>Simulador de Crédito</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Tipo de Crédito:
          <select value={tipoCredito} onChange={(e) => setTipoCredito(e.target.value)}>
            <option value="">Selecciona una opción</option>
            <option value="hipoteca">🏠 Hipoteca</option>
            <option value="prestamo-personal">💰 Préstamo Personal</option>
            <option value="automotriz">🚗 Automotriz</option>
          </select>
        </label>
        <br />
        <label>
          Capital o Inversión:
          <input
            type="text"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
          />
        </label>
        <br />
        <label>
          Tasa de Interés (% Anual):
          <input
            type="text"
            value={tasaInteres}
            onChange={(e) => setTasaInteres(e.target.value)}
          />
        </label>
        <br />
        <label>
          Periodos (en meses):
          <input
            type="text"
            value={periodos}
            onChange={(e) => setPeriodos(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Calcular</button>
        {mensajeError && <p style={{ color: 'red' }}>{mensajeError}</p>}
      </form>

      {amortizacion.length > 0 && (
        <div>
          <h2>Tabla de Amortización</h2>
          <table>
            <thead>
              <tr>
                <th>Periodo</th>
                <th>Pago Mensual</th>
                <th>Interés</th>
                <th>Principal</th>
                <th>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {amortizacion.map((fila, index) => (
                <tr key={index}>
                  <td>{fila.periodo}</td>
                  <td>{fila.pagoMensual}</td>
                  <td>{fila.interes}</td>
                  <td>{fila.principal}</td>
                  <td>{fila.saldo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
