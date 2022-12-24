import { Avatar, Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const AvatarSrc = "https://scontent.fsif1-1.fna.fbcdn.net/v/t39.30808-6/307120430_3049347265357252_5606304673174759455_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ihHLFSQe-isAX9dIEd-&_nc_oc=AQlqNG170R-NX2bLua5RvGsng1fhYfEHnrLGJ76qPkPeRdmll_4-TwPNCav0eF9SCsOcSc2KnmQWiySfxSOCRSHg&tn=GSVyTJtgX8yyt8dP&_nc_ht=scontent.fsif1-1.fna&oh=00_AfDSUpcWcPateg8lH6sX_qS8rEP-b7DzkzJJWgsujiQjBA&oe=63AB2B6A";

const Footer = () => {
  return (
   <Box bgColor={'blackAlpha.900'} color={'whiteAlpha.900'} minH={'48'} px={'16'} py={['16','8']}>

    <Stack direction={['column','row']} h={'full'} alignItems={'center'}>
      <VStack w={'full'} alignItems={['center','flex-start']}>

     <Text fontWeight={'bold'}>About Us</Text>
     <Text 
     fontSize={'sm'}
     letterSpacing={'widest'}
     textAlign={['center','left']}>We are the best crypto trading app in Nepal, We provide our guidance at a very cheap price.</Text>

      </VStack>
      <VStack>
        <Avatar boxSize={'28'} mt={['4','0']} src={AvatarSrc}/>
        <Text>Our Founder</Text>
      </VStack>
    </Stack>

   </Box>
  )
}

export default Footer
