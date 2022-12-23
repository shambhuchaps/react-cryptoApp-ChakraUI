import { Badge, Box, Button, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { server } from '../index';
import ErrorComponent from './ErrorComponent';
import Chart from "./Chart";

const CoinDetails = () => {

  const [coin, setCoin] = useState({});
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setcurrency] = useState('inr');
  const [days, setdays] = useState('24h');
  const [chartArray, setchartArray] = useState([])

  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "365d", "max"];

  const params = useParams();

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setdays("24h");
        setloading(true);
        break;
      case "7d":
        setdays("7d");
        setloading(true);
        break;
      case "14h":
        setdays("14h");
        setloading(true);
        break;
      case "30h":
        setdays("30h");
        setloading(true);
        break;
      case "60h":
        setdays("60h");
        setloading(true);
        break;
      case "200h":
        setdays("200h");
        setloading(true);
        break;
      case "365d":
        setdays("365d");
        setloading(true);
        break;
      case "max":
        setdays("max");
        setloading(true);
        break;
      default:
        setdays("24h");
        setloading(true);
        break;
    }
  }

  useEffect(() => {

    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoin(data);
        setchartArray(chartData.prices);
        // console.log(data);
        setloading(false);
      } catch (error) {
        seterror(true);
        setloading(false);
      }
    };
    fetchCoin();

  }, [params.id, currency, days])

  if (error) {
    return <ErrorComponent message={"Error While Fetching Coin"} />
  }

  return (
    <Container maxW={'container.xl'}>
      {
        loading ? (<Loader />) : (<>
          <Box borderWidth={1} width={'full'}>
            <Chart arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={'4'} overflowX={'auto'}>
            {
              btns.map((i) => (
                <Button key={i} onClick={() => switchChartStats(i)}>{i}</Button>
              ))
            }
          </HStack>

          <RadioGroup value={currency} onChange={setcurrency} p={'8'}>
            <HStack spacing={'4'}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={'4'} p='16' alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf="center" opacity={'0.7'}>
              Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={'2xl'} bgColor={'blackAlpha.800'} color={'white'}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={'full'} p={'4'}>
              <Item title={'Max Supply'} value={coin.market_data.max_supply} />
              <Item title={'Circulating Supply'} value={coin.market_data.circulating_supply} />
              <Item title={'Market Cap'} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
              <Item title={'All Time Low'} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
              <Item title={'All Time high'} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
            </Box>
          </VStack>
        </>
        )}
    </Container>
  )
}

const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'} w={'full'} my={'4'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar = ({ high, low }) => (
  <VStack w={'full'}>
    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} colorScheme={'red'} />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)

export default CoinDetails