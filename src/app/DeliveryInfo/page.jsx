import BreadCrum from '@/components/BreadCrum/BreadCrum';
import React from 'react'
import { Container } from '@mui/material';
const deliveryInfoList = [
  {
    id: 1,
    data: 'All digital items once purchased are available for download at anytime with no cost.'
  },
  {
    id: 2,
    data: 'Products can be download to your personal computer or mobile device (click on the download icon on each item in order details page).'
  },
  {
    id: 3,
    data: 'Digital Products bought through the Store can be viewed and downloaded from the my orders section of your Anne creations account.'
  }
];

const page = () => {
  return (
    <>
        <BreadCrum crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Delivery Information', href: '/delivery_info' }
        ]}/>
        <Container className='my-20'>
        <h1 className='text-center my-10 text-3xl font-semibold ' >Delivery Information</h1>

      {deliveryInfoList.map(item => (
        <p className='text-justify my-5' key={item.id}>{item.data}</p>
      ))}
      </Container>
    </>
  )
}

export default page
