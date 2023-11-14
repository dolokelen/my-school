import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { red, teal } from "../../cacheKeysAndRoutes";
import { Classtime, useEditClasstime } from "../../hooks/useClasstimes";
import { hasPermission } from "../../Utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  id: z.number().optional(),
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

export type ClasstimeEditFormData = z.infer<typeof schema>;

interface Props {
  classtime?: Classtime;
}

const ClasstimeEditForm = ({ classtime }: Props) => {
  if (!hasPermission("Can change class time")) return <AccessDenyPage />;

  const onUpdate = () => toast.success("Classtime Updated Successfully!");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ClasstimeEditFormData>({ resolver: zodResolver(schema) });

  const mutation = useEditClasstime(onUpdate);
  const onSubmit = (data: ClasstimeEditFormData) => {
    mutation.mutate({ ...data, id: classtime?.id });
  };

  useEffect(() => {
    if (classtime) {
      setValue("start_time", classtime.start_time);
      setValue("end_time", classtime.end_time);
      setValue("week_days", classtime.week_days);
    }
  }, [setValue, classtime]);

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const my = 2;
  const fontSize = "1rem";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack marginBottom={2}>
          <Box my={my}>
            <Text fontSize={fontSize}>Class Start Time</Text>
            <Input {...register("start_time")} type="text" size="md" />
            {errors?.start_time && (
              <Text color={red}>{errors.start_time.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Class End Time</Text>
            <Input {...register("end_time")} type="text" size="md" />
            {errors?.end_time && (
              <Text color={red}>{errors.end_time.message}</Text>
            )}
          </Box>

          <Box my={my}>
            <Text fontSize={fontSize}>Class Week Days</Text>
            <Input {...register("week_days")} type="text" size="md" />
            {errors?.week_days && (
              <Text color={red}>{errors.week_days.message}</Text>
            )}
          </Box>
        </Stack>
        <Button
          isActive
          type="submit"
          colorScheme={teal}
          onClick={() => mutation.isError && toast.error(customErrorMessage)}
        >
          Update Classtime
        </Button>
      </form>
    </>
  );
};

export default ClasstimeEditForm;
