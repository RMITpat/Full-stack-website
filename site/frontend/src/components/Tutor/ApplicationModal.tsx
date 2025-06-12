import { Application, Course } from "@/interfaces/Interfaces";
import {
  Button,
  Group,
  Modal,
  SegmentedControl,
  TextInput,
  Text,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { useLoginContext } from "@/contexts/LoginContext";
interface ApplicationProps {
  opened: boolean;
  close: () => void;
  form: UseFormReturnType<Application, (values: Application) => Application>;
  handleSubmit: (values: Application) => void;
  course: Course;
}
//the modal that is used for entering credentials
const ApplicationModal: React.FC<ApplicationProps> = ({
  opened,
  close,
  form,
  handleSubmit,
  course,
}) => {
  const currentUser = useLoginContext();
  form.setFieldValue("course", course);
  form.setFieldValue("id", currentUser.user.User_id);
  return (
    <Modal opened={opened} onClose={close} title={`Become a candidate`}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          {...form.getInputProps("previousRoles")}
          mt="md"
          label="Previous Roles"
          placeholder="Previous Roles"
          required
        />
        <Text size="sm" style={{ marginBottom: "3px", marginTop: "16px" }}>
          Availability
        </Text>
        <SegmentedControl
          {...form.getInputProps("availability")}
          data={["Part time", "Full time"]}
          //value={form.values.availability}
          //onChange={(value) => form.setFieldValue("availability", value)}
        ></SegmentedControl>
        <Text size="sm" style={{ marginBottom: "3px", marginTop: "16px" }}>
          Type
        </Text>
        <SegmentedControl
          {...form.getInputProps("type")}
          data={["Tutor", "Lab Assistant"]}

          //value={form.values.availability}
          //onChange={(value) => form.setFieldValue("availability", value)}
        ></SegmentedControl>
        <TextInput
          {...form.getInputProps("skills")}
          mt="md"
          label="Skills"
          placeholder="Skills"
          required
        />
        <TextInput
          {...form.getInputProps("credentials")}
          mt="md"
          label="Credentials"
          placeholder="Credentials"
          required
        />
        <Group justify="center" mt="md">
          <Button type="submit">Submit Application</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default ApplicationModal;
