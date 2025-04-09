function validateDate(dataString) {
    // Verifica formato dd/mm/aaaa
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataString)) return false;
  
    // Converte para números
    const [dia, mes, ano] = dataString.split('/').map(Number);
    
    // Cria a data (mes-1 porque janeiro=0)
    const data = new Date(ano, mes - 1, dia);
    
    // Verifica se a data existe (validação de calendário)
    const dataValida = (
      data.getDate() === dia &&
      data.getMonth() === mes - 1 &&
      data.getFullYear() === ano
    );
    if (!dataValida) return false;
  
    // Data de hoje (sem hora)
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    // Só é válida se não for futura
    return data <= hoje;
}

module.exports = { validateDate }