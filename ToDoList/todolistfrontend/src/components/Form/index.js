import React from "react";
import { FormContainer, Input, Button } from "./styles";
function Form({ input, setInput, addToDo }) {
  return (
    <FormContainer>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        role="input"
      />
      <Button type="submit" onClick={(e) => addToDo(e)}>
        Add
      </Button>
    </FormContainer>
  );
}
export default Form;
