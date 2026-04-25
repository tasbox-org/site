import { createFileRoute } from "@tanstack/solid-router";

const HomePage = () => {
  return (
    <>
      <h1>Hello world!</h1>
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank" rel="noopener">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
      </p>
    </>
  );
};

export const Route = createFileRoute("/")({
  component: HomePage,
});
