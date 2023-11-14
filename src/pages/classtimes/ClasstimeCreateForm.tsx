import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { blue, red } from "../../cacheKeysAndRoutes";
import { useCreateClasstime } from "../../hooks/useClasstimes";

const schema = z.object({
  start_time: z.string().min(1, {
    message: "Class start time is required and must be like, 7:00am",
  }),
  end_time: z.string().min(1, {
    message: "Class endtime time is required and must be like, 8:00am",
  }),
  week_days: z.string().min(1, {
    message:
      "Class week days time are required and must be like, MWF or TTH, Sat",
  }),
});

export type ClasstimeCreateFormData = z.infer<typeof schema>;

const ClasstimeCreateForm = () => {
  const onCreate = () => toast.success("Classtime Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClasstimeCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateClasstime(onCreate, () => reset());
  const onSubmit = (data: ClasstimeCreateFormData) => {
    mutation.mutate(data);
  };

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1rem";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box fontSize="2rem">Class Time Create Form</Box>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Class Start Time</Text>
            <Input
              {...register("start_time")}
              type="text"
              size="md"
              placeholder="e.g.: 7:30am"
            />
            {errors?.start_time && (
              <Text color={red}>{errors.start_time.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Class End Time</Text>
            <Input
              {...register("end_time")}
              type="text"
              size="md"
              placeholder="e.g.: 8:30am"
            />
            {errors?.end_time && (
              <Text color={red}>{errors.end_time.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Class Week Days</Text>
            <Input
              {...register("week_days")}
              type="text"
              size="md"
              placeholder="e.g.: MWF or TTH or MF"
            />
            {errors?.week_days && (
              <Text color={red}>{errors.week_days.message}</Text>
            )}
          </Box>
        </Stack>
        <Button
          type="submit"
          colorScheme={blue}
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
        >
          Create Classtime
        </Button>
      </form>
    </>
  );
};

export default ClasstimeCreateForm;
