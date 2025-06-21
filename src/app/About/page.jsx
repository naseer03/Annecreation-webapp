import React from 'react'
import BreadCrum from '@/components/BreadCrum/BreadCrum'
import { Container } from '@mui/material'
const page = () => {
  return (
    <>
  <BreadCrum
    crumbs={[
      { label: 'Home', href: '/' },
      { label: 'About', href: '/About' },
      
     ]}
  />
  
    <Container className='my-20'>
    <h1 className=' text-2xl my-10 font-bold text-center font-poppins'>About Us</h1>
  
    <p className='text-justify text-lg '>Anne creations HB is a leading company in south india for embroidery designs support for single needle machine, multi needles Whether you are  a commercial or home machine embroiderer, annecreationshb is determined to be the only resource you need for excellent quality for  commercial or home embroidery designs. Our list of designers is continuously growing to provide you with a wide range of choices at great values.</p>
    <p className='text-justify text-lg my-10'>Recognizing that your time is precious, we have designed this site to help you quickly find what you need so that you can spend more time doing what you like to do. Use our state-of-the-art tools to search through thousands of beautiful commercial or home machine embroidery designs from many different designers and immediately download the ones you want to your computer  at annecreations.</p>
    <p className='text-justify text-lg'>Our mission is to provide embroiderers a way to shop for great values from the convenience of their computers in a safe and secure online environment, and then to deliver their orders as quickly as possible. Please know that your feedback and ideas are important to us, and by using our suggestion form to give us your comments we feel confident that we can make your experience even better. From all of us at 
annecreationshb.com, thank you for the opportunity to serve you.</p>
</Container>

    </>
  )
}

export default page
