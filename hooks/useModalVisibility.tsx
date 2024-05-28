import { useState } from "react";

export function useModalVisibility() {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);

  return { modalVisibility, setModalVisibility };
}
