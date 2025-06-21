import React from 'react'
import BreadCrum from '@/components/BreadCrum/BreadCrum'
import { Container } from '@mui/material'
const page = () => {
  const returnPolicyList = [
    {
      id: 1,
      data: 'Our policy is not to offer refunds on Digital Products.'
    },
    {
      id: 2,
      data: 'Once a product has been purchased by you, no right of cancellation or refund exists under the Consumer Protection Regulations 2000 due to the electronic nature of our products.'
    },
    {
      id: 3,
      data: 'Any refunds shall be at our sole and absolute discretion. You agree that under no circumstances whatsoever shall you initiate any chargebacks via your payment provider.'
    },
    {
      id: 4,
      data: 'You agree that any payments made by you for any of our products are final and may not be charged back. We reserve the right to alter any of our prices from time to time.'
    },
    {
      id: 5,
      data: 'Should you consider your situation to be a special circumstance then please get in contact with us and we shall consider your individual request.'
    },
    {
      id: 6,
      data: 'In the event that we do fix any technical issue and make available of digital products purchased.'
    }
  ];
  return (
    <>
      <BreadCrum crumbs={[
        { label: 'Home', href: '/' },
        { label: 'Return Policy', href: '/return' },
      ]} />
      <Container className='my-20'>
        <h1 className='my-10 text-center text-3xl font-semibold text-[var(--secondary)]'>Returns and Cancellations</h1>
        {returnPolicyList.map(item => (
          <p className='text-lg text-justify my-5' key={item.id}>{item.data}</p>
        ))}
      </Container>
    </>
  )
}

export default page
