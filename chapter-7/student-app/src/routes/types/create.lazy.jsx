import { createLazyFileRoute } from "@tanstack/react-router";
import Protected from "../../components/Auth/Protected";
import { createType } from "../../services/type";

export const Route = createLazyFileRoute("/types/create")({
  component: () => (
    <Protected>
      <CreateType />
    </Protected>
  ),
});

function CreateType() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [characteristic, setCharacteristic] = useState("");
  const [option, setOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const request = { name, description, characteristic, option };

    const createTypeData = async () => {
      setIsLoading(true);
      const result = await createType(request);
      setIsLoading(false);
      alert(result.message);
    };

    createTypeData();
  };
  return (
    <Row>
      <Form onSubmit={onSubmit}></Form>
    </Row>
  );
}
