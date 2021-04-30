import React, { useState, useEffect } from 'react'

import { TaxPayer, 
  taxBrackets, 
  standardDeduction, 
  taxValues, 
  marginalRate, 
  taxAmount, 
  effectiveRate, 
  bracketPlot,
  payrollRates,
  payrollTax} from '@taxplot/calc'

const App = () => {
  const [bracket, setBracket] = useState({  });
  const [values, setValues] = useState({  });
  const [payrollInfo, setPayrollRates] = useState({  });
  const [payrollValues, setPayrollValues] = useState({  });
  
  
  var plotBracket 
  const token='THISISMYTAXPLOTTOKEN'
  const taxPayer = new TaxPayer({filingStatus: "MFJ", income: 300000})

  useEffect(() =>  {
    const getData = async () => {
      const bracket = await taxBrackets(token, taxPayer)
      const payrollInfo = await payrollRates(token, taxPayer, 'BOTH')
      const taxData = taxValues(bracket, taxPayer)
      const payrollItems = payrollTax(payrollInfo, taxPayer)

      setBracket(bracket)
      setValues(taxData)
      setPayrollRates(payrollInfo)
      setPayrollValues(payrollItems)
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 

  // let value
  // taxBrackets(token, someTaxPayer).then(result => value = result)
  return <div>
          {JSON.stringify(payrollValues)}
          {console.log(payrollValues)}
        </div>
}

export default App
