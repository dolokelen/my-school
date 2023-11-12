import { Button, Flex, Input } from "@chakra-ui/react";
import { useRef } from "react";
import { blue } from "../cacheKeysAndRoutes";

interface Props {
  setSearchText: (searchText: string) => void;
}
const SearchBar = ({ setSearchText }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current) {
            setSearchText(ref.current.value);
          }
        }}
      >
        <Flex>
          <Input
            ref={ref}
            borderRadius={20}
            variant="filled"
            mr={1}
            placeholder="Search Records"
            size="md"
          />
          <Button borderRadius={20} type="submit" colorScheme={blue}>
            Search
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default SearchBar;
