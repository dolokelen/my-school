import { Button, Flex, Input } from "@chakra-ui/react";
import { blue } from "../../cacheKeysAndRoutes";
import { useRef } from "react";
import { useCourseStore } from "./courseStore";

const SearchBar = () => {
  const setSearchText = useCourseStore((s) => s.setSearchText);
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.current) {
            setSearchText(ref.current.value);
            ref.current.value = "";
          }
        }}
      >
        <Flex>
          <Input
            ref={ref}
            borderRadius={20}
            variant="filled"
            mr={1}
            placeholder="Search Course"
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
