import { DetailValues } from "@/interfaces/Interfaces";
import {
  Button,
  Group,
  Modal,
  SegmentedControl,
  TextInput,
  Text,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { form } from "framer-motion/m";

interface CredentialProps {
  opened: boolean;
  close: () => void;
  form: UseFormReturnType<DetailValues, (values: DetailValues) => DetailValues>;
  handleSubmit: (values: DetailValues) => void;
}

const CredentialsModal: React.FC<CredentialProps> = ({
  opened,
  close,
  form,
  handleSubmit,
}) => {
  return (
    <Modal opened={opened} onClose={close} title="Update Details">
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
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CredentialsModal;
