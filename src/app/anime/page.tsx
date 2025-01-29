import GlobalError from "../error";

export default function AnimePage() {
  return <GlobalError error={new Error("Not Implemented")} plainError="Not Implemented" />;
}
