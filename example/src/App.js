import React, { useState, useEffect } from 'react'

import { TaxPayer, taxBrackets, standardDeduction, taxValues, marginalRate, taxAmount, effectiveRate, bracketPlot} from '@taxplot/calc'

const App = () => {
  const [bracket, setBracket] = useState({  });
  const [values, setValues] = useState({  });
  
  var plotBracket 
  const token='THISISMYTAXPLOTTOKEN'
  const taxPayer = new TaxPayer({income:100000})

  useEffect(() =>  {
    const getData = async () => {
      const bracket = await taxBrackets(token, taxPayer)
      const taxData = await bracketPlot(bracket, 12400, 100000)

      setBracket(bracket)
      setValues(taxData)
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

 

  // let value
  // taxBrackets(token, someTaxPayer).then(result => value = result)
  return <div>
          {JSON.stringify(values)}

        </div>
}

export default App
