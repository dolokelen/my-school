import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { blue } from "../../cacheKeysAndRoutes";
import { useUploadStudentGrade } from "../../hooks/useGrades";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../Utilities/httpErrorStatus";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  justToUseZod: z.string().optional(),
});

type GradUploadFormData = z.infer<typeof schema>;

interface Props {
  teacherId: number;
  teachId: number;
}

const GradeUploadPage = ({ teacherId, teachId }: Props) => {
  const [gradeFile, setGradeFile] = useState<File | undefined>();

  const onUpload = () => "Students Graded Successfully.";
  const mutation = useUploadStudentGrade(teacherId, teachId, onUpload);

  const {
    handleSubmit,
  } = useForm<GradUploadFormData>({
    resolver: zodResolver(schema),
  });

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  function handleGradeChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setGradeFile(selectedFile);
  }

  const onSubmit = (data: GradUploadFormData) => {
    const formData = new FormData();

    gradeFile && formData.append("excel_file", gradeFile);
    console.log("gradeFile", gradeFile);
    if (!formData.get("excel_file")) return toast.error("Grade File Is Required!");
    mutation.mutate(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="file" name="excel_file" onChange={handleGradeChange} />
          <Button
          type="submit"
          mt={3}
          colorScheme={blue}
          onClick={() => {
            mutation.isError &&
              mutation.isError &&
              toast.error(customErrorMessage);
          }}
        >
          Upload Grade
        </Button>
      </form>
    </>
  );
};

export default GradeUploadPage;
