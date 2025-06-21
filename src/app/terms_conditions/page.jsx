import React from 'react'
import BreadCrum from '@/components/BreadCrum/BreadCrum'
import { Container } from '@mui/material'
const page = () => {
  const termsList = [
    {
      id: 1,
      data: 'These Terms and Conditions relate to Digital Product sales.These terms and conditions set out the terms and conditions between you, the customer, and Abounding Solutions (“us”, “we”), governing the use of our website and our downloadable digital products including the content therein (the “products”). Your use of our website, and purchase, download and use of our products, constitutes your full acceptance of these terms and conditions. If you do not agree with these terms and conditions, you should not use our website or purchase, download or use any of our products.'
    },
    {
      id: 2,
      data: 'Anne Creations reserves the right to vary these terms from time to time.'
    },
    {
      id: 3,
      data: 'Please do not hesitate to contact us regarding any matter relating to this Downloads. You may not publish or share the Digital Products or your login details with anyone else. When you purchase access to the Digital Products you are purchasing a non-transferable, non-exclusive right to access the information. By purchasing Digital Products through this site, you are agreeing to these terms and entering into a contract with Anne Creations.'
    }
  ]
  return (
    <>
       <BreadCrum
         crumbs={[
           { label: 'Home', href: '/' },
           { label: 'Terms&Conditions', href: '/terms_conditions' },
           
          ]}
       
       />
        <Container>
            <h1 className='text-center font-semibold text-3xl my-12'>Terms&Conditions</h1>
            {termsList.map(item => (
              <p className='text-justify my-5 text-lg' key={item.id}>{item.data}</p>
            ))}
        </Container>
    </>
  )
}

export default page
