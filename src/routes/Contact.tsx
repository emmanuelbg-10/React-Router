import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { getContact } from "../data/items";

type ContactParams = {
  contactid?: string; // Parámetro opcional
};

export default function Contact() {
  const params = useParams<ContactParams>();

  const contact = useMemo(() => {
    if (!params.contactid) return null; // Evita pasar `undefined`
    return getContact(params.contactid);
  }, [params.contactid]);

  if (!contact) {
    throw new Error("El contacto no existe");
  }

  return (
    <div className="content">
      <h1>{contact.name}</h1>
      <p>{contact.telephone}</p>
      <p>{contact.favorite ? "favorite" : "Regular Contact"}</p>
    </div>
  );
}
