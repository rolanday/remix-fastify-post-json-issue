import type { ActionArgs, V2_MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const action = async ({ request }: ActionArgs) => {
  console.log(await request.json());
  return null;
};

export default function Index() {
  const fetcher = useFetcher();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <button
        onClick={() => {
          fetcher.submit(
            { foo: "bar" },
            {
              method: "POST",
              action: "/test",
              encType: "application/json",
            }
          );
        }}
      >
        test
      </button>
    </div>
  );
}
