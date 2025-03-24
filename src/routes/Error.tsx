import { useRouteError } from "react-router-dom";

export default function Error() {
  const errorUnknown = useRouteError();
  let errorMessage = "Ocurrió un error inesperado";
  let errorStatus: number | undefined = undefined;

  if (typeof errorUnknown === "object" && errorUnknown !== null) {
    const error = errorUnknown as {
      status?: number;
      statusText?: string;
      message?: string;
    };
    errorMessage = error.statusText || error.message || errorMessage;
    errorStatus = error.status;
  }

  return (
    <div>
      <h1>Error {errorStatus ? `(${errorStatus})` : ""}</h1>
      <p>{errorMessage}</p>
    </div>
  );
}
