import { Info } from "~/common/svg";

const InDevelopmentMessage = () => {
  return (
    <div className="mt-4 select-none rounded-md border border-zinc-200 bg-zinc-50 p-5">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <Info className="h-10 w-10 text-green-400" />
        <div className="flex flex-col">
          <h2 className="mb-1 font-semibold">
            You're in the development version
          </h2>
          <p className="text-sm text-zinc-600">
            This is a development version of the app, so some features may not
            work as expected. If you find any bugs, please report them on the
            GitHub issues of the project.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InDevelopmentMessage;
