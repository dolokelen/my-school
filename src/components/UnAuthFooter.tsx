import { Flex, Image } from "@chakra-ui/react";
import footer_a from "../assets/footer_a.jpg"
import footer_b from "../assets/footer_b.jpg"
import footer_c from "../assets/footer_c.jpg"
import footer_d from "../assets/footer_d.jpg"

const UnAuthFooter = () => {
  const height = 204;
  return <Flex justifyContent="space-evenly" overflowX="hidden">
    <Image h={height} src={footer_a}/>
    <Image h={height} src={footer_b}/>
    <Image h={height} src={footer_c}/>
    <Image h={height} src={footer_d}/>
  </Flex>
};

export default UnAuthFooter;
